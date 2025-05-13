
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Home } from "lucide-react";

const BookingSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-cinema-primary/20 mb-8">
          <Check className="h-12 w-12 text-cinema-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        
        <p className="text-cinema-muted mb-8">
          Your booking has been successfully confirmed. An email with your e-tickets 
          has been sent to your registered email address.
        </p>
        
        <div className="bg-card rounded-lg p-6 shadow-md mb-8">
          <div className="border-b border-cinema-primary/10 pb-4 mb-4">
            <h2 className="font-medium">Booking Reference</h2>
            <p className="text-2xl font-bold text-cinema-primary">CIN12345678</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-cinema-muted">Movie:</span>
              <span className="font-medium">Interstellar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cinema-muted">Theater:</span>
              <span>Theater 1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cinema-muted">Date & Time:</span>
              <span>May 15, 2025 at 19:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cinema-muted">Seats:</span>
              <span>B4, B5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cinema-muted">Total Paid:</span>
              <span className="font-medium">$28.98</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-cinema-primary hover:bg-cinema-primary/90">
            <Link to="/download-ticket">
              Download E-Tickets
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
