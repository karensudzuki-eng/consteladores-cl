"use client";

import React, { useState } from "react";
import { CMSWorkshop } from "@/lib/cms/content";
import { WorkshopLogoBadge } from "./WorkshopLogos";

interface WorkshopsCarouselProps {
  workshops: CMSWorkshop[];
  onSelectWorkshop: (workshop: CMSWorkshop) => void;
}

export function WorkshopsCarousel({
  workshops,
  onSelectWorkshop,
}: WorkshopsCarouselProps) {
  const activeWorkshops = workshops.filter((w) => w.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (activeWorkshops.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeWorkshops.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeWorkshops.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="talleres" className="py-20 sm:py-28 bg-[#FCFAF7] border-t border-[#E7DECE]/80 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Carrusel */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Talleres de Constelaciones
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Espacios grupales (presenciales y online) para escenificar dinámicas, mirar historias familiares y experimentar que cuando uno constela, todos constelamos.
          </p>
        </div>

        {/* Carrusel de Flyers */}
        <div className="relative">
          {activeWorkshops.length > 1 && (
            <div className="flex justify-end gap-2 mb-4">
              <button
                onClick={handlePrev}
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-[#E7DECE] text-[#27221F] hover:bg-[#F3ECE2] flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-90"
                aria-label="Taller anterior"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-[#E7DECE] text-[#27221F] hover:bg-[#F3ECE2] flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-90"
                aria-label="Siguiente taller"
              >
                →
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeWorkshops.map((workshop, idx) => {
              return (
                <div
                  key={workshop.id || idx}
                  onClick={() => onSelectWorkshop(workshop)}
                  className="group bg-[#FBF7F2] border border-[#E7DECE] hover:border-terracotta-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Flyer Visual */}
                  <div className="relative w-full h-56 sm:h-64 bg-[#EFE8DE] overflow-hidden">
                    {workshop.flyerUrl ? (
                      <img
                        src={workshop.flyerUrl}
                        alt={workshop.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF8F5] to-[#EAE0D0]">
                        <span className="font-serif text-2xl font-bold text-terracotta-700 mb-2">
                          {workshop.title}
                        </span>
                        <span className="text-xs text-[#5C524A]">{workshop.date}</span>
                      </div>
                    )}

                    {/* Logo Flotante */}
                    <div className="absolute top-3 left-3 z-10">
                      <WorkshopLogoBadge
                        logoType={workshop.logoType}
                        logoUrl={workshop.logoUrl}
                      />
                    </div>

                    {/* Modalidad Badge: Presencial u Online */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shadow-sm backdrop-blur-sm bg-black/60 text-white">
                      {workshop.modality === "online" ? "🌐 Online (Meet)" : "📍 Presencial"}
                    </div>

                    {/* Fecha badge */}
                    <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium">
                      {workshop.date}
                    </div>
                  </div>

                  {/* Datos del Taller */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8A7E73] mb-2">
                        <span>📍 {workshop.city || "Chile"}</span>
                        <span>•</span>
                        <span>{workshop.facilitators}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#27221F] group-hover:text-terracotta-600 transition-colors line-clamp-2 mb-2">
                        {workshop.title}
                      </h3>

                      <p className="text-xs text-[#5C524A] leading-relaxed line-clamp-3">
                        {workshop.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E7DECE]/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7E73] block">
                          Valor
                        </span>
                        <span className="text-base font-serif font-bold text-[#27221F]">
                          {workshop.price}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta-600 group-hover:translate-x-1 transition-transform">
                        <span>Ver detalles y reservar</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
