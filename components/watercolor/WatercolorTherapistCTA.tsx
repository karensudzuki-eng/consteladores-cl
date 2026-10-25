"use client";

import React from "react";
import Link from "next/link";

export function WatercolorTherapistCTA() {
  return (
    <section id="soy-constelador" className="py-16 sm:py-24 bg-[#FBF7F2] border-t border-[#E7DECE]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Contenedor en Terracota Pastel Suave */}
        <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-3 block">
            Ecosistema de Formación y Respaldo para Profesionales Sistémicos
          </span>

          {/* Título de Sección */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-5">
            ¿Eres facilitador en constelaciones familiares?
          </h2>

          {/* Copy Neuromarketing B2B: Cero venta en frío, enfoque en vocación */}
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed max-w-2xl mx-auto mb-8">
            Sabemos lo agotador que es lidiar con el marketing digital, perseguir pagos y vender en frío.
            En <strong>consteladores.cl</strong> conectamos tu experiencia con personas que ya comprenden y buscan activamente la mirada sistémica,
            gestionando tu agenda, el cobro de la reserva del 20% y la difusión de tus talleres presenciales y online.
          </p>

          {/* Ventajas para el Facilitador */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9 text-left">
            <div className="bg-[#FCFAF7] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="text-terracotta-600 font-bold text-sm block mb-1">01. Cero No-Shows</span>
              <p className="text-xs text-[#5C524A]">
                El consultante abona el 20% para asegurar el horario, garantizando asistencia real y compromiso con su proceso.
              </p>
            </div>
            <div className="bg-[#FCFAF7] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="text-terracotta-600 font-bold text-sm block mb-1">02. Difusión de Talleres</span>
              <p className="text-xs text-[#5C524A]">
                Publica tus jornadas vivenciales en Santiago y regiones en nuestro calendario nacional sin comisiones ocultas.
              </p>
            </div>
            <div className="bg-[#FCFAF7] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="text-terracotta-600 font-bold text-sm block mb-1">03. Sello Ético Verificado</span>
              <p className="text-xs text-[#5C524A]">
                Respaldamos tu formación acreditada frente a un mercado saturado de pseudoterapias sin fundamento.
              </p>
            </div>
          </div>

          {/* Botón que dice estrictamente "Postular como facilitador" */}
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
              Sesiones individuales o talleres en Chile
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
              Adhesión al código de ética sistémica
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
