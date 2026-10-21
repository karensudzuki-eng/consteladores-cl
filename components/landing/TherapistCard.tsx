"use client";

import React, { useState } from "react";
import Image from "next/image";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

export interface TherapistData {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  approach: string;
  experienceYears: number;
  priceClp: number;
  durationMinutes: number;
  location: string;
}

interface TherapistCardProps {
  therapist: TherapistData;
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; meetLink?: string; error?: string } | null>(null);

  // Estado del formulario de reserva
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16), // Cita propuesta a 48h
    consultationMotive: "",
  });

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const res = await bookAndConfirmAppointment({
      therapistId: therapist.id,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      scheduledAt: new Date(formData.scheduledAt).toISOString(),
      consultationMotive: formData.consultationMotive,
      amountPaidClp: therapist.priceClp,
    });

    setIsSubmitting(false);
    setResult(res);
  };

  return (
    <>
      <article className="group flex flex-col justify-between rounded-organic-lg bg-white border border-earth-200/80 p-7 sm:p-8 shadow-warm-subtle hover:shadow-warm-card transition-all duration-300">
        <div>
          {/* Cabecera del terapeuta: Foto + Datos esenciales */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-terracotta-200 shrink-0 shadow-sm">
              <Image
                src={therapist.avatarUrl}
                alt={therapist.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="80px"
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-olive-50 border border-olive-200/80 text-[11px] font-medium text-olive-700 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-olive-500" />
                Certificación verificada
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-earth-900 leading-snug truncate">
                {therapist.name}
              </h3>
              <p className="text-xs sm:text-sm text-terracotta-600 font-medium">
                {therapist.headline}
              </p>
            </div>
          </div>

          {/* Biografía humana y sin tecnicismos */}
          <p className="text-earth-700 text-sm leading-relaxed mb-5 italic border-l-2 border-terracotta-200 pl-3">
            "{therapist.bio}"
          </p>

          {/* Linaje formativo / enfoque */}
          <div className="mb-6 space-y-1.5 text-xs text-earth-600 bg-earth-50/70 p-3.5 rounded-xl border border-earth-200/60">
            <p>
              <strong className="text-earth-800">Linaje y formación:</strong> {therapist.approach}
            </p>
            <p>
              <strong className="text-earth-800">Recorrido:</strong> {therapist.experienceYears} años acompañando procesos
            </p>
            <p>
              <strong className="text-earth-800">Modalidad:</strong> Online vía Google Meet (Chile y exterior)
            </p>
          </div>
        </div>

        {/* Pie de la tarjeta con valor y acción */}
        <div className="pt-4 border-t border-earth-100 flex items-center justify-between gap-4">
          <div>
            <span className="block text-xs uppercase tracking-wider text-earth-500 font-medium">
              Sesión {therapist.durationMinutes} min
            </span>
            <span className="font-serif text-xl sm:text-2xl text-earth-900 font-semibold">
              ${therapist.priceClp.toLocaleString("es-CL")}{" "}
              <span className="text-xs font-sans text-earth-500 font-normal">CLP</span>
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm hover:shadow"
          >
            Agendar espacio
          </button>
        </div>
      </article>

      {/* Modal acogedor para agendamiento */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-organic-lg bg-white border border-earth-200 p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setIsModalOpen(false);
                setResult(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-earth-100 text-earth-600 flex items-center justify-center hover:bg-earth-200 transition-colors"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            {!result?.success ? (
              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold">
                    Reservar tu encuentro
                  </span>
                  <h3 className="font-serif text-2xl text-earth-900 mt-1">
                    Sesión con {therapist.name}
                  </h3>
                  <p className="text-xs text-earth-600 mt-1">
                    {therapist.durationMinutes} minutos de conversación guiada • ${therapist.priceClp.toLocaleString("es-CL")} CLP
                  </p>
                </div>

                {result?.error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-700 text-xs leading-relaxed">
                    {result.error}
                  </div>
                )}

                <form onSubmit={handleBooking} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-medium text-earth-700 mb-1">
                      Tu nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Constanza Silva"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-earth-700 mb-1">
                      Tu correo electrónico (aquí recibirás el enlace de Meet)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.cl"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-earth-700 mb-1">
                        Teléfono / WhatsApp (opcional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-earth-700 mb-1">
                        Día y hora sugerida
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.scheduledAt}
                        onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-earth-700 mb-1">
                      ¿Qué tema te gustaría traer o mirar? (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Una frase sencilla si lo sientes (ej. relación con mi madre, sensación de bloqueo laboral)..."
                      value={formData.consultationMotive}
                      onChange={(e) => setFormData({ ...formData, consultationMotive: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-earth-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-60 text-white font-medium text-sm transition-all duration-300 shadow-sm"
                    >
                      {isSubmitting ? "Preparando tu refugio y enlace..." : "Confirmar reserva y recibir enlace de Meet"}
                    </button>
                    <p className="text-[11px] text-earth-500 text-center mt-2.5">
                      Te enviaremos los detalles y el enlace único a tu correo de inmediato.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Pantalla de confirmación y bienvenida serena */
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-olive-100 text-olive-700 mx-auto flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-earth-900">
                  Tu espacio ha quedado reservado
                </h3>
                <p className="text-earth-700 text-sm leading-relaxed max-w-sm mx-auto">
                  Hemos enviado los detalles y recomendaciones a{" "}
                  <strong className="text-earth-900">{formData.clientEmail}</strong>.
                </p>

                {result.meetLink && (
                  <div className="p-4 rounded-xl bg-earth-50 border border-earth-200 text-left my-4">
                    <p className="text-xs text-earth-500 uppercase tracking-wider font-semibold mb-1">
                      Enlace a tu sala de Google Meet:
                    </p>
                    <a
                      href={result.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-terracotta-600 underline font-mono break-all"
                    >
                      {result.meetLink}
                    </a>
                  </div>
                )}

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setResult(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-earth-900 text-white text-xs font-medium hover:bg-earth-800 transition-colors"
                >
                  Volver a la página principal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
