
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: string;
  description?: string;
}

interface EventCardProps {
  event: Event;
  onSelect: () => void;
}

const EventCard = ({ event, onSelect }: EventCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-[#FFA500] hover:bg-orange-600 text-white z-20">
          {event.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display font-bold">{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {event.location}
        </div>
        {event.description && (
          <CardDescription className="line-clamp-2 text-sm text-gray-500">
            {event.description}
          </CardDescription>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="font-semibold text-[#1E90FF]">{event.price}</div>
        <Button 
          onClick={onSelect}
          className="bg-[#1E90FF] hover:bg-blue-600 text-white"
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
