'use client';
import React from 'react';

export interface HistoryItem { id: string; title: string }

interface SidebarProps {
  histories: HistoryItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ histories, selectedId, onSelect, isOpen, onToggle }: SidebarProps) {
  return (
    <nav className={`w-64 bg-[rgba(83,0,255,0.5)] shadow-md flex flex-col ${isOpen ? '' : 'hidden md:flex'}`}>
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Scan Histories</h2>
        <button onClick={onToggle} className="text-black hover:text-gray-700 md:hidden">
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      <ul className="flex-1 overflow-auto">
        {histories.map(h => (
          <li key={h.id}>
            <button
              onClick={() => onSelect(h.id)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 text-black ${
                selectedId === h.id ? 'bg-[rgba(255,66,103,0.1)] font-semibold' : ''
              }`}
            >
              {h.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="p-6 border-t">
        <button className="w-full text-black hover:text-gray-800 flex items-center space-x-2">
          <span>My Profile</span>
        </button>
      </div>
    </nav>
  );
}
