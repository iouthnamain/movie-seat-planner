
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface MovieFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    poster: string;
    duration: number;
    rating: number;
    genre: string;
    director: string;
    cast: string;
    releaseDate: string;
  };
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

const AdminMovieForm = ({ initialData, onSubmit, isEditing = false }: MovieFormProps) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      poster: "",
      duration: 120,
      rating: 7.5,
      genre: "action",
      director: "",
      cast: "",
      releaseDate: new Date().toISOString().split("T")[0],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    // Simple validation
    if (!formData.title || !formData.description || !formData.poster) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    
    if (!isEditing) {
      // Reset form if not editing
      setFormData({
        title: "",
        description: "",
        poster: "",
        duration: 120,
        rating: 7.5,
        genre: "action",
        director: "",
        cast: "",
        releaseDate: new Date().toISOString().split("T")[0],
      });
    }

    toast.success(`Movie ${isEditing ? "updated" : "added"} successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">Movie Title *</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter movie title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter movie description"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="poster">Poster URL *</Label>
        <Input
          id="poster"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          placeholder="Enter URL to movie poster image"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            min={1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0-10)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            min={0}
            max={10}
            step={0.1}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select 
            value={formData.genre} 
            onValueChange={(value) => handleSelectChange("genre", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
              <SelectItem value="drama">Drama</SelectItem>
              <SelectItem value="horror">Horror</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="thriller">Thriller</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
              <SelectItem value="animation">Animation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="director">Director</Label>
        <Input
          id="director"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Enter director's name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cast">Cast</Label>
        <Input
          id="cast"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
          placeholder="Enter main cast (comma separated)"
        />
      </div>
      
      <Button type="submit" className="bg-cinema-primary hover:bg-cinema-primary/90 w-full">
        {isEditing ? "Update Movie" : "Add Movie"}
      </Button>
    </form>
  );
};

export default AdminMovieForm;
