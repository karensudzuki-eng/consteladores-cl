"use client";

import React from "react";
import { CONFIG } from "@/lib/config";

interface WatercolorStickyMobileBarProps {
  onBookClick: () => void;
}

export function WatercolorStickyMobileBar({ onBookClick }: WatercolorStickyMobileBarProps) {
  const isPricingEnabled = CONFIG.PRICING_ENABLED;
  const buttonLabel = isPricingEnabled ? "Reservar hora" : "Consultar";

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FBF7F2]/95 backdrop-blur-md border-t border-[#E7DECE] px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        <span className="text-[11px] text-[#8A7E73] uppercase tracking-wider font-medium">
          Acompañamiento sistémico
        </span>
        <span className="text-sm font-serif font-bold text-[#27221F]">
          {isPricingEnabled ? "Desde $45.000 CLP" : "Valor: por definir"}
        </span>
      </div>

      <button
        onClick={onBookClick}
        type="button"
        className="px-5 py-2.5 text-xs font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
