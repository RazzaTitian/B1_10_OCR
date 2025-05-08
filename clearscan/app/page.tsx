"use client";
import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LayoutGroup>
      <div className="relative h-screen flex bg-gray-50">
        {/* Closed Sidebar */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              layoutId="toggle-icon"
              onClick={() => setIsOpen(true)}
              className="absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow hover:bg-gray-100"
              aria-label="Open sidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-purple-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2 0h4v4H5V7zm6 0h8v4h-8V7z"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="sidebar-drawer"
              className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg flex flex-col z-40"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Icon in Sidebar */}
              <motion.button
                layoutId="toggle-icon"
                onClick={() => setIsOpen(false)}
                className="mt-4 ml-4 p-2 bg-white rounded-md hover:bg-gray-100"
                aria-label="Close sidebar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-purple-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2 0h4v4H5V7zm6 0h8v4h-8V7z"
                  />
                </svg>
              </motion.button>

              {/* Sidebar contents */}
              <Sidebar onToggle={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main contents */}
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
    </LayoutGroup>
  );
};

export default HomePage;