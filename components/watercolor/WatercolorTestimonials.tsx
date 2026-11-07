"use client";

import React from "react";
import { useCMS } from "@/lib/cms/CMSContext";

export function WatercolorTestimonials() {
  const { content } = useCMS();
  const testimonials = content.testimonials || [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonios" className="py-20 sm:py-28 bg-[#E9EFEA] border-t border-[#D9664A]/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
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
              key={t.id || idx}
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
