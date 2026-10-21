"use client";

import React from "react";
import { onlineTherapists, VerifiedTherapist } from "../redesign/TherapistTeamOnline";

interface WatercolorTherapistsProps {
  onSelectTherapist: (therapist: VerifiedTherapist) => void;
}

export function WatercolorTherapists({ onSelectTherapist }: WatercolorTherapistsProps) {
  return (
    <section id="facilitadores" className="py-16 sm:py-24 bg-[#FCFAF7] border-t border-[#E7DECE]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-2 block">
            Acreditación y Confianza
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Facilitadores verificados en Chile
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Cada constelador de nuestra red ha completado formación certificada en escuelas sistémicas reconocidas y ha sido validado manualmente para asegurar un acompañamiento humano y ético.
          </p>
        </div>

        {/* Tarjetas de Terapeutas en Cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {onlineTherapists.map((therapist) => {
            const initials = therapist.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            return (
              <div
                key={therapist.id}
                className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  
                  {/* Avatar / Monograma Artístico Humano con [Foto real pendiente] */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-2xl font-semibold shadow-inner">
                      {initials}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-ochre-500 text-white flex items-center justify-center text-xs shadow" title="Perfil verificado">
                      ✓
                    </span>
                  </div>

                  <span className="text-[11px] text-[#8A7E73] italic mb-2">
                    [Foto real pendiente]
                  </span>

                  {/* Nombre y Especialidad Estrictamente Centrados */}
                  <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-1">
                    {therapist.name}
                  </h3>

                  <p className="text-sm font-medium text-terracotta-600 mb-3">
                    {therapist.headline}
                  </p>

                  <div className="text-xs text-[#5C524A] space-y-1 mb-6 bg-[#FCFAF7] p-3 rounded-xl border border-[#E7DECE]/70 w-full">
                    <p className="font-medium text-[#27221F]">Online vía Google Meet</p>
                    <p className="text-[#8A7E73]">{therapist.schoolAndYear}</p>
                  </div>

                  {/* Desglose de Valores */}
                  <div className="w-full bg-[#FAF8F5] border border-[#E7DECE] rounded-xl p-3.5 mb-6 text-center">
                    <div className="text-xs text-[#8A7E73] uppercase tracking-wider mb-1">
                      Valor sesión completa: <strong className="text-[#27221F] font-semibold">${therapist.totalPriceClp.toLocaleString("es-CL")}</strong>
                    </div>
                    <div className="text-sm font-medium text-terracotta-600">
                      Reserva hoy (20%): <strong className="text-base font-bold">${therapist.depositPriceClp.toLocaleString("es-CL")}</strong>
                    </div>
                    <div className="text-xs text-[#8A7E73]">
                      Saldo al sesionar: ${therapist.balancePriceClp.toLocaleString("es-CL")}
                    </div>
                  </div>

                </div>

                {/* Botón de Selección Centrado */}
                <button
                  onClick={() => onSelectTherapist(therapist)}
                  type="button"
                  className="w-full py-2.5 px-4 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all duration-200"
                >
                  Ver horarios y reservar
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
