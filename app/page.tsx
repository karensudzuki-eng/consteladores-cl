"use client";

import React, { useState } from "react";
import { MercuryNavbar } from "@/components/mercury/MercuryNavbar";
import { MercuryHero } from "@/components/mercury/MercuryHero";
import { MercuryPhilosophy } from "@/components/mercury/MercuryPhilosophy";
import { MercuryServices } from "@/components/mercury/MercuryServices";
import { MercuryPaymentExplainer } from "@/components/mercury/MercuryPaymentExplainer";
import { MercuryTherapists } from "@/components/mercury/MercuryTherapists";
import { MercuryTherapistCTA } from "@/components/mercury/MercuryTherapistCTA";
import { MercuryTestimonialsAndAbout } from "@/components/mercury/MercuryTestimonialsAndAbout";
import { MercuryFAQ } from "@/components/mercury/MercuryFAQ";
import { MercuryFooter } from "@/components/mercury/MercuryFooter";
import { MercuryFloatingWhatsApp } from "@/components/mercury/MercuryFloatingWhatsApp";
import { MercuryStickyMobileBar } from "@/components/mercury/MercuryStickyMobileBar";
import { MercuryBookingModal } from "@/components/mercury/MercuryBookingModal";
import { OnlineService, onlineServicesList } from "@/components/redesign/OnlineServiceCatalog";
import { VerifiedTherapist, onlineTherapists } from "@/components/redesign/TherapistTeamOnline";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<OnlineService | null>(onlineServicesList[0]);
  const [selectedTherapist, setSelectedTherapist] = useState<VerifiedTherapist | null>(onlineTherapists[0]);

  const handleOpenBooking = (service?: OnlineService) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(onlineServicesList[0]);
    }
    setIsBookingOpen(true);
  };

  const handleSelectTherapist = (therapist: VerifiedTherapist) => {
    setSelectedTherapist(therapist);
    setSelectedService(onlineServicesList[0]);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#171721] text-[#ededf3] font-sans antialiased selection:bg-[#5266eb]/30 selection:text-[#ffffff] pb-16 sm:pb-0">
      
      {/* 1. Transparent Top Navigation Bar with Blur on Scroll */}
      <MercuryNavbar onBookClick={() => handleOpenBooking()} />

      {/* 2. Full-Bleed Atmospheric Photographic Hero (Roots, Memory, Bonds) */}
      <MercuryHero onBookClick={() => handleOpenBooking()} />

      {/* 3. Para Consultantes: Filosofía y Órdenes del Amor (Graphite Cards, Centered Titles) */}
      <MercuryPhilosophy />

      {/* 4. Catálogo de Servicios 100% Online con Reserva 20% / Saldo 80% */}
      <MercuryServices onSelectService={handleOpenBooking} />

      {/* 5. ¿Cómo Funciona el Pago? (3 Pasos, Medios de Pago y Cancelación) */}
      <MercuryPaymentExplainer />

      {/* 6. Facilitadores Validados (Graphite Cards, Centered Titles, Foto Pendiente) */}
      <MercuryTherapists onSelectTherapist={handleSelectTherapist} />

      {/* 7. Para Consteladores: Acceso y Convocatoria de Acreditación */}
      <MercuryTherapistCTA />

      {/* 8. Quiénes Somos y Testimonios Reales Pendientes */}
      <MercuryTestimonialsAndAbout />

      {/* 9. Preguntas Frecuentes (Minimalist Accordion in Graphite) */}
      <MercuryFAQ />

      {/* 10. Disclaimer Banner Footnote & Legal Footer */}
      <MercuryFooter />

      {/* Botón flotante accesible de WhatsApp (Obsidian / Ivory, cero verde) */}
      <MercuryFloatingWhatsApp />

      {/* Barra móvil fija inferior con botón Cobalt */}
      <MercuryStickyMobileBar onBookClick={() => handleOpenBooking()} />

      {/* Modal de Agendamiento Online (Graphite Card #1e1e2a, Pill Inputs, Cobalt Action) */}
      <MercuryBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
        initialTherapist={selectedTherapist}
      />

    </div>
  );
}
