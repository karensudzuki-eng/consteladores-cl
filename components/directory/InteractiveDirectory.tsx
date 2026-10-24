"use client";

import React, { useState, useMemo } from "react";
import {
  directoryFacilitators,
  FacilitatorProfile,
  specialtiesList,
  upcomingWorkshopsList,
  SystemicWorkshop,
} from "@/lib/data/directory";

interface InteractiveDirectoryProps {
  onSelectFacilitator: (facilitator: FacilitatorProfile) => void;
  onOpenDetail: (facilitator: FacilitatorProfile) => void;
  onOpenWorkshopQuote: (workshop: SystemicWorkshop) => void;
  onOpenTriage: () => void;
}

export function InteractiveDirectory({
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

  // Filtrado reactivo en tiempo real
  const filteredFacilitators = useMemo(() => {
    return directoryFacilitators.filter((f) => {
      // Filtro especialidad
      if (selectedSpecialty !== "all" && !f.specialties.includes(selectedSpecialty)) {
        return false;
      }
      // Filtro modalidad
      if (selectedModality !== "all") {
        if (selectedModality === "online" && !f.modalities.includes("online")) return false;
        if (selectedModality === "presencial" && !f.modalities.includes("presencial")) return false;
        if (selectedModality === "taller_grupal" && !f.modalities.includes("taller_grupal")) return false;
      }
      // Filtro ciudad
      if (selectedCity !== "all") {
        if (!f.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      }
      // Búsqueda por texto
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
  }, [selectedSpecialty, selectedModality, selectedCity, searchQuery]);

  const resetFilters = () => {
    setSelectedSpecialty("all");
    setSelectedModality("all");
    setSelectedCity("all");
    setSearchQuery("");
  };

  return (
    <section id="directorio" className="py-16 sm:py-24 bg-[#FCFAF7] border-t border-[#E7DECE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Marketplace */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F3ECE2] border border-[#E7DECE] text-[#5C524A] text-xs font-semibold uppercase tracking-wider mb-3">
            Ecosistema y Directorio Nacional
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Encuentra tu Constelador(a) en Chile
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Filtra por tu dolor sistémico, modalidad online o ciudad. Todos los facilitadores cuentan con acreditación formal revisada y política de reserva transparente del 20%.
          </p>

          {/* Banner de Orientador Rápido / Triage */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-[#FAF8F5] border border-terracotta-200/80 rounded-2xl p-3 sm:px-6 shadow-sm">
            <span className="text-xs text-[#5C524A]">
              💡 ¿No sabes cuál elegir o qué formato necesitas?
            </span>
            <button
              onClick={onOpenTriage}
              type="button"
              className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 underline"
            >
              Hacer el test orientador en 30 segundos →
            </button>
          </div>
        </div>

        {/* Pestañas Principales: Facilitadores vs Talleres Grupales */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-[#F3ECE2] border border-[#E7DECE]">
            <button
              type="button"
              onClick={() => setActiveTab("facilitadores")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "facilitadores"
                  ? "bg-terracotta-500 text-white shadow-sm"
                  : "text-[#5C524A] hover:text-[#27221F]"
              }`}
            >
              Facilitadores Individuales ({directoryFacilitators.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("talleres")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "talleres"
                  ? "bg-terracotta-500 text-white shadow-sm"
                  : "text-[#5C524A] hover:text-[#27221F]"
              }`}
            >
              Talleres Vivenciales Grupales ({upcomingWorkshopsList.length})
            </button>
          </div>
        </div>

        {/* Barra de Filtros Reactivos para Facilitadores */}
        {activeTab === "facilitadores" && (
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-5 sm:p-6 mb-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              
              {/* Filtro Especialidad / Dolor */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                  Tema o Dolor Sistémico
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  <option value="all">Todas las especialidades</option>
                  {specialtiesList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.shortLabel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro Modalidad */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                  Modalidad de Atención
                </label>
                <select
                  value={selectedModality}
                  onChange={(e) => setSelectedModality(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  <option value="all">Todas las modalidades</option>
                  <option value="online">💻 Online (Google Meet)</option>
                  <option value="presencial">📍 Presencial (Consulta privada)</option>
                  <option value="taller_grupal">👥 Talleres Vivenciales</option>
                </select>
              </div>

              {/* Filtro Ciudad */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                  Ciudad o Región
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  <option value="all">Todo Chile & Online</option>
                  <option value="santiago">Santiago (Providencia / Las Condes)</option>
                  <option value="viña">Viña del Mar / Valparaíso</option>
                  <option value="concepción">Concepción</option>
                </select>
              </div>

              {/* Búsqueda Libre */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] mb-1">
                  Buscar por nombre o palabra clave
                </label>
                <input
                  type="text"
                  placeholder="Ej. duelo, dinero, María Paz..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

            </div>

            {/* Micro-resumen de resultados y botón reset */}
            <div className="flex items-center justify-between text-xs text-[#8A7E73] pt-3 border-t border-[#E7DECE]/60">
              <span>
                Mostrando <strong>{filteredFacilitators.length}</strong> de {directoryFacilitators.length} facilitadores verificados
              </span>
              {(selectedSpecialty !== "all" || selectedModality !== "all" || selectedCity !== "all" || searchQuery !== "") && (
                <button
                  onClick={resetFilters}
                  type="button"
                  className="text-terracotta-600 hover:text-terracotta-700 underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: GRILLA DE FACILITADORES */}
        {activeTab === "facilitadores" && (
          <div>
            {filteredFacilitators.length === 0 ? (
              <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-12 text-center max-w-xl mx-auto">
                <span className="text-3xl block mb-2">🔍</span>
                <h4 className="font-serif font-semibold text-xl text-[#27221F] mb-2">
                  No encontramos facilitadores con esos filtros
                </h4>
                <p className="text-xs text-[#5C524A] mb-4">
                  Prueba ampliando la modalidad o limpiando la búsqueda para ver todos los perfiles disponibles.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2 text-xs font-medium text-white bg-terracotta-500 rounded-full"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
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
                      className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        {/* Cabecera de la tarjeta con Monograma y Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-xl font-bold shadow-inner">
                              {initials}
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ochre-500 text-white flex items-center justify-center text-[10px] shadow" title="Certificación Acreditada">
                              ✓
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ochre-100 text-ochre-800 text-[11px] font-semibold">
                              ★ {facilitator.rating} ({facilitator.reviewCount})
                            </span>
                            <span className="text-[10px] text-[#8A7E73] block mt-1">
                              +{facilitator.completedSessions} sesiones
                            </span>
                          </div>
                        </div>

                        {/* Nombre y Especialidad */}
                        <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-1">
                          {facilitator.name}
                        </h3>
                        <p className="text-xs font-medium text-terracotta-600 mb-3 line-clamp-1">
                          {facilitator.headline}
                        </p>

                        {/* Escuela y Ubicación */}
                        <div className="space-y-1.5 text-xs text-[#5C524A] bg-[#FCFAF7] p-3 rounded-2xl border border-[#E7DECE]/70 mb-4">
                          <p className="text-[#8A7E73] line-clamp-1">🎓 {facilitator.schoolAndYear}</p>
                          <p className="font-medium text-[#27221F] flex items-center gap-1">
                            📍 {facilitator.city}
                          </p>
                        </div>

                        {/* Extracto de Bio */}
                        <p className="text-xs text-[#5C524A] leading-relaxed line-clamp-3 mb-5">
                          {facilitator.bio}
                        </p>

                        {/* Badges de Especialidades */}
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

                      {/* Pie de Tarjeta con Precios y Botones */}
                      <div className="pt-4 border-t border-[#E7DECE]/70">
                        <div className="flex items-baseline justify-between mb-4">
                          <div>
                            <span className="text-[11px] text-[#8A7E73] block">Valor sesión:</span>
                            <span className="text-lg font-serif font-bold text-[#27221F]">
                              ${facilitator.totalPriceClp.toLocaleString("es-CL")}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-terracotta-600 font-semibold block">
                              Reserva hoy (20%):
                            </span>
                            <span className="text-base font-bold text-terracotta-700">
                              ${facilitator.depositPriceClp.toLocaleString("es-CL")}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onOpenDetail(facilitator)}
                            type="button"
                            className="py-2.5 px-3 text-xs font-medium text-[#5C524A] bg-[#F3ECE2] hover:bg-[#E7DECE] rounded-full transition-colors text-center"
                          >
                            Ver Perfil
                          </button>
                          <button
                            onClick={() => onSelectFacilitator(facilitator)}
                            type="button"
                            className="py-2.5 px-3 text-xs font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all text-center"
                          >
                            Reservar (20%)
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TALLERES VIVENCIALES GRUPALES */}
        {activeTab === "talleres" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-ochre-700 block mb-1">
                La Fuerza del Campo Grupal
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                Próximos Talleres Vivenciales en Chile
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] max-w-lg mx-auto mt-1">
                Participa como consultante (para constelar tu propio tema) o como representante en una experiencia vivencial profunda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingWorkshopsList.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-[#FAF8F5] border border-ochre-300 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ochre-100 text-ochre-800">
                        👥 Taller Vivencial
                      </span>
                      <span className="text-xs font-bold text-terracotta-600 bg-[#FDF7F4] px-2.5 py-0.5 rounded-full border border-terracotta-200">
                        {ws.spotsLeft} cupos libres
                      </span>
                    </div>

                    <h4 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
                      {ws.title}
                    </h4>

                    <p className="text-xs text-[#8A7E73] mb-4">
                      Facilitado por <strong className="text-[#27221F]">{ws.facilitatorName}</strong>
                    </p>

                    <div className="bg-[#FCFAF7] p-3.5 rounded-2xl border border-[#E7DECE] space-y-1.5 text-xs text-[#5C524A] mb-4">
                      <p>📅 <strong>Fecha:</strong> {ws.date}</p>
                      <p>📍 <strong>Lugar:</strong> {ws.location} ({ws.city})</p>
                      <p>🎯 <strong>Enfoque:</strong> {ws.theme}</p>
                    </div>

                    <p className="text-xs text-[#5C524A] leading-relaxed mb-5">
                      {ws.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E7DECE]/80">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-[#8A7E73] block">Valor del cupo:</span>
                        <span className="text-xl font-serif font-bold text-[#27221F]">
                          ${ws.totalPriceClp.toLocaleString("es-CL")} CLP
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-terracotta-600 font-semibold block">
                          Reserva tu cupo (20%):
                        </span>
                        <span className="text-base font-bold text-terracotta-700">
                          ${ws.depositPriceClp.toLocaleString("es-CL")} CLP
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenWorkshopQuote(ws)}
                      type="button"
                      className="w-full py-3 text-xs font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all"
                    >
                      Asegurar cupo en el taller (Reserva 20%)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
