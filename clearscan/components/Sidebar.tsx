'use client';
import React from 'react';
import { useScan } from '../app/scan/ScanContext';

export default function Sidebar() {
  const { histories, selectedId, setSelectedId } = useScan();

  return (
    <nav className="w-64 bg-[rgba(83,0,255,0.5)] shadow-md flex flex-col">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Scan Histories</h2>
      </div>

      <ul className="flex-1 overflow-auto">
        {histories.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => setSelectedId(h.id)}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 text-black ${
                selectedId === h.id ? 'bg-[rgba(255,66,103,0.1)] font-semibold' : ''
              }`}
            >
              <div className="flex justify-between">
                <span>{h.title}</span>
                {selectedId !== h.id && (
                  <span className="text-gray-500 italic text-sm">
                    {h.preview}
                  </span>
                )}
              </div>
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