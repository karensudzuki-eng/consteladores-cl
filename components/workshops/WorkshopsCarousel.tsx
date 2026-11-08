"use client";

import React, { useState } from "react";
import { CMSWorkshop } from "@/lib/cms/types";
import { useCMS } from "@/lib/cms/CMSContext";

interface WorkshopsCarouselProps {
  workshops: CMSWorkshop[];
  onSelectWorkshop: (workshop: CMSWorkshop) => void;
}

export function WorkshopsCarousel({
  workshops,
  onSelectWorkshop,
}: WorkshopsCarouselProps) {
  const { content } = useCMS();
  const settings = content?.settings;
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
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F]">
            Talleres de Constelaciones
          </h2>
        </div>

        {/* TEXTO INTRODUCTORIO DE TALLERES (Un solo bloque editable sin bordes ni cajas) */}
        {settings?.workshopAboutDescription && (
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-base sm:text-lg text-[#38322E] leading-relaxed whitespace-pre-line">
              {settings.workshopAboutDescription}
            </p>
          </div>
        )}

        {/* Carrusel de Flyers en Formato Vertical Completo (Estilo Cartel con Imagen Protagonista) */}
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

          {/* Grid de Flyers con Imagen Ocupando Casi Todo el Flyer y Textos Superpuestos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeWorkshops.map((workshop, idx) => {
              const bookingPhone = workshop.phoneContact || "+56 9 6373 0998";
              const rawPhone = bookingPhone.replace(/[^0-9]/g, "") || "56963730998";
              const workshopWspUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                `Hola, me interesa reservar mi cupo en el taller "${workshop.title}" (${workshop.date}).`
              )}`;

              return (
                <div
                  key={workshop.id || idx}
                  onClick={() => onSelectWorkshop(workshop)}
                  className="group relative rounded-3xl overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E7DECE] hover:border-terracotta-400 cursor-pointer bg-[#181412]"
                >
                  {/* FOTOGRAFÍA DE FONDO A PANTALLA COMPLETA */}
                  {workshop.flyerUrl ? (
                    <img
                      src={workshop.flyerUrl}
                      alt={workshop.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out -z-10"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D221D] to-[#120E0C] -z-10" />
                  )}

                  {/* DEGRADADO CINEMATOGRÁFICO PARA LEGIBILIDAD PERFECTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 group-hover:via-black/50 transition-colors duration-500 -z-10" />

                  {/* ZONA SUPERIOR: BADGES */}
                  <div className="flex items-center justify-between gap-2 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm backdrop-blur-md bg-black/60 text-white border border-white/20">
                      {workshop.modality === "online" ? "🌐 Online" : "📍 Presencial"}
                    </span>

                    <span className="text-[11px] font-serif font-bold text-ochre-300 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-ochre-400/40">
                      Consteladores
                    </span>
                  </div>

                  {/* ZONA INFERIOR: INFORMACIÓN SUPERPUESTA CON LETRAS GRANDES */}
                  <div className="z-10 space-y-3 pt-24">
                    {/* Píldora de Fecha y Horario */}
                    <div>
                      <span className="inline-block px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4A359] text-ochre-200 text-xs sm:text-sm font-semibold shadow-sm">
                        🗓️ {workshop.date} {workshop.time ? `· ${workshop.time}` : ""}
                      </span>
                    </div>

                    {/* Título Principal con Letras Grandes */}
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-ochre-200 transition-colors leading-tight drop-shadow-md">
                      {workshop.title}
                    </h3>

                    {/* Facilitadoras */}
                    <p className="text-sm sm:text-base text-cream-100 font-medium drop-shadow-sm">
                      <span className="text-ochre-300 font-semibold">Facilitadoras:</span>{" "}
                      {workshop.facilitators}
                    </p>

                    {/* Lugar */}
                    <p className="text-xs sm:text-sm text-cream-200/90 drop-shadow-sm line-clamp-1">
                      📍 {workshop.modality === "online" ? "Online vía Google Meet" : `${workshop.address} (${workshop.city})`}
                    </p>

                    {/* Valor Destacado */}
                    <div className="pt-1">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-md">
                        <span className="text-ochre-300">VALOR:</span> {workshop.price}{" "}
                        <span className="text-xs font-sans font-normal text-cream-200/80">CLP</span>
                      </span>
                      <div className="w-24 h-0.5 bg-[#D4A359] mt-1" />
                    </div>

                    {/* Botón WhatsApp: Reservas + Teléfono Editable */}
                    <div className="pt-3">
                      <a
                        href={workshopWspUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 px-4 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        title={`Reservar cupo por WhatsApp: ${bookingPhone}`}
                      >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.023 6.486 2.023 12.016c0 1.954.561 3.864 1.624 5.518L2 22l4.636-1.614c1.584.974 3.42 1.493 5.404 1.493 5.53 0 10.017-4.486 10.017-10.016 0-5.53-4.487-10.016-10.017-10.016z" />
                        </svg>
                        <span>Reservas: {bookingPhone}</span>
                      </a>
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