
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface MovieProps {
  id: string;
  title: string;
  poster: string;
  genre: string;
  duration: number;
  rating: number;
}

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  // Safety check to prevent accessing properties of undefined
  if (!movie) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg hover:shadow-cinema-primary/10 transition-all duration-300 h-full flex flex-col">
      <Link to={`/movies/${movie.id}`} className="overflow-hidden h-64 relative">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-cinema-primary">
          {movie.genre}
        </Badge>
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <Link to={`/movies/${movie.id}`} className="block">
          <h3 className="text-xl font-semibold line-clamp-1 hover:text-cinema-primary transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2 text-cinema-muted">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> 
            <span>{movie.duration} min</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{movie.rating}/10</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Button asChild className="w-full bg-cinema-primary hover:bg-cinema-primary/90">
          <Link to={`/movies/${movie.id}`}>
            Book Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
