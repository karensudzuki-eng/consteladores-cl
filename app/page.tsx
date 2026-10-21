"use client";

import React, { useState } from "react";
import { HeaderProfile } from "@/components/agendapro/HeaderProfile";
import { ServiceCatalog, ServiceItem, servicesData } from "@/components/agendapro/ServiceCatalog";
import { BookingFlowModal, TherapistOption, defaultTherapists } from "@/components/agendapro/BookingFlowModal";
import { SystemicPhilosophy } from "@/components/icalma/SystemicPhilosophy";
import { TherapistsTeam } from "@/components/icalma/TherapistsTeam";
import { ConsteladorCTAModern } from "@/components/landing/ConsteladorCTAModern";
import { FAQSectionModern } from "@/components/landing/FAQSectionModern";
import { ModernFooter } from "@/components/landing/ModernFooter";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(servicesData[0]);

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(servicesData[0]);
    }
    setIsBookingOpen(true);
  };

  const handleSelectTherapist = (therapist: TherapistOption) => {
    // Al seleccionar terapeuta, abrimos el modal de reserva con el servicio individual
    setSelectedService(servicesData[0]);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. Cabecera institucional y de datos estilo AgendaPro (Rumbo Sagrado) */}
      <HeaderProfile onBookClick={() => handleOpenBooking()} />

      {/* Contenedor principal de servicios y agendamiento */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Banner de aviso para el consultante */}
        <div className="mt-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🌿</span>
            <span>
              <strong>Atención online y presencial:</strong> Sesiones individuales guiadas por Google Meet y talleres presenciales en Santiago.
            </span>
          </div>
          <button
            onClick={() => handleOpenBooking()}
            className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs whitespace-nowrap self-start sm:self-auto"
          >
            Agendar ahora
          </button>
        </div>

        {/* 2. Catálogo de Servicios estilo AgendaPro con precios en CLP */}
        <section id="servicios">
          <div className="pt-8 pb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Catálogo de Servicios
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Elige tu sesión de constelación familiar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Selecciona el formato que mejor responda a tu necesidad actual y reserva tu hora en línea con confirmación inmediata.
            </p>
          </div>

          <ServiceCatalog onSelectService={handleOpenBooking} />
        </section>

      </main>

      {/* 3. Filosofía y rigor sistémico estilo Icalma (constelacionesfamiliares.cl) */}
      <SystemicPhilosophy />

      {/* 4. Equipo de Facilitadores Certificados de la Red */}
      <TherapistsTeam onSelectTherapist={handleSelectTherapist} />

      {/* 5. Convocatoria para Facilitadores ("Soy Constelador") */}
      <ConsteladorCTAModern />

      {/* 6. Preguntas Frecuentes sobre el Agendamiento y la Sesión */}
      <FAQSectionModern />

      {/* 7. Pie de página profesional */}
      <ModernFooter />

      {/* 8. MODAL INTERACTIVO DE AGENDAMIENTO ESTILO AGENDAPRO */}
      <BookingFlowModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />

    </div>
  );
}
