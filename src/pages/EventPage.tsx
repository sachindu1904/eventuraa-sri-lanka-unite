
import React, { useState } from 'react';
import { Calendar, MapPin, Music, Search } from 'lucide-react';
import EventSearch from '@/components/EventSearch';
import EventCard from '@/components/EventCard';
import EventSuggestions from '@/components/EventSuggestions';
import LocationSuggestions from '@/components/LocationSuggestions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample event data
const events = [
  {
    id: 1,
    title: "Kandy Esala Perahera",
    date: "Aug 10-20, 2025",
    location: "Kandy",
    image: "https://images.unsplash.com/photo-1625140574538-40bc923f0112?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3JpJTIwbGFua2ElMjBwZXJhaGVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Cultural",
    price: "LKR 3,500",
    description: "The Kandy Esala Perahera is one of the oldest and grandest of all Buddhist festivals in Sri Lanka, featuring dancers, jugglers, musicians, fire-breathers, and lavishly decorated elephants."
  },
  {
    id: 2,
    title: "Surfing Weekend",
    date: "Jun 15-17, 2025",
    location: "Arugam Bay",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Adventure",
    price: "LKR 8,000",
    description: "Join us for an unforgettable surfing weekend at Arugam Bay, one of the top surfing destinations in Sri Lanka. This event includes surf lessons, equipment rental, and beach parties."
  },
  {
    id: 3,
    title: "Traditional Cooking Class",
    date: "May 25, 2025",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3JpJTIwbGFua2ElMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    category: "Culinary",
    price: "LKR 2,500",
    description: "Learn how to cook traditional Sri Lankan cuisine from expert local chefs. Take home recipes and skills to recreate authentic flavors."
  },
  {
    id: 4,
    title: "Tea Plantation Tour",
    date: "Jun 5, 2025",
    location: "Nuwara Eliya",
    image: "https://images.unsplash.com/photo-1576826244583-37e71b99fe8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYSUyMHBsYW50YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Cultural",
    price: "LKR 4,000",
    description: "Explore the lush tea plantations of Nuwara Eliya, learn about the tea-making process, and taste some of the world's finest Ceylon tea varieties."
  },
  {
    id: 5,
    title: "Colombo Music Festival",
    date: "Jul 15-16, 2025",
    location: "Colombo",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBmZXN0aXZhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Music",
    price: "LKR 6,500",
    description: "The biggest music festival in Sri Lanka featuring local and international artists performing across multiple stages in the heart of Colombo."
  },
  {
    id: 6,
    title: "Wildlife Safari Weekend",
    date: "Sep 22-24, 2025",
    location: "Yala National Park",
    image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3JpJTIwbGFua2ElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    category: "Adventure",
    price: "LKR 12,000",
    description: "Experience the diverse wildlife of Sri Lanka with guided safari tours in Yala National Park, home to leopards, elephants, and hundreds of bird species."
  }
];

// Sample suggested places
const suggestedPlaces = [
  { name: "Sigiriya Rock Fortress", distance: "2.5 km" },
  { name: "Dambulla Cave Temple", distance: "5 km" },
  { name: "The Lake Hotel", distance: "1 km" },
  { name: "Minneriya National Park", distance: "15 km" }
];

const EventPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const handleFilter = (filters) => {
    // In a real app, this would filter based on the provided criteria
    console.log("Filtering with:", filters);
    // Simulate filtering for now
    setFilteredEvents(events);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-64 bg-gradient-to-r from-[#1E90FF] to-[#FFA500] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-white font-display">Discover Exciting Events</h1>
            <p className="text-white text-xl mt-2">Find and book the best experiences in Sri Lanka</p>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white py-8 -mt-8 rounded-t-3xl relative z-20 shadow-lg">
          <div className="container mx-auto px-4">
            <EventSearch onFilter={handleFilter} />
          </div>
        </div>
        
        {/* Event Cards */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-display mb-8 text-center">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onSelect={() => setSelectedEvent(event)} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Event Suggestions */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <EventSuggestions events={events.slice(0, 3)} />
          </div>
        </section>
        
        {/* Location Suggestions */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <LocationSuggestions places={suggestedPlaces} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventPage;
