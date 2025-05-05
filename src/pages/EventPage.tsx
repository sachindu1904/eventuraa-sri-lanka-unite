import React, { useState } from 'react';
import { Calendar, MapPin, Music, Search, Ticket, X, Star, Clock, Users, DollarSign, Tag } from 'lucide-react';
import EventSearch from '@/components/EventSearch';
import EventCard from '@/components/EventCard';
import EventSuggestions from '@/components/EventSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import ReviewSystem from '@/components/ReviewSystem';

// User role enum (for future use)
enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
  ADMIN = 'admin'
}

// Extended event data with ticket types
const events = [
  {
    id: 1,
    title: "Kandy Esala Perahera",
    date: "Aug 10-20, 2025",
    location: "Kandy",
    image: "https://images.unsplash.com/photo-1625140574538-40bc923f0112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3JpJTIwbGFua2ElMjBwZXJhaGVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Cultural",
    price: "From LKR 3,500",
    description: "The Kandy Esala Perahera is one of the oldest and grandest of all Buddhist festivals in Sri Lanka, featuring dancers, jugglers, musicians, fire-breathers, and lavishly decorated elephants.",
    organizerId: 1,
    status: "approved",
    ticketTypes: [
      { name: "General Admission", price: 3500, available: 200 },
      { name: "VIP Seating", price: 7500, available: 50 }
    ],
    highlights: [
      "Traditional dance performances",
      "Decorated elephants procession",
      "Cultural music ensembles",
      "Religious ceremonies"
    ],
    organizer: {
      name: "Kandy Cultural Department",
      rating: 4.8,
      events: 24
    }
  },
  {
    id: 2,
    title: "Surfing Weekend",
    date: "Jun 15-17, 2025",
    location: "Arugam Bay",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Adventure",
    price: "From LKR 8,000",
    description: "Join us for an unforgettable surfing weekend at Arugam Bay, one of the top surfing destinations in Sri Lanka. This event includes surf lessons, equipment rental, and beach parties.",
    organizerId: 2,
    status: "approved",
    ticketTypes: [
      { name: "Basic Package", price: 8000, available: 30 },
      { name: "Premium Package", price: 15000, available: 10 }
    ]
  },
  {
    id: 3,
    title: "Traditional Cooking Class",
    date: "May 25, 2025",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3JpJTIwbGFua2ElMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    category: "Culinary",
    price: "From LKR 2,500",
    description: "Learn how to cook traditional Sri Lankan cuisine from expert local chefs. Take home recipes and skills to recreate authentic flavors.",
    organizerId: 1,
    status: "approved",
    ticketTypes: [
      { name: "Cooking Class", price: 2500, available: 15 }
    ]
  },
  {
    id: 4,
    title: "Tea Plantation Tour",
    date: "Jun 5, 2025",
    location: "Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1576826244583-37e71b99fe8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYSUyMHBsYW50YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Cultural",
    price: "From LKR 4,000",
    description: "Explore the lush tea plantations of Nuwara Eliya, learn about the tea-making process, and taste some of the world's finest Ceylon tea varieties.",
    organizerId: 3,
    status: "approved",
    ticketTypes: [
      { name: "Standard Tour", price: 4000, available: 40 },
      { name: "Premium Tour with Tea Tasting", price: 6500, available: 20 }
    ]
  },
  {
    id: 5,
    title: "Colombo Music Festival",
    date: "Jul 15-16, 2025",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Music",
    price: "From LKR 6,500",
    description: "The biggest music festival in Sri Lanka featuring local and international artists performing across multiple stages in the heart of Colombo.",
    organizerId: 2,
    status: "approved",
    ticketTypes: [
      { name: "1-Day Pass", price: 6500, available: 500 },
      { name: "2-Day Pass", price: 10000, available: 300 },
      { name: "VIP 2-Day Pass", price: 18000, available: 50 }
    ]
  },
  {
    id: 6,
    title: "Wildlife Safari Weekend",
    date: "Sep 22-24, 2025",
    location: "Yala National Park",
    image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3JpJTIwbGFua2ElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Adventure",
    price: "From LKR 12,000",
    description: "Experience the diverse wildlife of Sri Lanka with guided safari tours in Yala National Park, home to leopards, elephants, and hundreds of bird species.",
    organizerId: 3,
    status: "approved",
    ticketTypes: [
      { name: "Basic Safari Package", price: 12000, available: 20 },
      { name: "Deluxe Safari Package", price: 20000, available: 10 },
      { name: "Premium Safari Package", price: 35000, available: 5 }
    ]
  }
];

