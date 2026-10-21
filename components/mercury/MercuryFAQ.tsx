"use client";

import React, { useState } from "react";

export function MercuryFAQ() {
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
    <section id="faq" className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Dudas Habituales
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            Preguntas frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-[#c3c3cc] text-center">
            Información sobre la sesión online, el modelo de reserva y los protocolos de atención.
          </p>
        </div>

        {/* Minimal Graphite Accordions (Centered Header & Balanced Typography) */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-center font-sans font-[480] text-[#ededf3] text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-[#272735]/40 transition-colors"
              >
                <span className="text-left flex-1">{faq.q}</span>
                <span className="text-lg text-[#5266eb] font-bold shrink-0 ml-4">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] border-t border-[#70707d]/20 text-left">
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
