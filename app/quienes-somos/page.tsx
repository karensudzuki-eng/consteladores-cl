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

          {/* Valores y Principios Guía (Editables y con Imagen Clickable que Redirige) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {(
              about?.pillars || [
                {
                  id: "respeto",
                  title: "Respeto y Confidencialidad",
                  description:
                    "Cada historia y motivo de consulta es tratado como un espacio sagrado, bajo el más riguroso resguardo ético y privacidad.",
                  imageUrl: "/images/mirar-historia-sanar.png",
                  linkUrl: "/#servicios",
                },
                {
                  id: "mirada",
                  title: "Mirada Fenomenológica",
                  description:
                    "No imponemos interpretaciones ni juicios morales; observamos lo que se muestra y acogemos lo que emerge con compasión.",
                  imageUrl: "/images/arbol-generaciones.png",
                  linkUrl: "/#talleres",
                },
                {
                  id: "comunidad",
                  title: "Comunidad Viva",
                  description:
                    "Fomentamos el encuentro continuo de facilitadores, practicantes y consultantes para aprender juntos y apoyarnos mutuamente.",
                  imageUrl: "/images/comunidad-encuentro.png",
                  linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx",
                },
              ]
            ).map((pillar) => {
              const isExternal = pillar.linkUrl?.startsWith("http");
              const CardWrapper = ({ children }: { children: React.ReactNode }) =>
                isExternal ? (
                  <a
                    href={pillar.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full group"
                  >
                    {children}
                  </a>
                ) : (
                  <Link href={pillar.linkUrl || "#"} className="block h-full group">
                    {children}
                  </Link>
                );

              return (
                <div key={pillar.id} className="h-full">
                  <CardWrapper>
                    <div className="bg-white/85 hover:bg-white border border-[#E7DECE] hover:border-terracotta-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                      <div>
                        {/* Imagen Pequeña Clickable */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#E7DECE] bg-[#FAF8F5] mb-4 group-hover:scale-105 transition-transform shadow-sm">
                          <img
                            src={pillar.imageUrl || "/images/arbol-generaciones.png"}
                            alt={pillar.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h3 className="text-lg font-serif font-bold text-[#27221F] mb-2 group-hover:text-terracotta-700 transition-colors">
                          {pillar.title}
                        </h3>

                        <p className="text-xs text-[#5C524A] leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-2 flex items-center gap-1.5 text-xs font-semibold text-terracotta-600 group-hover:text-terracotta-700">
                        <span>Ver más</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </CardWrapper>
                </div>
              );
            })}
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
                Ver talleres
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
