"use client";

import React, { useState } from "react";
import { FacilitatorProfile, specialtiesList } from "@/lib/data/directory";
import { CONFIG } from "@/lib/config";

interface SystemicTriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilitators?: FacilitatorProfile[];
  onSelectFacilitator: (facilitator?: FacilitatorProfile) => void;
}

export function SystemicTriageModal({
  isOpen,
  onClose,
  facilitators = [],
  onSelectFacilitator,
}: SystemicTriageModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("pareja");
  const [selectedFormat, setSelectedFormat] = useState<string>("individual_online");
  const [selectedLocation, setSelectedLocation] = useState<string>("online");

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
  };

  const recommendedFacilitator =
    facilitators.find((f) => f.specialties.includes(selectedSpecialty)) ||
    (facilitators.length > 0 ? facilitators[0] : null);

  const specialtyInfo = specialtiesList.find((s) => s.id === selectedSpecialty) || specialtiesList[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar orientador"
        >
          ✕
        </button>

        {/* Barra de Progreso */}
        {step <= 3 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#8A7E73] font-medium mb-2">
              <span>Orientador Sistémico (Paso {step} de 3)</span>
              <span>{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-[#E7DECE] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-terracotta-500 h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* PASO 1: Identificación del Área a Mirar */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Test Orientador · Paso 1
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                ¿Qué área de tu vida sientes que requiere mayor orden o comprensión hoy?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
                La situación que te inquieta es el punto de partida para mirar el orden de tu sistema familiar.
              </p>
            </div>

            <div className="space-y-2.5 mb-6">
              {specialtiesList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSpecialty(item.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex flex-col ${
                    selectedSpecialty === item.id
                      ? "bg-[#FDF7F4] border-terracotta-400 ring-2 ring-terracotta-200"
                      : "bg-[#FCFAF7] border-[#E7DECE] hover:bg-[#F3ECE2]/60"
                  }`}
                >
                  <span className="font-serif font-semibold text-sm sm:text-base text-[#27221F] mb-1">
                    {item.name}
                  </span>
                  <p className="text-xs text-[#5C524A] leading-relaxed">
                    {item.painPoint}
                  </p>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3.5 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md transition-all cursor-pointer"
            >
              Continuar al siguiente paso
            </button>
          </div>
        )}

        {/* PASO 2: Formato Preferido */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Modalidad · Paso 2
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                ¿Qué formato de acompañamiento resuena mejor contigo?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
                Ambos formatos respetan los mismos órdenes sistémicos con máxima contención.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: "individual_online",
                  title: "Sesión Individual Online (Google Meet)",
                  desc: "Máxima intimidad, figuras sistémicas y visualizaciones guiadas desde tu hogar.",
                },
                {
                  id: "individual_presencial",
                  title: "Sesión Individual Presencial (Consulta)",
                  desc: "Trabajo en sala en Santiago, Viña del Mar o Concepción con anclajes espaciales.",
                },
                {
                  id: "taller_grupal",
                  title: "Taller Vivencial con Representantes",
                  desc: "Trabajo grupal con otras personas que representan los elementos de tu sistema.",
                },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedFormat === fmt.id
                      ? "bg-[#FDF7F4] border-terracotta-400 ring-2 ring-terracotta-200"
                      : "bg-[#FCFAF7] border-[#E7DECE] hover:bg-[#F3ECE2]/60"
                  }`}
                >
                  <span className="font-serif font-semibold text-base text-[#27221F] block mb-1">
                    {fmt.title}
                  </span>
                  <p className="text-xs text-[#5C524A]">
                    {fmt.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 text-xs font-medium text-[#5C524A] bg-[#F3ECE2] rounded-full"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-2/3 py-3.5 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Ubicación */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Disponibilidad · Paso 3
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                ¿Dónde te gustaría realizar tu proceso?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
                Atención online para todo Chile y presencial en ciudades principales.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: "online",
                  title: "Online (Todo Chile y extranjero)",
                  desc: "Sin traslados, a través de Google Meet en enlace privado.",
                },
                {
                  id: "santiago",
                  title: "Presencial en Santiago",
                  desc: "Consulta privada en la Región Metropolitana.",
                },
                {
                  id: "regiones",
                  title: "Presencial en Viña del Mar o Concepción",
                  desc: "Facilitadores acreditados con atención en regiones.",
                },
              ].map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedLocation === loc.id
                      ? "bg-[#FDF7F4] border-terracotta-400 ring-2 ring-terracotta-200"
                      : "bg-[#FCFAF7] border-[#E7DECE] hover:bg-[#F3ECE2]/60"
                  }`}
                >
                  <span className="font-serif font-semibold text-base text-[#27221F] block mb-1">
                    {loc.title}
                  </span>
                  <p className="text-xs text-[#5C524A]">
                    {loc.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 text-xs font-medium text-[#5C524A] bg-[#F3ECE2] rounded-full"
              >
                Atrás
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-2/3 py-3.5 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md"
              >
                Ver Orientación
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: RECOMENDACIÓN */}
        {step === 4 && (
          <div className="text-center py-2 animate-fadeIn">
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
              Orientación Sistémica Sugerida
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F] mb-2">
              Tema sugerido: {specialtyInfo.name}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
              Basado en tus respuestas, el acompañamiento recomendado es una{" "}
              <strong className="text-[#27221F]">
                {selectedFormat === "taller_grupal" ? "constelación en taller vivencial" : "sesión individual online o presencial"}
              </strong>{" "}
              enfocada en reconocer las dinámicas de origen y dar lugar a lo no dicho.
            </p>

            {recommendedFacilitator ? (
              <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-5 mb-6 text-left shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-sage-800 uppercase tracking-wider block">
                      Facilitadora Acreditada
                    </span>
                    <h4 className="text-xl font-serif font-semibold text-[#27221F]">
                      {recommendedFacilitator.name}
                    </h4>
                    <p className="text-xs text-terracotta-600 font-medium">
                      {recommendedFacilitator.headline}
                    </p>
                  </div>
                  <div className="text-right">
                    {CONFIG.PRICING_ENABLED ? (
                      <>
                        <span className="text-xs text-[#8A7E73] block">Valor sesión:</span>
                        <span className="text-lg font-serif font-bold text-[#27221F]">
                          ${recommendedFacilitator.totalPriceClp.toLocaleString("es-CL")}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-[#8A7E73] block">
                        Valor: por definir
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#5C524A] leading-relaxed mb-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E7DECE]/60">
                  {recommendedFacilitator.bio}
                </p>

                <div className="flex items-center justify-between text-xs text-[#8A7E73] pt-2 border-t border-[#E7DECE]/60">
                  <span>Modalidad: {recommendedFacilitator.locationDetails}</span>
                  <span className="font-semibold text-sage-800">Acreditada Icalma</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 mb-6 text-center text-xs text-[#5C524A]">
                <p className="mb-2 font-medium text-[#27221F]">
                  Estamos coordinando facilitadores acreditados para este tema.
                </p>
                <p className="text-[#8A7E73]">
                  Puedes consultar disponibilidad y nuestro equipo te informará los horarios vigentes.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectFacilitator(recommendedFacilitator || undefined);
                }}
                type="button"
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {CONFIG.PRICING_ENABLED
                  ? (recommendedFacilitator ? `Reservar sesión con ${recommendedFacilitator.name}` : "Solicitar sesión")
                  : "Consultar disponibilidad de sesión"}
              </button>
              
              <button
                onClick={handleReset}
                type="button"
                className="text-xs text-[#8A7E73] hover:text-[#27221F] underline block mx-auto cursor-pointer"
              >
                Volver a realizar el test
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
