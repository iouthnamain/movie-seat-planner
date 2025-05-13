
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cinema-background border-t border-cinema-primary/20 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-cinema-primary" />
              <span className="text-xl font-bold text-cinema-text">CineBook</span>
            </div>
            <p className="mt-4 text-cinema-muted">
              Your ultimate cinema management solution for booking and reservations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cinema-text">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/screenings" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Screenings
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cinema-text">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-cinema-muted hover:text-cinema-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cinema-text">Contact</h3>
            <ul className="space-y-2">
              <li className="text-cinema-muted">Email: info@cinebook.com</li>
              <li className="text-cinema-muted">Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cinema-primary/20 mt-8 pt-8 text-center text-cinema-muted">
          <p>&copy; 2025 CineBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
