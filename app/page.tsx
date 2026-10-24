"use client";

import React, { useState } from "react";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorHero } from "@/components/watercolor/WatercolorHero";
import { WatercolorPhilosophy } from "@/components/watercolor/WatercolorPhilosophy";
import { WatercolorServices } from "@/components/watercolor/WatercolorServices";
import { WatercolorPaymentExplainer } from "@/components/watercolor/WatercolorPaymentExplainer";
import { WatercolorTherapistCTA } from "@/components/watercolor/WatercolorTherapistCTA";
import { WatercolorAbout } from "@/components/watercolor/WatercolorAbout";
import { WatercolorFAQ } from "@/components/watercolor/WatercolorFAQ";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { WatercolorFloatingWhatsApp } from "@/components/watercolor/WatercolorFloatingWhatsApp";
import { WatercolorStickyMobileBar } from "@/components/watercolor/WatercolorStickyMobileBar";

// Componentes del Directorio y Ecosistema Marketplace
import { InteractiveDirectory } from "@/components/directory/InteractiveDirectory";
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { SystemicTriageModal } from "@/components/triage/SystemicTriageModal";
import { HumanInTheLoopModal, BookingModalMode } from "@/components/booking/HumanInTheLoopModal";

import { FacilitatorProfile, directoryFacilitators, SystemicWorkshop } from "@/lib/data/directory";
import { OnlineService } from "@/components/redesign/OnlineServiceCatalog";

export default function HomePage() {
  // Estados para modales y flujos
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<BookingModalMode>("booking");
  
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorProfile>(
    directoryFacilitators[0]
  );
  
  const [detailFacilitator, setDetailFacilitator] = useState<FacilitatorProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Manejadores
  const handleOpenBooking = (facilitator?: FacilitatorProfile, mode: BookingModalMode = "booking") => {
    if (facilitator) {
      setSelectedFacilitator(facilitator);
    }
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  const handleOpenDetail = (facilitator: FacilitatorProfile) => {
    setDetailFacilitator(facilitator);
    setIsDetailOpen(true);
  };

  const handleSelectServiceFromCatalog = (service: OnlineService) => {
    // Vincular con el facilitador principal
    setSelectedFacilitator(directoryFacilitators[0]);
    setBookingMode("booking");
    setIsBookingOpen(true);
  };

  const handleWorkshopQuote = (workshop: SystemicWorkshop) => {
    const matched = directoryFacilitators.find((f) => f.id === workshop.facilitatorId) || directoryFacilitators[0];
    setSelectedFacilitator(matched);
    setBookingMode("quote");
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800 pb-16 sm:pb-0">
      
      {/* 1. Barra de Navegación con Amonite y Enlaces al Marketplace */}
      <WatercolorNavbar
        onBookClick={() => handleOpenBooking(directoryFacilitators[0], "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 2. Hero Principal TOFU (Gancho Emocional & Dolor Silencioso) */}
      <WatercolorHero
        onBookClick={() => handleOpenBooking(directoryFacilitators[0], "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 3. Directorio Interactivo de Facilitadores y Talleres Vivenciales (Marketplace Core) */}
      <InteractiveDirectory
        onSelectFacilitator={(f) => handleOpenBooking(f, "booking")}
        onOpenDetail={handleOpenDetail}
        onOpenWorkshopQuote={handleWorkshopQuote}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 4. MOFU: ¿Qué es una constelación?, Fases de una sesión y Desmitificación sin esoterismo */}
      <WatercolorPhilosophy />

      {/* 5. Catálogo de Servicios y Valores con Desglose 20% / 80% */}
      <WatercolorServices onSelectService={handleSelectServiceFromCatalog} />

      {/* 6. ¿Cómo funciona el pago del 20% y la garantía de reprogramación? */}
      <WatercolorPaymentExplainer />

      {/* 7. Comunidad B2B para Facilitadores (Sin venta en frío, cero no-shows) */}
      <WatercolorTherapistCTA />

      {/* 8. Quiénes Somos y Testimonios Reales */}
      <WatercolorAbout />

      {/* 9. Preguntas Frecuentes en Acordeón Suave */}
      <WatercolorFAQ />

      {/* 10. Pie de Página Ético con Disclaimer y Línea *4141 */}
      <WatercolorFooter />

      {/* Botón Flotante de WhatsApp en Terracota Cálido */}
      <WatercolorFloatingWhatsApp />

      {/* Barra Móvil Inferior con Acceso Directo */}
      <WatercolorStickyMobileBar
        onBookClick={() => handleOpenBooking(directoryFacilitators[0], "booking")}
      />

      {/* MODAL 1: Orientador Sistémico Inteligente / Triage (Alto CRO) */}
      <SystemicTriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        onSelectFacilitator={(f) => handleOpenBooking(f, "booking")}
      />

      {/* MODAL 2: Detalle Profundo del Facilitador (Bio, Escuela, Reseñas, Talleres) */}
      <FacilitatorDetailModal
        facilitator={detailFacilitator}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBook={(f) => handleOpenBooking(f, "booking")}
        onQuote={(f) => handleOpenBooking(f, "quote")}
      />

      {/* MODAL 3: Human-in-the-Loop Booking & Cotizador Estructurado */}
      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialFacilitator={selectedFacilitator}
        mode={bookingMode}
      />

    </div>
  );
}
