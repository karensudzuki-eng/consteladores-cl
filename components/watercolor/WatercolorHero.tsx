"use client";

import React from "react";
import Image from "next/image";

interface WatercolorHeroProps {
  onBookClick: () => void;
  onOpenTriage: () => void;
}

export function WatercolorHero({ onBookClick, onOpenTriage }: WatercolorHeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Fondo de acuarela orgánico con la imagen de vínculos familiares */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30">
        <Image
          src="/images/media_1792558542382_d9e48020.webp"
          alt="Vínculos familiares e ilustración de acuarela"
          fill
          priority
          className="object-cover object-center filter blur-[1px] mix-blend-multiply"
        />
        {/* Degradado para fundir suavemente con el fondo marfil pergamino */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/55 to-[#FAF8F5]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Insignia Neuromarketing de Pertenencia y Contención */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3ECE2]/90 border border-[#E7DECE] text-[#5C524A] text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-terracotta-500 animate-pulse" />
          Terapia Sistémica & Reconciliación con las Raíces · Chile
        </div>

        {/* Gancho Emocional TOFU (Identificación Inmediata con el Dolor Silencioso) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#27221F] tracking-tight leading-[1.18] mb-6">
          ¿Sientes que cargas con un peso <br className="hidden sm:block" />
          <span className="italic font-serif text-terracotta-500">que no te pertenece?</span>
        </h1>

        {/* Subtítulo Empático y Traducción a Alivio Tangible (Cero Esoterismo) */}
        <p className="text-lg sm:text-xl text-[#5C524A] font-normal leading-relaxed max-w-2xl mx-auto mb-9">
          Patrones de pareja que se repiten, estancamiento con el dinero o dolores familiares heredados.
          Las constelaciones familiares te permiten mirar el origen invisible de lo que te frena,
          dar lugar a lo no dicho y recuperar la fuerza de tu propia vida.
        </p>

        {/* Acciones Principales: Test Orientador (Alto CRO) + Explorar Directorio */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenTriage}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>✦</span>
            Orientador Sistémico (Test en 30s)
          </button>
          
          <a
            href="#directorio"
            className="w-full sm:w-auto px-7 py-3.5 text-base font-medium text-[#5C524A] hover:text-[#27221F] bg-[#FAF8F5]/90 hover:bg-[#F3ECE2] border border-[#E7DECE] rounded-full transition-colors"
          >
            Ver Directorio y Talleres
          </a>
        </div>

        {/* Micro-Garantías de Confianza y CRO */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#8A7E73] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-ochre-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Reserva hoy con solo el 20%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-ochre-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Online (Google Meet) & Presencial Chile
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-ochre-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Facilitadores acreditados con revisión manual
          </span>
        </div>

        {/* Nota de Contención / Crisis */}
        <div className="mt-12 pt-6 border-t border-[#E7DECE]/60 max-w-xl mx-auto">
          <p className="text-[12px] text-[#8A7E73] leading-relaxed">
            <strong className="font-medium text-[#5C524A]">Espacio de cuidado y ética:</strong> Si estás viviendo una situación de crisis emocional severa o riesgo vital, comunícate de inmediato al fono de prevención de salud mental <span className="font-semibold text-terracotta-600">*4141</span> (gratuito, 24/7 en Chile).
          </p>
        </div>

      </div>
    </section>
  );
}
