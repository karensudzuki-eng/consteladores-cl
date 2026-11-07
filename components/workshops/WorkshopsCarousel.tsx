"use client";

import React, { useState } from "react";
import { CMSWorkshop } from "@/lib/cms/content";
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

  const rawPhone = (settings?.whatsappNumber || "+56 9 4193 9363").replace(/[^0-9]/g, "");

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

        {/* ACERCA DEL ENCUENTRO (Sin bordes duros, texto limpio y editable desde CMS) */}
        <div className="max-w-3xl mx-auto mb-14 text-left sm:text-center space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A7E73]">
            {settings?.workshopAboutTitle || "Acerca del encuentro"}
          </h3>
          <p className="text-base sm:text-lg text-[#27221F] leading-relaxed">
            {settings?.workshopAboutDescription ||
              "Te invitamos a un taller vivencial donde, a través de la escenificación de dinámicas personales, podrás mirar tu vida desde una perspectiva más profunda y liberadora."}
          </p>
          <div className="p-5 rounded-2xl bg-[#FFF9F2] text-xs sm:text-sm text-[#7A4B10] leading-relaxed shadow-xs text-left">
            <p>
              {settings?.workshopAboutNote ||
                '⚠️ Los casos a constelar se seleccionarán durante el encuentro. Aunque no todos los asistentes constelarán de forma individual, la experiencia demuestra que el trabajo de cada compañero resuena con nuestras propias vivencias, permitiendo que todos los presentes vivan un proceso de aprendizaje y transformación compartida. "Cuando tú constelas, todos constelamos".'}
            </p>
          </div>
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
              const workshopWspUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
                `Hola, me interesa coordinar mi participación en el taller vivencial "${workshop.title}" (${workshop.date}).`
              )}`;

              return (
                <div
                  key={workshop.id || idx}
                  className="group bg-[#FBF7F2] border border-[#E7DECE] hover:border-terracotta-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Flyer Visual Ajustable - No se corta */}
                  <div
                    onClick={() => onSelectWorkshop(workshop)}
                    className="relative w-full h-64 sm:h-72 bg-[#EFE8DE]/60 overflow-hidden flex items-center justify-center p-2 cursor-pointer"
                  >
                    {workshop.flyerUrl ? (
                      <img
                        src={workshop.flyerUrl}
                        alt={workshop.title}
                        className="max-h-full max-w-full object-contain object-center rounded-xl transition-transform duration-500 group-hover:scale-102"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF8F5] to-[#EAE0D0] rounded-xl">
                        <span className="font-serif text-2xl font-bold text-terracotta-700 mb-2">
                          {workshop.title}
                        </span>
                        <span className="text-xs text-[#5C524A]">{workshop.date}</span>
                      </div>
                    )}

                    {/* Modalidad Badge: Presencial u Online */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide shadow-sm backdrop-blur-sm bg-black/60 text-white">
                      {workshop.modality === "online" ? "🌐 Online" : "📍 Presencial"}
                    </div>
                  </div>

                  {/* Datos del Taller: Solo Título, Fecha y Horario, Facilitadoras, Modalidad y Lugar, Valor */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* 1. TÍTULO */}
                      <h3
                        onClick={() => onSelectWorkshop(workshop)}
                        className="text-xl font-serif font-bold text-[#27221F] group-hover:text-terracotta-600 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {workshop.title}
                      </h3>

                      {/* 2. FECHA Y HORARIO */}
                      <div className="flex items-start gap-2 text-xs text-[#38322E]">
                        <span className="shrink-0 text-base">🗓️</span>
                        <div>
                          <span className="font-bold text-[#27221F]">Fecha y Horario: </span>
                          <span>{workshop.date} {workshop.time ? `· ${workshop.time}` : ""}</span>
                        </div>
                      </div>

                      {/* 3. FACILITADORAS */}
                      <div className="flex items-start gap-2 text-xs text-[#38322E]">
                        <span className="shrink-0 text-base">👥</span>
                        <div>
                          <span className="font-bold text-[#27221F]">Facilitadoras: </span>
                          <span className="text-terracotta-700 font-semibold">{workshop.facilitators}</span>
                        </div>
                      </div>

                      {/* 4. MODALIDAD Y LUGAR */}
                      <div className="flex items-start gap-2 text-xs text-[#38322E]">
                        <span className="shrink-0 text-base">📍</span>
                        <div>
                          <span className="font-bold text-[#27221F]">Lugar: </span>
                          <span>{workshop.modality === "online" ? "Online vía Google Meet" : `${workshop.address} (${workshop.city})`}</span>
                        </div>
                      </div>

                      {/* 5. VALOR */}
                      <div className="flex items-start gap-2 text-xs text-[#38322E] pt-1">
                        <span className="shrink-0 text-base">💰</span>
                        <div>
                          <span className="font-bold text-[#27221F]">Valor: </span>
                          <span className="font-serif font-bold text-base text-[#27221F]">{workshop.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* COORDINACIÓN Y BOTÓN WHATSAPP (Mismo estilo que sesión individual) */}
                    <div className="pt-4 border-t border-[#E7DECE]/80 space-y-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A7E73]">
                        Coordinación directa
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={workshopWspUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 text-xs font-semibold text-[#128C7E] bg-[#EBF7F2] hover:bg-[#D8F0E5] border border-[#BDE3D1] rounded-2xl shadow-xs hover:shadow transition-all flex flex-col items-center justify-center cursor-pointer"
                          title="Consultar por WhatsApp"
                        >
                          <div className="flex items-center gap-1.5 font-bold">
                            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.023 6.486 2.023 12.016c0 1.954.561 3.864 1.624 5.518L2 22l4.636-1.614c1.584.974 3.42 1.493 5.404 1.493 5.53 0 10.017-4.486 10.017-10.016 0-5.53-4.487-10.016-10.017-10.016z" />
                            </svg>
                            <span>Consultar WhatsApp</span>
                          </div>
                          <span className="text-[10px] text-[#128C7E]/80 font-normal">
                            {settings?.whatsappNumber || "+56 9 4193 9363"}
                          </span>
                        </a>

                        <button
                          onClick={() => onSelectWorkshop(workshop)}
                          type="button"
                          className="py-2.5 px-3.5 text-xs font-semibold text-[#5C524A] hover:text-[#27221F] bg-white hover:bg-[#F3ECE2] border border-[#E7DECE] rounded-full transition-all cursor-pointer self-center"
                        >
                          Ver detalles
                        </button>
                      </div>
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
