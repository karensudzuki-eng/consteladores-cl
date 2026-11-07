"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cms/CMSContext";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorHero } from "@/components/watercolor/WatercolorHero";
import { WorkshopsCarousel } from "@/components/workshops/WorkshopsCarousel";
import { WorkshopDetailModal } from "@/components/workshops/WorkshopDetailModal";
import { WatercolorServices } from "@/components/watercolor/WatercolorServices";
import { WatercolorTestimonials } from "@/components/watercolor/WatercolorTestimonials";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { WatercolorFloatingWhatsApp } from "@/components/watercolor/WatercolorFloatingWhatsApp";
import { WatercolorStickyMobileBar } from "@/components/watercolor/WatercolorStickyMobileBar";
import { HumanInTheLoopModal } from "@/components/booking/HumanInTheLoopModal";
import { CMSWorkshop } from "@/lib/cms/content";

function HomeInner() {
  const { content } = useCMS();

  // Modal de Reserva
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Modal de Detalle de Taller del Carrusel
  const [selectedWorkshop, setSelectedWorkshop] = useState<CMSWorkshop | null>(null);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectWorkshop = (workshop: CMSWorkshop) => {
    setSelectedWorkshop(workshop);
    setIsWorkshopModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800 pb-16 sm:pb-0">
      
      {/* 1. Navbar Oficial: Quiénes somos · Talleres · Sesión Individual · Facilitadores */}
      <WatercolorNavbar onBookClick={handleOpenBooking} />

      {/* 2. Hero con Carrusel Giratorio con Música y Diapositivas */}
      <WatercolorHero onBookClick={handleOpenBooking} />

      {/* 3. Carrusel de Talleres de Constelaciones (Flyers y modalidades) */}
      <WorkshopsCarousel
        workshops={content.workshops}
        onSelectWorkshop={handleSelectWorkshop}
      />

      {/* 5. Sesión Individual (Online / Presencial / Videollamada, $40.000, botón WhatsApp) */}
      <WatercolorServices onBookClick={handleOpenBooking} />

      {/* 6. Testimonios y Experiencias de Consultantes */}
      <WatercolorTestimonials />

      {/* 7. Footer Minimalista Oficial (1 sola línea) */}
      <WatercolorFooter />

      {/* Botón Flotante Permanente de WhatsApp */}
      <WatercolorFloatingWhatsApp />

      {/* Barra Móvil Inferior */}
      <WatercolorStickyMobileBar onBookClick={handleOpenBooking} />

      {/* MODAL: Reservar Sesión (Flujo: Formulario -> Calendario -> Reserva con datos bancarios) */}
      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* MODAL: Detalle del Taller seleccionado del Carrusel */}
      <WorkshopDetailModal
        isOpen={isWorkshopModalOpen}
        workshop={selectedWorkshop}
        onClose={() => setIsWorkshopModalOpen(false)}
      />

    </div>
  );
}

export default function HomePage() {
  return <HomeInner />;
}
