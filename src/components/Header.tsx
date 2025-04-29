import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Eventuraa
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="text-gray-600 hover:text-gray-800">
                Events
              </Link>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Hotels
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Medical
              </a>
            </li>
            <li>
              <Button variant="outline">Sign In</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
