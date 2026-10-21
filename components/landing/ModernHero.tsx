"use client";

import React, { useState } from "react";

interface ModernHeroProps {
  onSearch?: (topic: string, modality: string) => void;
}

export function ModernHero({ onSearch }: ModernHeroProps) {
  const [selectedTopic, setSelectedTopic] = useState("todos");
  const [selectedModality, setSelectedModality] = useState("online");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(selectedTopic, selectedModality);
    }
    const element = document.getElementById("terapeutas");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50/40 to-white pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-100">
      
      {/* Elementos gráficos de fondo sutiles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-brand-200/25 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge de confianza */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 text-brand-800 text-xs font-semibold shadow-sm mb-6">
          <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
          🇨🇱 Red de Consteladores Familiares Certificados en Chile
        </div>

        {/* Título principal de alta conversión */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Encuentra al constelador familiar certificado para tu momento de vida
        </h1>

        {/* Subtítulo claro y humano */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Sesiones individuales online y presenciales con facilitadores de escuelas sistémicas verificadas. Agenda tu hora en minutos con enlace directo a Google Meet.
        </p>

        {/* Buscador interactivo de facilitadores */}
        <div className="mt-10 max-w-3xl mx-auto p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Selector de Tema */}
            <div className="sm:col-span-5 text-left px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                ¿Qué tema necesitas mirar?
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos los temas</option>
                <option value="padres">Relación con Madre o Padre</option>
                <option value="pareja">Pareja y Vínculos afectivos</option>
                <option value="dinero">Dinero, Trabajo y Vocación</option>
                <option value="duelo">Duelos, Pérdidas y Ancestros</option>
                <option value="sintomas">Síntomas y Malestares Físicos</option>
              </select>
            </div>

            {/* Selector de Modalidad */}
            <div className="sm:col-span-4 text-left px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                Modalidad
              </label>
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="online">Online (Google Meet)</option>
                <option value="santiago">Presencial Santiago</option>
                <option value="regiones">Regiones de Chile</option>
              </select>
            </div>

            {/* Botón de Búsqueda */}
            <div className="sm:col-span-3">
              <button
                onClick={handleSearchClick}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ver terapeutas
              </button>
            </div>

          </div>
        </div>

        {/* Pilares de confianza con íconos vectoriales modernos */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">✓</span>
            100% Facilitadores certificados
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">✓</span>
            Horario de Chile garantizado
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">✓</span>
            Google Meet automático
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">✓</span>
            Pago seguro en pesos chilenos (CLP)
          </div>
        </div>

      </div>
    </section>
  );
}
