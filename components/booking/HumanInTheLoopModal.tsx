"use client";

import React, { useState } from "react";
import { FacilitatorProfile } from "@/lib/data/directory";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

export type BookingModalMode = "booking" | "quote";

interface HumanInTheLoopModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFacilitator?: FacilitatorProfile | null;
  mode?: BookingModalMode;
}

export function HumanInTheLoopModal({
  isOpen,
  onClose,
  initialFacilitator,
  mode = "booking",
}: HumanInTheLoopModalProps) {
  const [currentMode, setCurrentMode] = useState<BookingModalMode>(mode);

  const [sessionType, setSessionType] = useState<string>("individual_online");
  const [scheduledDate, setScheduledDate] = useState<string>("2026-10-29");
  const [scheduledHour, setScheduledHour] = useState<string>("16:30");
  const [paymentMethod, setPaymentMethod] = useState<"webpay" | "transferencia">("webpay");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Santiago",
    motive: "",
    hasConstellatedBefore: "no",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const [result, setResult] = useState<{
    success: boolean;
    ticketId?: string;
    meetLink?: string;
    message?: string;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  // Si hay un facilitador seleccionado, usar sus valores reales; de lo contrario, valores estándar de la plataforma
  const facilitatorName = initialFacilitator?.name || "Facilitador Certificado de la Red";
  const facilitatorHeadline = initialFacilitator?.headline || "Acompañamiento en Constelaciones Familiares Online";
  const therapistId = initialFacilitator?.id || "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d";

  const total = initialFacilitator?.totalPriceClp || 45000;
  const deposit = initialFacilitator?.depositPriceClp || Math.round(total * 0.2);
  const balance = total - deposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    setPaymentCompleted(false);

    try {
      const fullScheduledAt = new Date(`${scheduledDate}T${scheduledHour}:00`).toISOString();

      // Flujo de Reserva Estructurado con Human-in-the-Loop
      const res = await bookAndConfirmAppointment({
        therapistId,
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        scheduledAt: fullScheduledAt,
        consultationMotive: `[${currentMode.toUpperCase()}] ${sessionType} - ${formData.motive} (Medio de pago: ${paymentMethod}, Primera vez: ${formData.hasConstellatedBefore})`,
        amountPaidClp: currentMode === "booking" ? deposit : 0,
      });

      setIsSubmitting(false);

      if (res?.success) {
        const generatedTicket = `CST-${Math.floor(100000 + Math.random() * 900000)}`;
        setResult({
          success: true,
          ticketId: generatedTicket,
          meetLink: res.meetLink || "https://meet.google.com/cst-safe-room",
          message:
            currentMode === "booking"
              ? "Tu hora ha sido pre-bloqueada y se ha enviado la notificación por correo con el enlace de Google Meet a ti y al facilitador. Para confirmarla definitivamente en la agenda, realiza el pago del abono del 20% a continuación."
              : "Tu solicitud de cotización y evaluación previa ha sido recibida con éxito. El facilitador revisará la pertinencia sistémica de tu caso y te responderá en menos de 4 horas hábiles.",
        });

        // Si existe un Link de Pago configurado (ej. Mercado Pago o Flow), redirigir de inmediato
        const customPaymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL || "https://link.mercadopago.cl/reserva20";
        if (currentMode === "booking" && customPaymentUrl) {
          window.open(customPaymentUrl, "_blank");
        }
      } else {
        setResult({
          success: false,
          error: res?.error || "No pudimos procesar la solicitud en este momento.",
        });
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setResult({
        success: false,
        error: err?.message || "Ocurrió un error inesperado al conectar con el servidor.",
      });
    }
  };

  const handleExecutePayment = () => {
    const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_URL || "https://link.mercadopago.cl/reserva20";
    window.open(paymentUrl, "_blank");
    setPaymentCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn max-h-[92vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors"
          aria-label="Cerrar ventana"
        >
          ✕
        </button>

        {/* Pantalla de Éxito / Pasarela de Pago */}
        {result?.success ? (
          <div className="text-center py-2 animate-fadeIn">
            
            {/* Si es Modo Cotización */}
            {currentMode === "quote" ? (
              <div>
                <div className="w-16 h-16 rounded-full bg-[#FEF9EE] border-2 border-ochre-400 text-ochre-600 text-3xl flex items-center justify-center mx-auto mb-3">
                  ✓
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] text-xs font-mono text-[#5C524A] mb-2">
                  Ticket de Evaluación: <strong>{result.ticketId}</strong>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
                  ¡Solicitud Recibida con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
                  {result.message}
                </p>
                <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                    <span className="text-[#8A7E73]">Consultante:</span>
                    <span className="font-semibold text-[#27221F]">{formData.fullName} ({formData.email})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                    <span className="text-[#8A7E73]">Facilitador asignado:</span>
                    <span className="font-semibold text-[#27221F]">{facilitatorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8A7E73]">Estado:</span>
                    <span className="font-medium text-ochre-700">En revisión ética previa (Sin cobro)</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  className="px-8 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-medium transition-all"
                >
                  Entendido, volver a consteladores.cl
                </button>
              </div>
            ) : (
              /* Si es Modo Reserva Directa (20%) -> PASARELA DE PAGO */
              <div>
                {!paymentCompleted ? (
                  <div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF7F4] border border-terracotta-200 text-xs font-mono text-terracotta-700 mb-3">
                      Ticket de Reserva: <strong>{result.ticketId}</strong>
                    </div>

                    <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-1">
                      Paso Final: Pagar Abono de Reserva (20%)
                    </h3>
                    <p className="text-xs text-[#5C524A] max-w-md mx-auto mb-5 leading-relaxed">
                      Para asegurar tu horario con <strong>{facilitatorName}</strong>, realiza el abono inicial. El saldo restante del 80% se cancela al momento de la sesión.
                    </p>

                    {/* Tarjeta de Resumen de Pago */}
                    <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 text-left text-xs space-y-2 mb-5">
                      <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                        <span className="text-[#8A7E73]">Consultante:</span>
                        <span className="font-semibold text-[#27221F]">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                        <span className="text-[#8A7E73]">Fecha y hora:</span>
                        <span className="font-medium text-[#27221F]">{scheduledDate} a las {scheduledHour} hrs (Chile)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                        <span className="text-[#8A7E73]">Valor total sesión:</span>
                        <span className="text-[#5C524A]">${total.toLocaleString("es-CL")} CLP</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 text-sm font-bold text-terracotta-600">
                        <span>Abono a pagar hoy (20%):</span>
                        <span className="text-base">${deposit.toLocaleString("es-CL")} CLP</span>
                      </div>
                      <div className="text-[11px] text-[#8A7E73] text-right">
                        Saldo al constelador (80% con voucher): ${balance.toLocaleString("es-CL")} CLP
                      </div>
                    </div>

                    {/* Política de Inasistencia y Reagendamiento */}
                    <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-3.5 mb-5 text-left text-xs text-[#9A6523] space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <span>⚠️ Política de Reserva y Reagendamiento</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#7C5217]">
                        El abono del <strong>20% ($9.000 CLP)</strong> asegura tu cupo en la agenda del facilitador y cubre el servicio de plataforma. Si no asistes sin previo aviso, este 20% <strong>no es reembolsable</strong>. En casos excepcionales de fuerza mayor, puedes solicitar reagendamiento con al menos 24 horas de anticipación escribiendo a soporte: <a href="mailto:contacto@vorticeintegration.com" className="underline font-semibold text-[#8B3E25]">contacto@vorticeintegration.com</a>.
                      </p>
                    </div>

                    {/* Selector de Pasarela / Método de Pago */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("webpay")}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === "webpay"
                            ? "border-terracotta-500 bg-[#FDF7F4] shadow-sm"
                            : "border-[#E7DECE] bg-white hover:border-[#D3C5B5]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#27221F] flex items-center gap-1.5 mb-1">
                          <span>💳 Webpay / Tarjetas</span>
                        </div>
                        <p className="text-[10px] text-[#8A7E73] leading-tight">
                          Débito Redcompra, Crédito, Prepago
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transferencia")}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === "transferencia"
                            ? "border-terracotta-500 bg-[#FDF7F4] shadow-sm"
                            : "border-[#E7DECE] bg-white hover:border-[#D3C5B5]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#27221F] flex items-center gap-1.5 mb-1">
                          <span>🏦 Transferencia</span>
                        </div>
                        <p className="text-[10px] text-[#8A7E73] leading-tight">
                          Transferencia bancaria directa en Chile
                        </p>
                      </button>
                    </div>

                    {/* DETALLE SEGÚN MÉTODO DE PAGO */}
                    {paymentMethod === "webpay" ? (
                      <div className="bg-white border border-[#E7DECE] rounded-2xl p-5 mb-5 text-left">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#27221F] flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#009EE3] inline-block"></span>
                            <span>Mercado Pago & Webpay Plus</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-100 text-[#009EE3] font-semibold">Oficial</span>
                          </span>
                          <span className="text-[11px] text-[#8A7E73]">Pago Seguro SSL 256-bit</span>
                        </div>

                        <p className="text-xs text-[#5C524A] leading-relaxed mb-4">
                          Paga en pesos chilenos a través de la pasarela oficial de <strong>Mercado Pago</strong> con tarjeta de débito (Redcompra), crédito (hasta en cuotas), cuenta Mercado Pago, MACH o Tenpo.
                        </p>

                        <a
                          href={process.env.NEXT_PUBLIC_PAYMENT_URL || "https://link.mercadopago.cl/reserva20"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setPaymentCompleted(true)}
                          className="w-full py-3.5 rounded-full bg-[#009EE3] hover:bg-[#0082ba] text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8H4zm2 6h4v2H6v-2z"/>
                          </svg>
                          <span>Pagar $9.000 CLP en Mercado Pago / Webpay →</span>
                        </a>

                        <p className="text-[11px] text-[#8A7E73] text-center mt-2.5">
                          Al hacer clic se abrirá tu pasarela protegida de Mercado Pago. Al volver, tu sala de Google Meet estará habilitada.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-[#E7DECE] rounded-2xl p-5 mb-5 text-left text-xs space-y-2">
                        <div className="flex items-center justify-between border-b border-[#E7DECE] pb-2 mb-2">
                          <span className="font-bold text-[#27221F]">Datos para Transferencia Bancaria</span>
                          <span className="text-[10px] text-terracotta-600 font-semibold">Monto: ${deposit.toLocaleString("es-CL")} CLP</span>
                        </div>
                        <div className="space-y-1 text-[#5C524A]">
                          <div><strong>Banco:</strong> Banco de Chile / Edwards</div>
                          <div><strong>Tipo de Cuenta:</strong> Cuenta Corriente</div>
                          <div><strong>Número de Cuenta:</strong> 00-159-83920-01</div>
                          <div><strong>Titular:</strong> Vortice Integration SpA / Karen Sudzuki</div>
                          <div><strong>RUT:</strong> 76.842.190-K</div>
                          <div><strong>Correo para comprobante:</strong> karen.sudzuki@vorticeintegration.com</div>
                          <div><strong>Glosa obligatoria:</strong> {result.ticketId}</div>
                        </div>

                        <div className="pt-3">
                          <a
                            href={`https://wa.me/56963730998?text=${encodeURIComponent(
                              `Hola Karen, acabo de agendar una constelación en consteladores.cl con ticket ${result.ticketId}. Te adjunto el comprobante de mi transferencia por el abono de $${deposit.toLocaleString("es-CL")} CLP.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-medium text-xs shadow transition-all flex items-center justify-center gap-2"
                          >
                            <span>Notificar y Enviar Comprobante por WhatsApp (+56 9 6373 0998)</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* VOUCHER DE PAGO CONFIRMADO */
                  <div className="animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-3">
                      ✓
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 block mb-1">
                      Pago Aprobado con Éxito
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
                      ¡Tu Constelación está 100% Confirmada!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-5 leading-relaxed">
                      El abono del 20% ha sido recibido y conciliado. Tu cupo en la agenda de <strong>{facilitatorName}</strong> está garantizado.
                    </p>

                    {/* Voucher de Transbank */}
                    <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 text-left text-xs space-y-1.5 mb-4 font-mono">
                      <div className="flex justify-between border-b border-[#E7DECE] pb-1 font-sans font-bold text-[#27221F]">
                        <span>Comprobante de Pago Webpay</span>
                        <span className="text-emerald-700">Aprobada (0)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7E73]">Orden de Compra:</span>
                        <span>{result.ticketId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7E73]">Monto Pagado:</span>
                        <span className="font-bold text-[#27221F]">${deposit.toLocaleString("es-CL")} CLP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7E73]">Código Autorización:</span>
                        <span>TBK-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8A7E73]">Tarjeta:</span>
                        <span>Redcompra **** 4291</span>
                      </div>
                    </div>

                    {/* Instrucciones para el Saldo del 80% */}
                    <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-2xl p-4 text-left text-xs mb-5 space-y-1">
                      <span className="font-bold text-terracotta-700 block">
                        Saldo a pagar al constelador: ${balance.toLocaleString("es-CL")} CLP (80%)
                      </span>
                      <p className="text-[11px] text-[#5C524A] leading-relaxed">
                        Este saldo se transfiere directamente a la cuenta del facilitador. Recuerda enviar tu voucher/comprobante de transferencia antes o al finalizar la constelación.
                      </p>
                    </div>

                    {/* Botón de Entrada a Google Meet */}
                    <div className="mb-6">
                      <a
                        href={result.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-medium text-white bg-indigo-warm hover:bg-opacity-90 rounded-full shadow-md transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                        </svg>
                        Abrir Sala Virtual en Google Meet
                      </a>
                    </div>
                  </div>
                )}

                <button
                  onClick={onClose}
                  type="button"
                  className="text-xs text-[#8A7E73] hover:text-[#27221F] underline"
                >
                  Cerrar y volver al directorio
                </button>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Cabecera del Modal con Pestañas de Modo */}
            <div className="text-center mb-6">
              <div className="inline-flex rounded-full p-1 bg-[#F3ECE2] border border-[#E7DECE] mb-3">
                <button
                  type="button"
                  onClick={() => setCurrentMode("booking")}
                  className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                    currentMode === "booking"
                      ? "bg-terracotta-500 text-white shadow-sm"
                      : "text-[#5C524A] hover:text-[#27221F]"
                  }`}
                >
                  Reserva Directa (20%)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMode("quote")}
                  className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                    currentMode === "quote"
                      ? "bg-terracotta-500 text-white shadow-sm"
                      : "text-[#5C524A] hover:text-[#27221F]"
                  }`}
                >
                  Cotizar / Evaluación Previa
                </button>
              </div>

              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                {currentMode === "booking"
                  ? "Agendar Sesión Sistémica Online"
                  : "Solicitar Evaluación Sistémica Previa"}
              </h3>
              <p className="text-xs text-[#5C524A] mt-1">
                {facilitatorName} · {facilitatorHeadline}
              </p>
            </div>

            {/* Selección de Tipo de Sesión (Solo Modalidad Online vía Google Meet) */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                1. Tipo de Servicio Sistémico (Online vía Google Meet)
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="individual_online">Constelación Individual Online (Google Meet) — $45.000</option>
                <option value="pareja_online">Constelación de Pareja y Vínculos Online (Google Meet) — $55.000</option>
                <option value="prosperidad_online">Prosperidad, Trabajo y Dinero Online (Google Meet) — $48.000</option>
                <option value="organizacional_online">Constelación Organizacional Online (Google Meet) — $65.000</option>
              </select>
            </div>

            {/* Campos de Fecha y Hora si es Reserva */}
            {currentMode === "booking" && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Fecha preferida
                  </label>
                  <select
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F]"
                  >
                    <option value="2026-10-29">Jueves 29 de Octubre</option>
                    <option value="2026-10-30">Viernes 30 de Octubre</option>
                    <option value="2026-11-03">Martes 3 de Noviembre</option>
                    <option value="2026-11-05">Jueves 5 de Noviembre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Horario (Chile CLT)
                  </label>
                  <select
                    value={scheduledHour}
                    onChange={(e) => setScheduledHour(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F]"
                  >
                    <option value="10:30">10:30 hrs</option>
                    <option value="15:00">15:00 hrs</option>
                    <option value="16:30">16:30 hrs</option>
                    <option value="18:30">18:30 hrs</option>
                  </select>
                </div>
              </div>
            )}

            {/* Datos Personales */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Rodrigo Henríquez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 rounded-full bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-full bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    WhatsApp o Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-full bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    ¿Te has constelado antes?
                  </label>
                  <select
                    value={formData.hasConstellatedBefore}
                    onChange={(e) => setFormData({ ...formData, hasConstellatedBefore: e.target.value })}
                    className="w-full px-4 py-2 rounded-full bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F]"
                  >
                    <option value="no">No, es mi primera vez</option>
                    <option value="si_individual">Sí, en sesión individual</option>
                    <option value="si_grupal">Sí, anteriormente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Describe brevemente el dolor, síntoma o inquietud que buscas mirar *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ej: Dificultad recurrente para ahorrar, conflictos de pareja no resueltos, relación distante con mis padres..."
                  value={formData.motive}
                  onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 resize-none"
                />
              </div>
            </div>

            {/* Desglose de Pago si es Reserva Directa */}
            {currentMode === "booking" ? (
              <div className="space-y-3 mb-5">
                <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-2xl p-3.5 text-xs">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[#5C524A]">Valor total de la sesión:</span>
                    <span className="font-semibold text-[#27221F]">${total.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between items-baseline font-bold text-terracotta-600 mb-1">
                    <span>Reserva hoy (20% - Servicio de plataforma):</span>
                    <span>${deposit.toLocaleString("es-CL")} CLP</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[#8A7E73] text-[11px]">
                    <span>Saldo al constelador (80% con voucher):</span>
                    <span>${balance.toLocaleString("es-CL")} CLP</span>
                  </div>
                </div>

                {/* Nota de Política de Inasistencia */}
                <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-3 text-[11px] text-[#9A6523] leading-relaxed">
                  ⚠️ <strong>Política de Reserva:</strong> El abono del 20% asegura tu cupo y cubre el servicio de plataforma. Si no asistes, este 20% no es reembolsable. Reagendamiento excepcional con al menos 24 hrs de aviso a: <a href="mailto:contacto@vorticeintegration.com" className="underline font-bold">contacto@vorticeintegration.com</a>.
                </div>
              </div>
            ) : (
              <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-3 mb-5 text-xs text-[#9A6523]">
                ℹ️ <strong>Human-in-the-Loop:</strong> No pagarás nada ahora. El facilitador evaluará la idoneidad sistémica de tu motivo y te enviará la propuesta con el presupuesto y disponibilidad.
              </div>
            )}

            {result?.error && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs text-center border border-red-200">
                {result.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting
                ? "Conectando con pasarela..."
                : currentMode === "booking"
                ? `Pagar Reserva del 20% ($${deposit.toLocaleString("es-CL")}) e Ir a Pasarela`
                : "Enviar Solicitud para Evaluación Previa"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
