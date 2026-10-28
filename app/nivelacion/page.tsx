"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export default function NivelacionPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institutionOrigin: "",
    formationYears: "",
    yearsWithoutPractice: "",
    referenceSupervisor: "",
    motivation: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
            Ruta de Reintegro Profesional
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Nivelación y Reintegro a la Práctica Sistémica
          </h1>
          <p className="text-base sm:text-lg text-[#38322E] leading-relaxed">
            Un camino de acompañamiento y actualización metodológica para personas que completaron formación en constelaciones hace años o que desean retomar su práctica con supervisión rigurosa.
          </p>
        </div>

        {/* Vocabulario y Enfoque */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 mb-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
            Quiénes participan en este proceso
          </h2>
          <p className="text-sm text-[#5C524A] leading-relaxed">
            Esta ruta está dirigida a personas <strong>en proceso de nivelación</strong> o que se encuentran <strong>retomando su práctica</strong>. Por respeto a los consultantes, los facilitadores en este estado no utilizan los sellos de acreditado hasta concluir satisfactoriamente el ciclo de horas clínicas y supervisión.
          </p>
        </section>

        {/* Dos Opciones con Igual Peso Visual */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F] text-center mb-8">
            Opciones Formativas para la Nivelación
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Opción 1: Icalma */}
            <div className="bg-[#FCFAF7] border-2 border-sage-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between card-hover-elevate">
              <div className="space-y-3">
                <span className="text-xs px-3 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200 font-semibold inline-block">
                  Opción A · Icalma Constelaciones
                </span>
                
                <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                  Curso de práctica avanzada de Icalma
                </h3>

                <p className="text-xs text-[#5C524A] leading-relaxed">
                  Programa de actualización metodológica, profundización fenomenológica y supervisión clínica continua impartido por docentes titulares de Icalma Constelaciones.
                </p>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7DECE] text-[11px] text-[#8A7E73]">
                  [PENDIENTE: enlace y descripción verificada del curso de práctica avanzada de Icalma.]
                </div>
              </div>

              <div className="pt-6 border-t border-[#E7DECE] mt-6">
                <a
                  href={CONFIG.ICALMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-center rounded-full bg-sage-700 hover:bg-sage-800 text-white block transition-all shadow-sm"
                >
                  Conocer en constelacionesfamiliares.cl →
                </a>
              </div>
            </div>

            {/* Opción 2: Otra opción verificada */}
            <div className="bg-[#FCFAF7] border-2 border-terracotta-300/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between card-hover-elevate">
              <div className="space-y-3">
                <span className="text-xs px-3 py-1 rounded-full bg-cream-200 text-terracotta-800 border border-terracotta-200 font-semibold inline-block">
                  Opción B · Vía Externa Homologada
                </span>
                
                <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                  Otra opción de nivelación verificada
                </h3>

                <p className="text-xs text-[#5C524A] leading-relaxed">
                  Si estás realizando o completaste un programa de actualización o supervisión en otra institución nacional o internacional reconocida, puedes presentar tus antecedentes para homologación de horas.
                </p>

                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E7DECE] text-[11px] text-[#5C524A]">
                  Revisión individual de programa académico, horas clínicas y docente supervisor a cargo.
                </div>
              </div>

              <div className="pt-6 border-t border-[#E7DECE] mt-6">
                <a
                  href="#formulario-postulacion"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-center rounded-full bg-[#27221F] hover:bg-[#3D3530] text-white block transition-all shadow-sm"
                >
                  Postular antecedentes para revisión
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Plan de Nivelación como Texto de Referencia */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 mb-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
            Plan de Nivelación de Referencia
          </h2>
          <p className="text-xs text-[#8A7E73]">
            Texto de referencia curricular. No constituye promesa de resultado ni acreditación automática.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C524A] pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE] space-y-1.5">
              <span className="font-semibold text-terracotta-600 block">Etapa 1: Actualización</span>
              <p>Revisión teórica y fenomenológica de los órdenes de la ayuda, jerarquía y pertenencia en el contexto actual.</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE] space-y-1.5">
              <span className="font-semibold text-terracotta-600 block">Etapa 2: Supervisión</span>
              <p>Mínimo de 30 horas de práctica clínica acompañada con presentación y discusión de bitácoras de casos.</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7DECE] space-y-1.5">
              <span className="font-semibold text-terracotta-600 block">Etapa 3: Integración</span>
              <p>Evaluación por comisión docente de pares para incorporación al directorio de facilitadores acreditados.</p>
            </div>
          </div>
        </section>

        {/* Formulario de Postulación a Nivelación */}
        <section id="formulario-postulacion" className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-serif font-semibold text-[#27221F] mb-2">
              Formulario de Postulación a Nivelación
            </h2>
            <p className="text-xs text-[#5C524A]">
              Toda postulación pasa por revisión manual de antecedentes antes de cualquier confirmación.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-[#FEF9EE] border border-ochre-300 rounded-2xl text-center space-y-2">
              <h3 className="font-serif font-semibold text-lg text-[#27221F]">
                Postulación Recibida
              </h3>
              <p className="text-xs text-[#5C524A] max-w-md mx-auto">
                Tus antecedentes han sido ingresados al comité de revisión. Nos pondremos en contacto contigo en un plazo de 3 a 5 días hábiles a través de tu correo electrónico.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left max-w-xl mx-auto">
              <div>
                <label className="block font-semibold text-[#5C524A] mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#5C524A] mb-1">Correo electrónico *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5C524A] mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#5C524A] mb-1">Institución formadora de origen *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Centro Icalma, etc."
                    value={formData.institutionOrigin}
                    onChange={(e) => setFormData({ ...formData, institutionOrigin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#5C524A] mb-1">Años de interrupción de práctica *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 3 años"
                    value={formData.yearsWithoutPractice}
                    onChange={(e) => setFormData({ ...formData, yearsWithoutPractice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5C524A] mb-1">Docente o supervisor de referencia (si aplica)</label>
                <input
                  type="text"
                  placeholder="Nombre y contacto de referencia"
                  value={formData.referenceSupervisor}
                  onChange={(e) => setFormData({ ...formData, referenceSupervisor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5C524A] mb-1">Motivación para retomar la práctica</label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Comenta brevemente tu momento y expectativa de actualización..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs shadow transition-all cursor-pointer"
              >
                Enviar postulación a nivelación
              </button>
            </form>
          )}
        </section>

      </main>

      <WatercolorFooter />
    </div>
  );
}
