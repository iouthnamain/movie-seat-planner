
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Ticket, User, Search, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();

  const getInitials = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

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
          {user && (
            <Link to="/admin" className="text-cinema-text hover:text-cinema-primary transition-colors">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-cinema-text" />
          </Button>
          <Button variant="ghost" size="icon">
            <Ticket className="h-5 w-5 text-cinema-text" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 bg-cinema-primary text-white">
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings" className="cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                {/* Add admin link if needed */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="bg-cinema-primary hover:bg-cinema-primary/90 text-white" asChild>
              <Link to="/auth">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
