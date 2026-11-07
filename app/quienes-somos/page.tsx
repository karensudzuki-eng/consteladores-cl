"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { HumanInTheLoopModal } from "@/components/booking/HumanInTheLoopModal";
import { useCMS } from "@/lib/cms/CMSContext";

export default function QuienesSomosPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { content } = useCMS();
  const about = content?.settings?.about;

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased selection:bg-terracotta-100 selection:text-terracotta-900">
      <WatercolorNavbar onBookClick={() => setIsBookingOpen(true)} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Nuestra Identidad y Misión
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-[#27221F] mb-6">
              Quiénes Somos
            </h1>
            <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
              Un espacio humano dedicado a acompañar procesos de comprensión, orden y reconciliación sistémica en Chile.
            </p>
          </div>

          {/* Imagen e Historia Principal */}
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-8 sm:p-12 mb-12 shadow-sm space-y-8">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#E7DECE]">
              <img
                src={about?.imageUrl || "/images/comunidad-encuentro.png"}
                alt="Comunidad Consteladores"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-5 text-base sm:text-lg text-[#38322E] leading-relaxed font-light">
              <p>
                {about?.description ||
                  "consteladores.cl es una plataforma orientada a conectar a personas que buscan mirar y ordenar dinámicas de su sistema familiar con facilitadores acreditados y con respaldo docente."}
              </p>
              <p>
                Creemos profundamente que cada historia personal está entrelazada con las vivencias, dolores y fortalezas de las generaciones que nos antecedieron. Nuestro propósito es ofrecer un puente seguro, cálido y confidencial para que cualquier persona pueda acceder a una constelación familiar, ya sea en talleres vivenciales o en sesiones individuales.
              </p>
              <p>
                Trabajamos con el corazón abierto y sin juicios, honrando a cada familia tal como fue, para permitir que surja un nuevo entendimiento y la paz en el presente.
              </p>
            </div>
          </div>

          {/* Valores y Principios Guía */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/80 border border-[#E7DECE] rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-terracotta-50 text-terracotta-600 flex items-center justify-center text-lg mb-4">
                🤍
              </div>
              <h3 className="text-lg font-serif font-bold text-[#27221F] mb-2">
                Respeto y Confidencialidad
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed">
                Cada historia y motivo de consulta es tratado como un espacio sagrado, bajo el más riguroso resguardo ético y privacidad.
              </p>
            </div>

            <div className="bg-white/80 border border-[#E7DECE] rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-cream-100 text-cream-800 flex items-center justify-center text-lg mb-4">
                🌿
              </div>
              <h3 className="text-lg font-serif font-bold text-[#27221F] mb-2">
                Mirada Fenomenológica
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed">
                No imponemos interpretaciones ni juicios morales; observamos lo que se muestra y acogemos lo que emerge con compasión.
              </p>
            </div>

            <div className="bg-white/80 border border-[#E7DECE] rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-sage-50 text-sage-700 flex items-center justify-center text-lg mb-4">
                🤝
              </div>
              <h3 className="text-lg font-serif font-bold text-[#27221F] mb-2">
                Comunidad Viva
              </h3>
              <p className="text-xs text-[#5C524A] leading-relaxed">
                Fomentamos el encuentro continuo de facilitadores, practicantes y consultantes para aprender juntos y apoyarnos mutuamente.
              </p>
            </div>
          </div>

          {/* Llamado a la acción */}
          <div className="bg-cream-100/70 border border-[#E7DECE] rounded-3xl p-8 sm:p-10 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F]">
              ¿Deseas dar el primer paso hacia tu bienestar?
            </h2>
            <p className="text-sm text-[#5C524A] max-w-xl mx-auto">
              Te invitamos a participar en nuestros próximos talleres o a consultar por una sesión individual de acompañamiento.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                type="button"
                className="px-6 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                Reservar sesión individual
              </button>
              <Link
                href="/#talleres"
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F3ECE2] border border-[#E7DECE] text-[#27221F] font-medium text-sm shadow-sm transition-all active:scale-95"
              >
                Ver talleres vivenciales
              </Link>
            </div>
          </div>

        </div>
      </main>

      <WatercolorFooter />

      <HumanInTheLoopModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
