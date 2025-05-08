// app/scan/layout.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Sidebar, { HistoryItem } from '../../components/Sidebar';

interface SelectedContextType {
  selectedId: string;
  setSelectedId: (id: string) => void;
}
const SelectedContext = createContext<SelectedContextType>(null!);
export const useSelected = () => useContext(SelectedContext);

export default function ScanLayout({ children }: { children: ReactNode }) {
  const histories: HistoryItem[] = [
    { id: 'H1', title: 'History 1' },
    { id: 'H2', title: 'History 2' },
  ];
  const [selectedId, setSelectedId] = useState(histories[0].id);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SelectedContext.Provider value={{ selectedId, setSelectedId }}>
      <div className="h-screen flex bg-gray-50">
        {/* Only one Sidebar, wired up correctly */}
        <Sidebar
          histories={histories}
          selectedId={selectedId}
          onSelect={setSelectedId}
          isOpen={isOpen}
          onToggle={() => setIsOpen(o => !o)}
        />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </SelectedContext.Provider>
  );
}
