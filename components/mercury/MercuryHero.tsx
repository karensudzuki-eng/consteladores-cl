"use client";

import React from "react";
import Image from "next/image";

interface MercuryHeroProps {
  onBookClick: () => void;
}

export function MercuryHero({ onBookClick }: MercuryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#171721] text-[#ededf3] min-h-[640px] lg:min-h-[720px] flex items-center justify-center border-b border-[#70707d]/20">
      
      {/* Full-Bleed Atmospheric Photography (Memoria familiar, penumbra y raíces) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600&auto=format&fit=crop"
          alt="Fotografía atmosférica de manos familiares enlazadas en penumbra y luz cálida de memoria"
          fill
          priority
          className="object-cover object-center filter brightness-[0.32] contrast-105"
          sizes="100vw"
        />
        {/* Cinematic gradient overlay matching Onyx Canvas #171721 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171721] via-[#171721]/85 to-[#171721]/60" />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        
        {/* Tagline Pill (40px radius, Mist hairline border) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[40px] bg-[#1e1e2a]/80 border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] mb-8 backdrop-blur-sm">
          <span>CHILE</span>
          <span className="text-[#5266eb]">•</span>
          <span>MODALIDAD 100% ONLINE VIA GOOGLE MEET</span>
        </div>

        {/* Headline at intermediate weight 480 with positive letter spacing (Strictly Centered) */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-sans font-[480] tracking-[0.015em] leading-[1.12] text-[#ededf3] text-center">
          Constelaciones familiares online en Chile
        </h1>

        {/* Subtext at 18px / 480 weight (Strictly Centered) */}
        <p className="mt-5 text-base sm:text-[18px] text-[#c3c3cc] leading-[1.4] font-[400] text-center max-w-[560px]">
          Un espacio seguro y respetuoso para mirar lo que pesa en tu historia familiar, a tu ritmo.
        </p>

        {/* Sensitization Card: Graphite Card #1e1e2a, 12px radius, flat, no shadows */}
        <div className="mt-8 p-6 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] text-center max-w-[580px]">
          Las constelaciones tocan temas personales y emocionales. Tómate el tiempo que necesites para decidir. Este espacio complementa, pero no reemplaza, la atención de salud mental ni tratamientos médicos o psiquiátricos.
        </div>

        {/* Visible Links */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#c3c3cc]">
          <a
            href="#que-es"
            className="hover:text-[#ededf3] underline transition-colors"
          >
            Cómo funciona una sesión
          </a>
          <span className="text-[#70707d]">•</span>
          <a
            href="#faq"
            className="hover:text-[#ededf3] underline transition-colors"
          >
            Preguntas frecuentes
          </a>
        </div>

        {/* Primary CTA (Cobalt #5266eb) + Secondary (Obsidian #272735) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          
          <div className="flex flex-col items-center w-full sm:w-auto">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-sm shadow-none transition-all flex items-center justify-center gap-2"
            >
              Reservar sesión (desde $9.000)
            </button>
            <span className="text-[11px] text-[#c3c3cc]/70 mt-1.5 text-center">
              Reserva 20% · Saldo 80% previo al encuentro
            </span>
          </div>

          <a
            href="https://wa.me/56984521190?text=Hola,%20quisiera%20hacer%20una%20consulta%20sobre%20las%20constelaciones%20familiares%20online"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-[32px] bg-[#272735] hover:bg-[#272735]/80 text-[#ededf3] border border-[#e2e3ed]/10 text-sm font-[400] transition-all flex items-center justify-center gap-2"
          >
            Escríbenos por WhatsApp
          </a>

        </div>

        {/* Crisis Containment Footnote */}
        <div className="mt-8 pt-6 border-t border-[#70707d]/20 text-[12px] text-[#c3c3cc]/80 max-w-[540px] text-center leading-[1.4]">
          <span className="text-[#ededf3] font-[480]">Contención en crisis:</span> Si estás atravesando una crisis o pensamientos de hacerte daño, contacta de inmediato a <span className="text-[#ededf3] underline font-[480]">[línea de crisis confirmada, ej. *4141 en Chile]</span> o a los servicios de urgencia hospitalaria.
        </div>

      </div>
    </section>
  );
}
