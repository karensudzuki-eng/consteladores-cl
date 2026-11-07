"use client";

import React from "react";

export function WorkshopLogoBadge({
  logoType,
  logoUrl,
  className = "",
}: {
  logoType: "icalma" | "vortice" | "custom";
  logoUrl?: string;
  className?: string;
}) {
  if (logoType === "custom" && logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="Logo de la actividad"
        className={`h-7 w-auto object-contain ${className}`}
      />
    );
  }

  if (logoType === "vortice") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50/95 border border-sage-300 text-sage-800 text-[11px] font-semibold tracking-wide backdrop-blur-sm shadow-sm ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
        <span>Vórtice Integración</span>
      </div>
    );
  }

  // Por defecto: Logo oficial Icalma
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E7DECE] text-[#27221F] text-[11px] font-medium tracking-wide backdrop-blur-sm shadow-sm ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-3.5 h-3.5 text-terracotta-600"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" strokeOpacity="0.4" />
        <path
          d="M12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M12 8C14.209 8 16 9.791 16 12" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="font-serif font-semibold text-terracotta-700">Icalma</span>
      <span className="text-[#8A7E73] text-[10px]">· Formación Continua</span>
    </div>
  );
}
