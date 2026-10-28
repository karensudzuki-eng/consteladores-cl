"use client";

import React, { useState, useEffect } from "react";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorHero } from "@/components/watercolor/WatercolorHero";
import { WatercolorWhatIsAndIsNot } from "@/components/watercolor/WatercolorWhatIsAndIsNot";
import { WatercolorServices, ServiceItem } from "@/components/watercolor/WatercolorServices";
import { WatercolorPaymentExplainer } from "@/components/watercolor/WatercolorPaymentExplainer";
import { WatercolorTestimonials } from "@/components/watercolor/WatercolorTestimonials";
import { InteractiveDirectory } from "@/components/directory/InteractiveDirectory";
import { WatercolorPractitionersCTA } from "@/components/watercolor/WatercolorPractitionersCTA";
import { WatercolorAbout } from "@/components/watercolor/WatercolorAbout";
import { WatercolorFAQ } from "@/components/watercolor/WatercolorFAQ";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { WatercolorFloatingWhatsApp } from "@/components/watercolor/WatercolorFloatingWhatsApp";
import { WatercolorStickyMobileBar } from "@/components/watercolor/WatercolorStickyMobileBar";

// Modales de Reserva y Test Orientador
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { SystemicTriageModal } from "@/components/triage/SystemicTriageModal";
import { HumanInTheLoopModal, BookingModalMode } from "@/components/booking/HumanInTheLoopModal";

import { FacilitatorProfile, SystemicWorkshop, directoryFacilitators } from "@/lib/data/directory";
import { getApprovedTherapists } from "@/app/actions/therapists";

export default function HomePage() {
  const [facilitators, setFacilitators] = useState<FacilitatorProfile[]>(directoryFacilitators);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estados para modales
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<BookingModalMode>("booking");
  
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorProfile | null>(null);
  const [detailFacilitator, setDetailFacilitator] = useState<FacilitatorProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadTherapistsFromDatabase() {
      try {
        setIsLoading(true);
        const data = await getApprovedTherapists();
        if (isMounted && data && data.length > 0) {
          setFacilitators(data);
          setSelectedFacilitator(data[0]);
        }
      } catch (err) {
        console.warn("Aviso al cargar facilitadores de base de datos:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadTherapistsFromDatabase();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenBooking = (facilitator?: FacilitatorProfile | null, mode: BookingModalMode = "booking") => {
    if (facilitator) {
      setSelectedFacilitator(facilitator);
    } else if (facilitators.length > 0) {
      setSelectedFacilitator(facilitators[0]);
    } else {
      setSelectedFacilitator(null);
    }
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  const handleOpenDetail = (facilitator: FacilitatorProfile) => {
    setDetailFacilitator(facilitator);
    setIsDetailOpen(true);
  };

  const handleSelectServiceFromCatalog = (service: ServiceItem) => {
    handleOpenBooking(facilitators.length > 0 ? facilitators[0] : null, "booking");
  };

  const handleWorkshopQuote = (workshop: SystemicWorkshop) => {
    const matched = facilitators.find((f) => f.id === workshop.facilitatorId) || (facilitators.length > 0 ? facilitators[0] : null);
    setSelectedFacilitator(matched);
    setBookingMode("quote");
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800 pb-16 sm:pb-0">
      
      {/* 1. Header: Cómo funciona · Servicios · Facilitadores · Practica con nosotros */}
      <WatercolorNavbar
        onBookClick={() => handleOpenBooking(null, "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 2. Hero: Titular pregunta emocional, subtítulo max 2 líneas, CTAs, sin emojis */}
      <WatercolorHero
        onBookClick={() => handleOpenBooking(null, "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 3. "Qué es y qué no es": Dos columnas */}
      <WatercolorWhatIsAndIsNot />

      {/* 4. Servicios: Tarjetas con modalidad, duración y "Valor: por definir" */}
      <WatercolorServices onSelectService={handleSelectServiceFromCatalog} />

      {/* 5. Cómo funciona el pago: 80% saldo directo, 20% abono por transferencia */}
      <WatercolorPaymentExplainer />

      {/* 6. Testimonios: Consultante, [región], [tipo de sesión], [mes y año] */}
      <WatercolorTestimonials />

      {/* 7. Facilitadores: Solo si hay 3 o más perfiles; si no, "Estamos sumando perfiles verificados" */}
      <InteractiveDirectory
        facilitators={facilitators}
        isLoading={isLoading}
        onSelectFacilitator={(f) => handleOpenBooking(f, "booking")}
        onOpenDetail={handleOpenDetail}
        onOpenWorkshopQuote={handleWorkshopQuote}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 8. Sección de practicantes en /practica */}
      <WatercolorPractitionersCTA />

      {/* Quiénes somos e impulso Icalma */}
      <WatercolorAbout />

      {/* Preguntas frecuentes en lenguaje sobrio de acompañamiento */}
      <WatercolorFAQ />

      {/* 9. Footer: Términos, Privacidad, Cancelación, Criterios, Quiénes somos, Aviso y Línea *4141 */}
      <WatercolorFooter />

      {/* Botón Flotante de WhatsApp */}
      <WatercolorFloatingWhatsApp />

      {/* Barra Móvil Inferior con Acceso Directo */}
      <WatercolorStickyMobileBar
        onBookClick={() => handleOpenBooking(null, "booking")}
      />

      {/* MODAL: Test Orientador Sistémico */}
      <SystemicTriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        facilitators={facilitators}
        onSelectFacilitator={(f) => {
          setIsTriageOpen(false);
          handleOpenBooking(f || null, "booking");
        }}
      />

      {/* MODAL: Flujo de Consulta / Reserva con Transferencia y Consentimiento Ley 21.719 */}
      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialFacilitator={selectedFacilitator}
        mode={bookingMode}
      />

      {/* MODAL: Detalle de Perfil del Facilitador */}
      <FacilitatorDetailModal
        isOpen={isDetailOpen}
        facilitator={detailFacilitator}
        onClose={() => setIsDetailOpen(false)}
        onBook={(f) => {
          setIsDetailOpen(false);
          handleOpenBooking(f, "booking");
        }}
        onQuote={(f) => {
          setIsDetailOpen(false);
          handleOpenBooking(f, "quote");
        }}
      />

    </div>
  );
}
