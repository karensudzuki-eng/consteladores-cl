"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FacilitatorProfile,
  specialtiesList,
  upcomingWorkshopsList,
  SystemicWorkshop,
} from "@/lib/data/directory";
import { CONFIG } from "@/lib/config";

interface InteractiveDirectoryProps {
  facilitators: FacilitatorProfile[];
  isLoading?: boolean;
  onSelectFacilitator: (facilitator: FacilitatorProfile) => void;
  onOpenDetail: (facilitator: FacilitatorProfile) => void;
  onOpenWorkshopQuote: (workshop: SystemicWorkshop) => void;
  onOpenTriage?: () => void;
}

export function InteractiveDirectory({
  facilitators,
  isLoading = false,
  onSelectFacilitator,
  onOpenDetail,
  onOpenWorkshopQuote,
  onOpenTriage,
}: InteractiveDirectoryProps) {
  const [activeTab, setActiveTab] = useState<"facilitadores" | "talleres">("facilitadores");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedModality, setSelectedModality] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isPricingEnabled = CONFIG.PRICING_ENABLED;
  const selectButtonLabel = isPricingEnabled ? "Reservar cita" : "Consultar disponibilidad";

  // Filtrado reactivo en tiempo real
  const filteredFacilitators = useMemo(() => {
    return facilitators.filter((f) => {
      if (selectedSpecialty !== "all" && !f.specialties.includes(selectedSpecialty)) {
        return false;
      }
      if (selectedModality !== "all") {
        if (selectedModality === "online" && !f.modalities.includes("online")) return false;
        if (selectedModality === "presencial" && !f.modalities.includes("presencial")) return false;
        if (selectedModality === "taller_grupal" && !f.modalities.includes("taller_grupal")) return false;
      }
      if (selectedCity !== "all") {
        if (!f.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesHeadline = f.headline.toLowerCase().includes(q);
        const matchesCity = f.city.toLowerCase().includes(q);
        const matchesBio = f.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesHeadline && !matchesCity && !matchesBio) return false;
      }
      return true;
    });
  }, [facilitators, selectedSpecialty, selectedModality, selectedCity, searchQuery]);

  const resetFilters = () => {
    setSelectedSpecialty("all");
    setSelectedModality("all");
    setSelectedCity("all");
    setSearchQuery("");
  };

  return (
    <section id="facilitadores" className="py-24 sm:py-32 bg-[#F3E9DC] border-t border-[#D9664A]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Directorio Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Facilitadores Acreditados en Chile
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Cada profesional visible cuenta con verificación manual de formación y compromiso ético respaldado por Icalma Constelaciones.
          </p>
        </div>

        {/* LISTADO DE FACILITADORES */}
        <div>
          {/* Barra de Filtros */}
            {activeTab === "facilitadores" && (
              <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-5 sm:p-6 mb-10 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                      Área o Tema
                    </label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                      <option value="all">Todas las áreas</option>
                      {specialtiesList.map((sp) => (
                        <option key={sp.id} value={sp.id}>
                          {sp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                      Modalidad
                    </label>
                    <select
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                      <option value="all">Todas las modalidades</option>
                      <option value="online">Online (Google Meet)</option>
                      <option value="presencial">Presencial (Consulta)</option>
                      <option value="taller_grupal">Talleres Vivenciales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                      Ciudad o Región
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                      <option value="all">Todo Chile y Online</option>
                      <option value="santiago">Santiago</option>
                      <option value="viña">Viña del Mar / Valparaíso</option>
                      <option value="concepción">Concepción</option>
                      <option value="online">Online</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                      Búsqueda
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre, linaje o ciudad..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                    </input>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8A7E73] pt-3 mt-3 border-t border-[#E7DECE]/60">
                  <span>
                    Mostrando <strong>{filteredFacilitators.length}</strong> de {facilitators.length} facilitadores acreditados
                  </span>
                  {(selectedSpecialty !== "all" || selectedModality !== "all" || selectedCity !== "all" || searchQuery !== "") && (
                    <button
                      onClick={resetFilters}
                      type="button"
                      className="text-terracotta-600 hover:text-terracotta-700 underline cursor-pointer"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Grilla de Facilitadores */}
            {activeTab === "facilitadores" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredFacilitators.map((facilitator) => {
                  const initials = facilitator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2);

                  return (
                    <div
                      key={facilitator.id}
                      className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm card-hover-elevate"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-xl font-bold">
                              {initials}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[11px] font-semibold">
                              Acreditado
                            </span>
                            <span className="text-[10px] text-[#8A7E73] block mt-1">
                              {facilitator.experienceYears} años de práctica
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-1">
                          {facilitator.name}
                        </h3>
                        <p className="text-xs font-medium text-terracotta-600 mb-3 line-clamp-1">
                          {facilitator.headline}
                        </p>

                        <div className="space-y-1.5 text-xs text-[#5C524A] bg-[#FAF8F5] p-3 rounded-2xl border border-[#E7DECE]/70 mb-4">
                          <p className="text-[#8A7E73] line-clamp-1">Formación: {facilitator.schoolAndYear}</p>
                          <p className="font-medium text-[#27221F]">
                            Modalidad: {facilitator.city}
                          </p>
                        </div>

                        <p className="text-xs text-[#5C524A] leading-relaxed line-clamp-3 mb-5">
                          {facilitator.bio}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {facilitator.specialties.map((sp) => {
                            const found = specialtiesList.find((s) => s.id === sp);
                            return (
                              <span
                                key={sp}
                                className="px-2.5 py-0.5 rounded-full bg-[#F3ECE2] text-[10px] font-medium text-[#5C524A]"
                              >
                                {found?.shortLabel || sp}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E7DECE]/70">
                        <div className="mb-4">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <span className="text-[11px] text-[#8A7E73] block">Valor sesión:</span>
                              <span className="text-xl font-serif font-bold text-terracotta-700">
                                ${facilitator.totalPriceClp.toLocaleString("es-CL")}{" "}
                                <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] text-[#8A7E73] block">Modalidad:</span>
                              <span className="text-xs font-semibold text-[#27221F]">
                                Online / Presencial
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onOpenDetail(facilitator)}
                            type="button"
                            className="py-2.5 px-3 text-xs font-medium text-[#5C524A] bg-[#F3ECE2] hover:bg-[#E7DECE] rounded-full transition-colors text-center cursor-pointer"
                          >
                            Ver Perfil
                          </button>
                          <button
                            onClick={() => onSelectFacilitator(facilitator)}
                            type="button"
                            className="py-2.5 px-3 text-xs font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all text-center cursor-pointer"
                          >
                            {selectButtonLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SECCIÓN: Postulación de Facilitadores y Profundización en Icalma */}
            <div className="mt-14 bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F] mb-3">
                ¿Eres facilitador y quieres pertenecer al equipo?
              </h3>
              <p className="text-sm sm:text-base text-[#5C524A] leading-relaxed max-w-2xl mx-auto mb-6">
                Postula como facilitador previo a revisar nuestros criterios de acreditación. En caso de que no estés acreditado, puedes consultar por WhatsApp y realizar el proceso de profundización a través del Centro de Constelaciones Icalma.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/registro-terapeuta"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 transition-all shadow-sm"
                >
                  Postular como facilitador
                </Link>
                <Link
                  href="/criterios"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#5C524A] bg-[#F3ECE2] hover:bg-[#E7DECE] border border-[#E7DECE] transition-all"
                >
                  Ver criterios de acreditación
                </Link>
                <a
                  href="https://wa.me/56941939363?text=Hola,%20soy%20facilitador(a)%20y%20deseo%20consultar%20sobre%20el%20proceso%20de%20profundizaci%C3%B3n%20en%20el%20Centro%20Icalma%20para%20acreditarme%20en%20consteladores.cl."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#128C7E] bg-[#EBF7F2] hover:bg-[#D8F0E5] border border-[#BDE3D1] transition-all flex items-center gap-1.5"
                >
                  <span>Consultar al WhatsApp</span>
                </a>
                <a
                  href="https://constelacionesfamiliares.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-terracotta-700 bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-200 transition-all flex items-center gap-1"
                >
                  <span>Centro de Constelaciones Icalma</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

      </div>
    </section>
  );
}
