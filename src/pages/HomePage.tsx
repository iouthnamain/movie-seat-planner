
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MovieGrid, { MovieProps } from "@/components/movie/MovieCard";
import ScreeningList, { ScreeningProps } from "@/components/screening/ScreeningList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  // Mock data for featured movies
  const featuredMovies: MovieProps[] = [
    {
      id: "1",
      title: "Interstellar",
      poster: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1160&auto=format&fit=crop",
      genre: "Sci-Fi",
      duration: 169,
      rating: 8.6
    },
    {
      id: "2",
      title: "The Dark Knight",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1287&auto=format&fit=crop",
      genre: "Action",
      duration: 152,
      rating: 9.0
    },
    {
      id: "3",
      title: "Pulp Fiction",
      poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1170&auto=format&fit=crop",
      genre: "Crime",
      duration: 154,
      rating: 8.9
    },
    {
      id: "4",
      title: "Inception",
      poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1125&auto=format&fit=crop",
      genre: "Action",
      duration: 148,
      rating: 8.8
    }
  ];

  // Mock data for upcoming screenings
  const upcomingScreenings: ScreeningProps[] = [
    {
      id: "s1",
      movieId: "1",
      movieTitle: "Interstellar",
      theater: "Theater 1",
      date: "2025-05-15",
      time: "19:00",
      availableSeats: 120,
      totalSeats: 150
    },
    {
      id: "s2",
      movieId: "2",
      movieTitle: "The Dark Knight",
      theater: "Theater 2",
      date: "2025-05-16",
      time: "20:00",
      availableSeats: 85,
      totalSeats: 150
    },
    {
      id: "s3",
      movieId: "3",
      movieTitle: "Pulp Fiction",
      theater: "Theater 3",
      date: "2025-05-17",
      time: "18:30",
      availableSeats: 95,
      totalSeats: 120
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-background via-cinema-background/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1170&auto=format&fit=crop" 
          alt="Cinema" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Welcome to CineBook
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl">
            Your complete cinema management solution for bookings, reservations,
            and an unforgettable movie experience
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-cinema-primary hover:bg-cinema-primary/90 text-white">
              <Link to="/movies">Browse Movies</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/admin">Admin Panel</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Movies</h2>
          <Button asChild variant="ghost" className="text-cinema-primary">
            <Link to="/movies">View All</Link>
          </Button>
        </div>

        <MovieGrid movies={featuredMovies} />
      </section>

      {/* Screenings Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Screenings</h2>
          <Button asChild variant="ghost" className="text-cinema-primary">
            <Link to="/screenings">View All</Link>
          </Button>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <Tabs defaultValue="today">
            <TabsList className="mb-6">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="weekend">This Weekend</TabsTrigger>
            </TabsList>
            <TabsContent value="today">
              <ScreeningList screenings={upcomingScreenings} />
            </TabsContent>
            <TabsContent value="tomorrow">
              <ScreeningList screenings={upcomingScreenings.slice(1)} />
            </TabsContent>
            <TabsContent value="weekend">
              <ScreeningList screenings={upcomingScreenings.slice(0, 2)} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cinema-primary/10 py-20 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Manage Your Cinema?</h2>
          <p className="text-xl mb-8 text-cinema-muted max-w-3xl mx-auto">
            CineBook provides everything you need to run your cinema efficiently.
            From booking and reservations to movie management and customer analytics.
          </p>
          <Button asChild className="bg-cinema-primary hover:bg-cinema-primary/90 text-white">
            <Link to="/admin">Access Admin Panel</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
