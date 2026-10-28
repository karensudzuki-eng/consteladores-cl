"use client";

import React, { useState } from "react";
import { CONFIG } from "@/lib/config";

export function WatercolorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo funciona una constelación online sin representantes físicos?",
      a: "En la modalidad online individual, el facilitador te acompaña a través de videollamada por Google Meet utilizando figuras sistémicas (como figuras de madera o anclajes espaciales), visualizaciones y preguntas reflexivas. La imagen interna de tu sistema familiar se hace visible y comprensible con la misma profundidad que en una sesión presencial.",
    },
    {
      q: "¿Por qué se abona el 20% al solicitar la hora?",
      a: "El abono del 20% asegura tu horario en la agenda de tu facilitador y cubre los costos de gestión técnica de la plataforma. Este monto se descuenta íntegramente del valor total de la sesión. El saldo restante (80%) se cancela por transferencia directa a tu facilitador antes o al iniciar el encuentro.",
    },
    {
      q: "¿Qué necesito tener preparado para el día de mi sesión?",
      a: "Necesitas estar en una habitación privada y tranquila donde nadie te interrumpa durante 75 a 90 minutos, una conexión estable a internet, tu computador o celular apoyado fijamente y audífonos para mayor nitidez y confidencialidad.",
    },
    {
      q: "¿Es necesario tener experiencia previa o conocer todo mi árbol genealógico?",
      a: "No es necesario tener experiencia previa ni contar con fechas exactas de tus ancestros. El facilitador te guiará con preguntas sencillas sobre tu motivo de consulta y sobre los hechos significativos conocidos de tu familia de origen (padres, abuelos, pérdidas tempranas o exclusiones).",
    },
    {
      q: "¿Qué tipo de situaciones o inquietudes se pueden mirar?",
      a: "Puedes mirar dinámicas familiares repetitivas, distanciamientos con padres o hermanos, dificultades en vínculos de pareja, sensación de no encontrar tu propio lugar en la vida, o inquietudes en el ámbito laboral y vocacional.",
    },
    {
      q: "¿Puedo reprogramar mi hora si tengo un imprevisto?",
      a: `Sí. Si nos avisas con al menos ${CONFIG.CANCELLATION_HOURS_NOTICE} horas de anticipación a la fecha agendada, puedes reasignar tu sesión sin costo adicional o solicitar la restitución del 100% de tu abono por transferencia bancaria.`,
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FBF7F2] border-t border-[#D9664A]/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Claridad y Respuestas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-base text-[#5C524A] leading-relaxed">
            Resolvemos tus dudas sobre la modalidad virtual, el proceso de reserva y cómo prepararte para tu primera sesión.
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
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-base sm:text-lg text-[#27221F]">
                    {faq.q}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#5C524A] text-sm font-bold shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#5C524A] leading-relaxed border-t border-[#E7DECE]/60 pt-4">
                    <p>{faq.a}</p>
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
