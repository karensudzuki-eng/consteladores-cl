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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Santiago",
    motive: "",
    hasConstellatedBefore: "no",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const facilitatorHeadline = initialFacilitator?.headline || "Acompañamiento en Constelaciones Familiares";
  const therapistId = initialFacilitator?.id || "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d";

  const total = initialFacilitator?.totalPriceClp || 45000;
  const deposit = initialFacilitator?.depositPriceClp || Math.round(total * 0.2);
  const balance = total - deposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const fullScheduledAt = new Date(`${scheduledDate}T${scheduledHour}:00`).toISOString();

      // Flujo de Reserva Estructurado con Human-in-the-Loop
      const res = await bookAndConfirmAppointment({
        therapistId,
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        scheduledAt: fullScheduledAt,
        consultationMotive: `[${currentMode.toUpperCase()}] ${sessionType} - ${formData.motive} (Primera vez: ${formData.hasConstellatedBefore})`,
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
              ? "Tu reserva con abono del 20% ha sido registrada exitosamente. Hemos preparado la sala de Google Meet y notificado al facilitador para la validación del encuentro."
              : "Tu solicitud de cotización y evaluación previa ha sido estructurada. El facilitador revisará la pertinencia sistémica de tu caso y te responderá en menos de 4 horas hábiles.",
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

        {/* Pantalla de Éxito / Confirmación */}
        {result?.success ? (
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#FEF9EE] border-2 border-ochre-400 text-ochre-600 text-3xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3ECE2] text-xs font-mono text-[#5C524A] mb-2">
              Ticket Human-in-the-Loop: <strong>{result.ticketId}</strong>
            </div>

            <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
              {currentMode === "booking" ? "¡Reserva Registrada y En Validación!" : "¡Solicitud Estructurada con Éxito!"}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
              {result.message}
            </p>

            {/* Resumen Estructurado del Caso */}
            <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-2xl p-4 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Consultante:</span>
                <span className="font-semibold text-[#27221F]">{formData.fullName} ({formData.email})</span>
              </div>
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Facilitador asignado:</span>
                <span className="font-semibold text-[#27221F]">{facilitatorName}</span>
              </div>
              <div className="flex justify-between border-b border-[#E7DECE]/60 pb-1.5">
                <span className="text-[#8A7E73]">Modalidad solicitada:</span>
                <span className="font-medium text-[#27221F]">{sessionType}</span>
              </div>
              {currentMode === "booking" && (
                <div className="flex justify-between pt-1">
                  <span className="text-[#8A7E73]">Abono inicial (20%):</span>
                  <span className="font-bold text-terracotta-600">${deposit.toLocaleString("es-CL")} CLP (Saldo: ${balance.toLocaleString("es-CL")})</span>
                </div>
              )}
            </div>

            {/* Enlace de Google Meet si es Online */}
            {currentMode === "booking" && (
              <div className="mb-6">
                <a
                  href={result.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-white bg-indigo-warm hover:bg-opacity-90 rounded-full shadow transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                  </svg>
                  Ver Sala Virtual de Google Meet
                </a>
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
                  ? "Agendar Sesión Sistémica"
                  : "Solicitar Evaluación Sistémica Previa"}
              </h3>
              <p className="text-xs text-[#5C524A] mt-1">
                {facilitatorName} · {facilitatorHeadline}
              </p>
            </div>

            {/* Selección de Tipo de Sesión */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                1. Tipo de Servicio Sistémico
              </label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                <option value="individual_online">Constelación Individual Online (Google Meet) — $45.000</option>
                <option value="individual_presencial">Constelación Individual Presencial (Consulta) — $50.000</option>
                <option value="pareja_online">Constelación de Pareja y Vínculos — $55.000</option>
                <option value="taller_vivencial">Cupo para Taller Vivencial Grupal — Desde $35.000</option>
                <option value="organizacional">Constelación Organizacional / Empresa — $65.000</option>
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
                    <option value="si_grupal">Sí, en taller vivencial</option>
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
              <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-2xl p-3.5 mb-5 text-xs">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[#5C524A]">Valor total estimado:</span>
                  <span className="font-semibold text-[#27221F]">${total.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-terracotta-600 mb-1">
                  <span>Reserva inicial hoy (20%):</span>
                  <span>${deposit.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between items-baseline text-[#8A7E73] text-[11px]">
                  <span>Saldo a pagar con el facilitador (80%):</span>
                  <span>${balance.toLocaleString("es-CL")} CLP</span>
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
                ? "Estructurando solicitud..."
                : currentMode === "booking"
                ? `Confirmar Reserva con 20% ($${deposit.toLocaleString("es-CL")})`
                : "Enviar Solicitud para Evaluación Previa"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
