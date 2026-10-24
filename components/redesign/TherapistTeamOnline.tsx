"use client";

import React from "react";

export interface VerifiedTherapist {
  id: string;
  name: string;
  headline: string;
  schoolAndYear: string;
  modality: string;
  experienceYearsText: string;
  languagesText: string;
  totalPriceClp: number;
  depositPriceClp: number;
  balancePriceClp: number;
  isValidated: boolean;
}

// Inicialmente vacío: se puebla dinámicamente desde la base de datos
export const onlineTherapists: VerifiedTherapist[] = [];

interface TherapistTeamOnlineProps {
  onSelectTherapist: (therapist: VerifiedTherapist) => void;
}

export function TherapistTeamOnline({ onSelectTherapist }: TherapistTeamOnlineProps) {
  if (onlineTherapists.length === 0) return null;

  return (
    <section id="facilitadores-online" className="py-16 sm:py-20 bg-cream-50 border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-serif text-[#27221F]">Facilitadores Certificados</h2>
        </div>
      </div>
    </section>
  );
}
