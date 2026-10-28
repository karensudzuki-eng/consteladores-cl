"use client";

import React from "react";
import { CONFIG } from "@/lib/config";

export interface ServiceItem {
  id: string;
  name: string;
  modality: string;
  duration: string;
  description: string;
  isPopular?: boolean;
  totalPriceClp?: number;
  depositPriceClp?: number;
  balancePriceClp?: number;
}

export const servicesCatalog: ServiceItem[] = [
  {
    id: "individual_online",
    name: "Sesión Individual Online",
    modality: "Online (Google Meet)",
    duration: "75 a 90 minutos",
    description:
      "Acompañamiento individual a través de videollamada con figuras sistémicas y visualizaciones fenomenológicas. Ideal para profundizar en un tema de origen personal o familiar con total privacidad.",
    isPopular: true,
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
  },
  {
    id: "pareja_online",
    name: "Sesión de Vínculo o Pareja Online",
    modality: "Online (Google Meet)",
    duration: "90 minutos",
    description:
      "Espacio para mirar los órdenes del amor en la relación de pareja o dinámicas vinculares entre dos personas. Se observa la reciprocidad entre dar y tomar.",
    totalPriceClp: 60000,
    depositPriceClp: 12000,
    balancePriceClp: 48000,
  },
  {
    id: "individual_presencial",
    name: "Sesión Individual Presencial",
    modality: "Presencial (Santiago, Viña del Mar y Concepción)",
    duration: "75 a 90 minutos",
    description:
      "Encuentro en consulta privada con anclajes corporales de suelo o muñecos de madera. Sujeto a disponibilidad de agenda y sala en cada ciudad.",
    totalPriceClp: 55000,
    depositPriceClp: 11000,
    balancePriceClp: 44000,
  },
  {
    id: "taller_grupal",
    name: "Taller Vivencial Grupal",
    modality: "Presencial según calendario regional",
    duration: "4 a 5 horas",
    description:
      "Jornada de trabajo en grupo donde se constela con representantes humanos. Permite participar constelando el propio tema o asistiendo como representante.",
    totalPriceClp: 35000,
    depositPriceClp: 7000,
    balancePriceClp: 28000,
  },
];

interface WatercolorServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export function WatercolorServices({ onSelectService }: WatercolorServicesProps) {
  const isPricingEnabled = CONFIG.PRICING_ENABLED;
  const buttonLabel = isPricingEnabled ? "Reservar sesión" : "Consultar disponibilidad";

  return (
    <section id="servicios" className="py-24 sm:py-32 bg-[#FBF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Modalidades y Tiempos de Sesión
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Servicios de acompañamiento sistémico
          </h2>
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed">
            Cada sesión es un espacio dedicado a mirar con atención y calma lo que necesitas ordenar.
          </p>
        </div>

        {/* Grilla de Servicios sin emojis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {servicesCatalog.map((service) => {
            const isPopular = service.isPopular;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between card-hover-elevate ${
                  isPopular
                    ? "bg-[#FCFAF7] border-2 border-terracotta-400 shadow-sm"
                    : "bg-[#FCFAF7] border border-[#E7DECE] shadow-sm"
                }`}
              >
                <div>
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F3ECE2] text-[#5C524A]">
                      {service.modality} · {service.duration}
                    </span>

                    {isPopular && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta-100 text-terracotta-700">
                        Más solicitada
                      </span>
                    )}
                  </div>

                  {/* Título de Tarjeta */}
                  <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-3">
                    {service.name}
                  </h3>

                  {/* Descripción de Acompañamiento */}
                  <p className="text-sm text-[#5C524A] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Bloque de Valor según Flag PRICING_ENABLED */}
                  <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E7DECE] mb-6">
                    {isPricingEnabled && service.totalPriceClp && service.depositPriceClp && service.balancePriceClp ? (
                      <div>
                        <div className="flex items-baseline justify-between mb-3 border-b border-[#E7DECE]/80 pb-2">
                          <span className="text-xs uppercase tracking-wider text-[#8A7E73] font-medium">
                            Valor total
                          </span>
                          <span className="text-xl sm:text-2xl font-serif font-bold text-[#27221F]">
                            ${service.totalPriceClp.toLocaleString("es-CL")}{" "}
                            <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-center text-xs">
                          <div className="bg-white p-2 rounded-lg border border-[#E7DECE]">
                            <span className="text-[11px] block uppercase text-terracotta-600 font-semibold">
                              Abono inicial (20%)
                            </span>
                            <span className="text-sm sm:text-base font-bold text-terracotta-700">
                              ${service.depositPriceClp.toLocaleString("es-CL")}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-[#E7DECE]">
                            <span className="text-[11px] block uppercase text-[#8A7E73] font-medium">
                              Saldo directo (80%)
                            </span>
                            <span className="text-sm sm:text-base font-semibold text-[#5C524A]">
                              ${service.balancePriceClp.toLocaleString("es-CL")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <span className="text-xs uppercase tracking-wider text-[#8A7E73] block mb-1">
                          Honorarios
                        </span>
                        <p className="text-base font-serif font-semibold text-[#27221F]">
                          Valor: por definir. Consulta antes de reservar.
                        </p>
                        <p className="text-xs text-[#8A7E73] mt-1">
                          Te informamos el valor vigente y los cupos disponibles de cada facilitador antes de confirmar.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón de Agendamiento o Consulta */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => onSelectService(service)}
                    type="button"
                    className="w-full py-3 px-6 text-sm font-semibold rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                  >
                    {buttonLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aclaración ética visible */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#8A7E73]">
            {CONFIG.DISCLAIMER_NOTICE}
          </p>
        </div>

      </div>
    </section>
  );
}
