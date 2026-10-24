"use client";

import React, { useState } from "react";
import { directoryFacilitators, FacilitatorProfile, specialtiesList } from "@/lib/data/directory";

interface SystemicTriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFacilitator: (facilitator: FacilitatorProfile) => void;
}

export function SystemicTriageModal({
  isOpen,
  onClose,
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
      setStep(4); // Mostrar recomendación
    }
  };

  const handleReset = () => {
    setStep(1);
  };

  // Encontrar el facilitador que mejor calce
  const recommendedFacilitator =
    directoryFacilitators.find((f) => f.specialties.includes(selectedSpecialty)) ||
    directoryFacilitators[0];

  const specialtyInfo = specialtiesList.find((s) => s.id === selectedSpecialty) || specialtiesList[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors"
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

        {/* PASO 1: Identificación del Dolor Emocional / Área */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Neuromarketing Sistémico · Paso 1
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                ¿Qué área de tu vida siente hoy el mayor peso o repetición?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
                El síntoma o bloqueo es la puerta de entrada para mirar el orden de tu sistema familiar.
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
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-semibold text-base text-[#27221F]">
                      {item.name}
                    </span>
                    {selectedSpecialty === item.id && (
                      <span className="text-terracotta-600 font-bold text-sm">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-[#5C524A] mt-1 font-sans">
                    {item.painPoint}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              type="button"
              className="w-full py-3.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md transition-all active:scale-[0.99]"
            >
              Continuar
            </button>
          </div>
        )}

        {/* PASO 2: Nivel de Intimidad y Formato Preferido */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Contención Emocional · Paso 2
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                ¿Qué formato te brinda mayor seguridad y tranquilidad?
              </h3>
              <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
                Cada persona tiene su propio ritmo para exponer y mirar su historia personal.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: "individual_online",
                  title: "Sesión Individual 100% Online (Google Meet)",
                  desc: "Máxima intimidad desde tu casa. El facilitador utiliza figuras sistémicas y frases sanadoras en privado.",
                  badge: "Recomendado para primerizos",
                },
                {
                  id: "individual_presencial",
                  title: "Sesión Individual Presencial (Consulta privada)",
                  desc: "Encuentro personal cara a cara en consulta terapéutica con figuras y anclajes en el suelo.",
                  badge: "Santiago / Viña del Mar",
                },
                {
                  id: "taller_grupal",
                  title: "Taller Vivencial Grupal con Representantes",
                  desc: "Experiencia de campo profundo donde otras personas del grupo prestan su cuerpo para representar tu linaje.",
                  badge: "Fuerza fenomenológica grupal",
                },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedFormat === fmt.id
                      ? "bg-[#FEF9EE] border-ochre-400 ring-2 ring-ochre-200"
                      : "bg-[#FCFAF7] border-[#E7DECE] hover:bg-[#F3ECE2]/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-semibold text-base text-[#27221F]">
                      {fmt.title}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F3ECE2] text-[#5C524A]">
                      {fmt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C524A] leading-relaxed">
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
                className="w-2/3 py-3.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: Ubicación y Disponibilidad */}
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
                Conectamos con consteladores validados tanto online para todo Chile como presencial.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                {
                  id: "online",
                  title: "100% Online (Desde cualquier lugar de Chile o el mundo)",
                  desc: "Horarios flexibles, sin traslados. Sesiones confidenciales por Google Meet.",
                },
                {
                  id: "santiago",
                  title: "Presencial en Santiago (Providencia, Las Condes o Vitacura)",
                  desc: "Consultorios accesibles con metro y estacionamiento.",
                },
                {
                  id: "regiones",
                  title: "Presencial en Regiones (Viña del Mar / Concepción)",
                  desc: "Facilitadores acreditados con atención clínica en regiones.",
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
                className="w-2/3 py-3.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md"
              >
                Ver Recomendación Sistémica
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: RECOMENDACIÓN SISTÉMICA PERSONALIZADA (BOFU) */}
        {step === 4 && (
          <div className="text-center py-2 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-[#FEF9EE] border-2 border-ochre-400 text-ochre-600 flex items-center justify-center mx-auto mb-4 text-2xl font-serif">
              ✦
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
              Diagnóstico Sistémico Recomendado
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F] mb-2">
              Orientación para: {specialtyInfo.name}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
              Basado en tus respuestas, el camino con menor resistencia emocional es abordar tu consulta mediante una{" "}
              <strong className="text-[#27221F]">
                {selectedFormat === "taller_grupal" ? "constelación en taller vivencial" : "sesión individual"}
              </strong>{" "}
              centrada en reconocer el origen inconsciente y devolver la carga con respeto.
            </p>

            {/* Tarjeta del Facilitador Recomendado */}
            <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-5 mb-6 text-left shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[11px] font-semibold text-ochre-600 uppercase tracking-wider block">
                    Facilitador(a) Recomendado(a)
                  </span>
                  <h4 className="text-xl font-serif font-semibold text-[#27221F]">
                    {recommendedFacilitator.name}
                  </h4>
                  <p className="text-xs text-terracotta-600 font-medium">
                    {recommendedFacilitator.headline}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8A7E73] block">Valor sesión:</span>
                  <span className="text-lg font-serif font-bold text-[#27221F]">
                    ${recommendedFacilitator.totalPriceClp.toLocaleString("es-CL")}
                  </span>
                  <span className="text-[10px] text-terracotta-600 block">
                    Reserva hoy 20%: ${recommendedFacilitator.depositPriceClp.toLocaleString("es-CL")}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5C524A] leading-relaxed mb-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E7DECE]/60">
                {recommendedFacilitator.bio}
              </p>

              <div className="flex items-center justify-between text-xs text-[#8A7E73] pt-2 border-t border-[#E7DECE]/60">
                <span>📍 {recommendedFacilitator.locationDetails}</span>
                <span>Próxima fecha: <strong className="text-[#27221F]">{recommendedFacilitator.nextAvailableDate}</strong></span>
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectFacilitator(recommendedFacilitator);
                }}
                type="button"
                className="w-full py-3.5 px-6 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Agendar con {recommendedFacilitator.name} (Reserva 20%)
              </button>
              
              <button
                onClick={handleReset}
                type="button"
                className="text-xs text-[#8A7E73] hover:text-[#27221F] underline block mx-auto"
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
