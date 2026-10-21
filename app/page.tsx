"use client";

import React, { useState } from "react";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorHero } from "@/components/watercolor/WatercolorHero";
import { WatercolorPhilosophy } from "@/components/watercolor/WatercolorPhilosophy";
import { WatercolorServices } from "@/components/watercolor/WatercolorServices";
import { WatercolorPaymentExplainer } from "@/components/watercolor/WatercolorPaymentExplainer";
import { WatercolorTherapists } from "@/components/watercolor/WatercolorTherapists";
import { WatercolorTherapistCTA } from "@/components/watercolor/WatercolorTherapistCTA";
import { WatercolorAbout } from "@/components/watercolor/WatercolorAbout";
import { WatercolorFAQ } from "@/components/watercolor/WatercolorFAQ";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { WatercolorFloatingWhatsApp } from "@/components/watercolor/WatercolorFloatingWhatsApp";
import { WatercolorStickyMobileBar } from "@/components/watercolor/WatercolorStickyMobileBar";
import { WatercolorBookingModal } from "@/components/watercolor/WatercolorBookingModal";
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800 pb-16 sm:pb-0">
      
      {/* 1. Barra de Navegación con Amonite y Tipografía Cursiva Armoniosa */}
      <WatercolorNavbar onBookClick={() => handleOpenBooking()} />

      {/* 2. Hero Principal con Fondo de Acuarela, Títulos Centrados y sin WhatsApp en el cuadro */}
      <WatercolorHero onBookClick={() => handleOpenBooking()} />

      {/* 3. ¿Qué es una constelación? y los 3 Órdenes del Amor en Tarjetas Pasteles */}
      <WatercolorPhilosophy />

      {/* 4. Servicios 100% Online con Desglose 20% / 80% */}
      <WatercolorServices onSelectService={handleOpenBooking} />

      {/* 5. ¿Cómo funciona el pago del 20%? */}
      <WatercolorPaymentExplainer />

      {/* 6. Facilitadores Verificados en Chile con Títulos Centrados */}
      <WatercolorTherapists onSelectTherapist={handleSelectTherapist} />

      {/* 7. Para Consteladores: Botón estricto "Postular como facilitador" */}
      <WatercolorTherapistCTA />

      {/* 8. Quiénes Somos y Testimonios */}
      <WatercolorAbout />

      {/* 9. Preguntas Frecuentes en Acordeón Suave */}
      <WatercolorFAQ />

      {/* 10. Pie de Página Ético con Disclaimer y Línea *4141 */}
      <WatercolorFooter />

      {/* Botón Flotante de WhatsApp (Exclusivo en esquina inferior, cero verde chillón) */}
      <WatercolorFloatingWhatsApp />

      {/* Barra móvil fija inferior con precio desde $9.000 (20%) */}
      <WatercolorStickyMobileBar onBookClick={() => handleOpenBooking()} />

      {/* Modal de Agendamiento Online Adaptado a Acuarela y Pergamino */}
      <WatercolorBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
        initialTherapist={selectedTherapist}
      />

    </div>
  );
}
