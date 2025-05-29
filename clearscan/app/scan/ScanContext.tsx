"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRoutes } from "../API/routes";
import { useAuth } from "../hooks/useAuth";

interface ScanHistory {
  _id: string;
  userId: string;
  photoUrl: string;
  extractedText: string;
  audioUrl: string;
  date: string;
}

interface ScanContextType {
  histories: ScanHistory[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  refreshHistories: () => Promise<void>;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export function ScanProvider({ children }: { children: React.ReactNode }) {
  const [histories, setHistories] = useState<ScanHistory[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { userId } = useAuth(); // Assuming useAuth provides userId
  const fetchHistories = async () => {
    if (!userId) return;
    try {
      const res = await fetch(apiRoutes.history.getbyid(userId));
      const data = await res.json();
      setHistories(data);
      if (data.length > 0) {
        setSelectedId(data[0]._id);
      }
    } catch (err) {
      console.error("Failed to fetch scan histories:", err);
    }
  };
  useEffect(() => {
    fetchHistories();
  }, [userId]);
  return (
    <ScanContext.Provider 
      value={{ 
        histories, 
        selectedId, 
        setSelectedId,
        refreshHistories: fetchHistories 
      }}
    >
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const context = useContext(ScanContext);
  if (context === undefined) {
    throw new Error("useScan must be used within a ScanProvider");
  }
  return context;
}
