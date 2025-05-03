
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OrganizerSidebar from '@/components/organizer/OrganizerSidebar';
import OrganizerDashboard from '@/components/organizer/OrganizerDashboard';
import EventsList from '@/components/organizer/EventsList';
import CreateEvent from '@/components/organizer/CreateEvent';
import EditEvent from '@/components/organizer/EditEvent';
import SalesAnalytics from '@/components/organizer/SalesAnalytics';

const OrganizerPortal: React.FC = () => {
  // In a real app, we would check authentication here
  const organizerData = {
    name: "Shantha Perera",
    company: "Lanka Events Ltd",
    email: "shantha@lankaevents.lk",
    phone: "+94 76 123 4567",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    memberSince: "2022"
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OrganizerSidebar organizer={organizerData} />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<OrganizerDashboard organizer={organizerData} />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/new" element={<CreateEvent />} />
            <Route path="/events/:id" element={<EditEvent />} />
            <Route path="/analytics" element={<SalesAnalytics />} />
            <Route path="*" element={<Navigate to="/organizer-portal" />} />
          </Routes>
        </div>
        
        <footer className="py-6 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eventuraa.lk - Event Organizer Portal
        </footer>
      </div>
    </div>
  );
};

export default OrganizerPortal;
