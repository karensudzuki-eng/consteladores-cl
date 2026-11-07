"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";
import { CONFIG } from "@/lib/config";
import { useCMS } from "@/lib/cms/CMSContext";

interface WatercolorHeroProps {
  onBookClick: () => void;
  onOpenTriage?: () => void;
}

export function WatercolorHero({ onBookClick, onOpenTriage }: WatercolorHeroProps) {
  const { content } = useCMS();
  const settings = content.settings;

  const [showDepositTooltip, setShowDepositTooltip] = useState(false);

  const heroTitle = settings.heroTitle || "¿Sientes que cargas con un peso que no te pertenece?";
  const heroSubtitle =
    settings.heroSubtitle ||
    "Un espacio cuidado para mirar el orden de tu sistema familiar y retomar tu propio lugar con calma.";
  const heroBg = settings.heroBgImage || "/images/mirar-historia-sanar.png";

  const telegramUrl = settings.telegramUrl || "https://web.telegram.org/a/#-5157628559";
  const telegramImage = settings.telegramImage || "/images/comunidad-encuentro.png";
  const telegramBadge = settings.telegramBadge || "Comunidad de Consteladores en Telegram";
  const telegramDescription =
    settings.telegramDescription ||
    "Únete a nuestro espacio seguro de acompañamiento, lecturas y encuentros sistémicos entre pares.";

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-[#FBF7F2]">
      {/* Fondo con imagen propia y velo crema con opacidad controlada */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src={heroBg}
          alt="Ilustración sistémica de raíces familiares y vínculos de origen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[#FBF7F2] transition-opacity"
          style={{ opacity: "var(--overlay-hero-opacity, 0.82)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F2]/90 via-transparent to-[#FBF7F2]" />
      </div>

      {/* Símbolo vivo en filigrana ambiental detrás del texto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 text-terracotta-700">
        <FamilyTreeIcon className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px]" isAnimated={true} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
        
        {/* Insignia Centrada */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/95 border border-terracotta-200/90 text-terracotta-700 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm mx-auto">
          <FamilyTreeIcon className="w-4 h-4" isAnimated={true} />
          <span>Acompañamiento Sistémico y Mirada al Origen</span>
        </div>

        {/* Titular como pregunta emocional */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#27221F] tracking-tight leading-[1.18] mb-6">
          {heroTitle}
        </h1>

        {/* Subtítulo de máximo dos líneas */}
        <p className="text-lg sm:text-xl text-[#38322E] font-normal leading-relaxed max-w-2xl mx-auto mb-9">
          {heroSubtitle}
        </p>

        {/* Acciones Principales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onBookClick}
            type="button"
            className="w-full sm:w-auto px-9 py-4 text-base font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center cursor-pointer"
          >
            Reservar sesión
          </button>
          
          <a
            href="#talleres"
            className="w-full sm:w-auto px-8 py-4 text-base font-medium text-[#27221F] bg-cream-50 hover:bg-cream-200/90 border-2 border-[#E7DECE] hover:border-terracotta-400 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            Ver talleres vivenciales
          </a>
        </div>

        {/* SECCIÓN DESTACADA REQUERIDA: Imagen destacada conectada a la comunidad de Consteladores en Telegram */}
        <div id="comunidad-telegram" className="mb-12 scroll-mt-24">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#FCFAF7] border-2 border-sage-300/80 hover:border-sage-500 rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              {/* Imagen Destacada de la Comunidad */}
              <div className="relative w-full sm:w-44 h-36 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-sage-200 bg-sage-50">
                <img
                  src={telegramImage}
                  alt="Comunidad de Consteladores en Telegram"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                  <span>✈️ Telegram</span>
                </div>
              </div>

              {/* Textos y Acceso Directo */}
              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-sage-800 bg-sage-100 px-3 py-0.5 rounded-full border border-sage-200">
                  {telegramBadge}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221F] group-hover:text-sage-800 transition-colors">
                  Únete a la Comunidad de Consteladores
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524A] leading-relaxed">
                  {telegramDescription}
                </p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-sage-700 group-hover:text-sage-900">
                  <span>Acceso directo al grupo de Telegram</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Micro-Garantías de Confianza */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#4A423D] font-medium">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            Online vía videollamada (Zoom o Google Meet) y presencial en Concón y Santiago
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            Atención personalizada y respetuosa
          </span>
        </div>

        {/* Aclaración ética obligatoria */}
        <div className="mt-12 pt-6 border-t border-[#E7DECE]/80 max-w-2xl mx-auto space-y-1.5 text-center">
          <p className="text-[12px] text-[#5C524A] leading-relaxed">
            {CONFIG.DISCLAIMER_NOTICE}
          </p>
          <p className="text-[11px] text-[#8A7E73]">
            {CONFIG.CRISIS_LINE_NOTICE}
          </p>
        </div>

      </div>
    </section>
  );
}
