"use client";

import React, { useState } from "react";
import { OnlineService } from "../redesign/OnlineServiceCatalog";
import { onlineTherapists, VerifiedTherapist } from "../redesign/TherapistTeamOnline";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: OnlineService | null;
  initialTherapist?: VerifiedTherapist | null;
}

export function BookingFlowModal({
  isOpen,
  onClose,
  selectedService,
  initialTherapist,
}: BookingFlowModalProps) {
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
      therapistId: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", // ID compatible con la tabla de terapeutas
      clientName: clientData.fullName,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      scheduledAt: fullScheduledAt,
      consultationMotive: `${selectedService?.name || "Constelación Online"} - ${clientData.motive}`,
      amountPaidClp: deposit, // Registro del abono del 20%
    });

    setIsSubmitting(false);
    setResult(res);
    if (res.success) {
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-cream-200 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Cabecera */}
        <div className="p-4 sm:p-5 bg-cream-50 border-b border-cream-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 block">
              Reserva con abono del 20% • Solo Online
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal-900 truncate max-w-sm">
              {selectedService?.name || "Constelación Familiar Online"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-200 text-charcoal-700 flex items-center justify-center hover:bg-cream-300 transition-colors text-sm font-bold"
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* Pasos */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-white border-b border-cream-100 flex items-center justify-between text-xs font-semibold text-charcoal-400">
            <span className={step === 1 ? "text-forest-700 font-bold" : ""}>1. Facilitador</span>
            <span>→</span>
            <span className={step === 2 ? "text-forest-700 font-bold" : ""}>2. Fecha y Hora</span>
            <span>→</span>
            <span className={step === 3 ? "text-forest-700 font-bold" : ""}>3. Datos y Pago 20%</span>
          </div>
        )}

        <div className="p-6 overflow-y-auto flex-1 text-charcoal-900">
          
          {/* PASO 1: Facilitador */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-charcoal-900">
                Selecciona al facilitador acreditado:
              </h4>

              <div className="space-y-3">
                {onlineTherapists.map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      selectedTherapist.id === therapist.id
                        ? "border-forest-700 bg-forest-50/60 ring-1 ring-forest-700"
                        : "border-cream-200 hover:border-cream-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-serif font-bold text-sm text-charcoal-900">
                          {therapist.name}
                        </h5>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 font-semibold">
                          ✓ Validado
                        </span>
                      </div>
                      <p className="text-xs text-forest-700">{therapist.headline}</p>
                      <p className="text-[11px] text-charcoal-500">{therapist.schoolAndYear}</p>
                    </div>

                    <div className="text-right shrink-0 text-xs">
                      <span className="block font-bold text-charcoal-900">
                        Total: ${therapist.totalPriceClp.toLocaleString("es-CL")}
                      </span>
                      <span className="block text-forest-700 font-semibold text-[11px]">
                        Reserva 20%: ${therapist.depositPriceClp.toLocaleString("es-CL")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  Continuar a fecha y hora →
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: Fecha y Hora */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-charcoal-900">
                    Fecha y horario disponible
                  </h4>
                  <p className="text-xs text-charcoal-500">
                    Horario de Chile continental (CLT) con {selectedTherapist.name}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-charcoal-500 hover:underline"
                >
                  Cambiar facilitador
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                  Día disponible
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedDate === d.iso
                          ? "border-forest-700 bg-forest-700 text-white font-bold shadow-sm"
                          : "border-cream-200 bg-cream-50 text-charcoal-700 hover:bg-cream-100 font-medium"
                      }`}
                    >
                      <span className="text-xs block">{d.label.split(" ")[0]}</span>
                      <span className="text-sm font-bold block">{d.label.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-2">
                  Bloques horarios (Google Meet)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelectedHour(h)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedHour === h
                          ? "border-ochre-600 bg-ochre-50 text-ochre-800 ring-2 ring-ochre-600"
                          : "border-cream-200 bg-white text-charcoal-700 hover:bg-cream-50"
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
                  className="px-4 py-2 text-xs font-bold text-charcoal-600"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  Continuar a tus datos →
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Datos y Confirmación de Abono 20% */}
          {step === 3 && (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-bold text-base text-charcoal-900">
                  Datos del consultante
                </h4>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-charcoal-500 hover:underline"
                >
                  Cambiar horario
                </button>
              </div>

              {result?.error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {result.error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Francisca Silva"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.cl"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 mb-1">
                    WhatsApp en Chile
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 mb-1">
                  Motivo o tema a mirar (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Una frase breve si lo sientes..."
                  value={clientData.motive}
                  onChange={(e) => setClientData({ ...clientData, motive: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 resize-none"
                />
              </div>

              {/* Desglose claro del 20% y política de pago */}
              <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 text-xs space-y-1.5">
                <div className="flex justify-between text-charcoal-600">
                  <span>Valor total de la sesión:</span>
                  <span className="font-bold">${total.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between text-forest-700 font-bold text-sm pt-1 border-t border-cream-200">
                  <span>Monto a pagar hoy (Reserva 20%):</span>
                  <span>${deposit.toLocaleString("es-CL")} CLP</span>
                </div>
                <div className="flex justify-between text-charcoal-500 pt-0.5">
                  <span>Saldo a pagar (80%):</span>
                  <span>${balance.toLocaleString("es-CL")} CLP [antes / después de la sesión]</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-charcoal-600"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-ochre-600 hover:bg-ochre-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "Generando reserva..." : `Pagar reserva de $${deposit.toLocaleString("es-CL")}`}
                </button>
              </div>

              <p className="text-[10px] text-charcoal-400 text-center pt-1 leading-tight">
                Aviso ético: Espacio complementario de autoconocimiento. No reemplaza atención médica ni psiquiátrica clínica.
              </p>
            </form>
          )}

          {/* PASO 4: Confirmado */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-800 mx-auto flex items-center justify-center text-3xl font-bold">
                ✓
              </div>
              <h3 className="font-serif font-bold text-2xl text-charcoal-900">
                ¡Tu reserva ha quedado confirmada!
              </h3>
              <p className="text-charcoal-600 text-sm max-w-sm mx-auto">
                Hemos enviado los detalles y el enlace a{" "}
                <strong className="text-charcoal-900">{clientData.email}</strong>.
              </p>

              {result?.meetLink && (
                <div className="p-4 rounded-xl bg-cream-50 border border-cream-200 text-left my-4 space-y-1.5 text-xs">
                  <span className="font-bold text-charcoal-700 block">Enlace de Google Meet:</span>
                  <a
                    href={result.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-700 underline font-mono break-all font-semibold block"
                  >
                    {result.meetLink}
                  </a>
                  <p className="text-charcoal-500 text-[11px] pt-1">
                    Recuerda que el saldo restante (${balance.toLocaleString("es-CL")} CLP) se abona según la política acordada.
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-forest-700 text-white text-xs font-bold hover:bg-forest-800 transition-colors"
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
