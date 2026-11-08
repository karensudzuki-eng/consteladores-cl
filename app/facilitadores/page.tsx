"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { HumanInTheLoopModal } from "@/components/booking/HumanInTheLoopModal";
import { FacilitatorDetailModal } from "@/components/directory/FacilitatorDetailModal";
import { FacilitatorProfile, directoryFacilitators } from "@/lib/data/directory";
import { useCMS } from "@/lib/cms/CMSContext";
import { CONFIG } from "@/lib/config";

export default function FacilitadoresPage() {
  const { content } = useCMS();
  const settings = content?.settings;

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorProfile | null>(null);
  const [detailFacilitator, setDetailFacilitator] = useState<FacilitatorProfile | null>(null);

  // Estados de búsqueda y filtro por rol (petición de usuario)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const carouselRef = useRef<HTMLDivElement>(null);

  // Facilitadores activos sincronizados con el CMS (o fallback al directorio base)
  const activeFacilitators: (FacilitatorProfile & { imageUrl?: string; role?: string })[] = useMemo(() => {
    if (content?.facilitators && content.facilitators.length > 0) {
      const active = content.facilitators.filter((f) => f.isActive !== false);
      if (active.length > 0) {
        return active.map((f) => {
          const numericPrice = parseInt((f.price || "40000").replace(/[^0-9]/g, ""), 10) || 40000;
          return {
            id: f.id,
            name: f.name,
            headline: f.headline || (f.role ? `${f.role} en Constelaciones Familiares` : "Facilitador"),
            schoolAndYear: f.schoolAndYear || "Formación Sistémica",
            status: "ACREDITADO" as const,
            specialties: f.specialties || ["Familia y Origen", "Pareja y Vínculos"],
            modalities:
              f.modality?.toLowerCase().includes("presencial") && f.modality?.toLowerCase().includes("online")
                ? (["online", "presencial"] as ("online" | "presencial" | "taller_grupal")[])
                : f.modality?.toLowerCase().includes("presencial")
                ? (["presencial"] as ("online" | "presencial" | "taller_grupal")[])
                : (["online"] as ("online" | "presencial" | "taller_grupal")[]),
            city: f.city || "Chile",
            locationDetails: f.city || "Chile",
            totalPriceClp: numericPrice,
            depositPriceClp: numericPrice,
            balancePriceClp: 0,
            experienceYears: f.experienceYears || 2,
            completedSessions: 50,
            rating: 5.0,
            reviewCount: 14,
            bio: f.bio,
            approachDetails: f.schoolAndYear || "Enfoque sistémico y fenomenológico",
            nextAvailableDate: "A coordinar en agenda",
            isValidated: true,
            reviews: [],
            imageUrl: f.imageUrl,
            role: f.role || "Facilitador",
          };
        });
      }
    }
    return directoryFacilitators;
  }, [content?.facilitators]);

  const handleBook = (facilitator?: FacilitatorProfile) => {
    if (facilitator) {
      setSelectedFacilitator(facilitator);
    }
    setIsBookingOpen(true);
  };

  // Filtrado reactivo por nombre (mínimo 3 caracteres) y por rol/categoría
  const filteredFacilitators = useMemo(() => {
    return activeFacilitators.filter((f) => {
      // Filtro por rol
      if (selectedRole !== "all") {
        const isPracticante = (f.role || "").toLowerCase().includes("practicante");
        if (selectedRole === "practicante" && !isPracticante) return false;
        if (selectedRole === "constelador" && isPracticante) return false;
      }
      // Filtro por texto de búsqueda (mínimo 3 caracteres para activar)
      const q = searchQuery.trim().toLowerCase();
      if (q.length >= 3) {
        const nameMatch = f.name.toLowerCase().includes(q);
        const cityMatch = (f.city || "").toLowerCase().includes(q);
        const headlineMatch = (f.headline || "").toLowerCase().includes(q);
        const specialtyMatch = f.specialties?.some((s) => s.toLowerCase().includes(q));
        if (!nameMatch && !cityMatch && !headlineMatch && !specialtyMatch) {
          return false;
        }
      }
      return true;
    });
  }, [activeFacilitators, searchQuery, selectedRole]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 360;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const rawPhone = (settings?.whatsappNumber || "+56 9 4193 9363").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    "Hola, soy facilitador(a) y deseo realizar una consulta para integrarme al equipo de consteladores.cl."
  )}`;

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-900">
      <WatercolorNavbar onBookClick={() => handleBook()} />

      <main className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-3">
              Facilitadores de Constelaciones
            </h1>
            <p className="text-sm sm:text-base text-[#5C524A] leading-relaxed">
              Profesionales con experiencia y vocación humana, dedicados a acompañar procesos de comprensión, orden y alivio en tus vínculos.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* BUSCADOR POR NOMBRE Y FILTRO POR ROL / CATEGORÍA                          */}
          {/* ========================================================================= */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-4 sm:p-5 mb-8 max-w-3xl mx-auto shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Buscador por nombre */}
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1.5">
                  Buscador por nombre (mínimo 3 caracteres)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="🔍 Ej. Karen, Erika, Santiago..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECE] bg-white text-xs sm:text-sm text-[#27221F] placeholder:text-[#A89F91] focus:outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-400 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A7E73] hover:text-[#27221F] p-1"
                      aria-label="Limpiar búsqueda"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filtrar por categoría / rol */}
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1.5">
                  Filtrar por categoría / rol
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DECE] bg-white text-xs sm:text-sm text-[#27221F] focus:outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-400 transition-all cursor-pointer"
                >
                  <option value="all">Todos los roles ({activeFacilitators.length})</option>
                  <option value="constelador">
                    Consteladores / Facilitadores (
                    {activeFacilitators.filter((f) => !f.role?.toLowerCase().includes("practicante")).length}
                    )
                  </option>
                  <option value="practicante">
                    Practicantes (
                    {activeFacilitators.filter((f) => f.role?.toLowerCase().includes("practicante")).length}
                    )
                  </option>
                </select>
              </div>
            </div>
            {searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
              <p className="text-[11px] text-[#A89F91] mt-2">
                Escribe al menos 3 caracteres para iniciar la búsqueda...
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* CARRUSEL DE TARJETAS MÁS PEQUEÑAS PARA GANAR ESPACIO                      */}
          {/* ========================================================================= */}
          <div className="mb-14">
            {/* Barra superior del carrusel con controles */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7E73]">
                Directorio ({filteredFacilitators.length} de {activeFacilitators.length} perfiles)
              </span>

              {filteredFacilitators.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollCarousel("left")}
                    type="button"
                    aria-label="Anterior facilitador"
                    className="w-9 h-9 rounded-full bg-white border border-[#E7DECE] hover:bg-[#F3ECE2] text-[#27221F] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scrollCarousel("right")}
                    type="button"
                    aria-label="Siguiente facilitador"
                    className="w-9 h-9 rounded-full bg-white border border-[#E7DECE] hover:bg-[#F3ECE2] text-[#27221F] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Si no hay resultados de búsqueda */}
            {filteredFacilitators.length === 0 ? (
              <div className="bg-[#FAF8F5] border border-dashed border-[#E7DECE] rounded-2xl p-8 text-center text-[#5C524A]">
                <p className="text-sm font-medium mb-2">No se encontraron facilitadores para tu búsqueda.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRole("all");
                  }}
                  className="text-xs text-terracotta-600 font-semibold underline hover:text-terracotta-800 cursor-pointer"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              /* Contenedor del Carrusel Deslizable Horizontal */
              <div
                ref={carouselRef}
                className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
              >
                {filteredFacilitators.map((f) => {
                  const initials = f.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2);

                  const isPracticante = f.role?.toLowerCase() === "practicante";

                  return (
                    <div
                      key={f.id}
                      onClick={() => setDetailFacilitator(f)}
                      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-[#FCFAF7] border border-[#E7DECE] hover:border-terracotta-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        {/* Header de la tarjeta compacta */}
                        <div className="flex items-center gap-3 mb-3">
                          {f.imageUrl ? (
                            <img
                              src={f.imageUrl}
                              alt={f.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-terracotta-200 group-hover:border-terracotta-400 shrink-0 transition-colors shadow-xs"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 group-hover:border-terracotta-400 flex items-center justify-center text-terracotta-700 font-serif text-base font-bold shrink-0 transition-colors">
                              {initials}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="text-base sm:text-lg font-serif font-bold text-[#27221F] group-hover:text-terracotta-700 transition-colors truncate">
                                {f.name}
                              </h3>
                              <span
                                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                                  isPracticante
                                    ? "bg-sky-100 text-sky-800 border border-sky-200"
                                    : "bg-terracotta-100 text-terracotta-800 border border-terracotta-200"
                                }`}
                              >
                                {f.role || "Facilitador"}
                              </span>
                            </div>
                            <p className="text-[11px] text-terracotta-700 font-medium line-clamp-1">
                              {f.headline}
                            </p>
                          </div>
                        </div>

                        {/* Modalidad y Ubicación Compacta */}
                        <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#E7DECE] text-[11px] text-[#5C524A] space-y-1 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[#8A7E73]">Modalidad:</span>
                            <span className="font-semibold text-[#27221F] truncate ml-2">
                              {f.modalities.includes("online") ? "🌐 Online" : "📍 Presencial"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#8A7E73]">Ubicación:</span>
                            <span className="font-semibold text-[#27221F] truncate ml-2">{f.city}</span>
                          </div>
                        </div>

                        {/* Bio resumida para ganar espacio */}
                        <p className="text-xs text-[#5C524A] leading-relaxed line-clamp-2 mb-4">
                          {f.bio}
                        </p>
                      </div>

                      {/* Valor y Botones Compactos */}
                      <div className="pt-3 border-t border-[#E7DECE] flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] text-[#8A7E73] block uppercase tracking-wider">
                            Valor
                          </span>
                          <span className="text-base font-serif font-bold text-[#27221F]">
                            ${f.totalPriceClp.toLocaleString("es-CL")}{" "}
                            <span className="text-[10px] font-sans font-normal text-[#8A7E73]">CLP</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setDetailFacilitator(f)}
                            type="button"
                            className="px-2.5 py-1.5 rounded-full border border-[#E7DECE] bg-white hover:bg-[#F3ECE2] text-[11px] font-medium text-[#27221F] transition-colors cursor-pointer"
                          >
                            Ver perfil
                          </button>
                          <button
                            onClick={() => handleBook(f)}
                            type="button"
                            className="px-3 py-1.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-[11px] font-semibold shadow-xs transition-all cursor-pointer"
                          >
                            Reservar
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* FRANJA LIMPIA: SI ERES FACILITADOR (O PRACTICANTE) Y QUIERES PERTENECER AL EQUIPO */}
          {/* (Sin imagen de Telegram, franja horizontal limpia con botones directos)    */}
          {/* ========================================================================= */}
          <div className="border border-terracotta-200 bg-gradient-to-r from-[#FCFAF7] via-[#F8EFE3] to-[#FCFAF7] rounded-3xl p-6 sm:p-8 shadow-sm text-center">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#27221F] leading-tight">
                {settings?.joinTeamTitle || "Si eres facilitador (o practicante) y quieres pertenecer al equipo"}
              </h2>

              <p className="text-xs sm:text-sm text-[#5C524A]">
                {settings?.joinTeamDescription || "Postula para ser parte de nuestra red"}
              </p>

              {/* Los 3 Botones requeridos */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                {/* Botón 1: Postular facilitador / practicante */}
                <Link
                  href={settings?.joinTeamPostulateUrl || "/registro-terapeuta"}
                  className="px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  {settings?.joinTeamPostulateLabel || "Postular facilitador / practicante"}
                </Link>

                {/* Botón 2: Ícono de WhatsApp y número de teléfono editable */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  <span>{settings?.whatsappNumber || "+56 9 4193 9363"}</span>
                </a>

                {/* Botón 3: Comunidad (Telegram) */}
                <a
                  href={settings?.telegramUrl || CONFIG.TELEGRAM_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.963z" />
                  </svg>
                  <span>Comunidad</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <WatercolorFooter />

      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <FacilitatorDetailModal
        facilitator={detailFacilitator}
        isOpen={!!detailFacilitator}
        onClose={() => setDetailFacilitator(null)}
        onBook={(f) => {
          setSelectedFacilitator(f);
          setIsBookingOpen(true);
        }}
        onQuote={(f) => {
          setSelectedFacilitator(f);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}