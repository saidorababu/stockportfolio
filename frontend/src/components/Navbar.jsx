import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

import { 
  HomeIcon, 
  ChartBarIcon, 
  GlobeAltIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">StockFolio</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900">
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              <Link to="/explore" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                <GlobeAltIcon className="h-5 w-5 mr-1" />
                Explore
              </Link>
              {user && (
                <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  <ChartBarIcon className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <Link to="/profile">
                      <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-gray-500" />
                    </Link>
                    <span className="text-sm text-gray-700">{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
