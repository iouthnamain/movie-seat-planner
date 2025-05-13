
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Film, User, Ticket } from "lucide-react";
import { toast } from "sonner";

interface BookingSummaryProps {
  movieTitle: string;
  theater: string;
  date: string;
  time: string;
  selectedSeats: string[];
  ticketPrice: number;
  onConfirm: () => void;
}

const BookingSummary = ({
  movieTitle,
  theater,
  date,
  time,
  selectedSeats,
  ticketPrice,
  onConfirm,
}: BookingSummaryProps) => {
  const subtotal = selectedSeats.length * ticketPrice;
  const fees = selectedSeats.length * 1.5;
  const total = subtotal + fees;

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    
    // In a real app, this would make an API call to create the booking
    onConfirm();
    toast.success("Booking confirmed!");
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Film className="h-5 w-5 text-cinema-primary mt-0.5" />
          <div>
            <p className="font-medium">{movieTitle}</p>
            <p className="text-sm text-cinema-muted">{theater}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-cinema-primary" />
          <p>{date}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-cinema-primary" />
          <p>{time}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-cinema-primary mt-0.5" />
          <div>
            <p className="font-medium">Seats</p>
            {selectedSeats.length > 0 ? (
              <p className="text-sm">
                {selectedSeats.join(", ")}
              </p>
            ) : (
              <p className="text-sm text-cinema-muted">No seats selected</p>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-cinema-muted">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cinema-muted">Booking Fees</span>
            <span>${fees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium mt-2">
            <span>Total</span>
            <span className="text-cinema-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConfirmBooking}
          className="bg-cinema-primary hover:bg-cinema-primary/90 w-full"
          disabled={selectedSeats.length === 0}
        >
          <Ticket className="h-4 w-4 mr-2" />
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingSummary;
