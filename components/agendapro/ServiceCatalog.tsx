"use client";

import React, { useState } from "react";

export interface ServiceItem {
  id: string;
  name: string;
  category: "individual" | "pareja" | "taller" | "empresa";
  durationMinutes: number;
  priceClp: number;
  description: string;
  modality: string;
  popular?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "individual-online",
    name: "Constelación Familiar Individual Online",
    category: "individual",
    durationMinutes: 75,
    priceClp: 45000,
    description:
      "Encuentro uno a uno por Google Meet. Exploramos con respeto tu motivo de consulta (relación con madre/padre, duelos, bloqueos personales o síntomas) mediante figuras y sintonía sistémica profunda.",
    modality: "Online vía Google Meet • Todo Chile",
    popular: true,
  },
  {
    id: "pareja-vinculos",
    name: "Constelación de Pareja y Vínculos Afectivos",
    category: "pareja",
    durationMinutes: 90,
    priceClp: 55000,
    description:
      "Sesión enfocada en mirar patrones repetitivos en las relaciones, dificultades de convivencia, lealtades invisibles con las familias de origen o procesos de separación consciente.",
    modality: "Online (Google Meet) o Presencial Santiago",
  },
  {
    id: "dinero-vocacion",
    name: "Constelación de Prosperidad, Trabajo y Dinero",
    category: "individual",
    durationMinutes: 75,
    priceClp: 48000,
    description:
      "Mirada sistémica para destrabar mandatos familiares inconscientes sobre la escasez, quiebras o frenos en la vocación, recibiendo la fuerza y el permiso para avanzar con éxito en el mundo.",
    modality: "Online vía Google Meet • Todo Chile",
  },
  {
    id: "taller-grupal",
    name: "Taller Vivencial Grupal en Santiago (Jornada de Sábado)",
    category: "taller",
    durationMinutes: 240,
    priceClp: 35000,
    description:
      "Encuentro vivencial de 4 horas en Providencia, Santiago. Participa constelando tu tema propio o participando activamente como representante en los sistemas de otros consultantes.",
    modality: "Presencial Providencia, Santiago",
  },
  {
    id: "sistemica-empresas",
    name: "Constelación Organizacional para Empresas y Proyectos",
    category: "empresa",
    durationMinutes: 90,
    priceClp: 65000,
    description:
      "Diagnóstico y orden sistémico para sociedades comerciales, emprendimientos y equipos laborales. Clarifica jerarquías, roles, toma de decisiones y viabilidad de alianzas.",
    modality: "Online o In Company en Santiago",
  },
];

interface ServiceCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

export function ServiceCatalog({ onSelectService }: ServiceCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos los servicios" },
    { id: "individual", label: "Sesiones Individuales Online" },
    { id: "pareja", label: "Pareja y Vínculos" },
    { id: "taller", label: "Talleres Grupales (Santiago)" },
    { id: "empresa", label: "Empresas y Organizaciones" },
  ];

  const filteredServices = servicesData.filter((s) => {
    if (selectedCategory === "todos") return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="py-8">
      
      {/* Selector de categorías tipo AgendaPro */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-slate-200 scrollbar-none mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de servicios estilo AgendaPro (Rumbo Sagrado) */}
      <div className="space-y-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900">
                  {service.name}
                </h3>
                {service.popular && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                    Más solicitada
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.durationMinutes} minutos
                </span>

                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {service.modality}
                </span>
              </div>
            </div>

            {/* Precio y Botón Reservar tipo AgendaPro */}
            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right">
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Valor sesión
                </span>
                <span className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900">
                  ${service.priceClp.toLocaleString("es-CL")}
                  <span className="text-xs font-normal text-slate-500 ml-1">CLP</span>
                </span>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="px-6 py-2.5 sm:py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                Reservar hora
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
