
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, MartiniIcon } from "lucide-react";

const NightlifeCard = ({ 
  name, 
  type, 
  image, 
  location, 
  hours, 
  description
}: {
  name: string;
  type: string;
  image: string;
  location: string;
  hours: string;
  description: string;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-eventuraa-purple text-white px-2 py-1 rounded-md text-xs z-20">
          {type}
        </span>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <div className="flex items-center mb-3 text-xs text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {hours}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-eventuraa-blue hover:bg-blue-600">
          Book a Table
        </Button>
      </CardFooter>
    </Card>
  );
};

const Nightlife = () => {
  const nightlifeVenues = [
    {
      name: "In The Moment",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 03",
      hours: "10:00 PM - 4:00 AM",
      description: "A high-energy nightclub with top DJs, premium drinks, and an electric atmosphere perfect for dancing the night away."
    },
    {
      name: "La Foresta",
      type: "Brunch & Bar",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 07",
      hours: "11:00 AM - 2:00 AM",
      description: "Upscale dining venue that transforms into a vibrant bar in the evenings, featuring live music and craft cocktails."
    },
    {
      name: "Rhythm & Blues",
      type: "Lounge Bar",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Mount Lavinia",
      hours: "7:00 PM - 3:00 AM",
      description: "A sophisticated lounge with beach views, featuring signature cocktails and regular live music performances."
    },
    {
      name: "Silk Colombo",
      type: "Nightclub",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      location: "Colombo 02",
      hours: "9:00 PM - 4:00 AM",
      description: "Premier nightlife destination with international DJs, VIP sections, and a state-of-the-art sound system."
    }
  ];

  return (
    <section id="nightlife" className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container-custom">
        <div className="flex items-center gap-3 justify-center mb-4">
          <MartiniIcon className="h-8 w-8 text-eventuraa-purple" />
          <Music className="h-6 w-6 text-eventuraa-blue" />
        </div>
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Nightlife in Sri Lanka</h2>
          <p className="section-subtitle text-gray-300">
            Experience the vibrant nightlife scene with exclusive clubs, lounges, and dining experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nightlifeVenues.map((venue, index) => (
            <NightlifeCard key={index} {...venue} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
            Explore All Nightlife Venues
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Nightlife;
