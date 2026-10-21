"use client";

import React from "react";
import { VerifiedTherapist, onlineTherapists } from "../redesign/TherapistTeamOnline";

interface MercuryTherapistsProps {
  onSelectTherapist: (therapist: VerifiedTherapist) => void;
}

export function MercuryTherapists({ onSelectTherapist }: MercuryTherapistsProps) {
  return (
    <section id="facilitadores" className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <div className="max-w-[680px] mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Facilitadores Acreditados
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            Equipo de consteladores online
          </h2>
          <p className="text-sm sm:text-base text-[#c3c3cc] leading-[1.5] text-center">
            Profesionales verificados con acreditación formativa en escuelas sistémicas avaladas en Chile y el mundo.
          </p>
        </div>

        {/* 3 Column Grid in Graphite Cards (#1e1e2a, 12px radius, 32px padding, centered titles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {onlineTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 flex flex-col justify-between text-center transition-colors hover:border-[#e2e3ed]/25"
            >
              <div>
                {/* [foto real pendiente] placeholder container */}
                <div className="w-full aspect-[4/3] rounded-[10px] bg-[#272735] border border-[#e2e3ed]/10 flex flex-col items-center justify-center p-4 text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#171721] border border-[#e2e3ed]/20 text-[#ededf3] flex items-center justify-center font-[480] text-sm mb-2">
                    {therapist.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs text-[#c3c3cc] font-[400]">
                    [foto real pendiente]
                  </span>
                </div>

                {/* Validation Tag Centered */}
                <div className="flex justify-center mb-2">
                  <span className="px-3 py-1 rounded-[40px] bg-[#272735] text-[#ededf3] text-[11px] font-[480] border border-[#e2e3ed]/15">
                    ✓ Validado
                  </span>
                </div>

                {/* Card Title Strictly Centered */}
                <h3 className="font-sans font-[480] text-xl text-[#ededf3] text-center mb-1 tracking-[0.015em]">
                  {therapist.name}
                </h3>

                <p className="text-xs text-[#5266eb] font-[480] text-center mb-5">
                  {therapist.headline}
                </p>

                {/* Required Details with transparent placeholders */}
                <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/10 text-xs text-[#c3c3cc] space-y-2 mb-6 text-center leading-[1.4]">
                  <div>
                    <span className="block text-[#ededf3] font-[480]">Formación:</span>
                    <span>{therapist.schoolAndYear}</span>
                  </div>
                  <div>
                    <span className="block text-[#ededf3] font-[480]">Modalidad:</span>
                    <span>{therapist.modality}</span>
                  </div>
                  <div>
                    <span className="block text-[#ededf3] font-[480]">Años de práctica:</span>
                    <span>{therapist.experienceYearsText}</span>
                  </div>
                  <div>
                    <span className="block text-[#ededf3] font-[480]">Idiomas:</span>
                    <span>{therapist.languagesText}</span>
                  </div>
                </div>
              </div>

              {/* Price and Action Button Centered */}
              <div className="pt-4 border-t border-[#70707d]/20 space-y-4">
                <div className="text-xs space-y-1 text-center">
                  <div className="flex justify-between text-[#ededf3] font-[480]">
                    <span>Total sesión:</span>
                    <span>${therapist.totalPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between text-[#5266eb] font-[480] text-[11px]">
                    <span>Reserva hoy (20%):</span>
                    <span>${therapist.depositPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between text-[#c3c3cc]/60 text-[11px]">
                    <span>Saldo restante (80%):</span>
                    <span>${therapist.balancePriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTherapist(therapist)}
                  className="w-full py-3 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-xs sm:text-sm shadow-none transition-all"
                >
                  Ver agenda de {therapist.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
