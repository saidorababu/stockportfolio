import React from 'react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Spinner */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
