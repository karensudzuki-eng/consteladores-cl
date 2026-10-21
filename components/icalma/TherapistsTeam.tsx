"use client";

import React from "react";
import Image from "next/image";
import { TherapistOption, defaultTherapists } from "../agendapro/BookingFlowModal";

interface TherapistsTeamProps {
  onSelectTherapist: (therapist: TherapistOption) => void;
}

export function TherapistsTeam({ onSelectTherapist }: TherapistsTeamProps) {
  return (
    <section id="facilitadores" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Equipo de la Red
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight mt-2">
              Facilitadores certificados en Chile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Profesionales titulados en centros de formación sistémica avalados en Chile y el mundo.
            </p>
          </div>
          
          <span className="text-xs text-slate-500 font-medium">
            3 facilitadores activos con disponibilidad inmediata
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {defaultTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-400 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <Image
                      src={therapist.avatarUrl}
                      alt={therapist.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900">
                      {therapist.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">
                      {therapist.headline}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1 mb-5">
                  <p>
                    <strong className="text-slate-800">Formación:</strong> {therapist.approach}
                  </p>
                  <p>
                    <strong className="text-slate-800">Modalidad:</strong> Online vía Google Meet
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block uppercase">
                    Sesión individual
                  </span>
                  <span className="text-base font-bold text-slate-900">
                    ${therapist.priceClp.toLocaleString("es-CL")} CLP
                  </span>
                </div>

                <button
                  onClick={() => onSelectTherapist(therapist)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Ver agenda y horas
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
