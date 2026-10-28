"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FacilitatorProfile } from "@/lib/data/directory";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";
import { CONFIG } from "@/lib/config";

export type BookingModalMode = "booking" | "quote";

interface HumanInTheLoopModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFacilitator?: FacilitatorProfile | null;
  mode?: BookingModalMode;
}

function getTomorrowString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatReadableDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

export function HumanInTheLoopModal({
  isOpen,
  onClose,
  initialFacilitator,
  mode = "booking",
}: HumanInTheLoopModalProps) {
  const [currentMode, setCurrentMode] = useState<BookingModalMode>(mode);

  const minDateStr = getTomorrowString();
  const defaultHours = ["10:00", "11:30", "15:00", "16:30", "18:00", "19:30"];
  const availableHours = initialFacilitator?.availableHours || defaultHours;

  const [sessionType, setSessionType] = useState<string>("individual_online");
  const [scheduledDate, setScheduledDate] = useState<string>(minDateStr);
  const [scheduledHour, setScheduledHour] = useState<string>(availableHours[0] || "16:30");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Santiago",
    motive: "",
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [result, setResult] = useState<{
    success: boolean;
    referenceCode?: string;
    message?: string;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const facilitatorName = initialFacilitator?.name || "Karen Sudzuki";
  const facilitatorHeadline = initialFacilitator?.headline || "Facilitadora Acreditada en Constelaciones Familiares";
  const therapistId = initialFacilitator?.id || "karen-sudzuki-icalma";

  const total = initialFacilitator?.totalPriceClp || 45000;
  const deposit = initialFacilitator?.depositPriceClp || Math.round(total * 0.2);
  const balance = total - deposit;

  const bank = initialFacilitator?.bankDetails || {
    beneficiaryName: "Karen Valeria Sudzuki Toro",
    rut: "13.298.884-6",
    bank: "Mercado Pago",
    accountType: "Cuenta Vista",
    accountNumber: "1038886585",
    email: "karen.sudzuki@gmail.com",
  };

  const rawWhatsapp = CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyConsent) {
      alert("Por favor acepta la política de privacidad y consentimiento de datos para continuar.");
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const fullScheduledAt = new Date(`${scheduledDate}T${scheduledHour}:00`).toISOString();
      const generatedRef = `CR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;

      const res = await bookAndConfirmAppointment({
        therapistId,
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        scheduledAt: fullScheduledAt,
        consultationMotive: `[${currentMode.toUpperCase()}] ${sessionType} - ${formData.motive} (Ref: ${generatedRef})`,
        amountPaidClp: CONFIG.PRICING_ENABLED && currentMode === "booking" ? deposit : 0,
      });

      setIsSubmitting(false);

      if (res?.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            "cst_last_booking",
            JSON.stringify({
              ticketId: generatedRef,
              appointmentId: res.appointmentId,
              clientName: formData.fullName,
              clientEmail: formData.email,
              clientPhone: formData.phone,
              facilitatorName,
              scheduledDate,
              scheduledHour,
              deposit,
              balance,
              total,
            })
          );
        }

        setResult({
          success: true,
          referenceCode: generatedRef,
          message:
            CONFIG.PRICING_ENABLED
              ? "Tu solicitud ha sido pre-bloqueada con éxito. Para confirmar definitivamente tu hora, realiza la transferencia del abono del 20% con los datos indicados a continuación."
              : "Tu solicitud de disponibilidad ha sido registrada con éxito. Te responderemos en menos de 24 horas hábiles informándote los valores vigentes y confirmando el horario.",
        });
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn max-h-[92vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          ✕
        </button>

        {/* PANTALLA DE RESULTADO */}
        {result?.success ? (
          <div className="text-center py-2 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE2] text-xs font-mono text-[#5C524A] mb-3">
              Referencia de Reserva: <strong>{result.referenceCode}</strong>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
              Solicitud Registrada con Éxito
            </h3>

            <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
              {result.message}
            </p>

            {/* Resumen de la Solicitud */}
            <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Consultante:</span>
                <span className="font-semibold text-[#27221F]">{formData.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Correo de contacto:</span>
                <span className="text-[#27221F]">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Facilitador asignado:</span>
                <span className="font-semibold text-[#27221F]">{facilitatorName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Fecha solicitada:</span>
                <span className="font-medium text-[#27221F] capitalize">
                  {formatReadableDate(scheduledDate)} a las {scheduledHour} hrs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A7E73]">Estado:</span>
                <span className="font-semibold text-terracotta-700">PENDIENTE_ABONO</span>
              </div>
            </div>

            {/* DATOS DE TRANSFERENCIA BANCARIA */}
            <div className="bg-white border border-[#E7DECE] rounded-2xl p-5 mb-5 text-left text-xs space-y-2 shadow-sm">
              <div className="border-b border-[#E7DECE] pb-2 mb-2 flex items-center justify-between">
                <span className="font-bold text-[#27221F]">Datos para Transferencia Bancaria (Abono 20%)</span>
                {CONFIG.PRICING_ENABLED && (
                  <span className="text-terracotta-700 font-semibold">${deposit.toLocaleString("es-CL")} CLP</span>
                )}
              </div>

              <div className="space-y-1.5 text-[#5C524A]">
                <div><strong>Banco / Institución:</strong> {bank.bank}</div>
                <div><strong>Tipo de Cuenta:</strong> {bank.accountType}</div>
                <div><strong>Número de Cuenta:</strong> {bank.accountNumber}</div>
                <div><strong>Titular:</strong> {bank.beneficiaryName}</div>
                <div><strong>RUT:</strong> {bank.rut}</div>
                <div><strong>Correo para comprobante:</strong> {bank.email}</div>
                <div className="text-terracotta-700 font-semibold">
                  <strong>Glosa obligatoria:</strong> {result.referenceCode}
                </div>
              </div>

              {/* Advertencia de Seguridad */}
              <div className="bg-[#FEF9EE] border border-ochre-200 rounded-xl p-3 text-[11px] text-[#7C5217] mt-3">
                <strong>Advertencia de seguridad:</strong> Verifica que la cuenta coincida con la de tu reserva. Nunca te pediremos claves ni datos de tarjeta.
              </div>

              <div className="text-[11px] text-[#8A7E73] pt-1">
                Protocolo de fraude: Si el facilitador no confirma el abono dentro de 48 horas, la reserva queda en revisión con aviso automático a tu correo.
              </div>
            </div>

            {/* Enlace de WhatsApp discreto */}
            <div className="mb-5">
              <a
                href={`https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(
                  `Hola, acabo de registrar una solicitud en consteladores.cl con referencia ${result.referenceCode}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs shadow transition-all flex items-center justify-center gap-2"
              >
                <span>Notificar comprobante o consultar por WhatsApp</span>
              </a>
              <p className="text-[10px] text-[#8A7E73] mt-1.5">
                Respuesta garantizada en menos de 24 horas hábiles.
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="px-8 py-2.5 rounded-full bg-[#27221F] hover:bg-[#3D3530] text-white text-xs font-medium transition-all"
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          /* FORMULARIO DE CONSULTA O RESERVA */
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-1 block">
                Paso Único · Solicitud Directa
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                {CONFIG.PRICING_ENABLED ? "Reservar Sesión Sistémica" : "Consultar Disponibilidad de Sesión"}
              </h3>
              <p className="text-xs text-[#5C524A] mt-1">
                {facilitatorName} · {facilitatorHeadline}
              </p>
            </div>

            {/* Selección de Tipo de Sesión */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                1. Modalidad y Formato
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="individual_online">Sesión Individual Online (Google Meet) — 75 a 90 min</option>
                <option value="pareja_online">Sesión de Pareja o Vínculo Online (Google Meet) — 90 min</option>
                <option value="individual_presencial">Sesión Individual Presencial (Santiago / Viña / Concepción)</option>
              </select>
            </div>

            {/* Resumen de Valor Referencial */}
            {CONFIG.PRICING_ENABLED && (
              <div className="mb-4 bg-[#FAF8F5] border border-[#E7DECE] rounded-xl p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[#8A7E73] block text-[11px]">Valor de sesión (referencial):</span>
                  <span className="font-bold text-[#27221F] text-sm">${total.toLocaleString("es-CL")} CLP</span>
                  <span className="text-[10px] text-[#8A7E73] block mt-0.5">* Sujeto a cambios según facilitador</span>
                </div>
                <div className="text-right">
                  <span className="text-terracotta-600 font-semibold block text-[11px]">Abono inicial 20%:</span>
                  <span className="font-bold text-terracotta-700 text-sm">${deposit.toLocaleString("es-CL")} CLP</span>
                </div>
              </div>
            )}

            {/* Fecha y Hora */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Fecha sugerida *
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
                <span className="text-[10px] text-[#8A7E73] capitalize mt-1 block">
                  {formatReadableDate(scheduledDate)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Horario preferente (Chile CLT) *
                </label>
                <select
                  value={scheduledHour}
                  onChange={(e) => setScheduledHour(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  {availableHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} hrs
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Datos Personales Mínimos */}
            <div className="mb-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Teléfono de contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  ¿Qué situación o tema buscas mirar en este encuentro?
                </label>
                <textarea
                  rows={2}
                  placeholder="Breve reseña sobre lo que te motiva a agendar..."
                  value={formData.motive}
                  onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>
            </div>

            {/* POLÍTICA DE CANCELACIÓN VISIBLE ANTES DE CONFIRMAR */}
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-xl p-3 mb-4 text-[11px] text-[#5C524A] leading-relaxed">
              <strong>Política de cancelación:</strong> Si avisas con al menos {CONFIG.CANCELLATION_HOURS_NOTICE} horas de anticipación, podrás reasignar tu sesión sin costo o recibir la devolución del 100% del abono por transferencia bancaria.
            </div>

            {/* CHECKBOX DE CONSENTIMIENTO EXPLICITO LEY 21.719 */}
            <div className="mb-5 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consent-check"
                required
                checked={formData.privacyConsent}
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-terracotta-600 focus:ring-terracotta-500"
              />
              <label htmlFor="consent-check" className="text-xs text-[#5C524A] leading-tight">
                Acepto el tratamiento de mis datos de contacto conforme a la <strong>Ley 21.719</strong> y la{" "}
                <Link href="/privacidad" target="_blank" className="text-terracotta-600 underline">
                  Política de Privacidad
                </Link>{" "}
                de consteladores.cl para la gestión exclusiva de esta reserva.
              </label>
            </div>

            {/* AVISOS OBLIGATORIOS EN LA RESERVA */}
            <div className="mb-5 space-y-1.5 text-center text-[11px] text-[#8A7E73] border-t border-[#E7DECE]/80 pt-3">
              <p>{CONFIG.DISCLAIMER_NOTICE}</p>
              <p>{CONFIG.CRISIS_LINE_NOTICE}</p>
            </div>

            {result?.error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
                {result.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Enviando solicitud..." : (CONFIG.PRICING_ENABLED ? "Confirmar solicitud de reserva" : "Enviar consulta de disponibilidad")}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
