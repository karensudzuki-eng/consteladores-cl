"use client";

import React from "react";
import Link from "next/link";

export function WatercolorTherapistCTA() {
  return (
    <section id="soy-constelador" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E7DECE]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Contenedor en Terracota Pastel Suave */}
        <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-3 block">
            Espacio para Profesionales Sistémicos
          </span>

          {/* Título de Sección Estrictamente Centrado */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-5">
            ¿Eres facilitador en constelaciones familiares?
          </h2>

          {/* Copy Cálido y Cercano */}
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed max-w-2xl mx-auto mb-8">
            Si te formaste en una escuela sistémica reconocida y ejerces con vocación ética, te invitamos a ser parte de nuestra red en Chile. Gestionamos el agendamiento, las reservas con el 20% y las salas virtuales para que puedas dedicarte plenamente a acompañar.
          </p>

          {/* Botón que dice estrictamente "Postular como facilitador" SIN el texto secundario de 24 a 48 hrs */}
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/registro-terapeuta"
              className="px-8 py-3.5 text-base font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99]"
            >
              Postular como facilitador
            </Link>
          </div>

          {/* Requisitos éticos en viñetas simples */}
          <div className="mt-10 pt-6 border-t border-terracotta-200/60 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8A7E73]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              Diploma acreditado de constelador
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              Experiencia en sesiones individuales online
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              Adhesión a código de ética y contención
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
