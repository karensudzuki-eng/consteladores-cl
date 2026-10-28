"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

interface PractitionerItem {
  id: string;
  name: string;
  status: "SUPERVISADO";
  supervisorName: string;
  supervisorCredential: string;
  institution: string;
  graduationYear: string;
  availableHours: string[];
  bio: string;
}

const practitionersList: PractitionerItem[] = [
  {
    id: "practicante-1",
    name: "[NOMBRE PRACTICANTE, EN REGISTRO]",
    status: "SUPERVISADO",
    supervisorName: "Docente Titular Icalma",
    supervisorCredential: "Acreditación Docente Icalma N° 104",
    institution: "Centro de Formación Icalma",
    graduationYear: "Egresado/a 2025",
    availableHours: ["11:00", "15:00", "18:00"],
    bio: "Practicante en etapa de integración clínica. Acompaña procesos individuales online bajo la tutela metodológica de docentes del Centro de Formación Icalma.",
  },
];

export default function PracticaPage() {
  const [selectedPractitioner, setSelectedPractitioner] = useState<PractitionerItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consentCheck, setConsentCheck] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleOpenBooking = (p: PractitionerItem) => {
    setSelectedPractitioner(p);
    setIsModalOpen(true);
    setIsSent(false);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentCheck) {
      alert("Debes aceptar el consentimiento específico de práctica supervisada.");
      return;
    }
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-sage-800 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
            Ruta de Aprendizaje Supervisado
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Sesiones con Practicantes en Formación Supervisada
          </h1>
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed">
            Un espacio formativo y accesible donde personas que completaron su formación teórica conducen sesiones individuales online bajo la guía y revisión directa de un docente titular.
          </p>
        </div>

        {/* Criterios y Resguardos de esta Ruta */}
        <section className="bg-[#FCFAF7] border-2 border-sage-500/30 rounded-3xl p-6 sm:p-9 mb-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
            Resguardos y Características de la Ruta de Práctica
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C524A] leading-relaxed">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block text-sm mb-1">Supervisión Docente Continua</strong>
              Cada sesión es revisada en instancias de supervisión clínica metodológica por un docente acreditado de Icalma. El nombre de tu supervisor estará siempre identificado.
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block text-sm mb-1">Solo Sesiones Individuales Online</strong>
              Por razones de contención y cuidado formativo, en esta ruta <strong>no se realizan talleres grupales</strong>. Los encuentros son exclusivamente individuales vía Google Meet.
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block text-sm mb-1">Valor y Honorarios</strong>
              Valor: por definir. Si la sesión asignada corresponde a horas gratuitas de práctica académica, no se solicitará ningún abono ni datos de pago.
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block text-sm mb-1">Flexibilidad y Cambio</strong>
              Si durante el proceso deseas cambiar de modalidad o ser derivado/a a un facilitador acreditado, puedes hacerlo sin ningún costo adicional.
            </div>
          </div>
        </section>

        {/* Listado de Practicantes */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E7DECE]">
            <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
              Practicantes Disponibles
            </h2>
            <span className="text-xs text-[#8A7E73]">
              Etiqueta de estado: EN FORMACIÓN SUPERVISADA
            </span>
          </div>

          <div className="space-y-6">
            {practitionersList.map((p) => (
              <div
                key={p.id}
                className="bg-[#FCFAF7] border border-[#CCD9CF] rounded-3xl p-6 sm:p-8 card-hover-elevate flex flex-col sm:flex-row justify-between gap-6"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200 text-xs font-semibold">
                      En Formación Supervisada
                    </span>
                    <span className="text-xs text-[#8A7E73]">
                      {p.institution} · {p.graduationYear}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                    {p.name}
                  </h3>

                  <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE] text-xs text-[#5C524A] space-y-1">
                    <p>
                      <strong>Sesión con practicante en formación supervisado por:</strong>
                    </p>
                    <p className="text-terracotta-700 font-semibold">
                      {p.supervisorName} ({p.supervisorCredential})
                    </p>
                  </div>

                  <p className="text-xs text-[#5C524A] leading-relaxed">
                    {p.bio}
                  </p>
                </div>

                <div className="sm:w-56 shrink-0 flex flex-col justify-between items-start sm:items-end text-left sm:text-right border-t sm:border-t-0 sm:border-l border-[#E7DECE] pt-4 sm:pt-0 sm:pl-6">
                  <div>
                    <span className="text-xs text-[#8A7E73] block mb-1">Modalidad:</span>
                    <span className="text-sm font-semibold text-[#27221F] block">Individual Online</span>
                    <span className="text-xs text-sage-800 block mt-1">Valor: por definir</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(p)}
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 mt-4 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Consultar disponibilidad
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal de Consentimiento y Agendamiento */}
        {isModalOpen && selectedPractitioner && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-left text-xs">
              
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] flex items-center justify-center"
              >
                ✕
              </button>

              {isSent ? (
                <div className="text-center py-6 space-y-3">
                  <h3 className="text-2xl font-serif font-semibold text-[#27221F]">
                    Solicitud Registrada
                  </h3>
                  <p className="text-sm text-[#5C524A]">
                    Tu solicitud ha sido enviada al equipo docente. Nos pondremos en contacto contigo en menos de 24 horas hábiles para coordinar el horario y presentarte a tu practicante y supervisor/a.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-terracotta-500 text-white text-xs font-semibold"
                  >
                    Cerrar ventana
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-sage-800 block mb-1">
                      Ruta de Práctica Supervisada
                    </span>
                    <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                      Sesión con {selectedPractitioner.name}
                    </h3>
                    <p className="text-[#8A7E73] text-[11px] mt-0.5">
                      Supervisado/a por {selectedPractitioner.supervisorName}
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#5C524A] mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-[#5C524A] mb-1">Correo electrónico *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#5C524A] mb-1">Teléfono *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                      />
                    </div>
                  </div>

                  {/* CHECKBOX DE CONSENTIMIENTO ESPECIFICO REQUERIDO */}
                  <div className="p-3 bg-[#FEF9EE] border border-ochre-300 rounded-xl space-y-2">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="practica-consent"
                        required
                        checked={consentCheck}
                        onChange={(e) => setConsentCheck(e.target.checked)}
                        className="mt-0.5 h-4 w-4"
                      />
                      <label htmlFor="practica-consent" className="text-[11px] text-[#7C5217] leading-relaxed">
                        <strong>Consentimiento informado de práctica supervisada:</strong> Entiendo que mi sesión es con un practicante en formación, que está supervisado por un docente titular, y que puedo cambiar de modalidad o solicitar derivación sin costo adicional.
                      </label>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#8A7E73] border-t border-[#E7DECE] pt-2">
                    {CONFIG.DISCLAIMER_NOTICE}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs transition-all shadow cursor-pointer"
                  >
                    Enviar solicitud de sesión
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </main>

      <WatercolorFooter />
    </div>
  );
}
