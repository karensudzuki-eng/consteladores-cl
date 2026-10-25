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
      q: "¿Por qué se abona el 20% al reservar?",
      a: "Para poder reservar la cita se debe abonar el 20%, el cual se descuenta del valor total al momento de pagar. Este abono asegura tu espacio en la agenda de tu facilitador y cubre la gestión de plataforma. El 80% restante se cancela directamente al constelador antes o al finalizar la sesión.",
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
    <section id="faq" className="py-24 sm:py-32 bg-[#FBF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Claridad y Respuestas
          </div>
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
