"use client";

import React from "react";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export function WatercolorAbout() {
  return (
    <section id="quienes-somos" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Cabecera Centrada */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-5 mx-auto shadow-sm">
          Origen y Propósito
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-6">
          Quiénes somos
        </h2>

        <div className="space-y-5 text-base sm:text-lg text-[#38322E] leading-relaxed max-w-3xl mx-auto mb-10 text-left sm:text-center font-normal">
          <p>
            <strong className="text-[#27221F] font-semibold">consteladores.cl</strong> es una plataforma chilena orientada a conectar a personas que buscan mirar y ordenar dinámicas de su sistema familiar con facilitadores acreditados y practicantes en supervisión.
          </p>
          <p>
            {CONFIG.ICALMA_BACKING_NOTICE}{" "}
            Centro pionero en la enseñanza, difusión y práctica de las constelaciones familiares en Chile con más de dos décadas de trayectoria docente continua.
          </p>
          <p className="text-sm text-[#5C524A]">
            Creemos en una práctica rigurosa, ética y fenomenológica: sin dogmas, sin promesas desmedidas y con profundo respeto por la autonomía de cada consultante.
          </p>
        </div>

        {/* Cuadro de Enlace y Criterios */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-2xl mx-auto shadow-sm">
          <div>
            <h3 className="text-base font-serif font-semibold text-[#27221F] mb-1">
              Conoce nuestro centro formador
            </h3>
            <p className="text-xs text-[#5C524A]">
              Revisa los programas académicos y el linaje de formación de Icalma.
            </p>
          </div>
          
          <a
            href={CONFIG.ICALMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-200 transition-colors shrink-0"
          >
            constelacionesfamiliares.cl →
          </a>
        </div>

      </div>
    </section>
  );
}
