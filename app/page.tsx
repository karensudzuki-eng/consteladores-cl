"use client";

import React, { useState } from "react";
import { CleanNavbar } from "@/components/redesign/CleanNavbar";
import { HeroSection } from "@/components/redesign/HeroSection";
import { PaymentExplainer } from "@/components/redesign/PaymentExplainer";
import { OnlineServiceCatalog, OnlineService, onlineServicesList } from "@/components/redesign/OnlineServiceCatalog";
import { TherapistTeamOnline, VerifiedTherapist, onlineTherapists } from "@/components/redesign/TherapistTeamOnline";
import { TestimonialsAndAbout } from "@/components/redesign/TestimonialsAndAbout";
import { CleanFAQ } from "@/components/redesign/CleanFAQ";
import { CleanFooter } from "@/components/redesign/CleanFooter";
import { FloatingWhatsApp } from "@/components/redesign/FloatingWhatsApp";
import { StickyMobileBar } from "@/components/redesign/StickyMobileBar";
import { BookingFlowModal } from "@/components/agendapro/BookingFlowModal";

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
    <div className="min-h-screen bg-cream-100 text-charcoal-900 font-sans pb-16 sm:pb-0">
      
      {/* 1. Navegación superior limpia y sobria */}
      <CleanNavbar onBookClick={() => handleOpenBooking()} />

      {/* 2. Banner principal de sensibilización, contención y contraste WCAG AA */}
      <HeroSection onBookClick={() => handleOpenBooking()} />

      {/* Contenedor central */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 3. Catálogo de servicios 100% online con desglose de reserva 20% */}
        <OnlineServiceCatalog onSelectService={handleOpenBooking} />

      </main>

      {/* 4. Sección explicativa: ¿Cómo funciona el pago? (20% + 80%) y política de cancelación */}
      <PaymentExplainer />

      {/* 5. Perfiles de facilitadores con insignia Validado y foto real pendiente */}
      <TherapistTeamOnline onSelectTherapist={handleSelectTherapist} />

      {/* 6. Quiénes somos y bloque de testimonios pendientes */}
      <TestimonialsAndAbout />

      {/* 7. Preguntas frecuentes sin afirmaciones absolutas */}
      <CleanFAQ />

      {/* 8. Pie de página con datos legales y horario de Chile continental */}
      <CleanFooter />

      {/* Botón flotante accesible de WhatsApp */}
      <FloatingWhatsApp />

      {/* Barra fija inferior para dispositivos móviles */}
      <StickyMobileBar onBookClick={() => handleOpenBooking()} />

      {/* Modal interactivo de agendamiento con pago de reserva del 20% */}
      <BookingFlowModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
        initialTherapist={selectedTherapist}
      />

    </div>
  );
}
