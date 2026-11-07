"use client";

import React from "react";
import { useCMS } from "@/lib/cms/CMSContext";

interface WatercolorServicesProps {
  onBookClick: () => void;
}

export function WatercolorServices({ onBookClick }: WatercolorServicesProps) {
  const { content } = useCMS();
  const settings = content.settings;

  const title = settings.serviceTitle || "Sesión individual online";
  const description =
    settings.serviceDescription ||
    "Una sesión individual de constelaciones familiares por videollamada (a través de plataformas como Zoom o Google Meet) es un espacio de terapia sistémica en línea. Su objetivo es identificar y resolver bloqueos emocionales, patrones repetitivos, duelos o conflictos familiares y laborales no resueltos, donde un terapeuta constelador te acompañará a mirar tu situación, traer una imagen del conflicto y, desde la comprensión, algo dentro se alivia y se calama el sistema.";
  const price = settings.servicePrice || "$45.000";
  const subtitles = settings.serviceSubtitles || ["sientes de cargas", "espacio de cuidado"];

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-[#FBF7F2] border-t border-[#E7DECE]/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtítulos limpios requeridos: "sientes de cargas" y "espacio de cuidado" */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {subtitles.map((sub, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-cream-50 border border-[#E7DECE] text-[#5C524A] text-xs font-serif tracking-wide lowercase italic shadow-sm"
            >
              {sub}
            </span>
          ))}
        </div>

        {/* Tarjeta Principal de Servicio: Sesión individual online */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#27221F] mb-4">
              {title}
            </h2>
            <div className="w-12 h-0.5 bg-terracotta-400 mx-auto mb-6" />
            <p className="text-base sm:text-lg text-[#38322E] leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Detalles del espacio */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center text-xs text-[#5C524A]">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="block font-semibold text-[#27221F] mb-1">Formato</span>
              <span>Videollamada Google Meet o Zoom</span>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="block font-semibold text-[#27221F] mb-1">Duración</span>
              <span>75 a 90 minutos de encuentro</span>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE]">
              <span className="block font-semibold text-[#27221F] mb-1">Privacidad</span>
              <span>Espacio confidencial y cuidado</span>
            </div>
          </div>

          {/* Valor y CTA */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-[#8A7E73] block mb-1">
                Valor de la sesión
              </span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#27221F]">
                  {price}
                </span>
                <span className="text-xs font-sans text-[#8A7E73]">CLP</span>
              </div>
            </div>

            <button
              onClick={onBookClick}
              type="button"
              className="w-full sm:w-auto px-10 py-4 text-base font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Reservar sesión
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
