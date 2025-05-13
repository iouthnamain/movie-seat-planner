
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, Calendar, User, Play } from "lucide-react";
import ScreeningList, { ScreeningProps } from "@/components/screening/ScreeningList";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, fetch movie details based on the ID
  // For now, we'll use mock data
  const movie = {
    id,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1160&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1170&auto=format&fit=crop",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    genre: "Sci-Fi",
    duration: 169,
    rating: 8.6,
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    releaseDate: "2014-11-07"
  };

  // Mock screenings for this movie
  const screenings: ScreeningProps[] = [
    {
      id: "s1",
      movieId: id || "",
      movieTitle: movie.title,
      theater: "Theater 1",
      date: "2025-05-15",
      time: "19:00",
      availableSeats: 120,
      totalSeats: 150
    },
    {
      id: "s2",
      movieId: id || "",
      movieTitle: movie.title,
      theater: "Theater 2",
      date: "2025-05-16",
      time: "20:00",
      availableSeats: 85,
      totalSeats: 150
    },
    {
      id: "s3",
      movieId: id || "",
      movieTitle: movie.title,
      theater: "VIP Theater",
      date: "2025-05-17",
      time: "18:30",
      availableSeats: 45,
      totalSeats: 50
    }
  ];

  return (
    <div>
      {/* Movie Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-cinema-background/80 to-transparent z-10"></div>
        <img 
          src={movie.backdrop} 
          alt={movie.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-end pb-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-64 h-96 object-cover rounded-lg border-4 border-white/20 shadow-lg"
            />
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-cinema-primary">{movie.genre}</Badge>
                <div className="flex items-center space-x-1 text-sm bg-black/40 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 text-cinema-muted" />
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex items-center space-x-1 text-sm bg-black/40 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{movie.rating}/10</span>
                </div>
                <div className="flex items-center space-x-1 text-sm bg-black/40 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 text-cinema-muted" />
                  <span>{movie.releaseDate}</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-200 max-w-2xl">{movie.description}</p>
              
              <div className="pt-2">
                <Button className="bg-cinema-primary hover:bg-cinema-primary/90 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details Section */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="screenings" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="screenings">Screenings</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
          </TabsList>
          
          {/* Screenings Tab */}
          <TabsContent value="screenings" className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-6">Available Screenings</h3>
              <ScreeningList screenings={screenings} />
            </div>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-6">Movie Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-cinema-muted mb-2">Synopsis</h4>
                  <p>{movie.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-cinema-muted mb-2">Director</h4>
                    <p>{movie.director}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-cinema-muted mb-2">Genre</h4>
                    <p>{movie.genre}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-cinema-muted mb-2">Release Date</h4>
                    <p>{movie.releaseDate}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-cinema-muted mb-2">Duration</h4>
                    <p>{movie.duration} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Cast Tab */}
          <TabsContent value="cast" className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-6">Cast & Crew</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {movie.cast.split(", ").map((actor, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-cinema-primary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-cinema-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{actor}</p>
                      <p className="text-sm text-cinema-muted">Actor</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default MovieDetailPage;
