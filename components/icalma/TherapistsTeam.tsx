"use client";

import React from "react";
import { VerifiedTherapist, onlineTherapists } from "../redesign/TherapistTeamOnline";

interface TherapistsTeamProps {
  onSelectTherapist: (therapist: VerifiedTherapist) => void;
}

export function TherapistsTeam({ onSelectTherapist }: TherapistsTeamProps) {
  return (
    <section id="facilitadores-antiguo" className="hidden">
      {/* Componente preservado por compatibilidad */}
    </section>
  );
}
