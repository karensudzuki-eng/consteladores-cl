"use client";

import React, { useState } from "react";

export function CleanFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cómo funciona una constelación familiar online?",
      a: "La sesión se realiza de forma individual a través de Google Meet. Se aplica la misma metodología desarrollada por Bert Hellinger, adaptada al formato online mediante figuras sistémicas, anclajes visuales y una guía de sintonía interna en un espacio seguro y confidencial.",
    },
    {
      q: "¿Cómo opera el pago de la reserva del 20% y el saldo?",
      a: "Para agendar tu hora abonas el 20% del valor total de la sesión (ej. $9.000 para sesión individual de $45.000). El saldo restante del 80% se abona [antes de iniciar la sesión / al finalizar la sesión, según política a confirmar]. Los medios de pago aceptados son [Webpay / transferencia bancaria / Mercado Pago].",
    },
    {
      q: "¿Cuál es la política de cancelación y reprogramación?",
      a: "Puedes solicitar reprogramar tu cita con al menos [X horas de anticipación - dato pendiente] sin costo alguno. En caso de cancelaciones fuera de este plazo o inasistencia, [detalle de política sobre el destino del 20% de la reserva - dato pendiente].",
    },
    {
      q: "¿Cómo recibo el enlace de Google Meet y qué necesito para conectarme?",
      a: "Al confirmar tu reserva con el 20%, el sistema genera una sala única de Google Meet que llega inmediatamente a tu correo. Solo necesitas un computador o celular con conexión estable a internet, cámara y micrófono activos, y un lugar tranquilo donde puedas hablar con libertad.",
    },
    {
      q: "¿Cómo se acredita a los facilitadores de consteladores.cl?",
      a: "Cada constelador debe presentar su diploma emitido por una escuela reconocida en constelaciones sistémicas. Nuestro equipo revisa los antecedentes de manera individual antes de publicar su perfil con la insignia de 'Validado'.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-cream-50 border-b border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Preguntas Frecuentes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
            Todo lo que necesitas saber
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Información clara sobre la sesión online, el pago del 20% y las políticas del servicio.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-cream-200 bg-white overflow-hidden transition-all shadow-subtle"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-sans font-bold text-charcoal-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-cream-50 transition-colors focus-visible:outline-none focus-visible:bg-cream-100"
              >
                <span>{faq.q}</span>
                <span className="text-lg text-ochre-600 font-bold shrink-0">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-cream-100 bg-cream-50/50">
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
