'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';

export interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  fullText: string;
}

interface ScanContextType {
  histories: HistoryItem[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  pushHistory: (item: HistoryItem) => void;
}

const ScanContext = createContext<ScanContextType>(null!);

export function useScan() {
  return useContext(ScanContext);
}

export function ScanProvider({ children }: { children: ReactNode }) {
  const [histories, setHistories] = useState<HistoryItem[]>([
    { id: 'H1', title: 'History 1', preview: 'Hello…', fullText: 'Hello' },
    { id: 'H2', title: 'History 2', preview: 'Goodbye…', fullText: 'Goodbye' },
  ]);
  const [selectedId, setSelectedId] = useState(histories[0].id);

  const pushHistory = (item: HistoryItem) => {
    setHistories((old) => [item, ...old]);
    setSelectedId(item.id);
  };

  return (
    <ScanContext.Provider
      value={{ histories, selectedId, setSelectedId, pushHistory }}
    >
      {children}
    </ScanContext.Provider>
  );
}
