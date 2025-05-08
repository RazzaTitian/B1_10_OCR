'use client';
import React from 'react';
interface ScanContentProps { selectedId: string; }
const dummyResults: Record<string, string> = {
  H1: 'Detected text from History 1: “Hello”',
  H2: 'Detected text from History 2: “Goodbye”',
};
export default function ScanContent({ selectedId }: ScanContentProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-black">Result for {selectedId}</h3>
      <p className="text-black">{dummyResults[selectedId] || 'No result found.'}</p>
    </div>
  );
}