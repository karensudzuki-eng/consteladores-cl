"use client";

import React from "react";
import Image from "next/image";

export function WatercolorAbout() {
  const experiences = [
    {
      initials: "C.M.",
      city: "Santiago, Región Metropolitana",
      quote:
        "Sentía una angustia persistente al intentar independizarme. En la sesión online pudimos mirar la lealtad inconsciente que tenía con las pérdidas económicas de mi abuelo. Sentí un alivio muy hondo.",
      service: "Constelación Individual",
    },
    {
      initials: "F.A.",
      city: "Concepción, Biobío",
      quote:
        "Tenía dudas de cómo funcionaría por Google Meet sin personas físicas de pie. La facilitadora usó muñecos sistémicos y el movimiento fue exactamente igual de conmovedor y revelador. Muy agradecido.",
      service: "Constelación de Pareja",
    },
    {
      initials: "P.V.",
      city: "Valparaíso",
      quote:
        "El sistema de abonar el 20% para asegurar la hora y que se descuente del total me dio mucha confianza. Todo el proceso fue transparente, respetuoso y con mucha calidez humana.",
      service: "Constelación Individual",
    },
  ];

  return (
    <section id="quienes-somos" className="py-24 sm:py-32 bg-[#E9EFEA] border-t border-[#D9664A]/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/75 border border-[#CCD9CF] text-sage-800 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Nuestro Propósito
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-6">
            Quiénes somos
          </h2>
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed">
            <strong className="text-[#27221F] font-semibold">consteladores.cl</strong> nació con una vocación honesta: 
            tender un puente seguro, cálido y transparente entre personas que buscan sanar dinámicas familiares y 
            facilitadores acreditados en Chile. Creemos en una terapia sistémica con los pies en la tierra, sin 
            juicios, sin promesas milagrosas y con el más profundo respeto por el alma de cada consultante.
          </p>
        </div>

        {/* Sección Visual y Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-[#FCFAF7] border border-[#CCD9CF] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm card-hover-elevate"
            >
              <div>
                {/* Comillas sutiles en terracota */}
                <span className="text-3xl font-serif text-terracotta-300 font-bold block mb-2">“</span>
                <p className="text-sm text-[#5C524A] italic leading-relaxed mb-6">
                  {exp.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7DECE]/60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#27221F] block">
                    {exp.initials}
                  </span>
                  <span className="text-xs text-[#8A7E73]">
                    {exp.city}
                  </span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F3ECE2] text-[#5C524A] font-medium">
                  {exp.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje de Compromiso Ético */}
        <div className="mt-14 max-w-2xl mx-auto text-center bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-6">
          <h3 className="text-lg font-serif font-semibold text-[#27221F] mb-2">
            Compromiso ético y formativo
          </h3>
          <p className="text-xs sm:text-sm text-[#5C524A] leading-relaxed">
            No publicamos terapeutas sin comprobación previa de su formación. Nos aseguramos de que cada facilitador cuente con horas de práctica supervisada, respeto por los límites del consultante y una mirada empática libre de dogmas.
          </p>
        </div>

      </div>
    </section>
  );
}
