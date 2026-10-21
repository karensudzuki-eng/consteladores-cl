"use client";

import React, { useState } from "react";
import { OnlineService, onlineServicesList } from "../redesign/OnlineServiceCatalog";

interface MercuryServicesProps {
  onSelectService: (service: OnlineService) => void;
}

export function MercuryServices({ onSelectService }: MercuryServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos los servicios online" },
    { id: "individual", label: "Sesiones Individuales" },
    { id: "pareja", label: "Pareja y Vínculos" },
    { id: "organizacional", label: "Organizaciones" },
    { id: "proximamente", label: "Talleres Grupales (Próximamente)", disabled: true },
  ];

  const filtered = onlineServicesList.filter((s) => {
    if (selectedCategory === "todos") return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="servicios-online" className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <div className="max-w-[680px] mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Catálogo Online · Reserva con 20%
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            Sesiones de constelación familiar online
          </h2>
          <p className="text-sm sm:text-base text-[#c3c3cc] leading-[1.5] text-center">
            Acompañamiento individual por Google Meet en horario de Chile continental. Reserva tu hora con un abono inicial del 20% y cancela el saldo previo a tu encuentro.
          </p>
        </div>

        {/* Category Pills (40px radius, Mist hairline or solid selection) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              disabled={cat.disabled}
              onClick={() => !cat.disabled && setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-[40px] text-xs sm:text-sm font-[400] whitespace-nowrap transition-all ${
                cat.disabled
                  ? "bg-[#1e1e2a]/40 text-[#70707d] cursor-not-allowed border border-[#70707d]/20"
                  : selectedCategory === cat.id
                  ? "bg-[#ededf3] text-[#171721] font-[480]"
                  : "bg-[#1e1e2a] text-[#c3c3cc] hover:text-[#ededf3] border border-[#e2e3ed]/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid: Graphite Cards #1e1e2a, 12px radius, 32px padding, centered titles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 flex flex-col justify-between text-center transition-colors hover:border-[#e2e3ed]/25"
            >
              <div>
                {/* Tag Pill Centered */}
                <div className="flex justify-center mb-3">
                  <span className="px-3 py-1 rounded-[40px] bg-[#272735] text-[#c3c3cc] text-[11px] font-[400] tracking-[0.01em]">
                    {service.durationMinutes} min • Online vía Google Meet
                  </span>
                </div>

                {/* Card Title Strictly Centered */}
                <h3 className="font-sans font-[480] text-xl sm:text-2xl text-[#ededf3] text-center mb-3 tracking-[0.015em] leading-[1.2]">
                  {service.name}
                </h3>

                {/* Description Centered */}
                <p className="text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] text-center max-w-[460px] mx-auto mb-6">
                  {service.description}
                </p>
              </div>

              {/* Price Breakdown and Pill Action Button */}
              <div className="pt-6 border-t border-[#70707d]/20 space-y-4">
                <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/10 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-[#ededf3] font-[480] text-sm">
                    <span>Valor total sesión:</span>
                    <span>${service.totalPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between items-center text-[#5266eb] font-[480] pt-1 border-t border-[#70707d]/20">
                    <span>Reserva hoy (20%):</span>
                    <span>${service.depositPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between items-center text-[#c3c3cc]/70">
                    <span>Saldo restante (80%):</span>
                    <span>${service.balancePriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full sm:w-auto px-8 py-3 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-sm shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    {service.ctaText}
                  </button>
                  <p className="text-[11px] text-[#c3c3cc]/60 text-center mt-2 leading-[1.3]">
                    Aviso ético: Espacio complementario de autoconocimiento. No reemplaza psicoterapia ni psiquiatría.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
