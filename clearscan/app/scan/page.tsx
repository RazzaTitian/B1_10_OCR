// app/scan/page.tsx
'use client';
import React from 'react';
import { useSelected } from './layout';
import ScanContent from '../../components/ScanContent';

export default function ScanPage() {
  const { selectedId } = useSelected();
  return <ScanContent selectedId={selectedId} />;
}
