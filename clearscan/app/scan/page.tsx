"use client";
import React from "react";
import { useScan } from "./ScanContext";
import ScanContent from "../../components/ScanContent";

export default function ScanPage() {
  const { selectedId } = useScan();
  return <ScanContent selectedId={selectedId ?? ""} />;
}
