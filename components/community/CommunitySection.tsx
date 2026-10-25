"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";
import { requestCommunityAdmission, CommunityAdmissionResult } from "@/app/actions/community";

export function CommunitySection() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [admissionData, setAdmissionData] = useState<CommunityAdmissionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenCommunity = async () => {
    setIsLoading(true);
    try {
      const data = await requestCommunityAdmission();
      setAdmissionData(data);
      setIsOpenModal(true);
    } catch (err) {
      console.error("Error al obtener acceso a la comunidad:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="comunidad"
      className="relative py-24 sm:py-32 bg-[#2F3E36] border-t border-[#D9664A]/40 overflow-hidden text-white"
    >
      {/* Fondo con imagen propia (arbol-generaciones.png) y velo oscuro de verde salvia profundo */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/arbol-generaciones.png"
          alt="Ilustración del árbol de generaciones y raíces familiares para la comunidad sistémica"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Capa de velo verde salvia oscuro (#2F3E36) con opacidad controlada por CSS variable */}
        <div
          className="absolute inset-0 bg-[#2F3E36] transition-opacity"
          style={{ opacity: "var(--overlay-community-opacity, 0.85)" }}
        />
        {/* Degradado para transición armónica */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F3E36] via-transparent to-[#2F3E36]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tarjeta Cálida tipo Refugio Sagrado con Alto Contraste */}
        <div className="bg-[#FCFAF7] text-[#27221F] border-2 border-[#E7DECE] rounded-3xl p-8 sm:p-14 shadow-2xl text-center relative card-hover-elevate">
          
          {/* Píldora de Sección Centrada */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-6 mx-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sage-600" />
            <span>Red Ética de Acompañamiento Sistémico</span>
          </div>

          {/* Ícono Vivo del Árbol de Raíces */}
          <div className="w-16 h-16 rounded-full bg-sage-50 text-sage-600 border border-sage-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <FamilyTreeIcon className="w-8 h-8" isAnimated={true} />
          </div>

          {/* Título de la Sección */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Un lugar para caminar acompañado/a
          </h2>

          {/* Descripción Acogedora */}
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed max-w-2xl mx-auto mb-6 font-normal">
            Quienes acompañan y participan en procesos de constelaciones tienen aquí un espacio propio para compartir preguntas, reflexiones y sostener la práctica entre pares con respeto y cuidado. Aquí no hay juicios ni respuestas correctas: hay escucha, presencia y raíces que se encuentran.
          </p>

          {/* Aviso Explícito de Reserva de Derecho de Admisión */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FEF9EE] border border-ochre-300 text-earth-800 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-8 shadow-sm text-left">
            <span className="text-ochre-600 text-base flex-shrink-0">⚠️</span>
            <span>
              <strong>Aviso de admisión:</strong> Nos reservamos el derecho de admisión. Toda solicitud queda sujeta a revisión y aprobación por parte de los administradores del grupo para resguardar la confidencialidad y el cuidado del espacio.
            </span>
          </div>

          {/* Botón Principal con el Árbol Animado */}
          <div className="flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleOpenCommunity}
              disabled={isLoading}
              className="px-8 py-4 text-base font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 btn-breathe cursor-pointer disabled:opacity-60"
            >
              <FamilyTreeIcon className="w-5 h-5" isAnimated={true} />
              <span>{isLoading ? "Cargando espacio..." : "Solicitar unirme a la comunidad"}</span>
            </button>

            <p className="text-xs text-[#5C524A] font-medium mt-1">
              Al solicitar ingreso aceptas las normas de respeto y confidencialidad mutua.
            </p>

            <Link
              href="/registro-terapeuta"
              className="text-xs sm:text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 underline underline-offset-4 transition-colors mt-2"
            >
              ¿Eres facilitador formado? Conoce cómo sumarte al directorio oficial →
            </Link>
          </div>

        </div>

      </div>

      {/* MODAL INTERACTIVO DE BIENVENIDA Y ADMISIÓN A TELEGRAM */}
      {isOpenModal && admissionData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] text-[#27221F] border border-[#E7DECE] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-center">
            
            <button
              onClick={() => setIsOpenModal(false)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center focus:outline-none"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <FamilyTreeIcon className="w-7 h-7" isAnimated={true} />
            </div>

            <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-3">
              Bienvenida/o a la comunidad Consteladores Chile
            </h3>

            {/* Mensaje de bienvenida y cuidado */}
            <div className="space-y-3 text-xs sm:text-sm text-[#38322E] leading-relaxed mb-6 bg-cream-50 p-4 rounded-2xl border border-[#E7DECE] text-left">
              <p>
                {admissionData.welcomeMessage}
              </p>
              <div className="pt-2 border-t border-[#E7DECE] text-xs text-[#5C524A]">
                <strong className="text-[#27221F]">Proceso de aprobación:</strong> {admissionData.admissionNotice} Al ingresar por Telegram, envía tu solicitud para que los administradores puedan darte acceso formal.
              </div>
            </div>

            {/* Aviso de crisis con la línea *4141 */}
            <div className="p-3 mb-6 bg-[#FEF9EE] border border-ochre-200 rounded-2xl text-[11px] sm:text-xs text-[#5C524A] text-left flex items-start gap-2">
              <span className="text-ochre-600 font-bold">✦</span>
              <span>
                {admissionData.crisisNotice}
              </span>
            </div>

            {/* Botón hacia Telegram */}
            <a
              href={admissionData.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer btn-breathe"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>Abrir Telegram y Enviar Solicitud de Admisión →</span>
            </a>

            <p className="text-[10px] text-[#8A7E73] mt-2">
              * Serás redirigido a la aplicación oficial de Telegram.
            </p>

            <button
              onClick={() => setIsOpenModal(false)}
              type="button"
              className="text-xs text-[#5C524A] hover:text-[#27221F] underline mt-4"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
