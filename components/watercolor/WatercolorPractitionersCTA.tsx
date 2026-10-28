"use client";

import React from "react";
import Link from "next/link";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";

export function WatercolorPractitionersCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FCFAF7] border-2 border-sage-500/30 rounded-3xl p-8 sm:p-12 shadow-sm text-center relative card-hover-elevate">
          
          {/* Insignia de Sección */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-5 mx-auto">
            <FamilyTreeIcon className="w-4 h-4" />
            <span>Formación y Aprendizaje Clínico</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F] mb-4">
            Practica con nosotros: Sesiones en formación supervisada
          </h2>

          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Abrimos un espacio dedicado a consultantes que desean participar en sesiones individuales online conducidas por practicantes que han completado su formación teórica y se encuentran sumando horas clínicas bajo supervisión docente continua.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left text-xs max-w-3xl mx-auto">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="font-semibold text-sage-800 block mb-1">Docente Supervisor Visible</span>
              <p className="text-[#5C524A] leading-relaxed">
                Cada practicante indica el nombre de su docente guía y la institución formativa de origen.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="font-semibold text-sage-800 block mb-1">Modalidad 100% Online</span>
              <p className="text-[#5C524A] leading-relaxed">
                Sesiones individuales vía Google Meet, sin talleres grupales en esta modalidad de práctica.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="font-semibold text-sage-800 block mb-1">Consentimiento Transparente</span>
              <p className="text-[#5C524A] leading-relaxed">
                Información clara antes de agendar y opción de derivación a facilitador acreditado.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/practica"
              className="px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow transition-all"
            >
              Conocer el programa de practicantes
            </Link>

            <Link
              href="/criterios"
              className="px-6 py-3.5 text-sm font-medium text-[#5C524A] hover:text-[#27221F] underline underline-offset-4"
            >
              Ver diferencias con facilitadores acreditados →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
