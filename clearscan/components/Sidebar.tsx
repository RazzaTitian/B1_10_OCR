"use client";
import React from "react";
import { useScan } from "../app/scan/ScanContext";
import { Plus, X } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { histories, selectedId, setSelectedId } = useScan();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleNewScan = () => {
    setSelectedId(null);
    onClose?.();
  };

  return (
    <nav className="w-64 bg-[rgba(83,0,255,0.5)] shadow-md flex flex-col h-screen">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Scan Histories</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewScan}
            className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-200 active:scale-95"
            title="New Scan"
          >
            <Plus size={20} strokeWidth={2} />
          </button>
          
          {/* Close button - only show on mobile */}
          <button
            onClick={onClose}
            className="md:hidden w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <ul className="flex-1 overflow-auto">
        {histories.map((scan) => (
          <li key={scan._id}>
            <button
              onClick={() => {
                setSelectedId(scan._id);
                onClose?.();
              }}
              className={`w-full text-left px-6 py-3 hover:bg-gray-100 text-black ${
                selectedId === scan._id
                  ? "bg-[rgba(255,66,103,0.1)] font-semibold"
                  : ""
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {formatDate(scan.date)}
                </span>
                <p className="text-sm md:text-gray-700 text-gray-400 mt-1 line-clamp-2">
                  {scan.extractedText || "No text extracted"}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}