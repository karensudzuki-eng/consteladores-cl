"use client";

import React from "react";

export interface VerifiedTherapist {
  id: string;
  name: string;
  headline: string;
  schoolAndYear: string; // [dato pendiente]
  modality: string; // Online vía Google Meet
  experienceYearsText: string; // [dato pendiente]
  languagesText: string; // [dato pendiente]
  totalPriceClp: number;
  depositPriceClp: number; // 20%
  balancePriceClp: number; // 80%
  isValidated: boolean;
}

export const onlineTherapists: VerifiedTherapist[] = [
  {
    id: "maria-paz-vial",
    name: "María Paz Vial",
    headline: "Facilitadora en Vínculos y Duelo",
    schoolAndYear: "[Escuela formativa y año de titulación - dato pendiente]",
    modality: "Online vía Google Meet",
    experienceYearsText: "[Años de práctica - dato pendiente]",
    languagesText: "[Español - otros idiomas dato pendiente]",
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    isValidated: true,
  },
  {
    id: "rodrigo-san-martin",
    name: "Rodrigo San Martín",
    headline: "Constelador Sistémico • Vocación y Proyectos",
    schoolAndYear: "[Escuela formativa y año de titulación - dato pendiente]",
    modality: "Online vía Google Meet",
    experienceYearsText: "[Años de práctica - dato pendiente]",
    languagesText: "[Español - otros idiomas dato pendiente]",
    totalPriceClp: 48000,
    depositPriceClp: 9600,
    balancePriceClp: 38400,
    isValidated: true,
  },
  {
    id: "camila-echeverria",
    name: "Camila Echeverría",
    headline: "Facilitadora Sistémica • Pareja y Síntomas",
    schoolAndYear: "[Escuela formativa y año de titulación - dato pendiente]",
    modality: "Online vía Google Meet",
    experienceYearsText: "[Años de práctica - dato pendiente]",
    languagesText: "[Español - otros idiomas dato pendiente]",
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    isValidated: true,
  },
];

interface TherapistTeamOnlineProps {
  onSelectTherapist: (therapist: VerifiedTherapist) => void;
}

export function TherapistTeamOnline({ onSelectTherapist }: TherapistTeamOnlineProps) {
  return (
    <section id="facilitadores" className="py-16 sm:py-20 bg-cream-50 border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Facilitadores Acreditados
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
            Nuestros facilitadores online
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Profesionales verificados con formación en constelaciones sistémicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {onlineTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="p-6 rounded-2xl bg-white border border-cream-200 hover:border-forest-500/50 transition-all shadow-subtle hover:shadow-card flex flex-col justify-between"
            >
              <div>
                {/* Espacio marcado para foto real pendiente (sin foto de stock falsa) */}
                <div className="w-full aspect-[4/3] rounded-xl bg-cream-200/70 border-2 border-dashed border-cream-300 flex flex-col items-center justify-center p-4 text-center mb-5">
                  <div className="w-12 h-12 rounded-full bg-cream-300 text-charcoal-500 flex items-center justify-center font-bold text-sm mb-1.5">
                    {therapist.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-xs font-medium text-charcoal-500">
                    [foto real pendiente]
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-bold text-lg text-charcoal-900">
                    {therapist.name}
                  </h3>
                  {therapist.isValidated && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 text-[11px] font-bold border border-forest-200">
                      ✓ Validado
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-forest-700 mb-4">
                  {therapist.headline}
                </p>

                {/* Datos requeridos del facilitador */}
                <div className="p-3.5 rounded-xl bg-cream-100/60 border border-cream-200 text-xs text-charcoal-600 space-y-1.5 mb-5 leading-snug">
                  <div>
                    <strong className="text-charcoal-800">Formación:</strong>{" "}
                    <span className="text-charcoal-500">{therapist.schoolAndYear}</span>
                  </div>
                  <div>
                    <strong className="text-charcoal-800">Modalidad:</strong>{" "}
                    <span>{therapist.modality}</span>
                  </div>
                  <div>
                    <strong className="text-charcoal-800">Años de práctica:</strong>{" "}
                    <span className="text-charcoal-500">{therapist.experienceYearsText}</span>
                  </div>
                  <div>
                    <strong className="text-charcoal-800">Idiomas:</strong>{" "}
                    <span className="text-charcoal-500">{therapist.languagesText}</span>
                  </div>
                </div>
              </div>

              {/* Desglose de Pago 20% y CTA específico */}
              <div className="pt-3 border-t border-cream-200 space-y-3">
                <div className="text-xs">
                  <div className="flex justify-between text-charcoal-900 font-bold">
                    <span>Total:</span>
                    <span>${therapist.totalPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between text-forest-700 font-medium text-[11px] mt-0.5">
                    <span>Reserva hoy (20%):</span>
                    <span>${therapist.depositPriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between text-charcoal-400 text-[11px]">
                    <span>Saldo pendiente (80%):</span>
                    <span>${therapist.balancePriceClp.toLocaleString("es-CL")} CLP</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTherapist(therapist)}
                  className="w-full py-2.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-ochre-600"
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
