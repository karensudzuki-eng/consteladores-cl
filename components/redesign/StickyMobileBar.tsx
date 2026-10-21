"use client";

import React from "react";

interface StickyMobileBarProps {
  onBookClick: () => void;
}

export function StickyMobileBar({ onBookClick }: StickyMobileBarProps) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-cream-300 shadow-lg flex items-center justify-between gap-3">
      <div>
        <span className="block text-[10px] uppercase font-bold text-charcoal-400">
          Reserva hoy con el 20%
        </span>
        <span className="text-sm font-bold text-forest-700">
          Desde $9.000 CLP
        </span>
      </div>

      <button
        onClick={onBookClick}
        className="px-5 py-2.5 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-xs shadow-md transition-all focus-visible:ring-2 focus-visible:ring-forest-700"
      >
        Reservar sesión
      </button>
    </div>
  );
}
