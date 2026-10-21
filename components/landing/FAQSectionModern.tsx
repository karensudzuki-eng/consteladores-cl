"use client";

import React, { useState } from "react";

export function FAQSectionModern() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo funciona una constelación familiar online?",
      a: "La sesión se realiza de forma individual e íntima mediante Google Meet. El facilitador utiliza figuras, anclajes visuales y una guía de sintonía interna para representar a los miembros de tu sistema. Es igual de profunda y efectiva que una sesión presencial, con la ventaja de vivirla desde la privacidad y comodidad de tu casa.",
    },
    {
      q: "¿Qué diferencia hay entre una sesión individual y una grupal?",
      a: "En la sesión individual estás solo tú y el facilitador en una videollamada privada, sin público ni desconocidos. Esto permite un espacio de máxima confidencialidad, donde avanzas a tu propio ritmo sin exponerte frente a grupos.",
    },
    {
      q: "¿Cómo recibo el enlace de Google Meet y qué necesito?",
      a: "Al confirmar tu reserva, nuestro sistema genera automáticamente una sala única de Google Meet y te la envía a tu correo. No necesitas descargar nada; solo un computador o celular con cámara, un vaso de agua y un lugar tranquilo sin interrupciones.",
    },
    {
      q: "¿Cómo se verifica que los consteladores están certificados?",
      a: "Cada facilitador que postula a consteladores.cl debe subir obligatoriamente su certificado o diploma emitido por una escuela reconocida de constelaciones sistémicas. Nuestro equipo valida manualmente cada acreditación antes de activar su perfil.",
    },
    {
      q: "¿Qué ocurre si necesito reprogramar mi sesión?",
      a: "Puedes reprogramar tu encuentro avisando con al menos 24 horas de anticipación respondiendo directamente al correo de confirmación de tu reserva para coordinar una nueva fecha.",
    },
  ];

  return (
    <section id="preguntas-frecuentes" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Dudas Habituales
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Todo lo que necesitas saber antes de iniciar tu proceso.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 sm:p-6 text-left font-sans font-bold text-slate-900 text-base sm:text-lg flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-xl text-slate-400 font-normal">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-6 sm:px-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
