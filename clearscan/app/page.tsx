"use client";
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar with dynamic width */}
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(prev => !prev)} />

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-md">
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            {/* Placeholder for scan preview */}
          </div>
        </div>
        <button className="mt-8 w-16 h-16 bg-white border-4 border-purple-400 rounded-full shadow-inner flex items-center justify-center">
          <div className="w-10 h-10 bg-purple-500 rounded-full" />
        </button>
      </main>
    </div>
  );
};

export default HomePage;