// Sample suggested places
const suggestedPlaces = [
  { name: "Sigiriya Rock Fortress", distance: "2.5 km" },
  { name: "Dambulla Cave Temple", distance: "5 km" },
  { name: "The Lake Hotel", distance: "1 km" },
  { name: "Minneriya National Park", distance: "15 km" }
];

interface TicketSelection {
  type: string;
  price: number;
  quantity: number;
}

const EventPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [ticketSelections, setTicketSelections] = useState<TicketSelection[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const { toast } = useToast();
  
  const handleFilter = (filters) => {
    // In a real app, this would filter based on the provided criteria
    console.log("Filtering with:", filters);
    // Simulate filtering for now
    setFilteredEvents(events);
  };
  
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    // Initialize ticket selections based on available ticket types
    if (event.ticketTypes) {
      setTicketSelections(
        event.ticketTypes.map(type => ({
          type: type.name,
          price: type.price,
          quantity: 0
        }))
      );
    }
    setShowCheckout(true);
  };
  
  const handleTicketChange = (typeName: string, quantity: number) => {
    setTicketSelections(prev => 
      prev.map(ticket => 
        ticket.type === typeName ? {...ticket, quantity} : ticket
      )
    );
  };
  
  const getTotalCost = () => {
    const subtotal = ticketSelections.reduce(
      (sum, ticket) => sum + (ticket.price * ticket.quantity), 0
    );
    const serviceFee = subtotal * 0.05; // 5% service fee
    return {
      subtotal,
      serviceFee,
      total: subtotal + serviceFee
    };
  };
  
  const handleCheckout = () => {
    const { total } = getTotalCost();
    if (total === 0) {
      toast({
        title: "No tickets selected",
        description: "Please select at least one ticket to proceed",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would typically redirect to a payment gateway or process payment
    toast({
      title: "Processing payment",
      description: `Total: LKR ${total.toFixed(2)}`,
    });
    
    // Simulate successful payment
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "Your tickets have been sent to your email",
      });
      setShowCheckout(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Enhanced Hero Banner */}
        <div className="relative">
          <div className="absolute inset-0 bg-black/50 z-0">
            <img 
              src="/lovable-uploads/4d68e596-671d-4536-b657-819dfcce57a8.png" 
              alt="Celebration with champagne and sparklers"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
            <div className="md:w-2/3 lg:w-1/2">
              {/* Event Category Badge */}
              <div className="flex items-center mb-4">
                <span className="bg-[#FF7F2A] text-xs font-semibold px-3 py-1 rounded-full text-white">
                  Events & Experiences
                </span>
                <div className="flex items-center ml-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-white">4.8 (120 reviews)</span>
                </div>
              </div>

              {/* Event Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white font-display">
                Discover Exciting Events in Sri Lanka
              </h1>
              
              {/* Quote */}
              <p className="text-xl md:text-2xl text-white italic mb-8 font-light">
                "Take memories, leave footprints."
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-white">
                  <MapPin className="h-6 w-6 mr-2" />
                  <span>Multiple Locations, Sri Lanka</span>
                </div>
                <div className="flex items-center text-white">
                  <Calendar className="h-6 w-6 mr-2" />
                  <span>Year-round experiences</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#FF5A5F] hover:bg-red-500 px-8 py-6 rounded-lg font-bold text-lg h-auto">
                  Explore Events
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 px-8 py-6 rounded-lg font-bold text-lg transition-colors border border-white/30 h-auto">
                  Share Experiences
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white py-8 -mt-8 rounded-t-3xl relative z-20 shadow-lg">
          <div className="container mx-auto px-4">
            <EventSearch onFilter={handleFilter} />
          </div>
        </div>
        
        {/* Event Cards */}
        <section className="py-12 bg-[#F5F2E9]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-display mb-8 text-center text-[#1A3A63]">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onSelect={() => handleEventSelect(event)} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Event Detail View - Would be shown when an event is selected */}
        {selectedEvent && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title} 
                      className="w-full h-64 object-cover"
                    />
                    
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <Badge className="mb-2 bg-[#FF7F2A] text-white">
                            {selectedEvent.category}
                          </Badge>
                          <h1 className="text-2xl font-bold font-display text-[#1A3A63]">
                            {selectedEvent.title}
                          </h1>
                        </div>
                        <div className="text-[#FF5A5F] font-bold">
                          {selectedEvent.price}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-[#1A3A63]" />
                          {selectedEvent.date}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-[#1A3A63]" />
                          {selectedEvent.location}
                        </div>
                        {selectedEvent.organizer && (
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-[#1A3A63]" />
                            <span>Organizer: {selectedEvent.organizer.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2 text-[#1A3A63]">About This Event</h2>
                        <p className="text-gray-700">{selectedEvent.description}</p>
                      </div>
                      
                      {selectedEvent.highlights && (
                        <div className="mb-6">
                          <h2 className="text-lg font-semibold mb-2 text-[#1A3A63]">Event Highlights</h2>
                          <ul className="list-disc list-inside text-gray-700">
                            {selectedEvent.highlights.map((highlight, idx) => (
                              <li key={idx}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowCheckout(true)}
                          className="bg-[#FF5A5F] hover:bg-red-500 text-white"
                        >
                          <Ticket className="h-5 w-5 mr-2" />
                          Buy Tickets
                        </Button>
                        <Button variant="outline">
                          Share Event
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reviews Section */}
                  <div className="mt-8">
                    <ReviewSystem 
                      venueId={selectedEvent.id.toString()} 
                      venueName={selectedEvent.title} 
                    />
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  {/* Organizer */}
                  {selectedEvent.organizer && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                      <h2 className="text-lg font-semibold mb-3 text-[#1A3A63]">Event Organizer</h2>
                      <div className="flex items-center mb-3">
                        <div className="bg-[#1A3A63] text-white rounded-full w-12 h-12 flex items-center justify-center mr-3">
                          {selectedEvent.organizer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{selectedEvent.organizer.name}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm text-gray-600 ml-1">{selectedEvent.organizer.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Organizer of {selectedEvent.organizer.events} events
                      </p>
                      <Button variant="outline" className="w-full">
                        Contact Organizer
                      </Button>
                    </div>
                  )}
                  
                  {/* Location */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-[#1A3A63]">Event Location</h2>
                    <div className="bg-gray-200 h-40 mb-3 rounded-md flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-medium">{selectedEvent.location}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      Detailed directions will be provided after booking
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-3 text-[#1A3A63]">Date & Time</h2>
                    <div className="flex items-start mb-3">
                      <Calendar className="h-5 w-5 mr-3 mt-0.5 text-[#1A3A63]" />
                      <div>
                        <p className="font-medium">{selectedEvent.date}</p>
                        <p className="text-sm text-gray-600">Multiple sessions available</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 mt-0.5 text-[#1A3A63]" />
                      <div>
                        <p className="font-medium">Event Duration</p>
                        <p className="text-sm text-gray-600">2-3 hours (typical)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Event Suggestions */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <EventSuggestions events={events.slice(0, 3)} />
          </div>
        </section>
        
        {/* Location Suggestions */}
        <section className="py-12 bg-[#F5F2E9]">
          <div className="container mx-auto px-4">
            <LocationSuggestions places={suggestedPlaces} />
          </div>
        </section>
      </main>
      
      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Event Tickets
            </DialogTitle>
            <DialogDescription>
              {selectedEvent?.title} - {selectedEvent?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedEvent?.ticketTypes?.map((ticket, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{ticket.name}</p>
                  <p className="text-sm text-gray-500">LKR {ticket.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                    onClick={() => {
                      const curr = ticketSelections.find(t => t.type === ticket.name)?.quantity || 0;
                      handleTicketChange(ticket.name, Math.max(0, curr - 1));
                    }}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">
                    {ticketSelections.find(t => t.type === ticket.name)?.quantity || 0}
                  </span>
                  <button 
                    className="w-8 h-8 flex items-center justify-center border rounded-full"
                    onClick={() => {
                      const curr = ticketSelections.find(t => t.type === ticket.name)?.quantity || 0;
                      if (curr < 4) { // Max 4 tickets
                        handleTicketChange(ticket.name, curr + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>LKR {getTotalCost().subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee (5%):</span>
                <span>LKR {getTotalCost().serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t mt-2">
                <span>Total:</span>
                <span>LKR {getTotalCost().total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCheckout(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCheckout} 
              className="bg-[#FF5A5F] hover:bg-red-600"
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default EventPage;
