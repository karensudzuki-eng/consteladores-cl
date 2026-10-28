"use client";

import React from "react";

export function WatercolorTestimonials() {
  const testimonials = [
    {
      quote:
        "La sesión me permitió observar con serenidad la dinámica que se repetía en mis relaciones y comprender el lugar que ocupo en mi sistema de origen. El espacio fue de profundo respeto.",
      attribution: "Consultante, Región Metropolitana, Sesión individual online, marzo 2026",
    },
    {
      quote:
        "Tenía dudas sobre cómo se desarrollaría el acompañamiento por Google Meet. El trabajo con anclajes y figuras sistémicas fue sobrio, claro y muy respetuoso de mis tiempos.",
      attribution: "Consultante, Región de Valparaíso, Sesión individual online, enero 2026",
    },
    {
      quote:
        "Valoro especialmente la claridad ética: no te prometen soluciones mágicas, sino que te acompañan a mirar lo que necesitas ordenar. El proceso de pago directo al facilitador fue transparente.",
      attribution: "Consultante, Región del Biobío, Sesión individual online, febrero 2026",
    },
  ];

  return (
    <section id="testimonios" className="py-24 sm:py-32 bg-[#E9EFEA] border-t border-[#D9664A]/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/75 border border-[#CCD9CF] text-sage-800 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Experiencias Compartidas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-5">
            Testimonios de consultantes
          </h2>
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed">
            Resguardamos rigurosamente la privacidad y confidencialidad. Los siguientes testimonios corresponden a experiencias reales compartidas bajo consentimiento.
          </p>
        </div>

        {/* Grilla de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FCFAF7] border border-[#CCD9CF] rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm card-hover-elevate"
            >
              <div>
                <span className="text-3xl font-serif text-terracotta-400 font-bold block mb-3">“</span>
                <p className="text-sm text-[#38322E] italic leading-relaxed mb-6 font-normal">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7DECE]/80">
                <span className="text-xs text-[#5C524A] font-medium leading-tight block">
                  {t.attribution}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
