"use client";

import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  onBookClick: () => void;
}

export function HeroSection({ onBookClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
      
      {/* Imagen de fondo natural con overlay oscuro para contraste accesible WCAG AA */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop"
          alt="Paisaje de bosque sereno con luz natural suave entre árboles, representando calma y recogimiento"
          fill
          priority
          className="object-cover object-center filter brightness-50"
          sizes="100vw"
        />
        {/* Capa de degradado verde bosque para garantizar legibilidad WCAG AA */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/80 to-forest-900/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        
        {/* Elemento tipográfico sobrio (reemplazo de emoji) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-800/80 border border-forest-500/40 text-cream-200 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
          <span>Chile</span>
          <span className="text-ochre-500">•</span>
          <span>Modalidad 100% Online vía Google Meet</span>
        </div>

        {/* H1 Principal */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] max-w-4xl mx-auto">
          Constelaciones familiares online en Chile
        </h1>

        {/* Bajada */}
        <p className="mt-4 text-base sm:text-xl text-cream-100 max-w-2xl mx-auto leading-relaxed font-sans">
          Un espacio seguro y respetuoso para mirar lo que pesa en tu historia familiar, a tu ritmo.
        </p>

        {/* Texto breve de sensibilización ética */}
        <div className="mt-6 max-w-2xl mx-auto p-4 rounded-xl bg-forest-800/60 border border-forest-500/30 text-xs sm:text-sm text-cream-200 leading-relaxed backdrop-blur-sm">
          Las constelaciones tocan temas personales y emocionales. Tómate el tiempo que necesites para decidir. Este espacio complementa, pero no reemplaza, la atención de salud mental ni tratamientos médicos o psiquiátricos.
        </div>

        {/* Enlaces visibles a "Cómo funciona" y "Preguntas frecuentes" */}
        <div className="mt-5 flex items-center justify-center gap-6 text-xs sm:text-sm text-cream-200">
          <a
            href="#como-funciona"
            className="underline hover:text-ochre-500 transition-colors focus-visible:text-ochre-500"
          >
            Cómo funciona una sesión
          </a>
          <span className="text-forest-500">•</span>
          <a
            href="#faq"
            className="underline hover:text-ochre-500 transition-colors focus-visible:text-ochre-500"
          >
            Preguntas frecuentes
          </a>
        </div>

        {/* Acciones principales: Reserva y WhatsApp separados */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          
          {/* Botón primario de reserva en Ocre */}
          <div className="w-full sm:w-auto flex flex-col items-center">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              Reservar sesión (desde $9.000)
            </button>
            <span className="text-[11px] text-cream-200/80 mt-1.5 text-center">
              Reserva con el 20% · Saldo 80% previo a la sesión
            </span>
          </div>

          {/* Botón secundario separado para WhatsApp */}
          <div className="w-full sm:w-auto">
            <a
              href="https://wa.me/56984521190?text=Hola,%20quisiera%20hacer%20una%20consulta%20sobre%20las%20constelaciones%20familiares%20online"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-800/80 hover:bg-forest-800 text-cream-100 border border-forest-500/50 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

        </div>

        {/* Bloque de seguridad o contención en crisis */}
        <div className="mt-8 pt-6 border-t border-forest-700/60 max-w-xl mx-auto text-xs text-cream-200/90 flex items-center justify-center gap-2">
          <span className="text-ochre-400 font-bold shrink-0">Atención:</span>
          <p>
            Si estás atravesando una crisis emocional o pensamientos de hacerte daño, contacta de inmediato a{" "}
            <span className="underline font-bold text-white">[línea de crisis confirmada, ej. *4141 en Chile]</span>{" "}
            o a los servicios de urgencia hospitalaria.
          </p>
        </div>

      </div>
    </section>
  );
}
