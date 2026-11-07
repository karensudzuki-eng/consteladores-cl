"use client";

import React from "react";
import { CMSWorkshop } from "@/lib/cms/content";
import { WorkshopLogoBadge } from "./WorkshopLogos";

interface WorkshopDetailModalProps {
  workshop: CMSWorkshop | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkshopDetailModal({
  workshop,
  isOpen,
  onClose,
}: WorkshopDetailModalProps) {
  if (!isOpen || !workshop) return null;

  const rawPhone = (workshop.phoneContact || "+56 9 4193 9363").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(
    `Hola, me interesa participar en el taller "${workshop.title}" (${workshop.date}). ¿Tienen cupos disponibles o puedo enviar mi comprobante?`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-[#FBF7F2] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left text-[#27221F] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 border border-[#E7DECE] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Encabezado con Logo dinámico */}
        <div className="flex items-center justify-between mb-4">
          <WorkshopLogoBadge
            logoType={workshop.logoType}
            logoUrl={workshop.logoUrl}
          />
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
            Taller Vivencial
          </span>
        </div>

        {/* Flyer miniatura si existe */}
        {workshop.flyerUrl && (
          <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-[#E7DECE] bg-[#FAF8F5]">
            <img
              src={workshop.flyerUrl}
              alt={workshop.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-medium tracking-wide">
                {workshop.date} · {workshop.time}
              </span>
            </div>
          </div>
        )}

        {/* Título Principal */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F] mb-3 leading-snug">
          {workshop.title}
        </h2>

        {/* Fecha, Facilitadoras y Ubicación */}
        <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-4 sm:p-5 mb-5 space-y-2 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E7DECE]/80 pb-2">
            <span className="text-[#8A7E73] font-medium">Fecha y Horario:</span>
            <span className="font-semibold text-[#27221F]">
              {workshop.date} {workshop.time && `· ${workshop.time}`}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E7DECE]/80 pb-2">
            <span className="text-[#8A7E73] font-medium">Facilitadoras:</span>
            <span className="font-semibold text-terracotta-700">
              {workshop.facilitators}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#E7DECE]/80 pb-2">
            <span className="text-[#8A7E73] font-medium">Modalidad y Lugar:</span>
            <span className="font-semibold text-[#27221F]">
              {workshop.modality === "online" ? "Online vía Google Meet" : `${workshop.address} (${workshop.city})`}
            </span>
          </div>

          {workshop.price && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
              <span className="text-[#8A7E73] font-medium">Valor de participación:</span>
              <span className="font-serif font-bold text-base text-[#27221F]">
                {workshop.price} <span className="text-xs font-sans text-[#8A7E73]">CLP</span>
              </span>
            </div>
          )}
        </div>

        {/* Descripción del Taller */}
        <div className="mb-5 space-y-2">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8A7E73]">
            Acerca del encuentro
          </h3>
          <p className="text-sm sm:text-[15px] text-[#38322E] leading-relaxed">
            {workshop.description}
          </p>
        </div>

        {/* Nota Importante: Selección de Casos y Resonancia Sistémica */}
        <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-4 sm:p-5 mb-6 text-xs sm:text-sm text-[#7C5217] space-y-2 leading-relaxed">
          <p className="font-medium">
            {workshop.importantNote}
          </p>
        </div>

        {/* Contacto directo y WhatsApp interactivo */}
        <div className="pt-2 border-t border-[#E7DECE] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#5C524A] text-center sm:text-left">
            <span className="block text-[11px] text-[#8A7E73]">Coordinación y consultas:</span>
            <a
              href={`tel:${rawPhone}`}
              className="font-semibold text-[#27221F] hover:text-terracotta-600 transition-colors"
            >
              {workshop.phoneContact || "+56 9 4193 9363"}
            </a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.023 6.486 2.023 12.016c0 1.954.561 3.864 1.624 5.518L2 22l4.636-1.614c1.584.974 3.42 1.493 5.404 1.493 5.53 0 10.017-4.486 10.017-10.016 0-5.53-4.487-10.016-10.017-10.016z" />
            </svg>
            <span>Coordinar o Enviar Comprobante por WhatsApp →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
