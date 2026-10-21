"use client";

import React, { useState } from "react";
import { OnlineService, onlineServicesList } from "../redesign/OnlineServiceCatalog";
import { onlineTherapists, VerifiedTherapist } from "../redesign/TherapistTeamOnline";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

interface WatercolorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: OnlineService | null;
  initialTherapist?: VerifiedTherapist | null;
}

export function WatercolorBookingModal({
  isOpen,
  onClose,
  selectedService,
  initialTherapist,
}: WatercolorBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [currentService, setCurrentService] = useState<OnlineService>(
    selectedService || onlineServicesList[0]
  );
  const [selectedTherapist, setSelectedTherapist] = useState<VerifiedTherapist>(
    initialTherapist || onlineTherapists[0]
  );

  const availableDates = [
    { label: "Jue 24 Oct", iso: "2026-10-24" },
    { label: "Vie 25 Oct", iso: "2026-10-25" },
    { label: "Sáb 26 Oct", iso: "2026-10-26" },
    { label: "Lun 28 Oct", iso: "2026-10-28" },
    { label: "Mar 29 Oct", iso: "2026-10-29" },
    { label: "Mié 30 Oct", iso: "2026-10-30" },
  ];

  const availableHours = ["10:00", "11:30", "15:00", "16:30", "18:00", "19:30"];

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedHour, setSelectedHour] = useState<string>(availableHours[1]);

  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    motive: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; meetLink?: string; error?: string } | null>(null);

  if (!isOpen) return null;

  const total = currentService.totalPriceClp;
  const deposit = currentService.depositPriceClp;
  const balance = currentService.balancePriceClp;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const fullScheduledAt = new Date(`${selectedDate}T${selectedHour}:00`).toISOString();

    const res = await bookAndConfirmAppointment({
      therapistId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
      clientName: clientData.fullName,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      scheduledAt: fullScheduledAt,
      consultationMotive: `${currentService.name} - ${clientData.motive}`,
      amountPaidClp: deposit,
    });

    setIsSubmitting(false);

    if (res.success) {
      setResult({
        success: true,
        meetLink: res.meetLink || "https://meet.google.com/xyz-safe-meet",
      });
      setStep(3);
    } else {
      setResult({
        success: false,
        error: res.error || "Ocurrió un error al procesar tu reserva.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center transition-colors"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Paso 1: Selección de Servicio, Terapeuta y Horario */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-500 mb-1 block">
                Paso 1 de 2 · Reserva con el 20%
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                Agendar sesión online
              </h3>
              <p className="text-xs text-[#5C524A] mt-1">
                Vía Google Meet · Horario oficial de Chile
              </p>
            </div>

            {/* Selector de Servicio */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                1. Tipo de constelación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {onlineServicesList.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => setCurrentService(svc)}
                    className={`p-3 text-left rounded-xl border text-xs transition-all ${
                      currentService.id === svc.id
                        ? "bg-[#FDF7F4] border-terracotta-400 font-semibold text-[#27221F]"
                        : "bg-[#FCFAF7] border-[#E7DECE] text-[#5C524A] hover:bg-[#F3ECE2]/50"
                    }`}
                  >
                    <span className="block font-medium truncate">{svc.name}</span>
                    <span className="text-terracotta-600 font-bold mt-0.5 block">
                      ${svc.totalPriceClp.toLocaleString("es-CL")} CLP
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Facilitador */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                2. Facilitador disponible
              </label>
              <div className="space-y-1.5">
                {onlineTherapists.map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedTherapist(th)}
                    className={`w-full p-2.5 text-left rounded-xl border text-xs flex items-center justify-between transition-all ${
                      selectedTherapist.id === th.id
                        ? "bg-[#FEF9EE] border-ochre-400 font-semibold text-[#27221F]"
                        : "bg-[#FCFAF7] border-[#E7DECE] text-[#5C524A] hover:bg-[#F3ECE2]/50"
                    }`}
                  >
                    <div>
                      <span className="font-medium text-[#27221F]">{th.name}</span>
                      <span className="text-[#8A7E73] ml-2 font-normal hidden sm:inline">
                        • {th.headline}
                      </span>
                    </div>
                    <span className="text-ochre-600 font-medium">✓ Verificado</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Fecha */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                3. Fecha
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableDates.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => setSelectedDate(d.iso)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs transition-all ${
                      selectedDate === d.iso
                        ? "bg-terracotta-500 text-white border-terracotta-500 font-medium shadow-sm"
                        : "bg-[#FCFAF7] border-[#E7DECE] text-[#5C524A] hover:bg-[#F3ECE2]"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Hora */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-wider mb-2">
                4. Hora (Chile)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableHours.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHour(h)}
                    className={`py-2 text-center rounded-xl border text-xs transition-all ${
                      selectedHour === h
                        ? "bg-terracotta-500 text-white border-terracotta-500 font-medium shadow-sm"
                        : "bg-[#FCFAF7] border-[#E7DECE] text-[#5C524A] hover:bg-[#F3ECE2]"
                    }`}
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
            </div>

            {/* Resumen del Modelo 20% */}
            <div className="bg-[#FDF7F4] border border-terracotta-200/80 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-baseline text-xs text-[#5C524A] mb-1">
                <span>Valor total sesión:</span>
                <span className="font-semibold text-[#27221F]">${total.toLocaleString("es-CL")} CLP</span>
              </div>
              <div className="flex justify-between items-baseline text-sm font-bold text-terracotta-600 mb-1">
                <span>Reserva hoy (20%):</span>
                <span>${deposit.toLocaleString("es-CL")} CLP</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-[#8A7E73]">
                <span>Saldo en la sesión (80%):</span>
                <span>${balance.toLocaleString("es-CL")} CLP</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              type="button"
              className="w-full py-3.5 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md transition-all active:scale-[0.99]"
            >
              Continuar con mis datos
            </button>
          </div>
        )}

        {/* Paso 2: Datos del Consultante y Pago del 20% */}
        {step === 2 && (
          <form onSubmit={handleBooking}>
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-500 mb-1 block">
                Paso 2 de 2 · Tus Datos
              </span>
              <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                Confirmar reserva con 20%
              </h3>
              <p className="text-xs text-[#5C524A] mt-1">
                {currentService.name} · Con {selectedTherapist.name}
              </p>
            </div>

            <div className="space-y-3.5 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre y apellido"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#E7DECE] bg-[#FCFAF7] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Correo electrónico * (aquí te llegará el enlace de Google Meet)
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#E7DECE] bg-[#FCFAF7] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  WhatsApp o Teléfono de contacto *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 1234 5678"
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full border border-[#E7DECE] bg-[#FCFAF7] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  ¿Qué tema o inquietud te gustaría mirar? (Opcional y confidencial)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Dificultad para avanzar en proyectos, dinámicas de pareja, relación con mi madre..."
                  value={clientData.motive}
                  onChange={(e) => setClientData({ ...clientData, motive: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#E7DECE] bg-[#FCFAF7] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>
            </div>

            {/* Cuadro de Pago 20% */}
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center text-sm font-bold text-[#27221F] mb-1">
                <span>Total a pagar hoy (20%):</span>
                <span className="text-terracotta-600">${deposit.toLocaleString("es-CL")} CLP</span>
              </div>
              <p className="text-[11px] text-[#8A7E73]">
                Al confirmar, se procesará el abono de reserva a través de Webpay / Transferencia. El saldo de ${balance.toLocaleString("es-CL")} se cancela antes de la sesión.
              </p>
            </div>

            {result?.error && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs text-center border border-red-200">
                {result.error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 text-xs font-medium text-[#5C524A] bg-[#F3ECE2] hover:bg-[#E7DECE] rounded-full transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-3 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Procesando reserva..." : `Pagar 20% ($${deposit.toLocaleString("es-CL")})`}
              </button>
            </div>
          </form>
        )}

        {/* Paso 3: Confirmación de Cita con Google Meet */}
        {step === 3 && result?.success && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#FEF9EE] border-2 border-ochre-400 text-ochre-600 text-3xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            
            <span className="text-xs uppercase tracking-wider font-semibold text-terracotta-600 mb-1 block">
              ¡Reserva del 20% Confirmada!
            </span>
            <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-3">
              Tu sesión ha quedado agendada
            </h3>
            
            <p className="text-sm text-[#5C524A] max-w-md mx-auto mb-6 leading-relaxed">
              Hemos enviado un correo de confirmación a <strong className="text-[#27221F]">{clientData.email}</strong> con los detalles y el comprobante del abono de ${deposit.toLocaleString("es-CL")} CLP.
            </p>

            <div className="bg-[#FDF7F4] border border-terracotta-200 rounded-2xl p-5 mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-terracotta-100 pb-2">
                <span className="text-[#8A7E73]">Servicio:</span>
                <span className="font-semibold text-[#27221F]">{currentService.name}</span>
              </div>
              <div className="flex justify-between border-b border-terracotta-100 pb-2">
                <span className="text-[#8A7E73]">Facilitador:</span>
                <span className="font-semibold text-[#27221F]">{selectedTherapist.name}</span>
              </div>
              <div className="flex justify-between border-b border-terracotta-100 pb-2">
                <span className="text-[#8A7E73]">Fecha y hora:</span>
                <span className="font-semibold text-[#27221F]">{selectedDate} a las {selectedHour} hrs (Chile)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#8A7E73]">Saldo restante (80%):</span>
                <span className="font-bold text-terracotta-700">${balance.toLocaleString("es-CL")} CLP</span>
              </div>
            </div>

            {/* Enlace de Google Meet */}
            <div className="mb-6">
              <a
                href={result.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-warm hover:bg-opacity-90 rounded-full shadow transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
                </svg>
                Abrir sala de Google Meet
              </a>
              <p className="text-[11px] text-[#8A7E73] mt-2">
                También tienes este enlace disponible en tu correo electrónico.
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="text-xs text-[#8A7E73] hover:text-[#27221F] underline"
            >
              Cerrar y volver al inicio
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
