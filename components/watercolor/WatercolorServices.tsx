"use client";

import React from "react";
import { useCMS } from "@/lib/cms/CMSContext";

interface WatercolorServicesProps {
  onBookClick: () => void;
}

export function WatercolorServices({ onBookClick }: WatercolorServicesProps) {
  const { content } = useCMS();
  const settings = content.settings;

  const title = settings.serviceTitle || "Sesión Individual";
  const description =
    settings.serviceDescription ||
    "La sesión puede ser individual online, presencial o por videollamada. Su objetivo es identificar y resolver bloqueos emocionales, patrones repetitivos, duelos o conflictos familiares, de pareja y laborales no resueltos, donde un terapeuta constelador te acompañará a mirar tu situación, traer una imagen del conflicto y, desde la comprensión, algo dentro se alivia y se calma el sistema.";
  const price = settings.servicePrice || "$40.000";
  const duration = settings.serviceDuration || "1 hora aprox.";
  const serviceImg = settings.serviceImage || "/images/mirar-historia-sanar.png";

  const materials = settings.serviceOnlineMaterials || [
    "6 papelitos blancos de 7x7 cm aproximadamente, cada uno con una flecha dibujada con plumón en color oscuro.",
    "Pañuelos desechables o similar.",
  ];

  const requirements =
    settings.serviceOnlineRequirements ||
    "Contar con un espacio privado e internet a través de computador o teléfono móvil.";

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-[#FBF7F2] border-t border-[#E7DECE]/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#27221F] mb-3">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-terracotta-400 mx-auto" />
        </div>

        {/* Tarjeta Principal: 2 Columnas (Imagen al costado y Textos Editables) */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Columna Izquierda: Imagen de la Sesión */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#E7DECE] bg-[#FAF8F5] shadow-sm">
                <img
                  src={serviceImg}
                  alt={title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Ficha Resumen de Duración y Valor */}
              <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] block mb-0.5">
                    Duración
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base text-[#27221F]">
                    {duration}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7E73] block mb-0.5">
                    Valor Sesión
                  </span>
                  <span className="font-serif font-bold text-xl sm:text-2xl text-terracotta-700">
                    {price} <span className="text-xs font-sans text-[#8A7E73]">CLP</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Explicación, Materiales, Requisitos y Botón */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Explicación Sistémica */}
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-[#38322E] leading-relaxed font-normal">
                  {description}
                </p>
              </div>

              {/* Materiales y Requisitos para Consulta Online */}
              <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4 text-xs sm:text-sm">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#27221F] mb-2 flex items-center gap-1.5">
                    <span>📄</span>
                    <span>Materiales necesarios para tu consulta online:</span>
                  </h3>
                  <ul className="space-y-1.5 text-[#5C524A] pl-5 list-disc">
                    {materials.map((mat, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E7DECE]/80">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#8A7E73] mb-1">
                    Requisitos online:
                  </h4>
                  <p className="text-[#5C524A] leading-relaxed">
                    {requirements}
                  </p>
                </div>
              </div>

              {/* Botón de Acción Principal */}
              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  type="button"
                  className="w-full sm:w-auto px-10 py-4 text-base font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Reservar sesión</span>
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
