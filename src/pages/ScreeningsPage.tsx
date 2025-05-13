
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ScreeningList, { ScreeningProps } from "@/components/screening/ScreeningList";

const ScreeningsPage = () => {
  const [dateFilter, setDateFilter] = useState("");
  const [movieFilter, setMovieFilter] = useState("");
  
  // Mock data for screenings
  const allScreenings: ScreeningProps[] = [
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
    },
    {
      id: "s4",
      movieId: "1",
      movieTitle: "Interstellar",
      theater: "Theater 2",
      date: "2025-05-18",
      time: "16:00",
      availableSeats: 130,
      totalSeats: 150
    },
    {
      id: "s5",
      movieId: "4",
      movieTitle: "Inception",
      theater: "VIP Theater",
      date: "2025-05-19",
      time: "20:30",
      availableSeats: 40,
      totalSeats: 50
    }
  ];

  // Extract unique movies and dates for filters
  const movies = [...new Set(allScreenings.map(s => s.movieTitle))];
  const dates = [...new Set(allScreenings.map(s => s.date))];

  // Filter screenings based on selections
  const filteredScreenings = allScreenings.filter(screening => {
    const matchesDate = dateFilter ? screening.date === dateFilter : true;
    const matchesMovie = movieFilter ? screening.movieTitle === movieFilter : true;
    return matchesDate && matchesMovie;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Screenings</h1>

      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="date">Filter by Date</Label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger id="date">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="">All Dates</SelectItem>
                {dates.map(date => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Movie Filter */}
          <div className="space-y-2">
            <Label htmlFor="movie">Filter by Movie</Label>
            <Select value={movieFilter} onValueChange={setMovieFilter}>
              <SelectTrigger id="movie">
                <SelectValue placeholder="All Movies" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="">All Movies</SelectItem>
                {movies.map(movie => (
                  <SelectItem key={movie} value={movie}>
                    {movie}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-md">
        {filteredScreenings.length > 0 ? (
          <ScreeningList screenings={filteredScreenings} />
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-cinema-muted">No screenings found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreeningsPage;
