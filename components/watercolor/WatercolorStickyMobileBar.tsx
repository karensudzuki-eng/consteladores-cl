"use client";

import React from "react";
import { useCMS } from "@/lib/cms/CMSContext";

interface WatercolorStickyMobileBarProps {
  onBookClick: () => void;
}

export function WatercolorStickyMobileBar({ onBookClick }: WatercolorStickyMobileBarProps) {
  const { content } = useCMS();
  const price = content.settings.servicePrice || "$45.000";

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FBF7F2]/95 backdrop-blur-md border-t border-[#E7DECE] px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        <span className="text-[11px] text-[#8A7E73] uppercase tracking-wider font-medium">
          Sesión individual online
        </span>
        <span className="text-sm font-serif font-bold text-[#27221F]">
          {price} CLP
        </span>
      </div>

      <button
        onClick={onBookClick}
        type="button"
        className="px-6 py-2.5 text-xs font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
      >
        Reservar sesión
      </button>
    </div>
  );
}
