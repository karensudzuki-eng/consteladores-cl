"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ServiceItem } from "./ServiceCatalog";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

export interface TherapistOption {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  approach: string;
  priceClp: number;
}

export const defaultTherapists: TherapistOption[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    name: "María Paz Vial",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora en Vínculos Tempranos y Duelo",
    approach: "Formada en Instituto Bert Hellinger de Chile",
    priceClp: 45000,
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    name: "Rodrigo San Martín",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    headline: "Constelador Sistémico • Vocación y Prosperidad",
    approach: "Certificado por Centro Latinoamericano de Constelaciones",
    priceClp: 48000,
  },
  {
    id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
    name: "Camila Echeverría",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora Sistémica • Pareja y Síntomas",
    approach: "Escuela de Constelaciones Familiares de Chile",
    priceClp: 45000,
  },
];

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: ServiceItem | null;
}

export function BookingFlowModal({
  isOpen,
  onClose,
  selectedService,
}: BookingFlowModalProps) {
  // Pasos del flujo estilo AgendaPro: 1=Facilitador, 2=Fecha/Hora, 3=Datos, 4=Confirmado
  const [step, setStep] = useState<number>(1);
  const [selectedTherapist, setSelectedTherapist] = useState<TherapistOption>(defaultTherapists[0]);
  
  // Días disponibles para agendar (próximos 7 días hábiles)
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

  // Formulario del cliente
  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    motive: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; meetLink?: string; error?: string } | null>(null);

  if (!isOpen) return null;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    // Armar fecha ISO completa
    const fullScheduledAt = new Date(`${selectedDate}T${selectedHour}:00`).toISOString();

    const res = await bookAndConfirmAppointment({
      therapistId: selectedTherapist.id,
      clientName: clientData.fullName,
      clientEmail: clientData.email,
      clientPhone: clientData.phone,
      scheduledAt: fullScheduledAt,
      consultationMotive: `${selectedService?.name || "Constelación"} - ${clientData.motive}`,
      amountPaidClp: selectedService?.priceClp || selectedTherapist.priceClp,
    });

    setIsSubmitting(false);
    setResult(res);
    if (res.success) {
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Cabecera del modal estilo AgendaPro */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
              CP
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                Agendamiento Online en Chile
              </span>
              <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 truncate max-w-sm">
                {selectedService?.name || "Constelación Familiar"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Indicador de Pasos estilo AgendaPro */}
        {step < 4 && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step === 1 ? "text-teal-700 font-bold" : ""}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"}`}>1</span>
              <span>Facilitador</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${step === 2 ? "text-teal-700 font-bold" : ""}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"}`}>2</span>
              <span>Fecha y Hora</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${step === 3 ? "text-teal-700 font-bold" : ""}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"}`}>3</span>
              <span>Tus Datos</span>
            </div>
          </div>
        )}

        {/* Contenido scrolleable del paso */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* PASO 1: Elegir Facilitador Certificado */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-sans font-bold text-base text-slate-900 mb-1">
                Selecciona al constelador certificado:
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Todos nuestros facilitadores cuentan con formación acreditada en escuelas de constelaciones sistémicas.
              </p>

              <div className="space-y-3">
                {defaultTherapists.map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      selectedTherapist.id === therapist.id
                        ? "border-teal-600 bg-teal-50/50 shadow-sm ring-1 ring-teal-600"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={therapist.avatarUrl}
                          alt={therapist.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h5 className="font-sans font-bold text-sm text-slate-900">
                          {therapist.name}
                        </h5>
                        <p className="text-xs text-teal-700 font-medium">
                          {therapist.headline}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {therapist.approach}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900">
                        ${(selectedService?.priceClp || therapist.priceClp).toLocaleString("es-CL")} CLP
                      </span>
                      <span className="block text-[11px] text-emerald-600 font-semibold">
                        Disponible esta semana
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  Continuar a fecha y hora →
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: Elegir Fecha y Hora */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-base text-slate-900">
                    Elige fecha y horario
                  </h4>
                  <p className="text-xs text-slate-500">
                    Horario de Chile (CLT / GMT-3) con {selectedTherapist.name}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Cambiar facilitador
                </button>
              </div>

              {/* Selector horizontal de fechas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
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
                          ? "border-teal-600 bg-teal-600 text-white font-bold shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <span className="text-xs block">{d.label.split(" ")[0]}</span>
                      <span className="text-sm font-bold block">{d.label.split(" ")[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de bloques horarios estilo AgendaPro */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Horas disponibles
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableHours.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelectedHour(h)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedHour === h
                          ? "border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Resumen horario:</span>
                <strong className="text-slate-900 font-bold">
                  {availableDates.find((d) => d.iso === selectedDate)?.label} a las {selectedHour} hrs
                </strong>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-sm transition-all"
                >
                  Continuar a tus datos →
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Formulario del Consultante y Confirmación */}
          {step === 3 && (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-sans font-bold text-base text-slate-900">
                  Completa tus datos para recibir el enlace de Google Meet
                </h4>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  Cambiar fecha/hora
                </button>
              </div>

              {result?.error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {result.error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Constanza Silva"
                  value={clientData.fullName}
                  onChange={(e) => setClientData({ ...clientData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correo electrónico (para la confirmación y sala Google Meet)
                </label>
                <input
                  type="email"
                  required
                  placeholder="constanza@correo.cl"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Teléfono en Chile
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 8452 1190"
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Motivo o tema a constelar (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Breve nota para el facilitador (ej. relación con mi padre, duelo no resuelto, etc.)..."
                  value={clientData.motive}
                  onChange={(e) => setClientData({ ...clientData, motive: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              {/* Resumen de reserva antes de disparar la acción */}
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 space-y-1">
                <div className="flex justify-between">
                  <span>Servicio:</span>
                  <span className="font-bold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Facilitador:</span>
                  <span className="font-bold">{selectedTherapist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fecha:</span>
                  <span className="font-bold">
                    {availableDates.find((d) => d.iso === selectedDate)?.label} a las {selectedHour} hrs
                  </span>
                </div>
                <div className="flex justify-between border-t border-teal-200/80 pt-1 font-bold text-sm">
                  <span>Total a pagar:</span>
                  <span>${(selectedService?.priceClp || selectedTherapist.priceClp).toLocaleString("es-CL")} CLP</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Generando sala de Meet...
                    </>
                  ) : (
                    "Confirmar reserva y recibir Meet"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* PASO 4: Confirmación Exitosa */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl font-bold">
                ✓
              </div>
              <h3 className="font-sans font-bold text-2xl text-slate-900">
                ¡Tu reserva ha sido confirmada con éxito!
              </h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Hemos enviado los detalles del encuentro y las recomendaciones a{" "}
                <strong className="text-slate-900">{clientData.email}</strong>.
              </p>

              {result?.meetLink && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left my-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                      Enlace a tu sala de Google Meet:
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      Sala lista
                    </span>
                  </div>
                  <a
                    href={result.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-teal-700 underline font-mono break-all font-semibold block"
                  >
                    {result.meetLink}
                  </a>
                  <p className="text-[11px] text-slate-500">
                    Solo haz clic en el enlace el día {availableDates.find((d) => d.iso === selectedDate)?.label} a las {selectedHour} hrs.
                  </p>
                </div>
              )}

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
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
