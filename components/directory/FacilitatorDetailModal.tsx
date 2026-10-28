"use client";

import React from "react";
import { FacilitatorProfile } from "@/lib/data/directory";
import { CONFIG } from "@/lib/config";

interface FacilitatorDetailModalProps {
  facilitator: FacilitatorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (facilitator: FacilitatorProfile) => void;
  onQuote: (facilitator: FacilitatorProfile) => void;
}

export function FacilitatorDetailModal({
  facilitator,
  isOpen,
  onClose,
  onBook,
  onQuote,
}: FacilitatorDetailModalProps) {
  if (!isOpen || !facilitator) return null;

  const initials = facilitator.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  const isPricingEnabled = CONFIG.PRICING_ENABLED;
  const selectButtonLabel = isPricingEnabled ? "Agendar sesión" : "Consultar disponibilidad";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar detalle"
        >
          ✕
        </button>

        {/* Cabecera del Facilitador */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-[#E7DECE]">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-2xl font-bold shadow-inner">
              {initials}
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[11px] font-semibold mb-1.5">
              <span>Estado: Acreditado Icalma</span>
              <span>· {facilitator.experienceYears} años de práctica</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F]">
              {facilitator.name}
            </h3>
            <p className="text-sm text-terracotta-600 font-medium mb-1">
              {facilitator.headline}
            </p>
            <p className="text-xs text-[#8A7E73]">
              Formación: {facilitator.schoolAndYear}
            </p>
          </div>
        </div>

        {/* Modalidades y Ubicación */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 mb-6">
          <span className="text-xs font-semibold text-[#5C524A] uppercase tracking-wider block mb-2">
            Modalidades de atención y ciudad
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {facilitator.modalities.includes("online") && (
              <span className="px-3 py-1 rounded-full bg-[#F3ECE2] text-[#27221F] font-medium">
                Online (Google Meet)
              </span>
            )}
            {facilitator.modalities.includes("presencial") && (
              <span className="px-3 py-1 rounded-full bg-[#FEF9EE] text-[#9A6523] border border-[#F7E1B0] font-medium">
                Presencial ({facilitator.city})
              </span>
            )}
            {facilitator.modalities.includes("taller_grupal") && (
              <span className="px-3 py-1 rounded-full bg-[#FDF7F4] text-terracotta-700 border border-terracotta-200 font-medium">
                Talleres Vivenciales Grupales
              </span>
            )}
          </div>
          <p className="text-xs text-[#8A7E73] mt-2">
            Atención: {facilitator.locationDetails}
          </p>
        </div>

        {/* Biografía y Enfoque */}
        <div className="space-y-4 mb-6 text-sm text-[#5C524A] leading-relaxed">
          <div>
            <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-1">
              Sobre la labor de facilitación
            </h4>
            <p>{facilitator.bio}</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E7DECE]/80">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#27221F] mb-1">
              Método en sesión
            </h5>
            <p className="text-xs text-[#5C524A]">{facilitator.approachDetails}</p>
          </div>
        </div>

        {/* Testimonios Reales */}
        {facilitator.reviews && facilitator.reviews.length > 0 && (
          <div className="mb-6">
            <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-3">
              Experiencias de consultantes
            </h4>
            <div className="space-y-2.5">
              {facilitator.reviews.map((rev, idx) => (
                <div key={idx} className="bg-[#FCFAF7] border border-[#E7DECE] rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#27221F]">{rev.author}, {rev.city}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3ECE2] text-[#5C524A]">
                      {rev.theme}
                    </span>
                  </div>
                  <p className="text-[#5C524A] italic">“{rev.text}”</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desglose de Valores y Acciones */}
        <div className="bg-[#FAF8F5] border-t border-[#E7DECE] pt-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs text-[#8A7E73] block">Honorarios de sesión:</span>
              {isPricingEnabled ? (
                <>
                  <span className="text-2xl font-serif font-bold text-[#27221F]">
                    ${facilitator.totalPriceClp.toLocaleString("es-CL")}{" "}
                    <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
                  </span>
                  <span className="text-xs text-terracotta-600 block font-medium">
                    Abono 20%: ${facilitator.depositPriceClp.toLocaleString("es-CL")} · Saldo: ${facilitator.balancePriceClp.toLocaleString("es-CL")}
                  </span>
                  <span className="text-[10px] text-[#8A7E73] block mt-0.5">
                    * Valores referenciales sujetos a cambio
                  </span>
                </>
              ) : (
                <span className="text-base font-serif font-semibold text-[#27221F] block">
                  Valor: por definir. Consulta antes de reservar.
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onBook(facilitator);
                }}
                type="button"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all text-center cursor-pointer"
              >
                {selectButtonLabel}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
