"use client";

import React from "react";

interface WatercolorStickyMobileBarProps {
  onBookClick: () => void;
}

export function WatercolorStickyMobileBar({ onBookClick }: WatercolorStickyMobileBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FBF7F2]/95 backdrop-blur-md border-t border-[#E7DECE] px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        <span className="text-[11px] text-[#8A7E73] uppercase tracking-wider font-medium">
          Abono de reserva (20%)
        </span>
        <span className="text-lg font-serif font-bold text-[#27221F]">
          Desde $9.000 <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
        </span>
      </div>

      <button
        onClick={onBookClick}
        type="button"
        className="px-5 py-2.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm active:scale-95 transition-all"
      >
        Reservar hora
      </button>
    </div>
  );
}
