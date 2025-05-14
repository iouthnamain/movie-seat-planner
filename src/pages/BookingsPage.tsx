
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

type Booking = {
  id: string;
  created_at: string;
  total_price: number;
  payment_status: string;
  screening: {
    id: string;
    date: string;
    time: string;
    price: number;
    movie: {
      id: string;
      title: string;
      poster: string;
    };
    theater: {
      id: string;
      name: string;
    };
  };
  seats: {
    id: string;
    row: string;
    number: number;
    type: string;
  }[];
};

const BookingsPage = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [user, loading]);

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }

  const fetchBookings = async () => {
    setIsLoading(true);
    
    try {
      // Fetch bookings with related data
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, 
          created_at,
          total_price,
          payment_status,
          screening:screening_id (
            id,
            date,
            time,
            price,
            movie:movie_id (
              id,
              title,
              poster
            ),
            theater:theater_id (
              id,
              name
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // For each booking, fetch the associated seats
      if (data) {
        const bookingsWithSeats = await Promise.all(
          data.map(async (booking) => {
            const { data: seatsData, error: seatsError } = await supabase
              .from('booking_seats')
              .select(`
                seat_id,
                seats:seat_id (
                  id,
                  row,
                  number,
                  type
                )
              `)
              .eq('booking_id', booking.id);

            if (seatsError) {
              console.error('Error fetching seats:', seatsError);
              return {
                ...booking,
                seats: []
              };
            }

            return {
              ...booking,
              seats: seatsData.map(item => item.seats)
            };
          })
        );

        setBookings(bookingsWithSeats as Booking[]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error fetching bookings",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatSeatList = (seats: { row: string; number: number }[]) => {
    if (!seats || seats.length === 0) return "No seats";
    
    // Sort seats by row and number
    const sortedSeats = [...seats].sort((a, b) => {
      if (a.row !== b.row) return a.row.localeCompare(b.row);
      return a.number - b.number;
    });
    
    // Group consecutive seats
    const groups: string[] = [];
    let currentGroup: { row: string; numbers: number[] } | null = null;
    
    sortedSeats.forEach((seat) => {
      if (!currentGroup || currentGroup.row !== seat.row || 
          currentGroup.numbers[currentGroup.numbers.length - 1] !== seat.number - 1) {
        if (currentGroup) {
          groups.push(formatSeatGroup(currentGroup));
        }
        currentGroup = { row: seat.row, numbers: [seat.number] };
      } else {
        currentGroup.numbers.push(seat.number);
      }
    });
    
    if (currentGroup) {
      groups.push(formatSeatGroup(currentGroup));
    }
    
    return groups.join(', ');
  };
  
  const formatSeatGroup = (group: { row: string; numbers: number[] }) => {
    if (group.numbers.length === 1) {
      return `${group.row}${group.numbers[0]}`;
    } else {
      return `${group.row}${group.numbers[0]}-${group.row}${group.numbers[group.numbers.length - 1]}`;
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-cinema-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <Card className="border-cinema-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">My Bookings</CardTitle>
            <CardDescription>
              View and manage your cinema bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">You don't have any bookings yet.</p>
                <p className="mt-2">
                  <Link to="/movies" className="text-cinema-primary hover:underline">
                    Browse movies
                  </Link>{" "}
                  to make your first booking!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden border-muted">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 h-40 md:h-auto">
                        <img
                          src={booking.screening.movie.poster}
                          alt={booking.screening.movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 w-full md:w-3/4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium">
                            {booking.screening.movie.title}
                          </h3>
                          <Badge variant={booking.payment_status === 'completed' ? 'default' : 'outline'}>
                            {booking.payment_status === 'completed' ? 'Paid' : booking.payment_status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(new Date(booking.screening.date), 'EEEE, MMMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(
                                new Date(`2000-01-01T${booking.screening.time}`),
                                'h:mm a'
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.screening.theater.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                            <span>{formatSeatList(booking.seats)}</span>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-muted-foreground">Total paid: </span>
                            <span className="font-semibold">${booking.total_price.toFixed(2)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Booked on {format(new Date(booking.created_at), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingsPage;
