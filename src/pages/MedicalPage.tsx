
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, MapPin, Star, ThermometerSun, Phone, Hospital, Search, ShieldCheck, Info, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MedicalPage = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState('Colombo');
  const [specialization, setSpecialization] = useState('');
  const [availableToday, setAvailableToday] = useState(false);
  
  const detectLocation = () => {
    toast({
      title: "Detecting your location...",
      description: "Please allow location access if prompted",
    });
    
    // Mock location detection
    setTimeout(() => {
      setLocation('Colombo');
      toast({
        title: "Location detected",
        description: "Your location has been set to Colombo",
      });
    }, 1500);
  };

  const handleEmergencyCall = () => {
    // In a real app, this would connect to an emergency service
    toast({
      title: "Connecting to emergency services",
      description: "Please stand by...",
      variant: "destructive",
    });
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/dcfedfbc-2e9f-48f3-a0ae-3dc9746486c2.png" 
            alt="Medical professionals" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-6">
            24/7 Medical Support for Tourists
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl">
            Book online consultations or doctor visits to your hotel. Our network of certified medical 
            professionals is ready to help you anytime, anywhere in Sri Lanka.
          </p>
          
          <Button 
            onClick={handleEmergencyCall}
            className="emergency-btn text-lg animate-pulse-gentle"
            size="lg"
          >
            🚑 Emergency Help (Click Here)
          </Button>
        </div>
      </section>
      
      {/* Search & Filter Bar */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location" className="mb-2 block">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  id="location" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs"
                  onClick={detectLocation}
                >
                  Detect
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="specialization" className="mb-2 block">Specialization</Label>
              <select 
                id="specialization" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              >
                <option value="">All Specializations</option>
                <option value="general">General Physician</option>
                <option value="travel">Travel Vaccinations</option>
                <option value="food">Food Poisoning</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="flex items-center space-x-2 mr-4">
                <input 
                  type="checkbox" 
                  id="available-today"
                  className="h-5 w-5" 
                  checked={availableToday}
                  onChange={(e) => setAvailableToday(e.target.checked)}
                />
                <label htmlFor="available-today" className="text-gray-700">Available Today</label>
              </div>
              
              <Button className="ml-auto bg-eventuraa-blue">
                <Search className="mr-2 h-4 w-4" /> Search Doctors
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Section */}
      <section className="py-8 bg-red-50">
        <div className="container-custom">
          <div className="bg-white border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 flex items-center">
              <Hospital className="mr-2" /> Need immediate help?
            </h2>
            <p className="text-gray-700 mb-4">
              If you're experiencing a medical emergency, don't wait. Contact emergency services immediately.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="mr-2 h-4 w-4" /> Call Nearest Hospital
              </Button>
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                <MapPin className="mr-2 h-4 w-4" /> Find Emergency Clinics
              </Button>
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-4">First Aid Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Collapsible className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50">
                <div className="flex items-center">
                  <ThermometerSun className="mr-2 text-red-500" />
                  <span>Treating Sunburn</span>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Common Issue</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white border-t">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Get out of the sun and cool the skin with a cold compress.</li>
                  <li>Apply aloe vera gel or moisturizer to soothe the skin.</li>
                  <li>Drink plenty of water to prevent dehydration.</li>
                  <li>Take over-the-counter pain relievers if needed.</li>
                  <li>Seek medical attention if you have severe blistering or fever.</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50">
                <div className="flex items-center">
                  <ThermometerSun className="mr-2 text-red-500" />
                  <span>Dehydration Symptoms</span>
                </div>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white border-t">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Extreme thirst</li>
                  <li>Dry mouth and tongue</li>
                  <li>Little or no urination</li>
                  <li>Headache, dizziness or lightheadedness</li>
                  <li>Fatigue</li>
                  <li>Dark colored urine</li>
                </ul>
                <p className="mt-4 text-red-600 font-bold">
                  Seek immediate medical attention if experiencing severe symptoms!
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>
      
      {/* Doctor Cards Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Available Doctors</h2>
          <p className="section-subtitle">
            Find and book appointments with qualified medical professionals
          </p>
          
          <div className="space-y-6">
            {/* Doctor Card 1 */}
            <DoctorCard 
              name="Dr. Anusha Perera"
              rating={4.8}
              specialization="Travel Medicine Specialist"
              languages={["English", "Sinhala", "Tamil"]}
              tags={["Speaks English", "Hotel Visits", "Accepts PayPal"]}
              proximity="3km from your location (Colombo Fort)"
              nextSlot="Today 4:30 PM"
              fee="LKR 3,500 ($12)"
              verified={true}
            />
            
            {/* Doctor Card 2 */}
            <DoctorCard 
              name="Dr. Rajiv Kumar"
              rating={4.6}
              specialization="General Physician"
              languages={["English", "Sinhala"]}
              tags={["Speaks English", "Video Consultation", "24/7 Available"]}
              proximity="5km from your location (Colombo Fort)"
              nextSlot="Today 6:00 PM"
              fee="LKR 4,000 ($14)"
              verified={true}
            />
            
            {/* Doctor Card 3 */}
            <DoctorCard 
              name="Dr. Sarah Fernando"
              rating={4.9}
              specialization="Dermatologist"
              languages={["English", "Sinhala"]}
              tags={["Speaks English", "Hotel Visits", "Skin Specialist"]}
              proximity="7km from your location (Colombo Fort)"
              nextSlot="Tomorrow 10:00 AM"
              fee="LKR 5,000 ($17)"
              verified={true}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="section-title">What Tourists Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <TestimonialCard 
              quote="Dr. Raj saved our vacation when my child had fever!" 
              author="Mark (UK Tourist)"
              rating={5}
            />
            <TestimonialCard 
              quote="Fast response and the doctor spoke perfect English. Very helpful!" 
              author="Sarah (Australian Tourist)"
              rating={5}
            />
            <TestimonialCard 
              quote="The hotel visit option was incredibly convenient during my stay." 
              author="Jamie (US Tourist)"
              rating={4}
            />
          </div>
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <ShieldCheck className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-gray-700">All consultations encrypted</span>
            </div>
            <div className="flex items-center">
              <Check className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-gray-700">Govt. registered doctors</span>
            </div>
            <div className="flex items-center">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-700">24/7 Support Available</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-700">Same-day appointments</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

// Doctor Card Component
const DoctorCard = ({ 
  name, 
  rating, 
  specialization, 
  languages, 
  tags, 
  proximity, 
  nextSlot, 
  fee, 
  verified 
}) => {
  const { toast } = useToast();
  
  const handleBookNow = () => {
    toast({
      title: "Booking appointment",
      description: `Booking appointment with ${name}`,
    });
  };
  
  const handleChatFirst = () => {
    toast({
      title: "Opening chat",
      description: `Starting chat with ${name}`,
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg border-gray-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Doctor Photo & Info */}
          <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={40} className="text-gray-600" />
              </div>
              {verified && (
                <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                  <Check size={12} />
                </div>
              )}
            </div>
            <div className="text-center">
              {verified && (
                <div className="text-xs flex items-center justify-center mb-2 text-green-700">
                  <Check size={12} className="mr-1" />
                  <span>Govt. Certified</span>
                </div>
              )}
              <div className="flex justify-center space-x-1 mb-2">
                {languages.map((lang, i) => (
                  <span key={i} className="px-1 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle - Doctor Details */}
          <div className="w-full md:w-1/2 p-4">
            <div className="flex items-center mb-1">
              <h3 className="text-xl font-bold mr-2">{name}</h3>
              <div className="flex items-center text-yellow-500">
                <Star size={16} className="fill-current" />
                <span className="text-sm text-gray-700 ml-1">{rating}</span>
              </div>
            </div>
            <p className="text-blue-600 font-medium mb-2">{specialization}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin size={14} className="mr-1" />
              {proximity}
            </p>
          </div>
          
          {/* Right Side - Booking */}
          <div className="w-full md:w-1/4 bg-gray-50 p-4 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">Next available:</p>
              <p className="font-medium text-green-600 mb-3">{nextSlot}</p>
              <p className="text-lg font-bold">{fee}</p>
            </div>
            <div className="space-y-2 mt-4">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={handleBookNow}
              >
                Book Now
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-blue-600 border-blue-600 hover:bg-blue-50" 
                onClick={handleChatFirst}
              >
                Chat First
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, author, rating }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <p className="italic text-gray-700 mb-4">"{quote}"</p>
        <p className="text-sm font-medium text-gray-900">{author}</p>
      </CardContent>
    </Card>
  );
};

export default MedicalPage;
