"use client";

import React from "react";

interface MercuryStickyMobileBarProps {
  onBookClick: () => void;
}

export function MercuryStickyMobileBar({ onBookClick }: MercuryStickyMobileBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#171721]/95 backdrop-blur-md border-t border-[#70707d]/20 flex items-center justify-between gap-3">
      <div>
        <span className="block text-[10px] uppercase font-[480] tracking-[0.015em] text-[#c3c3cc]">
          Reserva hoy (20%)
        </span>
        <span className="text-sm font-[480] text-[#ededf3]">
          Desde $9.000 CLP
        </span>
      </div>

      <button
        onClick={onBookClick}
        className="px-6 py-2.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-xs shadow-none transition-all"
      >
        Reservar sesión
      </button>
    </div>
  );
}
