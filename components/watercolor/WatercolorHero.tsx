"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";
import { CONFIG } from "@/lib/config";

interface WatercolorHeroProps {
  onBookClick: () => void;
  onOpenTriage: () => void;
}

export function WatercolorHero({ onBookClick, onOpenTriage }: WatercolorHeroProps) {
  const [showDepositTooltip, setShowDepositTooltip] = useState(false);

  const primaryCtaLabel = CONFIG.PRICING_ENABLED ? "Reservar sesión" : "Consultar disponibilidad";

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-[#FBF7F2]">
      {/* Fondo con imagen propia y velo crema con opacidad controlada por variable CSS */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/mirar-historia-sanar.png"
          alt="Ilustración sistémica de raíces familiares y vínculos de origen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Capa de velo crema (#FBF7F2) para garantizar contraste WCAG AA */}
        <div
          className="absolute inset-0 bg-[#FBF7F2] transition-opacity"
          style={{ opacity: "var(--overlay-hero-opacity, 0.80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F2]/90 via-transparent to-[#FBF7F2]" />
      </div>

      {/* Símbolo vivo en filigrana ambiental detrás del texto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 text-terracotta-700">
        <FamilyTreeIcon className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px]" isAnimated={true} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
        
        {/* Insignia Centrada sin emojis */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/95 border border-terracotta-200/90 text-terracotta-700 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm mx-auto">
          <FamilyTreeIcon className="w-4 h-4" isAnimated={true} />
          <span>Acompañamiento Sistémico y Mirada al Origen · Chile</span>
        </div>

        {/* Titular como pregunta emocional */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#27221F] tracking-tight leading-[1.18] mb-6">
          ¿Sientes que cargas con un peso <br className="hidden sm:block" />
          <span className="italic font-serif text-terracotta-500">que no te pertenece?</span>
        </h1>

        {/* Subtítulo de máximo dos líneas */}
        <p className="text-lg sm:text-xl text-[#38322E] font-normal leading-relaxed max-w-2xl mx-auto mb-9">
          Un espacio cuidado para mirar el orden de tu sistema familiar, reconocer lo que busca ser visto y retomar tu propio lugar con calma.
        </p>

        {/* Acciones Principales sin emojis */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onBookClick}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center btn-breathe cursor-pointer"
          >
            {primaryCtaLabel}
          </button>
          
          <button
            onClick={onOpenTriage}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-[#27221F] bg-cream-50 hover:bg-cream-200/90 border-2 border-terracotta-500/80 hover:border-terracotta-600 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer"
          >
            Hacer test orientador, 30 segundos
          </button>
        </div>

        {/* Micro-Garantías de Confianza sin emojis ni precios en CLP */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#4A423D] font-medium">
          
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => setShowDepositTooltip(!showDepositTooltip)}
              onMouseEnter={() => setShowDepositTooltip(true)}
              onMouseLeave={() => setShowDepositTooltip(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-[#E7DECE] text-[#38322E] hover:border-terracotta-400 transition-colors text-xs cursor-pointer focus:outline-none"
              aria-label="Información sobre la reserva del 20%"
            >
              <span>Abono de reserva del 20% (descontable del total)</span>
              <span className="w-4 h-4 rounded-full bg-[#E7DECE] text-[#5C524A] text-[10px] flex items-center justify-center font-bold">i</span>
            </button>

            {showDepositTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 bg-white border border-[#E7DECE] rounded-2xl shadow-xl text-left text-xs text-[#38322E] z-30 animate-fadeIn">
                <p className="font-semibold text-terracotta-600 mb-1">
                  Transparencia en tu reserva:
                </p>
                <p className="leading-relaxed text-[#5C524A]">
                  Para reservar se abona el 20% inicial, el cual se descuenta del valor total de la sesión. El saldo restante (80%) se cancela por transferencia bancaria directa a tu facilitador antes o al iniciar el encuentro.
                </p>
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            Online (Google Meet) y presencial en Santiago, Viña del Mar y Concepción
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            Facilitadores con verificación de formación
          </span>
        </div>

        {/* Aclaración ética obligatoria en la home */}
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
