'use client';
import React, { ReactNode, useState } from 'react';
import { ScanProvider } from './ScanContext';
import Sidebar from '../../components/Sidebar';
import { Menu } from 'lucide-react';

export default function ScanLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ScanProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile menu button - hide when sidebar is open */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-purple-600 text-white shadow-lg"
          >
            <Menu size={24} />
          </button>
        )}

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 fixed md:sticky md:top-0 h-screen z-40 transition-transform duration-300 ease-in-out`}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Main Content with conditional padding */}
          <main className={`flex-1 min-h-screen flex items-start justify-center px-4 ${!sidebarOpen ? 'pt-16' : 'pt-6'} md:pt-12`}>
            <div className="w-full md:max-w-xl">
              {children}
            </div>
          </main>

          {/* Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </ScanProvider>
  );
}