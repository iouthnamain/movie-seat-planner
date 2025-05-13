
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import MovieGrid from "@/components/movie/MovieGrid";
import { MovieProps } from "@/components/movie/MovieCard";

const MoviesPage = () => {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");

  // Mock data for movies
  const allMovies: MovieProps[] = [
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
    },
    {
      id: "5",
      title: "The Shawshank Redemption",
      poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1170&auto=format&fit=crop",
      genre: "Drama",
      duration: 142,
      rating: 9.3
    },
    {
      id: "6",
      title: "The Godfather",
      poster: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=988&auto=format&fit=crop",
      genre: "Crime",
      duration: 175,
      rating: 9.2
    },
    {
      id: "7",
      title: "The Matrix",
      poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1170&auto=format&fit=crop",
      genre: "Sci-Fi",
      duration: 136,
      rating: 8.7
    },
    {
      id: "8",
      title: "Goodfellas",
      poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1170&auto=format&fit=crop",
      genre: "Crime",
      duration: 145,
      rating: 8.7
    }
  ];

  // Filter movies based on search and genre
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter === "all" ? true : movie.genre.toLowerCase() === genreFilter.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  // Extract unique genres from movies
  const genres = [...new Set(allMovies.map((movie) => movie.genre))];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      
      <div className="bg-card rounded-lg p-6 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Movies</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-cinema-muted" />
              <Input
                id="search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Genre Filter */}
          <div className="space-y-2">
            <Label htmlFor="genre">Filter by Genre</Label>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger id="genre">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-cinema-muted">No movies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
