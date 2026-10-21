"use client";

import React, { useState } from "react";

export interface OnlineService {
  id: string;
  name: string;
  category: "individual" | "pareja" | "organizacional";
  durationMinutes: number;
  totalPriceClp: number;
  depositPriceClp: number; // 20%
  balancePriceClp: number; // 80%
  description: string;
  ctaText: string;
  popular?: boolean;
}

export const onlineServicesList: OnlineService[] = [
  {
    id: "individual-online",
    name: "Constelación Familiar Individual Online",
    category: "individual",
    durationMinutes: 75,
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    description:
      "Sesión individual guiada por Google Meet. Un espacio confidencial para mirar asuntos de origen familiar, relación con padres o dificultades personales mediante figuras sistémicas y sintonía respetuosa.",
    ctaText: "Reservar sesión de 75 min",
    popular: true,
  },
  {
    id: "pareja-online",
    name: "Constelación de Pareja y Vínculos Afectivos",
    category: "pareja",
    durationMinutes: 90,
    totalPriceClp: 55000,
    depositPriceClp: 11000,
    balancePriceClp: 44000,
    description:
      "Sesión online orientada a comprender dinámicas vinculares recurrentes, orden sistémico en la pareja y la influencia de las familias de origen en la relación.",
    ctaText: "Reservar sesión de 90 min",
  },
  {
    id: "prosperidad-online",
    name: "Constelación de Dinero, Trabajo y Vocación",
    category: "individual",
    durationMinutes: 75,
    totalPriceClp: 48000,
    depositPriceClp: 9600,
    balancePriceClp: 38400,
    description:
      "Sesión online para explorar temas relacionados con el dinero, el trabajo y la vocación desde la mirada sistémica y el lugar que ocupamos en nuestras metas profesionales.",
    ctaText: "Reservar sesión de 75 min",
  },
  {
    id: "organizacional-online",
    name: "Constelación Organizacional Online",
    category: "organizacional",
    durationMinutes: 90,
    totalPriceClp: 65000,
    depositPriceClp: 13000,
    balancePriceClp: 52000,
    description:
      "Diagnóstico sistémico online para emprendedores, equipos y proyectos profesionales. Clarifica jerarquías, funciones, toma de decisiones y orden interno.",
    ctaText: "Reservar sesión organizacional",
  },
];

interface OnlineServiceCatalogProps {
  onSelectService: (service: OnlineService) => void;
}

export function OnlineServiceCatalog({ onSelectService }: OnlineServiceCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos los servicios online" },
    { id: "individual", label: "Sesiones Individuales" },
    { id: "pareja", label: "Pareja y Vínculos" },
    { id: "organizacional", label: "Organizaciones" },
    { id: "proximamente", label: "Talleres Grupales (Próximamente)", disabled: true },
  ];

  const filteredServices = onlineServicesList.filter((s) => {
    if (selectedCategory === "todos") return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="servicios-online" className="py-14 sm:py-16">
      
      {/* Selector de categorías con categoría Próximamente deshabilitada */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-cream-200 scrollbar-none mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            disabled={cat.disabled}
            onClick={() => !cat.disabled && setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              cat.disabled
                ? "bg-cream-200/50 text-charcoal-400 cursor-not-allowed opacity-60"
                : selectedCategory === cat.id
                ? "bg-forest-700 text-white shadow-sm"
                : "bg-white text-charcoal-700 hover:bg-cream-200 border border-cream-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de tarjetas con desglose del 20% y aviso ético */}
      <div className="space-y-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-white border border-cream-200 hover:border-forest-500/50 transition-all shadow-subtle hover:shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-charcoal-900">
                  {service.name}
                </h3>
                {service.popular && (
                  <span className="px-2.5 py-0.5 rounded-md bg-ochre-100 border border-ochre-200 text-ochre-800 text-[11px] font-bold">
                    Más solicitada
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-forest-50 text-forest-700 text-[11px] font-semibold">
                  Online vía Google Meet
                </span>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-charcoal-500 pt-1">
                <span>⏱️ Duración: {service.durationMinutes} minutos</span>
                <span>•</span>
                <span>💻 Conexión por Google Meet (horario de Chile)</span>
              </div>
            </div>

            {/* Desglose de Pago (20% Reserva / 80% Saldo) y Botón */}
            <div className="lg:w-80 shrink-0 p-4 rounded-xl bg-cream-50 border border-cream-200 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-semibold text-charcoal-500">Valor total:</span>
                  <span className="text-lg font-bold text-charcoal-900 font-sans">
                    ${service.totalPriceClp.toLocaleString("es-CL")} CLP
                  </span>
                </div>

                <div className="pt-2 border-t border-cream-200/80 space-y-1 text-xs">
                  <div className="flex justify-between text-forest-700 font-bold">
                    <span>Reserva hoy (20%):</span>
                    <span>${service.depositPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between text-charcoal-500">
                    <span>Saldo pendiente (80%):</span>
                    <span>${service.balancePriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-forest-700"
                >
                  {service.ctaText}
                </button>
                <p className="text-[10px] text-charcoal-400 text-center mt-1.5 leading-tight">
                  Aviso ético: Espacio complementario de autoconocimiento. No reemplaza psicoterapia ni psiquiatría.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
