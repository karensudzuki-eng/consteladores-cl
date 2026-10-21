"use client";

import React, { useState } from "react";
import Image from "next/image";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

export interface TherapistItem {
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
  specialties: string[];
  nextAvailable: string;
}

interface ModernTherapistDirectoryProps {
  initialTherapists: TherapistItem[];
}

export function ModernTherapistDirectory({ initialTherapists }: ModernTherapistDirectoryProps) {
  const [filterTopic, setFilterTopic] = useState<string>("todos");
  const [activeTherapist, setActiveTherapist] = useState<TherapistItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; meetLink?: string; error?: string } | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16),
    consultationMotive: "",
  });

  const topicsList = [
    { id: "todos", label: "Todos los temas" },
    { id: "padres", label: "Madre y Padre" },
    { id: "pareja", label: "Pareja y Relaciones" },
    { id: "dinero", label: "Trabajo y Dinero" },
    { id: "duelo", label: "Duelos y Pérdidas" },
  ];

  const filteredTherapists = initialTherapists.filter((t) => {
    if (filterTopic === "todos") return true;
    return t.specialties.some((s) => s.toLowerCase().includes(filterTopic));
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTherapist) return;

    setIsSubmitting(true);
    setBookingResult(null);

    const res = await bookAndConfirmAppointment({
      therapistId: activeTherapist.id,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      scheduledAt: new Date(formData.scheduledAt).toISOString(),
      consultationMotive: formData.consultationMotive,
      amountPaidClp: activeTherapist.priceClp,
    });

    setIsSubmitting(false);
    setBookingResult(res);
  };

  return (
    <section id="terapeutas" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del directorio */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-2">
              Facilitadores Verificados
            </div>
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
              Consteladores familiares disponibles
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Cada facilitador cuenta con diploma verificado manualmente de escuelas sistémicas avaladas.
            </p>
          </div>

          {/* Filtros rápidos por píldoras */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {topicsList.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterTopic(t.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  filterTopic === t.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rejilla de tarjetas de terapeutas modernas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTherapists.map((therapist) => (
            <article
              key={therapist.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Cabecera: Foto + Datos */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-sm">
                      <Image
                        src={therapist.avatarUrl}
                        alt={therapist.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold mb-1">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Certificación verificada
                      </div>

                      <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 truncate">
                        {therapist.name}
                      </h3>
                      
                      <p className="text-xs font-semibold text-brand-700 truncate">
                        {therapist.headline}
                      </p>

                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {therapist.approach}
                      </p>
                    </div>
                  </div>

                  {/* Extracto de cómo acompaña */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    "{therapist.bio}"
                  </p>

                  {/* Pills de especialidades */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {therapist.specialties.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Próxima disponibilidad y modalidad */}
                <div className="px-6 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {therapist.nextAvailable}
                  </span>
                  <span>💻 Online vía Google Meet</span>
                </div>
              </div>

              {/* Pie de tarjeta: Precio y Botón CTA */}
              <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Sesión {therapist.durationMinutes} min
                  </span>
                  <span className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900">
                    ${therapist.priceClp.toLocaleString("es-CL")}
                    <span className="text-xs font-normal text-slate-500 ml-1">CLP</span>
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveTherapist(therapist);
                    setBookingResult(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
                >
                  Agendar hora
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* MODAL MODERNO DE RESERVA Y GOOGLE MEET */}
      {activeTherapist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setActiveTherapist(null);
                setBookingResult(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            {!bookingResult?.success ? (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
                    Reserva segura con confirmación inmediata
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-slate-900">
                    Agendar con {activeTherapist.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Sesión individual online de {activeTherapist.durationMinutes} minutos • ${activeTherapist.priceClp.toLocaleString("es-CL")} CLP
                  </p>
                </div>

                {bookingResult?.error && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {bookingResult.error}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tu nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Constanza Silva"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tu correo electrónico (para el enlace de Google Meet)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.cl"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Día y hora solicitada
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={formData.scheduledAt}
                        onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ¿Qué tema te gustaría traer al encuentro? (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Una frase breve (ej. relación con mi madre, bloqueo laboral, duelo reciente)..."
                      value={formData.consultationMotive}
                      onChange={(e) => setFormData({ ...formData, consultationMotive: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Generando enlace de Google Meet...
                        </>
                      ) : (
                        "Confirmar reserva y recibir enlace de Google Meet"
                      )}
                    </button>
                    <p className="text-[11px] text-slate-400 text-center mt-2.5">
                      Recibirás la confirmación y enlace directamente en tu correo.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Pantalla de Confirmación Exitosa */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl font-bold">
                  ✓
                </div>
                <h3 className="font-sans font-bold text-2xl text-slate-900">
                  ¡Tu sesión ha quedado confirmada!
                </h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto">
                  Enviamos el enlace y las recomendaciones a{" "}
                  <strong className="text-slate-900">{formData.clientEmail}</strong>.
                </p>

                {bookingResult.meetLink && (
                  <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-left my-4">
                    <p className="text-xs text-brand-800 font-bold uppercase tracking-wider mb-1">
                      Tu sala de Google Meet:
                    </p>
                    <a
                      href={bookingResult.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-brand-700 underline font-mono break-all font-semibold"
                    >
                      {bookingResult.meetLink}
                    </a>
                  </div>
                )}

                <button
                  onClick={() => {
                    setActiveTherapist(null);
                    setBookingResult(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Entendido, cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
