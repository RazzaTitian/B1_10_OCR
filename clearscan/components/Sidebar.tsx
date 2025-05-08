"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onToggle: () => void;
}

const DRAWER_WIDTH = 256;

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  return (
    <motion.div
      initial={{ x: -DRAWER_WIDTH }}
      animate={{ x: 0 }}
      exit={{ x: -DRAWER_WIDTH }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ width: DRAWER_WIDTH, overflow: 'hidden', height: '100%' }}
      className="absolute left-0 top-0 bottom-0 z-40 flex flex-col bg-white shadow-lg"
    >
      <aside className="w-full flex flex-col h-full">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-purple-600">ClearScan</h2>
          <motion.button
            layoutId="toggle-icon"
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Close sidebar"
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
        </div>
        {/* Other sidebar content omitted for brevity */}
        <nav className="flex-1 px-6 text-gray-700 overflow-y-auto">
          <div className="uppercase text-xs font-semibold mb-2 text-gray-500">Today</div>
          {/* ...list items... */}
        </nav>
      </aside>
    </motion.div>
  );
};

export default Sidebar;