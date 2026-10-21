"use client";

import React, { useState } from "react";

export function WatercolorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo funciona una constelación online sin representantes físicos?",
      a: "En la modalidad online individual, el facilitador trabaja a través de videollamada por Google Meet utilizando figuras sistémicas (como muñecos de madera o anclajes espaciales), visualizaciones guiadas y frases sanadoras. El campo cuántico y la información del inconsciente familiar se manifiestan con la misma claridad y profundidad que en una sesión presencial.",
    },
    {
      q: "¿Por qué se paga solo el 20% al reservar?",
      a: "El modelo de reserva del 20% busca brindar tranquilidad y flexibilidad al consultante: aseguras tu bloque horario en la agenda del terapeuta con un pago inicial mínimo. El 80% restante lo cancelas directamente antes de ingresar a la sesión o al comenzar.",
    },
    {
      q: "¿Qué necesito tener preparado para el día de mi sesión?",
      a: "Necesitas estar en un lugar privado y tranquilo donde nadie te interrumpa durante 75 a 90 minutos, una conexión estable a internet, tu computador o celular apoyado fijamente y audífonos para una mejor inmersión sonora y confidencialidad.",
    },
    {
      q: "¿Es necesario tener experiencia previa para constelar?",
      a: "En absoluto. La gran mayoría de los consultantes asiste por primera vez. El facilitador te guiará paso a paso desde el primer minuto con preguntas sencillas sobre tu motivo de consulta y tu árbol familiar inmediato (padres, abuelos, hermanos).",
    },
    {
      q: "¿Qué tipo de temas o dificultades se pueden abordar?",
      a: "Puedes mirar bloqueos en la relación con tus padres o hijos, dificultades recurrentes de pareja, sensación de no pertenecer, duelos no resueltos, patrones de escasez o estancamiento profesional, o síntomas emocionales persistentes.",
    },
    {
      q: "¿Puedo reprogramar mi hora si tengo un imprevisto?",
      a: "Sí. Si nos avisas con al menos 24 horas de anticipación a la fecha agendada, podemos reprogramar tu sesión sin ningún costo adicional o reintegrar tu reserva del 20%.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E7DECE]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-2 block">
            Claridad y Respuestas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-base text-[#5C524A] leading-relaxed">
            Resolvemos tus dudas sobre la modalidad virtual, el proceso de reserva y cómo vivir tu primera constelación.
          </p>
        </div>

        {/* Acordeón de Preguntas */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif font-medium text-[#27221F]">
                    {faq.q}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "bg-terracotta-100 text-terracotta-600 rotate-180" : "bg-[#F3ECE2] text-[#5C524A]"
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#5C524A] leading-relaxed border-t border-[#E7DECE]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
