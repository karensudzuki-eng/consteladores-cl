"use client";

import React from "react";

export function WorkshopLogoBadge({
  logoType,
  logoUrl,
  className = "",
}: {
  logoType?: "consteladores" | "icalma" | "vortice" | "custom" | "none";
  logoUrl?: string;
  className?: string;
}) {
  if (logoType === "none") {
    return null;
  }

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

  // Por defecto: Logo oficial de Consteladores.cl
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5]/95 border border-[#E7DECE] text-[#27221F] text-[11px] font-medium tracking-wide backdrop-blur-sm shadow-sm ${className}`}
    >
      <img
        src="/images/logo-consteladores.jpg"
        alt="Consteladores"
        className="h-4 w-auto object-contain"
      />
      <span className="font-serif font-semibold text-[#27221F]">Consteladores.cl</span>
    </div>
  );
}
