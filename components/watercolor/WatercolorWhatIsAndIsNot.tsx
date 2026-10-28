"use client";

import React from "react";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export function WatercolorWhatIsAndIsNot() {
  const whatItIs = [
    {
      title: "Un abordaje fenomenológico y complementario",
      description:
        "Una mirada sistémica desarrollada para observar cómo las dinámicas, exclusiones y destinos familiares influyen en el presente.",
    },
    {
      title: "Un espacio de acompañamiento y respeto",
      description:
        "Un encuentro cuidado donde puedes mirar aquello que te inquieta, sin juicios, reconociendo el orden y la pertenencia de cada miembro de tu sistema.",
    },
    {
      title: "Un proceso para dar lugar a lo no dicho",
      description:
        "Permite visibilizar lealtades invisibles y agradecer a quienes llegaron antes, para que puedas tomar la fuerza de tu propia vida.",
    },
    {
      title: "Práctica guiada por facilitadores formados",
      description:
        "Profesionales acreditados o en supervisión continua que respetan los límites éticos y el ritmo particular de cada consultante.",
    },
  ];

  const whatItIsNot = [
    {
      title: "No es psicoterapia ni atención médica",
      description:
        "No constituye diagnóstico clínico, psicoterapia formal ni tratamiento psiquiátrico. Quien requiere atención médica o de salud mental debe acudir a un profesional titulado.",
    },
    {
      title: "No promete resultados mágicos ni garantizados",
      description:
        "No existen recetas fijas ni desenlaces predeterminados. El trabajo sistémico abre una mirada interna respetuosa, nunca una promesa de solución automática.",
    },
    {
      title: "No es adivinación ni práctica esotérica",
      description:
        "Se basa en el método fenomenológico y la disposición espacial de los elementos familiares. No involucra predicciones del futuro ni lecturas de destino.",
    },
    {
      title: "No interviene a terceros sin su consentimiento",
      description:
        "El trabajo se centra exclusivamente en el consultante y en su propia postura interna frente a su historia, nunca en modificar a otras personas.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Centrado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Claridad y Ética
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-5">
            Qué es y qué no es una constelación familiar
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Para nosotros la transparencia es el primer paso del cuidado. Queremos que llegues a tu sesión con total claridad sobre el alcance del acompañamiento sistémico.
          </p>
        </div>

        {/* Grilla en Dos Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-14">
          
          {/* Columna 1: Qué es */}
          <div className="bg-[#FCFAF7] border-2 border-sage-500/30 rounded-3xl p-7 sm:p-9 shadow-sm card-hover-elevate">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sage-200">
              <span className="w-3 h-3 rounded-full bg-sage-600" />
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                Qué es
              </h3>
            </div>

            <div className="space-y-6">
              {whatItIs.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-base font-serif font-semibold text-[#27221F]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#5C524A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 2: Qué no es */}
          <div className="bg-[#FCFAF7] border-2 border-terracotta-300/40 rounded-3xl p-7 sm:p-9 shadow-sm card-hover-elevate">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-terracotta-200">
              <span className="w-3 h-3 rounded-full bg-terracotta-500" />
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                Qué no es
              </h3>
            </div>

            <div className="space-y-6">
              {whatItIsNot.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-base font-serif font-semibold text-[#27221F]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#5C524A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Nota ética visible */}
        <div className="bg-[#FAF7F2] border border-[#E7DECE] rounded-2xl p-5 sm:p-6 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-[#5C524A] leading-relaxed mb-2">
            {CONFIG.DISCLAIMER_NOTICE}
          </p>
          <Link
            href="/criterios"
            className="text-xs text-terracotta-600 hover:text-terracotta-700 underline underline-offset-4 font-semibold"
          >
            Conoce nuestros criterios públicos de acreditación y supervisión →
          </Link>
        </div>

      </div>
    </section>
  );
}
