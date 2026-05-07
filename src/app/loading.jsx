"use client";

import { GraduationCap } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className="w-24 h-24 border-8 border-pal-navy/5 border-t-pal-blue rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <GraduationCap className="h-8 w-8 text-pal-navy animate-pulse" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-black text-pal-navy uppercase tracking-tighter">Synchronizing Node</h2>
        <p className="text-[10px] font-bold text-pal-teal uppercase tracking-[0.3em] mt-2 animate-pulse">Establishing Signal Protocol...</p>
      </div>

      {/* Brutalist loading bar using standard animate-pulse for safety */}
      <div className="mt-12 w-64 h-4 bg-pal-navy/5 border-2 border-pal-navy rounded-full overflow-hidden p-1">
        <div className="h-full bg-pal-blue rounded-full animate-[pulse_1.5s_infinite]" style={{ width: '40%' }} />
      </div>
    </div>
  );
}
