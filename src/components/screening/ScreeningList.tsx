
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Film } from "lucide-react";
import { Link } from "react-router-dom";

export interface ScreeningProps {
  id: string;
  movieId: string;
  movieTitle: string;
  theater: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
}

const ScreeningList = ({ screenings }: { screenings: ScreeningProps[] }) => {
  return (
    <Table>
      <TableCaption>List of upcoming screenings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Movie</TableHead>
          <TableHead>Theater</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {screenings.map((screening) => (
          <TableRow key={screening.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-cinema-primary" />
                <span>{screening.movieTitle}</span>
              </div>
            </TableCell>
            <TableCell>{screening.theater}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-cinema-muted" />
                <span>{screening.date}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-cinema-muted" />
                <span>{screening.time}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="bg-gray-700 w-24 h-2 rounded-full">
                  <div 
                    className="bg-cinema-primary h-2 rounded-full" 
                    style={{ width: `${(screening.availableSeats / screening.totalSeats) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-cinema-muted">
                  {screening.availableSeats}/{screening.totalSeats}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                asChild
                className="bg-cinema-accent hover:bg-cinema-accent/90"
                size="sm"
              >
                <Link to={`/booking/${screening.id}`}>
                  Book
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScreeningList;
