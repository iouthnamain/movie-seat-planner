import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Film, Ticket, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminMovieForm from "@/components/admin/AdminMovieForm";
import AdminScreeningForm from "@/components/admin/AdminScreeningForm";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";

const AdminPage = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  
  // Mock data
  const [movies, setMovies] = useState([
    {
      id: "1",
      title: "Interstellar",
      description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      poster: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1160&auto=format&fit=crop",
      duration: 169,
      rating: 8.6,
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      releaseDate: "2014-11-07"
    },
    {
      id: "2",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1287&auto=format&fit=crop",
      duration: 152,
      rating: 9.0,
      genre: "Action",
      director: "Christopher Nolan",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
      releaseDate: "2008-07-18"
    }
  ]);
  
  const [theaters] = useState([
    { id: "t1", name: "Theater 1" },
    { id: "t2", name: "Theater 2" },
    { id: "t3", name: "VIP Theater" }
  ]);
  
  const [screenings, setScreenings] = useState([
    {
      id: "s1",
      movieId: "1",
      theaterId: "t1",
      date: "2025-05-15",
      time: "19:00",
      price: 12.99
    },
    {
      id: "s2",
      movieId: "2",
      theaterId: "t2",
      date: "2025-05-16",
      time: "20:00",
      price: 14.99
    }
  ]);
  
  const handleAddMovie = (data: any) => {
    const newMovie = {
      ...data,
      id: `m${Date.now()}` // Generate a simple ID
    };
    setMovies([...movies, newMovie]);
    setOpenDialog(null);
    toast.success("Movie added successfully");
  };
  
  const handleAddScreening = (data: any) => {
    const newScreening = {
      ...data,
      id: `s${Date.now()}` // Generate a simple ID
    };
    setScreenings([...screenings, newScreening]);
    setOpenDialog(null);
    toast.success("Screening added successfully");
  };
  
  const getMovieTitle = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.title : "Unknown Movie";
  };
  
  const getTheaterName = (theaterId: string) => {
    const theater = theaters.find(t => t.id === theaterId);
    return theater ? theater.name : "Unknown Theater";
  };
  
  const handleDeleteMovie = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
    toast.success("Movie deleted successfully");
  };
  
  const handleDeleteScreening = (id: string) => {
    setScreenings(screenings.filter(screening => screening.id !== id));
    toast.success("Screening deleted successfully");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      
      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="movies">
            <Film className="mr-2 h-4 w-4" />
            Movies
          </TabsTrigger>
          <TabsTrigger value="screenings">
            <Ticket className="mr-2 h-4 w-4" />
            Screenings
          </TabsTrigger>
        </TabsList>
        
        {/* Movies Tab */}
        <TabsContent value="movies" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Movie Management</h2>
            <Dialog open={openDialog === "add-movie"} onOpenChange={(open) => {
              if (open) setOpenDialog("add-movie");
              else setOpenDialog(null);
            }}>
              <DialogTrigger asChild>
                <Button className="bg-cinema-primary hover:bg-cinema-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add New Movie</DialogTitle>
                </DialogHeader>
                <AdminMovieForm onSubmit={handleAddMovie} />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cinema-primary/10 border-b border-cinema-primary/20">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id} className="border-b border-cinema-primary/10 hover:bg-cinema-primary/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img 
                            src={movie.poster} 
                            alt={movie.title} 
                            className="w-12 h-16 object-cover rounded mr-3"
                          />
                          <span className="font-medium">{movie.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{movie.genre}</td>
                      <td className="px-6 py-4">{movie.duration} min</td>
                      <td className="px-6 py-4">{movie.rating}/10</td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteMovie(movie.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {/* Screenings Tab */}
        <TabsContent value="screenings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Screening Management</h2>
            <Dialog open={openDialog === "add-screening"} onOpenChange={(open) => {
              if (open) setOpenDialog("add-screening");
              else setOpenDialog(null);
            }}>
              <DialogTrigger asChild>
                <Button className="bg-cinema-primary hover:bg-cinema-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Screening
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Add New Screening</DialogTitle>
                </DialogHeader>
                <AdminScreeningForm 
                  movies={movies.map(m => ({ id: m.id, title: m.title }))} 
                  theaters={theaters}
                  onSubmit={handleAddScreening}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cinema-primary/10 border-b border-cinema-primary/20">
                    <th className="px-6 py-4">Movie</th>
                    <th className="px-6 py-4">Theater</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {screenings.map((screening) => (
                    <tr key={screening.id} className="border-b border-cinema-primary/10 hover:bg-cinema-primary/5">
                      <td className="px-6 py-4">{getMovieTitle(screening.movieId)}</td>
                      <td className="px-6 py-4">{getTheaterName(screening.theaterId)}</td>
                      <td className="px-6 py-4">{screening.date}</td>
                      <td className="px-6 py-4">{screening.time}</td>
                      <td className="px-6 py-4">${screening.price}</td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteScreening(screening.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
