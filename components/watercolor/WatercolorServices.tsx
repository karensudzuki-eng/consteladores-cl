"use client";

import React from "react";
import { OnlineService, onlineServicesList } from "../redesign/OnlineServiceCatalog";

interface WatercolorServicesProps {
  onSelectService: (service: OnlineService) => void;
}

export function WatercolorServices({ onSelectService }: WatercolorServicesProps) {
  return (
    <section id="servicios" className="py-16 sm:py-24 bg-[#FCFAF7] border-t border-[#E7DECE]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-2 block">
            Modalidad 100% Online · Google Meet
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Servicios y valores de sesión
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Puedes reservar tu sesión pagando solo el <strong className="text-[#27221F] font-semibold">20% inicial</strong> para asegurar la fecha en agenda. El saldo restante (80%) se cancela antes o al comenzar tu sesión con el facilitador.
          </p>
        </div>

        {/* Grilla de Servicios en Tonos Pasteles Suaves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {onlineServicesList.map((service) => {
            const isPopular = service.popular;

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  isPopular
                    ? "bg-[#FDF7F4] border-2 border-terracotta-200 shadow-sm ring-1 ring-terracotta-200/50"
                    : "bg-[#FAF8F5] border border-[#E7DECE] shadow-sm"
                }`}
              >
                <div>
                  {/* Etiqueta Destacada o Duración */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F3ECE2] text-[#5C524A]">
                      <svg className="w-3.5 h-3.5 text-ochre-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {service.durationMinutes} min · Google Meet
                    </span>

                    {isPopular && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-terracotta-100 text-terracotta-700">
                        Más solicitada
                      </span>
                    )}
                  </div>

                  {/* Título de Tarjeta Estrictamente Centrado */}
                  <h3 className="text-2xl font-serif font-semibold text-[#27221F] text-center mb-3">
                    {service.name}
                  </h3>

                  {/* Descripción Humana y Empática */}
                  <p className="text-sm text-[#5C524A] text-center leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Desglose de Pago 20% / 80% */}
                  <div className="bg-[#FCFAF7] rounded-xl p-4 border border-[#E7DECE]/80 mb-6">
                    <div className="flex items-baseline justify-between mb-3 border-b border-[#E7DECE]/60 pb-2">
                      <span className="text-xs uppercase tracking-wider text-[#8A7E73] font-medium">
                        Valor total
                      </span>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#27221F]">
                        ${service.totalPriceClp.toLocaleString("es-CL")}{" "}
                        <span className="text-xs font-sans font-normal text-[#8A7E73]">CLP</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7DECE]">
                        <span className="text-[11px] block uppercase font-medium text-terracotta-600">
                          Reserva hoy (20%)
                        </span>
                        <span className="text-base sm:text-lg font-bold text-terracotta-700">
                          ${service.depositPriceClp.toLocaleString("es-CL")}
                        </span>
                      </div>

                      <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E7DECE]">
                        <span className="text-[11px] block uppercase font-medium text-[#8A7E73]">
                          Saldo sesión (80%)
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-[#5C524A]">
                          ${service.balancePriceClp.toLocaleString("es-CL")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de Agendamiento Centrado */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => onSelectService(service)}
                    type="button"
                    className={`w-full py-3 px-6 text-sm font-medium rounded-full transition-all duration-200 ${
                      isPopular
                        ? "bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-sm hover:shadow"
                        : "bg-[#F3ECE2] hover:bg-terracotta-500 text-[#27221F] hover:text-white border border-[#E7DECE]"
                    }`}
                  >
                    Reservar con el 20% (${service.depositPriceClp.toLocaleString("es-CL")})
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota informativa sobre boletas y políticas */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#8A7E73]">
            * Los pagos se realizan de forma segura en pesos chilenos vía Webpay o transferencia bancaria. Boleta de honorarios disponible previa solicitud.
          </p>
        </div>

      </div>
    </section>
  );
}
