
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelector from "@/components/booking/SeatSelector";
import BookingSummary from "@/components/booking/BookingSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film, Calendar, Clock } from "lucide-react";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // In a real app, this would be fetched from the API
  const screening = {
    id,
    movieId: "1",
    movieTitle: "Interstellar",
    theater: "Theater 1",
    date: "2025-05-15",
    time: "19:00",
    price: 12.99,
  };

  // Mock seat data
  const generateSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seatsPerRow = 12;
    const seats = [];
    
    for (const row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        // Make some seats unavailable or reserved for demo purposes
        let status: "available" | "reserved" | "unavailable" = "available";
        
        if (
          (row === "D" && (i === 5 || i === 6 || i === 7)) ||
          (row === "E" && (i === 5 || i === 6 || i === 7))
        ) {
          status = "reserved";
        }
        
        if (
          (row === "A" && (i === 1 || i === 2)) ||
          (row === "H" && (i === 11 || i === 12))
        ) {
          status = "unavailable";
        }
        
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status
        });
      }
    }
    
    return seats;
  };
  
  const seats = generateSeats();
  
  const handleSelectionChange = (selectedSeats: string[]) => {
    setSelectedSeatIds(selectedSeats);
  };
  
  const handleConfirmBooking = () => {
    // In a real app, this would submit the booking to an API
    navigate("/booking-success");
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        className="mb-6 text-cinema-muted hover:text-cinema-text"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      {/* Screening Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-cinema-primary/20">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Film className="mr-2 h-6 w-6 text-cinema-primary" />
            {screening.movieTitle}
          </h1>
          <div className="flex flex-wrap gap-4 mt-2 text-cinema-muted">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{screening.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{screening.time}</span>
            </div>
            <div>
              {screening.theater}
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="text-lg font-semibold">
            Ticket Price: <span className="text-cinema-primary">${screening.price}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <SeatSelector 
              seats={seats} 
              onSelectionChange={handleSelectionChange}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
          <BookingSummary
            movieTitle={screening.movieTitle}
            theater={screening.theater}
            date={screening.date}
            time={screening.time}
            selectedSeats={selectedSeatIds}
            ticketPrice={screening.price}
            onConfirm={handleConfirmBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
