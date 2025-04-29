
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-10 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-eventuraa-purple">
                Eventuraa<span className="text-eventuraa-blue">.lk</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#events" className="nav-link">Events</a>
            <a href="#hotels" className="nav-link">Hotels</a>
            <a href="#medical" className="nav-link">Medical</a>
            <a href="#about" className="nav-link">About Us</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button className="bg-eventuraa-purple hover:bg-eventuraa-darkPurple">
              Register
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-eventuraa-purple hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-eventuraa-purple"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
          <a href="#events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-eventuraa-purple hover:bg-gray-100">
            Events
          </a>
          <a href="#hotels" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-eventuraa-purple hover:bg-gray-100">
            Hotels
          </a>
          <a href="#medical" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-eventuraa-purple hover:bg-gray-100">
            Medical
          </a>
          <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-eventuraa-purple hover:bg-gray-100">
            About Us
          </a>
          <div className="pt-4 pb-2 border-t border-gray-200">
            <Button variant="outline" className="w-full mb-2">Sign In</Button>
            <Button className="w-full bg-eventuraa-purple hover:bg-eventuraa-darkPurple">Register</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
