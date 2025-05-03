
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Plus, Search, MoreVertical, Edit, Trash, BarChart, Eye } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const EventsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Colombo Music Festival",
      date: "May 15, 2025",
      location: "Viharamahadevi Park, Colombo",
      status: "upcoming",
      ticketsSold: 450,
      totalTickets: 500,
      published: true
    },
    {
      id: 2,
      title: "Beach Volleyball Tournament",
      date: "Jun 22, 2025",
      location: "Negombo Beach",
      status: "upcoming",
      ticketsSold: 120,
      totalTickets: 300,
      published: true
    },
    {
      id: 3,
      title: "Cultural Dance Show",
      date: "Apr 10, 2025",
      location: "Nelum Pokuna Theatre, Colombo",
      status: "completed",
      ticketsSold: 285,
      totalTickets: 350,
      published: true
    },
    {
      id: 4,
      title: "Tech Conference 2025",
      date: "Jul 5, 2025",
      location: "BMICH, Colombo",
      status: "draft",
      ticketsSold: 0,
      totalTickets: 200,
      published: false
    },
  ];
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string, published: boolean) => {
    if (!published) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>;
    }
    
    switch(status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const handleDelete = (eventId: number, eventTitle: string) => {
    // In a real app, this would send a request to delete the event
    toast.success(`Event "${eventTitle}" has been deleted`);
    // Then you would refresh the events list
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>
          <p className="text-gray-600">Manage your events and ticket sales</p>
        </div>
        <Link to="/organizer-portal/events/new">
          <Button className="bg-[#7E69AB] hover:bg-[#6E59A5]">
            <Plus size={16} className="mr-2" />
            Create Event
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Filter by Date
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ticket Sales</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No events found. Create your first event!
                </TableCell>
              </TableRow>
            ) : (
              filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{getStatusBadge(event.status, event.published)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-[#7E69AB] h-2 rounded-full" 
                          style={{ width: `${Math.round((event.ticketsSold / event.totalTickets) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {event.ticketsSold}/{event.totalTickets}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/organizer-portal/events/${event.id}`} className="cursor-pointer flex items-center">
                            <Edit size={16} className="mr-2" /> Edit Event
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/events/${event.id}`} className="cursor-pointer flex items-center">
                            <Eye size={16} className="mr-2" /> Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/organizer-portal/analytics?event=${event.id}`} className="cursor-pointer flex items-center">
                            <BarChart size={16} className="mr-2" /> View Sales
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                          onClick={() => handleDelete(event.id, event.title)}
                        >
                          <Trash size={16} className="mr-2" /> Delete Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventsList;
