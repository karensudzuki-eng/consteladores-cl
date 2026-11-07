"use client";

import React from "react";
import Link from "next/link";
import { FlyerDesigner } from "@/components/flyer-designer/FlyerDesigner";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";

export default function DisenadorFlyersPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 transition-colors"
          >
            ← Volver al Panel de Administración
          </Link>
          <span className="text-xs text-[#8A7E73]">
            Herramienta Oficial de Diseño · consteladores.cl
          </span>
        </div>

        <FlyerDesigner />
      </main>

      <WatercolorFooter />
    </div>
  );
}
