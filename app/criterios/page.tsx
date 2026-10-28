import React from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "Criterios Públicos de Acreditación y Supervisión · consteladores.cl",
  description:
    "Definición pública de los estados de facilitadores (Formado, Supervisado, Acreditado), marco ético, procedimiento de quejas y respaldo de Icalma Constelaciones.",
};

export default function CriteriosPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto">
            Marco Ético y Transparencia
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-4">
            Criterios de Acreditación y Estados de Facilitadores
          </h1>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Para proteger a los consultantes y garantizar una práctica fenomenológica rigurosa, definimos una escala única y pública de estados en consteladores.cl y en Icalma Constelaciones.
          </p>
        </div>

        {/* Qué significa una acreditación en Chile */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 mb-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
            Qué significa una acreditación en Chile
          </h2>
          <div className="text-sm text-[#5C524A] leading-relaxed space-y-3 font-normal">
            <p>
              En Chile <strong>no existe un título profesional ni técnico regulado por el Estado</strong> para el ejercicio de las constelaciones familiares. No es una carrera universitaria sujeta a la superintendencia de salud ni a un colegio profesional legalmente constituido.
            </p>
            <p>
              Por esta razón, la seriedad de un facilitador depende exclusivamente del rigor de su centro formador, de las horas de práctica vivencial supervisada y de su adhesión estricta a un código ético.
            </p>
            <p>
              <strong>Respaldo de Icalma Constelaciones:</strong> Icalma (constelacionesfamiliares.cl) es una institución con más de 20 años de docencia continua en Chile. Su proceso evalúa la profundidad teórica, el respeto por los órdenes sistémicos y la capacidad de sostener un espacio sin juicios ni promesas milagrosas.
            </p>
            <p className="text-xs text-[#8A7E73] bg-[#FAF8F5] p-3 rounded-xl border border-[#E7DECE]">
              [PENDIENTE: texto exacto de la certificación de Icalma emitido por dirección académica.]
            </p>
          </div>
        </section>

        {/* Escala única de 3 Estados */}
        <section className="mb-14 space-y-6">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F] text-center mb-8">
            Escala Pública de Estados
          </h2>

          {/* ESTADO 1: FORMADO */}
          <div className="bg-[#FCFAF7] border-2 border-[#E7DECE] rounded-3xl p-6 sm:p-8 card-hover-elevate">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E7DECE]">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                  1. Estado: FORMADO
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold self-start sm:self-auto">
                Formación Completada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C524A] leading-relaxed">
              <div>
                <strong className="text-[#27221F] block mb-1">Qué se verifica:</strong>
                Aprobación del plan de estudios integral en constelaciones familiares (mínimo de horas pedagógicas teóricas y talleres vivenciales presenciales).
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Quién verifica:</strong>
                Comité de moderación de consteladores.cl y secretaría académica del centro formador de origen.
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Periodicidad de revisión:</strong>
                Registro permanente de egreso formativo tras validación documental de diploma.
              </div>
            </div>
          </div>

          {/* ESTADO 2: SUPERVISADO */}
          <div className="bg-[#FCFAF7] border-2 border-sage-500/40 rounded-3xl p-6 sm:p-8 card-hover-elevate">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-sage-200">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-sage-600" />
                <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                  2. Estado: SUPERVISADO
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-sage-50 text-sage-800 border border-sage-200 font-semibold self-start sm:self-auto">
                Práctica Clínica Bajo Guía Docente
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C524A] leading-relaxed mb-4">
              <div>
                <strong className="text-[#27221F] block mb-1">Qué se verifica:</strong>
                Práctica activa con consultantes bajo supervisión directa de un docente titular. El nombre y credencial del supervisor son siempre visibles para el consultante.
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Quién verifica:</strong>
                El docente supervisor asignado mediante bitácora periódica de casos clínicos y revisión metodológica.
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Periodicidad de revisión:</strong>
                Revisión semestral obligatoria para mantener activo el estado de práctica.
              </div>
            </div>

            <p className="text-[11px] text-[#8A7E73] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E7DECE]">
              Nota ética: Los practicantes en supervisión tienen su propia ruta en <Link href="/practica" className="text-terracotta-600 underline font-semibold">/practica</Link> y no se presentan como acreditados.
            </p>
          </div>

          {/* ESTADO 3: ACREDITADO */}
          <div className="bg-[#FCFAF7] border-2 border-terracotta-400/80 rounded-3xl p-6 sm:p-8 card-hover-elevate">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-terracotta-200">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-terracotta-500" />
                <h3 className="text-xl font-serif font-semibold text-[#27221F]">
                  3. Estado: ACREDITADO
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 border border-terracotta-200 font-semibold self-start sm:self-auto">
                Acreditación Plena Verificada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C524A] leading-relaxed">
              <div>
                <strong className="text-[#27221F] block mb-1">Qué se verifica:</strong>
                Formación completa acreditada, acreditación de horas de práctica clínica independiente, suscripción del código deontológico y sin quejas éticas pendientes.
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Quién verifica:</strong>
                Comité de Ética de Icalma Constelaciones y equipo auditor de consteladores.cl.
              </div>
              <div>
                <strong className="text-[#27221F] block mb-1">Periodicidad de revisión:</strong>
                Revalidación bianual (cada 2 años) mediante antecedentes y participación en jornadas de actualización.
              </div>
            </div>
          </div>
        </section>

        {/* Procedimiento de Queja Ética */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 mb-12 shadow-sm space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-[#27221F]">
            Procedimiento de Queja Ética y Protección al Consultante
          </h2>
          <p className="text-sm text-[#5C524A] leading-relaxed">
            Si durante una sesión individual o taller grupal experimentas una transgresión a los límites éticos, una promesa de resultado no respaldada, o una conducta inapropiada por parte de cualquier facilitador, dispones de un canal formal de denuncia.
          </p>

          <div className="space-y-3 text-xs text-[#5C524A]">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block mb-1">1. Canal de recepción:</strong>
              Escribe directamente a <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-terracotta-600 underline font-semibold">{CONFIG.SUPPORT_EMAIL}</a> indicando tu referencia de reserva (CR-2026-XXXXXX) y relato de lo ocurrido.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block mb-1">2. Plazo de respuesta:</strong>
              El comité ético responderá en un plazo máximo de <strong>5 días hábiles</strong> con acuse de recibo y apertura del expediente.
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E7DECE]">
              <strong className="text-[#27221F] block mb-1">3. Medidas preventivas:</strong>
              En caso de faltas graves, se suspenderá preventivamente la visibilidad del perfil del facilitador en la plataforma hasta el cierre de la investigación.
            </div>
          </div>
        </section>

        {/* Protocolo de Crisis */}
        <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-6 text-center text-xs text-[#7C5217] space-y-2">
          <h3 className="font-serif font-semibold text-base text-[#9A6523]">
            Protocolo de Contención y Salud Mental
          </h3>
          <p className="max-w-xl mx-auto leading-relaxed">
            Las constelaciones familiares no tratan cuadros psiquiátricos agudos. Si durante o después de una sesión sientes descompensación emocional o riesgo vital, comunícate inmediatamente con el fono de prevención del suicidio de Minsal: <strong className="text-terracotta-700">*4141</strong> (gratuito, 24 horas al día, 7 días a la semana) o dirígete a la urgencia hospitalaria más cercana.
          </p>
        </div>

      </main>

      <WatercolorFooter />
    </div>
  );
}
