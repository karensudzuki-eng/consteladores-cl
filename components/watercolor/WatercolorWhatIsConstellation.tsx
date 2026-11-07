"use client";

import React from "react";
import Link from "next/link";

interface WatercolorWhatIsConstellationProps {
  onBookClick?: () => void;
}

export function WatercolorWhatIsConstellation({ onBookClick }: WatercolorWhatIsConstellationProps) {
  return (
    <section id="que-es" className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#E7DECE]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-terracotta-600 mb-3">
          Comprensión y Alivio Sistémico
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-6">
          ¿Qué es una constelación familiar?
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-[#5C524A] leading-relaxed text-left sm:text-center max-w-3xl mx-auto mb-10">
          <p>
            Una constelación familiar es un abordaje sistémico y vivencial que permite mirar con profundo respeto y compasión las dinámicas ocultas en nuestras relaciones familiares, personales y laborales.
          </p>
          <p>
            Su objetivo es identificar y ordenar patrones repetitivos, lealtades inconscientes, duelos pendientes o bloqueos emocionales que cargamos a veces sin saberlo. Al traer una imagen clara del conflicto frente a nosotros, comprendemos el lugar de cada miembro del sistema: <em>algo dentro se calma, se alivia el peso y se abre espacio para una vida más plena y consciente.</em>
          </p>
        </div>

        {/* Pilares sutiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-12">
          <div className="bg-white/80 p-6 rounded-2xl border border-[#E7DECE] shadow-sm">
            <div className="text-2xl mb-2">🌱</div>
            <h3 className="font-serif font-bold text-base text-[#27221F] mb-1">
              Mirar el Origen
            </h3>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              Observar los nudos o exclusiones en el árbol genealógico sin emitir juicios ni culpas.
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-2xl border border-[#E7DECE] shadow-sm">
            <div className="text-2xl mb-2">🕊️</div>
            <h3 className="font-serif font-bold text-base text-[#27221F] mb-1">
              Aliviar la Carga
            </h3>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              Soltar responsabilidades o lealtades emocionales que pertenecen a otros miembros de la familia.
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-2xl border border-[#E7DECE] shadow-sm">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-serif font-bold text-base text-[#27221F] mb-1">
              Integrar y Avanzar
            </h3>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              Tomar la fuerza vital de nuestros ancestros para caminar con autonomía hacia nuestros propios proyectos.
            </p>
          </div>
        </div>

        {/* Botones de acción directos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {onBookClick ? (
            <button
              onClick={onBookClick}
              type="button"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              Reservar sesión individual
            </button>
          ) : (
            <a
              href="#servicios"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-95 text-center"
            >
              Reservar sesión individual
            </a>
          )}

          <a
            href="#talleres"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-[#F3ECE2] border border-[#E7DECE] text-[#27221F] font-medium text-sm shadow-sm transition-all active:scale-95 text-center"
          >
            Ver talleres vivenciales
          </a>
        </div>

      </div>
    </section>
  );
}
