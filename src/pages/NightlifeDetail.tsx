
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewSystem from '@/components/ReviewSystem';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Instagram, Music, ExternalLink } from "lucide-react";

// Sample data for nightclub venues
const nightclubsData = {
  "on14": {
    name: "ON14 Rooftop Lounge & Nightclub",
    location: "Hilton Colombo",
    description: "One of the most famous nightclubs, offering a rooftop experience with great views of the city. Plays EDM, hip-hop, and Bollywood music.",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    hours: "7:00 PM - 2:00 AM",
    music: "EDM, Hip-Hop, Bollywood",
    social: "@on14colombo",
    dressCode: "Smart casual (no shorts or flip-flops)",
    entryFee: "1,500-3,000 LKR",
    tips: ["Call ahead for reservations", "Best to arrive before 11 PM to avoid queues", "Check their Instagram for special events"],
    reviews: [
      {
        id: 1,
        name: "Alex T.",
        rating: 5,
        comment: "Amazing views of Colombo at night! Great music and crowd.",
        date: "2024-04-15",
        venue: "ON14 Rooftop Lounge & Nightclub"
      },
      {
        id: 2,
        name: "Sarah L.",
        rating: 4,
        comment: "Good vibes and decent cocktails, but a bit pricey.",
        date: "2024-04-02",
        venue: "ON14 Rooftop Lounge & Nightclub"
      }
    ]
  },
  "sinclair": {
    name: "Sinclair's",
    location: "Colombo 3",
    description: "A stylish lounge and nightclub with a mix of live music and DJs. Popular among expats and locals.",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    hours: "8:00 PM - 3:00 AM",
    music: "House, R&B, Pop Hits",
    social: "@sinclairscolombo",
    dressCode: "Smart casual",
    entryFee: "1,000-2,000 LKR",
    tips: ["Weekends get very crowded", "Great place to meet both locals and tourists", "Famous for their signature cocktails"],
    reviews: [
      {
        id: 1,
        name: "Michael R.",
        rating: 5,
        comment: "Best club in Colombo! Great mix of music and friendly staff.",
        date: "2024-03-25",
        venue: "Sinclair's"
      }
    ]
  },
  "inthemoment": {
    name: "In The Moment (ITM)",
    location: "Various venues across Sri Lanka",
    description: "Known for high-energy beach parties and club events with top DJs. Popular venues include Sass Ultra Lounge (Colombo), RK Beach (Hikkaduwa), and The Bay 5 (Mount Lavinia).",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    hours: "Event-based",
    music: "EDM, House, Techno",
    social: "@inthemoment.lk",
    dressCode: "Beach casual to smart casual depending on venue",
    entryFee: "2,000-5,000 LKR",
    tips: ["Follow their Instagram for event announcements", "Pre-book tickets for popular events", "Beach parties are usually during December-April"],
    reviews: [
      {
        id: 1,
        name: "Priya M.",
        rating: 5,
        comment: "Their beach parties are legendary! Great international DJs and amazing production.",
        date: "2024-02-20",
        venue: "In The Moment (ITM)"
      },
      {
        id: 2,
        name: "Tom B.",
        rating: 4,
        comment: "Awesome vibes but drinks can be expensive.",
        date: "2024-01-15",
        venue: "In The Moment (ITM)"
      }
    ]
  },
  "subbeat": {
    name: "Sub Beat",
    location: "Various venues across Sri Lanka",
    description: "Focuses on deep house, techno, and underground music. Hosts events at clubs like Clique, Playtrix, and beach locations.",
    image: "https://images.unsplash.com/photo-1571266752333-31a55580148c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    hours: "Event-based",
    music: "Deep House, Techno, Underground",
    social: "@subbeat.lk",
    dressCode: "Casual to smart casual",
    entryFee: "1,500-3,000 LKR",
    tips: ["Great for electronic music lovers", "Often features underground international artists", "Check their social media for upcoming events"],
    reviews: []
  }
};

const NightlifeDetail = () => {
  const { venueId } = useParams();
  const venue = nightclubsData[venueId] || {
    name: "Venue Not Found",
    location: "",
    description: "Sorry, this venue information is not available.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    hours: "",
    music: "",
    social: "",
    dressCode: "",
    entryFee: "",
    tips: [],
    reviews: []
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-96">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={venue.image} 
            alt={venue.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white max-w-3xl px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-display">{venue.name}</h1>
              <p className="flex items-center justify-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                {venue.location}
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Venue Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 font-display">About {venue.name}</h2>
                <p className="text-gray-700 mb-8">{venue.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-eventuraa-blue/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-eventuraa-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Opening Hours</h3>
                      <p className="text-gray-600">{venue.hours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-eventuraa-purple/10 p-3 rounded-full">
                      <Music className="h-6 w-6 text-eventuraa-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Music Style</h3>
                      <p className="text-gray-600">{venue.music}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Instagram className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Social</h3>
                      <p className="text-gray-600">{venue.social}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Entry Fee</h3>
                      <p className="text-gray-600">{venue.entryFee}</p>
                    </div>
                  </div>
                </div>
                
                {venue.tips.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Tips for Visitors</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {venue.tips.map((tip, idx) => (
                        <li key={idx} className="text-gray-700">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Reviews */}
              <ReviewSystem 
                venueId={venueId}
                venueName={venue.name}
                initialReviews={venue.reviews}
              />
            </div>
            
            <div className="lg:col-span-1">
              {/* Sidebar Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 font-display">Location</h3>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.71372722332!2d79.83149373476564!3d6.916554200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259decde08aa9%3A0x2066a30ffd9f35be!2sHilton%20Colombo!5e0!3m2!1sen!2sus!4v1651978161344!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    className="border-0"
                    allowFullScreen=""
                    loading="lazy"
                    title="Venue location"
                  ></iframe>
                </div>
                <Button className="w-full bg-eventuraa-blue hover:bg-blue-600 mb-4">
                  Get Directions
                </Button>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="text-xl font-bold mb-4 font-display">Dress Code</h3>
                  <p className="text-gray-700 mb-4">{venue.dressCode}</p>
                  
                  <Button className="w-full bg-eventuraa-orange hover:bg-orange-600 flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Official Website
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 font-display">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="font-semibold">Weekend DJ Night</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1 mb-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      May 10, 2024
                    </div>
                    <Button size="sm" variant="outline" className="text-eventuraa-purple border-eventuraa-purple mt-2 hover:bg-eventuraa-purple hover:text-white">
                      Book Now
                    </Button>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="font-semibold">International DJ Guest</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1 mb-1">
                      <Calendar className="h-3.5 w-3.5" /> 
                      May 17, 2024
                    </div>
                    <Button size="sm" variant="outline" className="text-eventuraa-purple border-eventuraa-purple mt-2 hover:bg-eventuraa-purple hover:text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NightlifeDetail;
