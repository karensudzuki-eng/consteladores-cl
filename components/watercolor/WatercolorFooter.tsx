"use client";

import React from "react";

export function WatercolorFooter() {
  return (
    <footer className="py-8 bg-[#FAF7F2] border-t border-[#E7DECE] text-center text-xs text-[#8A7E73]">
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} consteladores.cl · Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
