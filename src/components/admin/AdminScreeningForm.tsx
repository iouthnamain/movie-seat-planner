
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Movie {
  id: string;
  title: string;
}

interface Theater {
  id: string;
  name: string;
}

interface ScreeningFormProps {
  movies: Movie[];
  theaters: Theater[];
  initialData?: {
    id?: string;
    movieId: string;
    theaterId: string;
    date: string;
    time: string;
    price: number;
  };
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

const AdminScreeningForm = ({ 
  movies, 
  theaters, 
  initialData, 
  onSubmit, 
  isEditing = false 
}: ScreeningFormProps) => {
  const [formData, setFormData] = useState(
    initialData || {
      movieId: "",
      theaterId: "",
      date: new Date().toISOString().split("T")[0],
      time: "18:00",
      price: 12.99,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.movieId || !formData.theaterId || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    
    if (!isEditing) {
      // Reset form if not editing
      setFormData({
        movieId: "",
        theaterId: "",
        date: new Date().toISOString().split("T")[0],
        time: "18:00",
        price: 12.99,
      });
    }

    toast.success(`Screening ${isEditing ? "updated" : "added"} successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="movieId">Movie *</Label>
        <Select 
          value={formData.movieId} 
          onValueChange={(value) => handleSelectChange("movieId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select movie" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {movies.map((movie) => (
              <SelectItem key={movie.id} value={movie.id}>
                {movie.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="theaterId">Theater *</Label>
        <Select 
          value={formData.theaterId} 
          onValueChange={(value) => handleSelectChange("theaterId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select theater" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {theaters.map((theater) => (
              <SelectItem key={theater.id} value={theater.id}>
                {theater.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Ticket Price ($)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          min={0}
          step={0.01}
        />
      </div>
      
      <Button type="submit" className="bg-cinema-primary hover:bg-cinema-primary/90 w-full">
        {isEditing ? "Update Screening" : "Add Screening"}
      </Button>
    </form>
  );
};

export default AdminScreeningForm;
