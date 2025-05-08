import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => (
  <aside
    className={`flex flex-col bg-white shadow transition-all duration-300 ease-in-out ${
      isOpen ? 'w-64' : 'w-16'
    }`}
  >
    {/* Header */}
    <div className="p-6 flex items-center justify-between">
      {isOpen && <h2 className="text-xl font-bold text-purple-600">ClearScan</h2>}
      <button
        onClick={onToggle}
        className="p-1 rounded-md hover:bg-gray-100"
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2 0h4v4H5V7zm6 0h8v4h-8V7z"
          />
        </svg>
      </button>
    </div>

    {/* New Scan Button */}
    {isOpen && (
      <div className="px-6 mb-6">
        <button
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center space-x-2"
          aria-label="Start new scan"
        >
          <span>New Scan</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17 L17 7 M13 7 L17 7 M17 7 L17 11"
            />
          </svg>
        </button>
      </div>
    )}

    {/* Navigation Lists */}
    {isOpen && (
      <nav className="flex-1 px-6 text-gray-700 overflow-y-auto">
        <div className="uppercase text-xs font-semibold mb-2 text-gray-500">Today</div>
        <ul className="space-y-3 mb-6">
          <li>Shopping List – Milk, Bread, Eggs</li>
          <li>Invoice – $120.00 Due March 15</li>
          <li>Meeting Notes – Agenda Item 1</li>
        </ul>
        <div className="uppercase text-xs font-semibold mb-2 text-gray-500">30 Days Ago</div>
        <ul className="space-y-3">
          <li>Receipt – Purchase Total: $89.50</li>
          <li>Physics Notes – Laws of Motion</li>
          <li>ID Scan – John Doe</li>
        </ul>
      </nav>
    )}

    {/* Footer Profile */}
    {isOpen && (
      <div className="p-6">
        <button
          className="w-full flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          aria-label="My profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A12.072 12.072 0 0112 15c2.52 0 4.847.78 6.879 2.108M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>My Profile</span>
        </button>
      </div>
    )}
  </aside>
);

export default Sidebar;