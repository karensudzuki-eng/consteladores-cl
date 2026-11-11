"use client";

import React from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cms/CMSContext";
import { CMSFacilitator } from "@/lib/cms/types";

interface WatercolorTherapistsProps {
  onSelectTherapist?: (therapist: any) => void;
  onBookClick?: () => void;
}

export function WatercolorTherapists({ onSelectTherapist, onBookClick }: WatercolorTherapistsProps) {
  const { content } = useCMS();
  const facilitators: CMSFacilitator[] = content?.facilitators || [];
  const activeFacilitators = facilitators.filter((f) => f.isActive !== false);

  const handleSelect = (facilitator: CMSFacilitator) => {
    if (onSelectTherapist) {
      onSelectTherapist({
        id: facilitator.id,
        name: facilitator.name,
        headline: facilitator.headline,
        schoolAndYear: facilitator.schoolAndYear,
        status: "ACREDITADO",
        specialties: facilitator.specialties || [],
        city: facilitator.city || "Chile",
        modality: facilitator.modality || "Online (Google Meet)",
        totalPriceClp: parseInt((facilitator.price || "40000").replace(/[^0-9]/g, ""), 10) || 40000,
        depositPriceClp: parseInt((facilitator.price || "40000").replace(/[^0-9]/g, ""), 10) || 40000,
        balancePriceClp: 0,
        experienceYears: facilitator.experienceYears || 5,
        completedSessions: 50,
        imageUrl: facilitator.imageUrl,
        bio: facilitator.bio,
      });
    } else if (onBookClick) {
      onBookClick();
    }
  };

  return (
    <section id="facilitadores" className="py-16 sm:py-24 bg-[#FCFAF7] border-t border-[#E7DECE]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-2 block">
            Acreditación y Confianza
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Facilitadores verificados en Chile
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Cada constelador de nuestra red cuenta con formación certificada en escuelas sistémicas avaladas y ha sido verificado manualmente por nuestro equipo ético.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeFacilitators.map((facilitator) => {
            const initials = facilitator.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            const displayPrice = facilitator.price || "$40.000";

            return (
              <div
                key={facilitator.id}
                className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Foto de Perfil o Iniciales */}
                  <div className="relative mb-4">
                    {facilitator.imageUrl ? (
                      <img
                        src={facilitator.imageUrl}
                        alt={facilitator.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-terracotta-300 shadow-sm"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 flex items-center justify-center text-terracotta-700 font-serif text-2xl font-semibold shadow-inner">
                        {initials}
                      </div>
                    )}
                    <span
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-md border-2 border-white"
                      title="Facilitador Acreditado y Verificado"
                    >
                      ✓
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#27221F] mb-1">
                    {facilitator.name}
                  </h3>

                  <p className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider mb-2">
                    {facilitator.role || "Facilitador Acreditado"}
                  </p>

                  <p className="text-xs text-[#5C524A] mb-4 line-clamp-2 leading-relaxed">
                    {facilitator.headline || "Constelaciones Familiares Individuales y Grupales"}
                  </p>

                  <div className="text-xs text-[#5C524A] space-y-1 mb-5 bg-[#FCFAF7] p-3.5 rounded-2xl border border-[#E7DECE]/80 w-full text-left">
                    <p className="font-semibold text-[#27221F] flex items-center gap-1.5">
                      <span>📍</span> {facilitator.city || "Santiago / Online Chile"}
                    </p>
                    <p className="text-[#8A7E73] flex items-center gap-1.5">
                      <span>🎓</span> {facilitator.schoolAndYear || "Formación Sistémica"}
                    </p>
                    <p className="text-[#8A7E73] flex items-center gap-1.5">
                      <span>💻</span> {facilitator.modality || "Online vía Google Meet"}
                    </p>
                  </div>

                  {/* Tarjeta de Precio 100% Unificada (Sin abono ni saldos) */}
                  <div className="w-full bg-white border border-[#E7DECE] rounded-2xl p-4 mb-6 text-center shadow-xs">
                    <div className="text-[11px] font-semibold text-[#8A7E73] uppercase tracking-wider mb-1">
                      Valor Sesión Individual (100%)
                    </div>
                    <div className="text-2xl font-serif font-bold text-terracotta-700">
                      {displayPrice} <span className="text-xs font-sans text-[#8A7E73]">CLP</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium mt-1">
                      Pago seguro con Webpay, Débito o Transferencia
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(facilitator)}
                  type="button"
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Reservar con {facilitator.name.split(" ")[0]}</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Enlace para nuevos terapeutas */}
        <div className="text-center mt-12">
          <Link
            href="/registro-terapeuta"
            className="text-xs font-medium text-terracotta-700 hover:text-terracotta-800 underline underline-offset-4"
          >
            ¿Eres constelador(a) certificado(a)? Postula a la red de facilitadores →
          </Link>
        </div>
      </div>
    </section>
  );
}
