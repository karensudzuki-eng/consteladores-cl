"use client";

import React, { useState, useEffect } from "react";
import { CMSProvider, useCMS } from "@/lib/cms/CMSContext";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorHero } from "@/components/watercolor/WatercolorHero";
import { WorkshopsCarousel } from "@/components/workshops/WorkshopsCarousel";
import { WorkshopDetailModal } from "@/components/workshops/WorkshopDetailModal";
import { WatercolorServices } from "@/components/watercolor/WatercolorServices";
import { WatercolorWhatIsAndIsNot } from "@/components/watercolor/WatercolorWhatIsAndIsNot";
import { WatercolorPaymentExplainer } from "@/components/watercolor/WatercolorPaymentExplainer";
import { WatercolorTestimonials } from "@/components/watercolor/WatercolorTestimonials";
import { InteractiveDirectory } from "@/components/directory/InteractiveDirectory";
import { CommunitySection } from "@/components/community/CommunitySection";
import { WatercolorPractitionersCTA } from "@/components/watercolor/WatercolorPractitionersCTA";
import { WatercolorAbout } from "@/components/watercolor/WatercolorAbout";
import { WatercolorFAQ } from "@/components/watercolor/WatercolorFAQ";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { WatercolorFloatingWhatsApp } from "@/components/watercolor/WatercolorFloatingWhatsApp";
import { WatercolorStickyMobileBar } from "@/components/watercolor/WatercolorStickyMobileBar";

// Modales de Reserva y Detalle
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { HumanInTheLoopModal } from "@/components/booking/HumanInTheLoopModal";

import { FacilitatorProfile, directoryFacilitators } from "@/lib/data/directory";
import { CMSWorkshop } from "@/lib/cms/content";
import { getApprovedTherapists } from "@/app/actions/therapists";

function HomeInner() {
  const { content } = useCMS();
  const [facilitators, setFacilitators] = useState<FacilitatorProfile[]>(directoryFacilitators);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal de Reserva
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Modal de Detalle de Taller del Carrusel
  const [selectedWorkshop, setSelectedWorkshop] = useState<CMSWorkshop | null>(null);
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);

  // Modal de Detalle de Facilitador
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
        }
      } catch (err) {
        console.warn("Aviso al cargar facilitadores:", err);
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

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectWorkshop = (workshop: CMSWorkshop) => {
    setSelectedWorkshop(workshop);
    setIsWorkshopModalOpen(true);
  };

  const handleOpenDetail = (facilitator: FacilitatorProfile) => {
    setDetailFacilitator(facilitator);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-800 pb-16 sm:pb-0">
      
      {/* 1. Header Principal */}
      <WatercolorNavbar onBookClick={handleOpenBooking} />

      {/* 2. Hero: Titular, Subtítulo y Tarjeta Destacada con Imagen para Comunidad Telegram */}
      <WatercolorHero onBookClick={handleOpenBooking} />

      {/* 3. Carrusel de Talleres Vivenciales (Gestión dinámica desde Admin) */}
      <WorkshopsCarousel
        workshops={content.workshops}
        onSelectWorkshop={handleSelectWorkshop}
      />

      {/* 4. Servicio de Acompañamiento: Sesión Individual Online ($45.000) */}
      <WatercolorServices onBookClick={handleOpenBooking} />

      {/* 5. "Qué es y qué no es": Enfoque fenomenológico limpio */}
      <WatercolorWhatIsAndIsNot />

      {/* 6. Cómo funciona el pago y coordinación */}
      <WatercolorPaymentExplainer />

      {/* 7. Testimonios */}
      <WatercolorTestimonials />

      {/* 8. Directorio de Facilitadores */}
      <InteractiveDirectory
        facilitators={facilitators}
        isLoading={isLoading}
        onSelectFacilitator={() => handleOpenBooking()}
        onOpenDetail={handleOpenDetail}
        onOpenWorkshopQuote={() => {
          if (content.workshops.length > 0) {
            handleSelectWorkshop(content.workshops[0]);
          }
        }}
        onOpenTriage={() => handleOpenBooking()}
      />

      {/* 9. Comunidad de Consteladores en Telegram (Al final de la página, junto a facilitadores) */}
      <CommunitySection />

      {/* Sección de practicantes */}
      <WatercolorPractitionersCTA />

      {/* Quiénes somos e impulso Icalma */}
      <WatercolorAbout />

      {/* Preguntas frecuentes */}
      <WatercolorFAQ />

      {/* 9. Footer Oficial */}
      <WatercolorFooter />

      {/* Botón Flotante Permanente de WhatsApp para Vouchers y Consultas */}
      <WatercolorFloatingWhatsApp />

      {/* Barra Móvil Inferior */}
      <WatercolorStickyMobileBar onBookClick={handleOpenBooking} />

      {/* MODAL: Reservar Sesión (Estricto según requerimientos) */}
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

      {/* MODAL: Detalle de Perfil del Facilitador */}
      <FacilitatorDetailModal
        isOpen={isDetailOpen}
        facilitator={detailFacilitator}
        onClose={() => setIsDetailOpen(false)}
        onBook={() => {
          setIsDetailOpen(false);
          handleOpenBooking();
        }}
        onQuote={() => {
          setIsDetailOpen(false);
          handleOpenBooking();
        }}
      />

    </div>
  );
}

export default function HomePage() {
  return <HomeInner />;
}
