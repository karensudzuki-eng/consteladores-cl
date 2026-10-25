"use client";

import React from "react";

export function WatercolorPaymentExplainer() {
  const steps = [
    {
      step: "01",
      title: "Eliges facilitador y horario",
      description:
        "Explora los perfiles de nuestros consteladores acreditados y selecciona el día y la hora que mejor se adapte a tu rutina, en horario oficial de Chile (CLT).",
      bgClass: "bg-[#FEF9EE] border-[#F7E1B0]/80",
      accent: "text-ochre-600",
    },
    {
      step: "02",
      title: "Abonas el 20% deducible del total",
      description:
        "Para reservar la cita se abona el 20% inicial (vía Mercado Pago o transferencia bancaria), el cual se descuenta del valor total al momento de pagar.",
      bgClass: "bg-[#FDF7F4] border-terracotta-200/80",
      accent: "text-terracotta-600",
    },
    {
      step: "03",
      title: "Google Meet y saldo restante",
      description:
        "Recibes de inmediato el enlace privado de Google Meet en tu correo. El saldo restante (80%) se cancela de forma directa antes o al comenzar la sesión.",
      bgClass: "bg-[#F2F4F9] border-[#D5DEEB]/80",
      accent: "text-indigo-warm",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F3E9DC] border-t border-[#D9664A]/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estrictamente Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#E8C58A]/35 border border-[#D5C8B4] text-ochre-800 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Transparencia y Tranquilidad
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F] mb-4">
            ¿Cómo funciona el pago del 20%?
          </h2>
          <p className="text-base text-[#5C524A] leading-relaxed">
            Diseñamos este modelo para proteger el tiempo de ambas partes: aseguras tu espacio con un monto inicial accesible y pagas la diferencia al momento de encontrarse.
          </p>
        </div>

        {/* Pasos en Tarjetas Cálidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.step}
              className={`rounded-2xl p-6 sm:p-7 border shadow-sm flex flex-col items-center text-center card-hover-elevate ${s.bgClass}`}
            >
              <span className={`text-2xl font-serif font-bold mb-3 ${s.accent}`}>
                {s.step}
              </span>
              <h3 className="text-xl font-serif font-semibold text-[#27221F] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[#5C524A] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Política de Cancelación y Flexibilidad */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center shrink-0 text-[#5C524A]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-serif font-semibold text-[#27221F] mb-1">
              Reprogramaciones y cancelaciones sin complicaciones
            </h4>
            <p className="text-sm text-[#5C524A] leading-relaxed">
              Sabemos que la vida tiene imprevistos. Si necesitas postergar o cancelar tu sesión, solo avísanos con al menos <strong className="text-[#27221F]">24 horas de anticipación</strong> y reasignaremos tu reserva sin costo o te devolveremos el 100% del abono.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
