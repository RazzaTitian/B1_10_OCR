'use client';
import React, { ReactNode } from 'react';
import { ScanProvider } from './ScanContext';
import Sidebar from '../../components/Sidebar';

export default function ScanLayout({ children }: { children: ReactNode }) {
  return (
    <ScanProvider>
      <div className="h-screen flex bg-gray-50">
        <Sidebar />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </ScanProvider>
  );
}
