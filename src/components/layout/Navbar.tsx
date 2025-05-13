
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Ticket, User, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-cinema-background/90 backdrop-blur-sm border-b border-cinema-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-cinema-primary" />
          <Link to="/" className="text-xl font-bold text-cinema-text">
            CineBook
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-cinema-text hover:text-cinema-primary transition-colors">
            Home
          </Link>
          <Link to="/movies" className="text-cinema-text hover:text-cinema-primary transition-colors">
            Movies
          </Link>
          <Link to="/screenings" className="text-cinema-text hover:text-cinema-primary transition-colors">
            Screenings
          </Link>
          <Link to="/admin" className="text-cinema-text hover:text-cinema-primary transition-colors">
            Admin
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-cinema-text" />
          </Button>
          <Button variant="ghost" size="icon">
            <Ticket className="h-5 w-5 text-cinema-text" />
          </Button>
          <Button className="bg-cinema-primary hover:bg-cinema-primary/90 text-white">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
