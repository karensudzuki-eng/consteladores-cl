"use client";

import React from "react";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export function WatercolorPaymentExplainer() {
  const steps = [
    {
      step: "01",
      title: "Solicitud de disponibilidad",
      description:
        "Seleccionas el facilitador, la modalidad (online o presencial) y el horario que mejor se adapte a tu agenda. Cada solicitud genera una referencia única de reserva (ej. CR-2026-000123).",
      bgClass: "bg-[#FEF9EE] border-[#F7E1B0]/80",
      accent: "text-ochre-700",
    },
    {
      step: "02",
      title: "Abono del 20% por transferencia",
      description:
        "Para confirmar tu hora en la agenda, realizas el abono del 20% mediante transferencia bancaria directa indicando tu código de referencia en la glosa. La plataforma valida la recepción.",
      bgClass: "bg-[#FDF7F4] border-terracotta-200/80",
      accent: "text-terracotta-600",
    },
    {
      step: "03",
      title: "Saldo del 80% al facilitador",
      description:
        "El saldo restante (80%) se transfiere directamente a los datos bancarios de tu facilitador antes o al iniciar el encuentro. La plataforma no intermedia ni retiene ese pago.",
      bgClass: "bg-[#F2F4F9] border-[#D5DEEB]/80",
      accent: "text-indigo-warm",
    },
  ];

  const states = [
    { label: "Pendiente Abono", desc: "Hora solicitada, esperando transferencia del 20%" },
    { label: "Abono Recibido", desc: "Recepción conciliada, hora agendada en calendario" },
    { label: "Saldo Pendiente", desc: "Enlace Google Meet emitido, 80% por transferir" },
    { label: "Confirmada", desc: "Pago completo y sala lista para el encuentro" },
    { label: "Realizada", desc: "Acompañamiento sistémico completado" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F3E9DC] border-t border-[#D9664A]/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Centrada */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E8C58A]/35 border border-[#D5C8B4] text-ochre-800 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            Transparencia y Seguridad en Pagos
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F] mb-4">
            Cómo funciona el pago de tu sesión
          </h2>
          <p className="text-base text-[#5C524A] leading-relaxed">
            Diseñamos un modelo claro y seguro para ambas partes: aseguras tu espacio con un abono inicial y abonas la diferencia directamente a quien te acompaña.
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

        {/* Flujo de Estados de la Reserva */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8A7E73] text-center mb-6">
            Ciclo de vida transparente de tu reserva
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
            {states.map((st, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-[#E7DECE]/80 text-xs">
                <span className="font-mono text-[10px] text-terracotta-600 block mb-1">
                  Paso {idx + 1}
                </span>
                <span className="font-semibold text-[#27221F] block mb-1">
                  {st.label}
                </span>
                <span className="text-[11px] text-[#8A7E73] leading-snug block">
                  {st.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advertencias de Seguridad y Cancelación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Seguridad y Datos Bancarios */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-6">
            <h4 className="text-base font-serif font-semibold text-[#27221F] mb-2">
              Seguridad de tus transferencias
            </h4>
            <p className="text-xs text-[#5C524A] leading-relaxed mb-3">
              Verifica que la cuenta bancaria de destino coincida con los datos entregados en tu confirmación de reserva. Nunca te pediremos claves bancarias, contraseñas ni datos de tarjetas de crédito.
            </p>
            <p className="text-[11px] text-[#8A7E73] border-t border-[#E7DECE]/80 pt-2">
              Protocolo antifraude: Si tu facilitador no confirma la recepción del abono dentro de 48 horas, tu reserva ingresa en revisión automática con aviso a tu correo.
            </p>
          </div>

          {/* Política de Cancelación y Reembolso */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-6">
            <h4 className="text-base font-serif font-semibold text-[#27221F] mb-2">
              Cancelación y reprogramación responsable
            </h4>
            <p className="text-xs text-[#5C524A] leading-relaxed mb-3">
              Si necesitas reagendar o cancelar tu sesión con al menos <strong>{CONFIG.CANCELLATION_HOURS_NOTICE} horas de anticipación</strong>, podrás reasignar tu hora sin costo o solicitar la devolución del 100% de tu abono por transferencia bancaria.
            </p>
            <div className="border-t border-[#E7DECE]/80 pt-2 flex items-center justify-between text-xs">
              <span className="text-[#8A7E73] text-[11px]">
                Plazo de restitución: [PENDIENTE: definir plazo de días hábiles]
              </span>
              <Link
                href="/cancelacion"
                className="text-terracotta-600 hover:text-terracotta-700 underline font-semibold text-[11px]"
              >
                Ver política completa →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
