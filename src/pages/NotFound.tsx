
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cinema-background">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-cinema-primary mb-4">404</h1>
        <div className="w-24 h-24 mx-auto mb-8">
          <img 
            src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1156&auto=format&fit=crop"
            alt="Film reel"
            className="w-full h-full object-cover rounded-full opacity-60"
          />
        </div>
        <p className="text-xl md:text-2xl text-cinema-text mb-6">
          Oops! This scene isn't in our reel.
        </p>
        <p className="text-cinema-muted max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-cinema-primary hover:bg-cinema-primary/90">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
