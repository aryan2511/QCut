import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Users, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Scissors className="w-8 h-8" />
            <span className="text-xl font-bold">Color Cut n More</span>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-white text-blue-600 font-semibold' 
                  : 'hover:bg-blue-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/dashboard') 
                  ? 'bg-white text-blue-600 font-semibold' 
                  : 'hover:bg-blue-500'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
