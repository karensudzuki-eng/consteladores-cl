"use client";

import React, { useState } from "react";
import { OnlineService } from "../redesign/OnlineServiceCatalog";
import { onlineTherapists, VerifiedTherapist } from "../redesign/TherapistTeamOnline";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

interface MercuryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: OnlineService | null;
  initialTherapist?: VerifiedTherapist | null;
}

export function MercuryBookingModal({
  isOpen,
  onClose,
  selectedService,
  initialTherapist,
}: MercuryBookingModalProps) {
  const [step, setStep] = useState<number>(1);
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

  const total = selectedService?.totalPriceClp || selectedTherapist.totalPriceClp;
  const deposit = selectedService?.depositPriceClp || selectedTherapist.depositPriceClp;
  const balance = selectedService?.balancePriceClp || selectedTherapist.balancePriceClp;

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
      consultationMotive: `${selectedService?.name || "Constelación Online"} - ${clientData.motive}`,
      amountPaidClp: deposit,
    });

    setIsSubmitting(false);
    setResult(res);
    if (res.success) {
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#171721]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[620px] rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-[#ededf3]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#171721] border-b border-[#70707d]/20 flex items-center justify-between">
          <div className="text-center flex-1">
            <span className="text-[11px] font-[480] uppercase tracking-[0.015em] text-[#5266eb] block">
              Reserva con abono del 20% • Google Meet
            </span>
            <h3 className="font-sans font-[480] text-base sm:text-lg text-[#ededf3] truncate">
              {selectedService?.name || "Constelación Familiar Online"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#272735] text-[#c3c3cc] flex items-center justify-center hover:text-[#ededf3] transition-colors text-xs font-[480]"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#1e1e2a] border-b border-[#70707d]/20 flex items-center justify-between text-xs font-[400] text-[#c3c3cc]/70">
            <span className={step === 1 ? "text-[#5266eb] font-[480]" : ""}>1. Facilitador</span>
            <span>→</span>
            <span className={step === 2 ? "text-[#5266eb] font-[480]" : ""}>2. Fecha y Hora</span>
            <span>→</span>
            <span className={step === 3 ? "text-[#5266eb] font-[480]" : ""}>3. Datos y Abono 20%</span>
          </div>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: Select Facilitator */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-sans font-[480] text-base text-[#ededf3] text-center tracking-[0.01em]">
                Selecciona al facilitador acreditado:
              </h4>

              <div className="space-y-3">
                {onlineTherapists.map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist)}
                    className={`p-4 rounded-[12px] cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      selectedTherapist.id === therapist.id
                        ? "border border-[#5266eb] bg-[#272735]"
                        : "border border-[#e2e3ed]/10 bg-[#171721] hover:border-[#e2e3ed]/25"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-sans font-[480] text-sm text-[#ededf3]">
                          {therapist.name}
                        </h5>
                        <span className="text-[10px] px-2 py-0.5 rounded-[40px] bg-[#171721] text-[#ededf3] border border-[#e2e3ed]/20 font-[480]">
                          ✓ Validado
                        </span>
                      </div>
                      <p className="text-xs text-[#5266eb] mt-0.5">{therapist.headline}</p>
                      <p className="text-[11px] text-[#c3c3cc]/70">{therapist.schoolAndYear}</p>
                    </div>

                    <div className="text-right shrink-0 text-xs">
                      <span className="block font-[480] text-[#ededf3]">
                        Total: ${therapist.totalPriceClp.toLocaleString("es-CL")}
                      </span>
                      <span className="block text-[#5266eb] font-[480] text-[11px]">
                        Reserva 20%: ${therapist.depositPriceClp.toLocaleString("es-CL")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-sm shadow-none transition-all"
                >
                  Continuar a fecha y hora →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="font-sans font-[480] text-base text-[#ededf3] tracking-[0.01em]">
                  Fecha y horario disponible
                </h4>
                <p className="text-xs text-[#c3c3cc] mt-1">
                  Horario de Chile continental (CLT) con {selectedTherapist.name}
                </p>
              </div>

              <div>
                <label className="block text-xs font-[480] uppercase tracking-[0.015em] text-[#c3c3cc] mb-2 text-center">
                  Día disponible
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`p-3 rounded-[12px] border text-center transition-all ${
                        selectedDate === d.iso
                          ? "border-[#5266eb] bg-[#5266eb] text-[#ffffff] font-[480]"
                          : "border-[#e2e3ed]/10 bg-[#171721] text-[#c3c3cc] hover:text-[#ededf3]"
                      }`}
                    >
                      <span className="text-xs block">{d.label.split(" ")[0]}</span>
                      <span className="text-sm font-[480] block">{d.label.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-[480] uppercase tracking-[0.015em] text-[#c3c3cc] mb-2 text-center">
                  Bloques horarios (Google Meet)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelectedHour(h)}
                      className={`py-2 px-3 rounded-[32px] border text-xs font-[480] transition-all ${
                        selectedHour === h
                          ? "border-[#5266eb] bg-[#272735] text-[#ededf3] ring-1 ring-[#5266eb]"
                          : "border-[#e2e3ed]/10 bg-[#171721] text-[#c3c3cc] hover:text-[#ededf3]"
                      }`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-[400] text-[#c3c3cc] hover:text-[#ededf3]"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-sm shadow-none transition-all"
                >
                  Continuar a tus datos →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details & 20% Deposit */}
          {step === 3 && (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="text-center mb-4">
                <h4 className="font-sans font-[480] text-base text-[#ededf3] tracking-[0.01em]">
                  Datos para recibir el enlace de Google Meet
                </h4>
              </div>

              {result?.error && (
                <div className="p-3 rounded-[8px] bg-[#272735] border border-red-500/40 text-red-300 text-xs text-center font-[400]">
                  {result.error}
                </div>
              )}

              <div>
                <label className="block text-xs font-[480] text-[#c3c3cc] mb-1">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Francisca Silva"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                  className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.cl"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1">
                    WhatsApp en Chile
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-[480] text-[#c3c3cc] mb-1">
                  Motivo de consulta (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Una frase breve si lo sientes..."
                  value={clientData.motive}
                  onChange={(e) => setClientData({ ...clientData, motive: e.target.value })}
                  className="w-full px-5 py-2.5 rounded-[12px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb] resize-none"
                />
              </div>

              {/* Price Breakdown in Graphite Surface */}
              <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/10 text-xs space-y-1.5">
                <div className="flex justify-between text-[#c3c3cc]">
                  <span>Valor total de la sesión:</span>
                  <span className="font-[480] text-[#ededf3]">${total.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between text-[#5266eb] font-[480] text-sm pt-1 border-t border-[#70707d]/20">
                  <span>Monto de reserva a pagar hoy (20%):</span>
                  <span>${deposit.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between text-[#c3c3cc]/60 pt-0.5">
                  <span>Saldo restante a pagar (80%):</span>
                  <span>${balance.toLocaleString("es-CL")} CLP</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-[400] text-[#c3c3cc] hover:text-[#ededf3]"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] disabled:opacity-60 text-[#ffffff] font-[400] text-sm shadow-none transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "Generando reserva..." : `Pagar reserva de $${deposit.toLocaleString("es-CL")}`}
                </button>
              </div>

              <p className="text-[11px] text-[#c3c3cc]/60 text-center pt-1 leading-[1.3]">
                Aviso ético: Espacio complementario de autoconocimiento. No reemplaza atención médica ni psiquiátrica clínica.
              </p>
            </form>
          )}

          {/* STEP 4: Confirmed */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#5266eb]/20 text-[#5266eb] mx-auto flex items-center justify-center text-2xl font-[480]">
                ✓
              </div>
              <h3 className="font-sans font-[480] text-2xl text-[#ededf3] text-center tracking-[0.015em]">
                ¡Tu reserva ha quedado confirmada!
              </h3>
              <p className="text-[#c3c3cc] text-sm max-w-[420px] mx-auto text-center leading-[1.4]">
                Hemos enviado los detalles y el enlace de Google Meet a{" "}
                <strong className="text-[#ededf3]">{clientData.email}</strong>.
              </p>

              {result?.meetLink && (
                <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/10 text-left my-4 space-y-1.5 text-xs">
                  <span className="font-[480] text-[#ededf3] block">Enlace de acceso en Google Meet:</span>
                  <a
                    href={result.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5266eb] underline font-mono break-all font-[480] block"
                  >
                    {result.meetLink}
                  </a>
                  <p className="text-[#c3c3cc]/60 text-[11px] pt-1">
                    El saldo restante (${balance.toLocaleString("es-CL")} CLP) se abona según el protocolo acordado.
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-[32px] bg-[#272735] text-[#ededf3] text-xs font-[480] hover:bg-[#272735]/80 transition-colors"
              >
                Cerrar ventana
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
