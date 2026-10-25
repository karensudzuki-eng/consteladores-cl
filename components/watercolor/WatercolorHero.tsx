"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";

interface WatercolorHeroProps {
  onBookClick: () => void;
  onOpenTriage: () => void;
}

export function WatercolorHero({ onBookClick, onOpenTriage }: WatercolorHeroProps) {
  const [showDepositTooltip, setShowDepositTooltip] = useState(false);

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32 bg-[#FBF7F2]">
      {/* Fondo con imagen propia y velo crema con opacidad controlada por variable CSS */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/mirar-historia-sanar.png"
          alt="Mirar la historia para sanar - Ilustración en acuarela de raíces familiares y vínculos sistémicos"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Capa de velo crema (#FBF7F2) para garantizar contraste WCAG AA riguroso */}
        <div
          className="absolute inset-0 bg-[#FBF7F2] transition-opacity"
          style={{ opacity: "var(--overlay-hero-opacity, 0.80)" }}
        />
        {/* Suave degradado para fundir perfectamente con los bordes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F2]/90 via-transparent to-[#FBF7F2]" />
      </div>

      {/* Símbolo vivo en filigrana ambiental detrás del texto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 text-terracotta-700">
        <FamilyTreeIcon className="w-[420px] h-[420px] sm:w-[560px] sm:h-[560px]" isAnimated={true} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
        
        {/* Insignia Centrada con el Símbolo Vivo de las Raíces Familiares */}
        <div className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-cream-50/95 border border-terracotta-200/90 text-terracotta-700 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm mx-auto">
          <span className="text-terracotta-500 flex items-center justify-center">
            <FamilyTreeIcon className="w-4 h-4" isAnimated={true} />
          </span>
          <span className="text-[#38322E]">Terapia Sistémica & Reconciliación con las Raíces · Chile</span>
        </div>

        {/* Gancho Emocional TOFU (Alto contraste contra fondo crema) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#27221F] tracking-tight leading-[1.18] mb-6">
          ¿Sientes que cargas con un peso <br className="hidden sm:block" />
          <span className="italic font-serif text-terracotta-500">que no te pertenece?</span>
        </h1>

        {/* Subtítulo Empático y Traducción a Alivio Tangible */}
        <p className="text-lg sm:text-xl text-[#38322E] font-normal leading-relaxed max-w-2xl mx-auto mb-9">
          Patrones de pareja que se repiten, estancamiento con el dinero o dolores familiares heredados.
          Las constelaciones familiares te permiten mirar el origen invisible de lo que te frena,
          dar lugar a lo no dicho y recuperar la fuerza de tu propia vida.
        </p>

        {/* Acciones Principales con Efecto de Respiración Sutil en Hover */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenTriage}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 btn-breathe"
          >
            <span>✦</span>
            <span>Orientador Sistémico (Test en 30s)</span>
          </button>
          
          <a
            href="#directorio"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-[#27221F] bg-cream-50 hover:bg-cream-200/90 border-2 border-terracotta-400/90 hover:border-terracotta-600 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Ver Directorio y Talleres</span>
          </a>
        </div>

        {/* Micro-Garantías de Confianza con Claridad en la Oferta */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#4A423D] font-medium">
          
          {/* Mensaje transparente y cercano sobre el abono del 20% */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => setShowDepositTooltip(!showDepositTooltip)}
              onMouseEnter={() => setShowDepositTooltip(true)}
              onMouseLeave={() => setShowDepositTooltip(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-[#E7DECE] text-[#38322E] hover:border-terracotta-400 transition-colors text-xs cursor-pointer focus:outline-none"
              aria-label="Información sobre el abono de reserva del 20%"
            >
              <svg className="w-4 h-4 text-ochre-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Abono de reserva del 20% (descontable del total)</span>
              <span className="w-4 h-4 rounded-full bg-[#E7DECE] text-[#5C524A] text-[10px] flex items-center justify-center font-bold">?</span>
            </button>

            {/* Tooltip flotante con explicación transparente */}
            {showDepositTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3 bg-white border border-[#E7DECE] rounded-2xl shadow-xl text-left text-xs text-[#38322E] z-30 animate-fadeIn">
                <p className="font-semibold text-terracotta-600 mb-1">
                  Transparencia en tu reserva:
                </p>
                <p className="leading-relaxed text-[#5C524A]">
                  Para poder reservar la cita se debe abonar el <strong>20%</strong> ($9.000 CLP), el cual se descontará del valor total al momento de la sesión. El 80% restante se paga directamente a tu constelador.
                </p>
              </div>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            <svg className="w-4 h-4 text-ochre-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Online (Google Meet) & Presencial Chile
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-[#38322E]">
            <svg className="w-4 h-4 text-ochre-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Facilitadores acreditados con revisión manual
          </span>
        </div>

        {/* Nota de Contención / Crisis con Línea *4141 */}
        <div className="mt-12 pt-6 border-t border-[#E7DECE]/80 max-w-xl mx-auto">
          <p className="text-[12px] text-[#5C524A] leading-relaxed">
            <strong className="font-medium text-[#27221F]">Espacio de cuidado y ética:</strong> Si estás viviendo una situación de crisis emocional severa o riesgo vital, comunícate de inmediato al fono de prevención de salud mental <span className="font-semibold text-terracotta-600">*4141</span> (gratuito, 24/7 en Chile).
          </p>
        </div>

      </div>
    </section>
  );
}
