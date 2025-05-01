
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelCard from '@/components/hotel/HotelCard';
import HotelFilters from '@/components/hotel/HotelFilters';
import HotelMap from '@/components/hotel/HotelMap';
import { Button } from '@/components/ui/button';

const HotelListPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({});
  
  // Mock hotel data
  const hotels = [
    {
      id: 'hotel1',
      name: 'Colombo Seaside Grand',
      rating: 4.5,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 12500,
      originalPrice: 15000,
      location: 'Colombo',
      nearestEvent: {
        name: 'Colombo Jazz Festival',
        distance: '1.2km'
      },
      amenities: ['Free Cancellation', 'Breakfast Included', 'Beach Access'],
      cancellation: 'Free cancellation until May 20',
      eventProximity: '5-min walk to Colombo Jazz Festival',
      medicalService: '24/7 doctor on call',
      lat: -0.2,
      lng: 0.3
    },
    {
      id: 'hotel2',
      name: 'Kandy Heritage Resort',
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
      ],
      price: 18500,
      location: 'Kandy',
      nearestEvent: {
        name: 'Kandy Perahera',
        distance: '0.5km'
      },
      amenities: ['Free Cancellation', 'Breakfast Included', 'Spa', 'Pool'],
      cancellation: 'Free cancellation until May 15',
      eventProximity: '2-min walk to Kandy Perahera route',
      medicalService: 'In-house medical center',
      lat: 0.5,
      lng: -0.3
    },
    {
      id: 'hotel3',
      name: 'Galle Fort View Hotel',
      rating: 4.6,
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 22000,
      originalPrice: 25000,
      location: 'Galle',
      nearestEvent: {
        name: 'Galle Literary Festival',
        distance: '0.8km'
      },
      amenities: ['Free Wifi', 'Ocean View', 'Breakfast Included'],
      cancellation: 'Free cancellation until May 25',
      eventProximity: '10-min walk to Galle Literary Festival',
      medicalService: 'Doctor on call',
      lat: -0.6,
      lng: -0.4
    },
    {
      id: 'hotel4',
      name: 'Ella Mountain Retreat',
      rating: 4.7,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 15000,
      location: 'Ella',
      nearestEvent: {
        name: 'Ella Adventure Fest',
        distance: '2.5km'
      },
      amenities: ['Mountain View', 'Trekking Tours', 'Breakfast Included'],
      cancellation: 'Non-refundable',
      eventProximity: 'Shuttle service to Ella Adventure Fest',
      medicalService: 'First aid and local clinic arrangements',
      lat: 0.4,
      lng: 0.6
    },
    {
      id: 'hotel5',
      name: 'Negombo Beach Resort',
      rating: 4.3,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 9800,
      originalPrice: 12000,
      location: 'Negombo',
      nearestEvent: {
        name: 'Beach Music Festival',
        distance: '0.2km'
      },
      amenities: ['Beach Access', 'Free Wifi', 'Water Sports'],
      cancellation: 'Free cancellation until May 10',
      eventProximity: 'Beachfront access to Beach Music Festival',
      medicalService: 'Medical clinic within resort',
      lat: -0.4,
      lng: 0.2
    },
    {
      id: 'hotel6',
      name: 'Sigiriya Lion Rock Hotel',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
      ],
      price: 28000,
      location: 'Sigiriya',
      nearestEvent: {
        name: 'Cultural Heritage Festival',
        distance: '3.5km'
      },
      amenities: ['Heritage Tours', 'Pool', 'Spa', 'Cultural Shows'],
      cancellation: 'Free cancellation until June 1',
      eventProximity: 'Complimentary shuttle to Cultural Heritage Festival',
      medicalService: 'In-house ayurvedic center and doctor on call',
      lat: 0.7,
      lng: -0.1
    }
  ];
  
  const mapHotels = hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    lat: hotel.lat,
    lng: hotel.lng,
    price: hotel.price,
    image: hotel.images[0]
  }));

  const handleFilter = (newFilters: any) => {
    console.log('Filters applied:', newFilters);
    setFilters(newFilters);
    // In a real app, would filter the hotels based on these filters
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Stay</h1>
          <p className="text-gray-600 mb-6">
            Discover the best hotels near your favorite events in Sri Lanka
          </p>
          
          <HotelFilters onFilter={handleFilter} showMap={showMap} setShowMap={setShowMap} />
          
          {showMap ? (
            <HotelMap hotels={mapHotels} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {hotels.map(hotel => (
                  <HotelCard key={hotel.id} {...hotel} />
                ))}
              </div>
              
              <div className="flex justify-center mt-8 mb-12">
                <Button variant="outline" className="border-eventuraa-blue text-eventuraa-blue hover:bg-blue-50">
                  Load More Hotels
                </Button>
              </div>
            </>
          )}
          
          {/* Special Offers */}
          <div className="mt-10 mb-16">
            <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded mb-2">Limited Time</span>
                    <h3 className="text-xl font-bold mb-2">Book a Hotel + Sigiriya Festival Tickets</h3>
                    <p className="text-gray-700 mb-4">Get 15% off when you book together with the Cultural Heritage Festival</p>
                    <Button className="bg-eventuraa-blue hover:bg-blue-600">
                      View Package
                    </Button>
                  </div>
                  <div className="bg-blue-500 text-white font-bold px-3 py-2 rounded-full text-xl">
                    -15%
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded mb-2">Weekend Only</span>
                    <h3 className="text-xl font-bold mb-2">Beach Hotels in Mirissa</h3>
                    <p className="text-gray-700 mb-4">Stay for 2 nights, get the 3rd night free near Beach Music Festival</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      View Deal
                    </Button>
                  </div>
                  <div className="bg-orange-500 text-white font-bold px-3 py-2 rounded-full text-xl">
                    3for2
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cultural Compatibility Badges Explanation */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Cultural Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🕌</span>
                  <h3 className="text-xl font-semibold">Muslim-Friendly</h3>
                </div>
                <p className="text-gray-600">Hotels with halal food options, prayer facilities, and alcohol-free dining areas.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">☸️</span>
                  <h3 className="text-xl font-semibold">Buddhist-Friendly</h3>
                </div>
                <p className="text-gray-600">Properties that respect Poya day observances with vegetarian options and quiet zones.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🥗</span>
                  <h3 className="text-xl font-semibold">Vegan/Vegetarian</h3>
                </div>
                <p className="text-gray-600">Accommodations with dedicated plant-based dining options and eco-friendly amenities.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelListPage;
