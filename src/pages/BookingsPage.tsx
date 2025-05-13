
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const BookingsPage = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    
    // Note: This is a placeholder. The actual bookings table will need to be created later.
    // This is just to show the structure of the page.
    
    setBookings([]);
    setIsLoading(false);
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
                  <a href="/movies" className="text-cinema-primary hover:underline">
                    Browse movies
                  </a>{" "}
                  to make your first booking!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Booking items will go here when we have the bookings table */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingsPage;
