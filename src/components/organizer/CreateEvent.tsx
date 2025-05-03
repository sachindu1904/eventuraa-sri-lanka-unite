
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Trash, Upload, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [ticketTypes, setTicketTypes] = useState([
    { name: 'General Admission', price: '', quantity: '100' }
  ]);
  
  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', quantity: '' }]);
  };
  
  const handleRemoveTicketType = (index: number) => {
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };
  
  const handleTicketChange = (index: number, field: string, value: string) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = { ...newTicketTypes[index], [field]: value };
    setTicketTypes(newTicketTypes);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEventImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would be an API call in a real application
    setTimeout(() => {
      toast.success('Event created successfully!');
      navigate('/organizer-portal/events');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
      <p className="text-gray-600 mb-8">Fill in the details to create a new event</p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Details</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Event Time</Label>
                  <Input id="time" type="time" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter event location" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="culinary">Culinary</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event..." 
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Event Image</h2>
              <div className="border rounded-md p-4">
                {eventImage ? (
                  <div className="relative">
                    <img 
                      src={eventImage} 
                      alt="Event" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      onClick={() => setEventImage(null)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-48 bg-gray-50">
                    <Upload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">Drag and drop an image or</p>
                    <Label 
                      htmlFor="image-upload" 
                      className="cursor-pointer text-[#7E69AB] hover:underline text-sm"
                    >
                      Browse
                    </Label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 1200 × 630 pixels (16:9)
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Publishing Options</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="publish" />
                  <Label htmlFor="publish" className="text-sm">Publish immediately</Label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  If unchecked, event will be saved as draft
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ticket Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ticket Information</h2>
          
          <div className="space-y-4">
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Ticket Type {index + 1}</h3>
                  {ticketTypes.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveTicketType(index)}
                    >
                      <Trash size={16} className="text-red-500" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-name-${index}`}>Ticket Name</Label>
                    <Input
                      id={`ticket-name-${index}`}
                      placeholder="e.g., General Admission"
                      value={ticket.name}
                      onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-price-${index}`}>Price (LKR)</Label>
                    <Input
                      id={`ticket-price-${index}`}
                      type="number"
                      placeholder="0"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ticket-quantity-${index}`}>Quantity Available</Label>
                    <Input
                      id={`ticket-quantity-${index}`}
                      type="number"
                      placeholder="100"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTicketType}
            className="flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Another Ticket Type
          </Button>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/organizer-portal/events')}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-[#7E69AB] hover:bg-[#6E59A5]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
