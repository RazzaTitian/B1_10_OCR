"use client";
import React from "react";
import { useScan } from "../app/scan/ScanContext";
import {Plus} from "lucide-react";

export default function Sidebar() {
  const { histories, selectedId, setSelectedId } = useScan();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <nav className="w-64 bg-[rgba(83,0,255,0.5)] shadow-md flex flex-col">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-black">Scan Histories</h2>
        <button
      onClick={() => setSelectedId(null)}
      className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-200 active:scale-95"
      title="New Scan"
    >
      <Plus size={20} strokeWidth={2} />
    </button>
      </div>

      <ul className="flex-1 overflow-auto">
        {histories.map((scan) => (
          <li key={scan._id}>
            <button
              onClick={() => setSelectedId(scan._id)}
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
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
