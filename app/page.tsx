"use client";

import React, { useState, useEffect } from "react";
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
import { CommunitySection } from "@/components/community/CommunitySection";

// Componentes del Directorio y Ecosistema Marketplace
import { InteractiveDirectory } from "@/components/directory/InteractiveDirectory";
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { SystemicTriageModal } from "@/components/triage/SystemicTriageModal";
import { HumanInTheLoopModal, BookingModalMode } from "@/components/booking/HumanInTheLoopModal";

import { FacilitatorProfile, SystemicWorkshop } from "@/lib/data/directory";
import { OnlineService } from "@/components/redesign/OnlineServiceCatalog";
import { getApprovedTherapists } from "@/app/actions/therapists";

export default function HomePage() {
  // Facilitadores dinámicos consultados desde Supabase (status='approved')
  const [facilitators, setFacilitators] = useState<FacilitatorProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estados para modales y flujos
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<BookingModalMode>("booking");
  
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorProfile | null>(null);
  const [detailFacilitator, setDetailFacilitator] = useState<FacilitatorProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Carga dinámica de facilitadores certificados desde la base de datos
  useEffect(() => {
    let isMounted = true;
    async function loadTherapistsFromDatabase() {
      try {
        setIsLoading(true);
        const data = await getApprovedTherapists();
        if (isMounted) {
          setFacilitators(data);
          if (data.length > 0) {
            setSelectedFacilitator(data[0]);
          }
        }
      } catch (err) {
        console.error("Error al cargar facilitadores desde la base de datos:", err);
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

  // Manejadores
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

  const handleSelectServiceFromCatalog = (service: OnlineService) => {
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
      
      {/* 1. Barra de Navegación con Amonite y Enlaces al Marketplace */}
      <WatercolorNavbar
        onBookClick={() => handleOpenBooking(null, "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 2. Hero Principal TOFU (Gancho Emocional & Dolor Silencioso) */}
      <WatercolorHero
        onBookClick={() => handleOpenBooking(null, "booking")}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* 3. Directorio Dinámico de Facilitadores y Talleres (Conectado a Base de Datos Supabase) */}
      <InteractiveDirectory
        facilitators={facilitators}
        isLoading={isLoading}
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

      {/* 7. Comunidad de Acompañamiento entre Pares para Consteladores */}
      <CommunitySection />

      {/* 8. Comunidad B2B para Facilitadores (Postulaciones y Difusión) */}
      <WatercolorTherapistCTA />

      {/* 9. Quiénes Somos y Testimonios Reales */}
      <WatercolorAbout />

      {/* 10. Preguntas Frecuentes en Acordeón Suave */}
      <WatercolorFAQ />

      {/* 11. Pie de Página Ético con Disclaimer y Línea *4141 */}
      <WatercolorFooter />

      {/* Botón Flotante de WhatsApp en Terracota Cálido */}
      <WatercolorFloatingWhatsApp />

      {/* Barra Móvil Inferior con Acceso Directo */}
      <WatercolorStickyMobileBar
        onBookClick={() => handleOpenBooking(null, "booking")}
      />

      {/* MODAL 1: Orientador Sistémico Inteligente / Triage (Alto CRO) */}
      <SystemicTriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        facilitators={facilitators}
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
