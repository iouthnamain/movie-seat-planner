
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SeatProps {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "reserved" | "unavailable";
}

interface SeatSelectorProps {
  seats: SeatProps[];
  onSelectionChange: (selectedSeats: string[]) => void;
}

const SeatSelector = ({ seats, onSelectionChange }: SeatSelectorProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: SeatProps) => {
    if (seat.status !== "available" && seat.status !== "selected") return;

    let newSelectedSeats;
    
    if (seat.status === "available") {
      newSelectedSeats = [...selectedSeats, seat.id];
    } else {
      newSelectedSeats = selectedSeats.filter(id => id !== seat.id);
    }
    
    setSelectedSeats(newSelectedSeats);
    onSelectionChange(newSelectedSeats);
  };

  // Group seats by row
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, SeatProps[]>);

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center mb-8">
        <div className="w-3/4 h-2 bg-cinema-primary/30 rounded-full mb-10"></div>
        <p className="text-center text-cinema-muted mb-4">SCREEN</p>
        
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            {Object.entries(rows).map(([row, seats]) => (
              <div key={row} className="flex items-center justify-center mb-2">
                <div className="w-8 text-center font-semibold text-cinema-muted">{row}</div>
                <div className="flex">
                  {seats.map((seat) => {
                    const status = selectedSeats.includes(seat.id) ? "selected" : seat.status;
                    return (
                      <div 
                        key={seat.id} 
                        className={`seat seat-${status}`}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-cinema-seat-available mr-2"></div>
          <span className="text-sm text-cinema-muted">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-cinema-seat-selected mr-2"></div>
          <span className="text-sm text-cinema-muted">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-cinema-seat-reserved mr-2"></div>
          <span className="text-sm text-cinema-muted">Reserved</span>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-cinema-seat-unavailable mr-2"></div>
          <span className="text-sm text-cinema-muted">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
