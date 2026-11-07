"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { HumanInTheLoopModal } from "@/components/booking/HumanInTheLoopModal";
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { FacilitatorProfile, directoryFacilitators } from "@/lib/data/directory";
import { useCMS } from "@/lib/cms/CMSContext";
import { CONFIG } from "@/lib/config";

export default function FacilitadoresPage() {
  const { content } = useCMS();
  const settings = content?.settings;

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorProfile | null>(null);
  const [detailFacilitator, setDetailFacilitator] = useState<FacilitatorProfile | null>(null);

  const handleBook = (facilitator?: FacilitatorProfile) => {
    if (facilitator) {
      setSelectedFacilitator(facilitator);
    }
    setIsBookingOpen(true);
  };

  const rawPhone = (settings?.whatsappNumber || "+56 9 4193 9363").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    "Hola, soy facilitador(a) y deseo realizar una consulta para integrarme al equipo de consteladores.cl."
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-900">
      <WatercolorNavbar onBookClick={() => handleBook()} />

      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Equipo de Acompañamiento
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-[#27221F] mb-4">
              Facilitadores de Constelaciones
            </h1>
            <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
              Profesionales con experiencia y vocación humana, dedicados a acompañar procesos de comprensión, orden y alivio en tus vínculos.
            </p>
          </div>

          {/* Listado de Facilitadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {directoryFacilitators.map((f) => {
              const initials = f.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2);

              return (
                <div
                  key={f.id}
                  className="bg-[#FCFAF7] border border-[#E7DECE] hover:border-terracotta-300 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header de la tarjeta */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-xl font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 font-semibold">
                            {f.experienceYears} años de experiencia
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221F]">
                          {f.name}
                        </h3>
                        <p className="text-xs text-terracotta-700 font-medium line-clamp-1">
                          {f.headline}
                        </p>
                      </div>
                    </div>

                    {/* Modalidad y Ciudad */}
                    <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#E7DECE] text-xs text-[#5C524A] space-y-1 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A7E73]">Modalidad:</span>
                        <span className="font-semibold text-[#27221F]">
                          {f.modalities.includes("online") ? "🌐 Online (Google Meet)" : "📍 Presencial"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8A7E73]">Ubicación:</span>
                        <span className="font-semibold text-[#27221F]">{f.city}</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-[#5C524A] leading-relaxed line-clamp-3 mb-6">
                      {f.bio}
                    </p>
                  </div>

                  {/* Valor y Botones */}
                  <div className="pt-4 border-t border-[#E7DECE] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-[#8A7E73] block uppercase tracking-wider">
                        Valor sesión
                      </span>
                      <span className="text-xl font-serif font-bold text-[#27221F]">
                        ${f.totalPriceClp.toLocaleString("es-CL")}{" "}
                        <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailFacilitator(f)}
                        type="button"
                        className="px-3.5 py-2 rounded-full border border-[#E7DECE] bg-white hover:bg-[#F3ECE2] text-xs font-medium text-[#27221F] transition-colors cursor-pointer"
                      >
                        Ver perfil
                      </button>
                      <button
                        onClick={() => handleBook(f)}
                        type="button"
                        className="px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Reservar cita
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* SECCIÓN: PRACTICA CON NOSOTROS (Sesiones en Formación Supervisada)         */}
          {/* ========================================================================= */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-8 sm:p-10 mb-20 shadow-sm">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-cream-100 border border-[#E7DECE] text-[#5C524A] text-xs font-semibold uppercase tracking-wider">
                Espacio de Integración Formativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F]">
                Practica con nosotros
              </h2>
              <p className="text-sm sm:text-base text-[#5C524A] leading-relaxed">
                Ofrecemos un espacio de atención vivencial guiado por practicantes avanzados en etapa de integración clínica y formación sistémica, bajo supervisión pedagógica continua. Si buscas acceder a una sesión individual a un valor formativo preferencial o participar en círculos de práctica, escríbenos directamente.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${rawPhone}?text=${encodeURIComponent("Hola, me interesa conocer más sobre las sesiones y espacios de Practica con Nosotros en consteladores.cl.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
                >
                  <span>💬</span>
                  <span>Consultar por sesiones de práctica</span>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MARCO SEPARADO: SI ERES FACILITADOR Y QUIERES PERTENECER AL EQUIPO         */}
          {/* Con solo 3 botones requeridos y editable desde CMS                          */}
          {/* ========================================================================= */}
          <div className="relative border-2 border-terracotta-300/80 bg-gradient-to-br from-[#FCFAF7] to-[#F7EFE3] rounded-3xl p-8 sm:p-12 shadow-md">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Imagen Ilustrativa Editable */}
              <div className="md:col-span-5">
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-[#E7DECE] shadow-inner bg-[#FAF8F5]">
                  <img
                    src={settings?.joinTeamImageUrl || "/images/comunidad-encuentro.png"}
                    alt="Facilitadores en comunidad"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Contenido y los 3 Botones Exclusivos */}
              <div className="md:col-span-7 space-y-5 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block mb-2">
                    Convocatoria Abierta
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#27221F] leading-tight">
                    {settings?.joinTeamTitle || "Si eres facilitador y quieres pertenecer al equipo"}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#5C524A] leading-relaxed">
                  {settings?.joinTeamDescription ||
                    "Buscamos facilitadores comprometidos con la ética sistémica y el cuidado humano. Postula para formar parte de nuestra red, o únete a nuestros espacios comunitarios de profundización."}
                </p>

                {/* LOS 3 BOTONES REQUERIDOS */}
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                  
                  {/* Botón 1: Postular como facilitador */}
                  <Link
                    href={settings?.joinTeamPostulateUrl || "/registro-terapeuta"}
                    className="px-6 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm text-center shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                  >
                    {settings?.joinTeamPostulateLabel || "Postular como facilitador"}
                  </Link>

                  {/* Botón 2: Ícono de WhatsApp para consultas */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                    title="Consultas vía WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    <span>Consultas por WhatsApp</span>
                  </a>

                  {/* Botón 3: Solicitar unirme a la comunidad (Telegram) */}
                  <a
                    href={settings?.telegramUrl || CONFIG.TELEGRAM_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.963z" />
                    </svg>
                    <span>Solicitar unirme a la comunidad</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <WatercolorFooter />

      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <FacilitatorDetailModal
        facilitator={detailFacilitator}
        isOpen={!!detailFacilitator}
        onClose={() => setDetailFacilitator(null)}
        onBook={(f) => {
          setSelectedFacilitator(f);
          setIsBookingOpen(true);
        }}
        onQuote={(f) => {
          setSelectedFacilitator(f);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
