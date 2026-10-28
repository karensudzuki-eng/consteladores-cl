import React from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "Términos y Condiciones del Servicio · consteladores.cl",
  description: "Condiciones de uso, alcance fenomenológico complementario y deberes éticos en consteladores.cl.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-sm text-[#38322E] leading-relaxed space-y-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Términos Legales
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F]">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
            Reglas de uso, alcance ético y relación de intermediación en consteladores.cl
          </p>
        </div>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            1. Naturaleza del Servicio y Alcance Complementario
          </h2>
          <p>
            <strong>consteladores.cl</strong> es una plataforma chilena orientada a facilitar el contacto entre personas interesadas en el abordaje de las constelaciones familiares sistémicas y profesionales acreditados o practicantes en supervisión docente vinculados al linaje de <strong>Icalma Constelaciones</strong>.
          </p>
          <div className="p-3 bg-[#FEF9EE] border border-ochre-300 rounded-xl text-xs text-[#7C5217]">
            <strong>Aviso esencial:</strong> {CONFIG.DISCLAIMER_NOTICE} El consultante comprende y acepta que este trabajo no reemplaza la atención de psicólogos, psiquiatras ni médicos tratantes.
          </div>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            2. Modelo de Reserva y Pagos
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#5C524A]">
            <li>
              <strong>Abono inicial (20%):</strong> Se cancela mediante transferencia bancaria con el código de referencia único (ej. CR-2026-000123) para confirmar la cita en la agenda del facilitador.
            </li>
            <li>
              <strong>Saldo restante (80%):</strong> Se abona directamente al facilitador mediante transferencia bancaria antes o al inicio de la sesión. La plataforma no intermedia, custodia ni cobra comisiones sobre dicho saldo.
            </li>
            <li>
              <strong>Cero retención de datos bancarios:</strong> La plataforma nunca te solicitará claves, contraseñas ni números de tarjeta de crédito.
            </li>
          </ul>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            3. Reprogramación y Cancelación
          </h2>
          <p className="text-xs text-[#5C524A] leading-relaxed">
            Se aplican íntegramente las condiciones descritas en nuestra <Link href="/cancelacion" className="text-terracotta-600 underline font-semibold">Política de Cancelación</Link>: con al menos 24 horas de aviso previo, el consultante puede reasignar su hora sin costo o solicitar la restitución del 100% del abono. Inasistencias sin aviso pierden el abono de reserva.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            4. Deberes de Conducta y Confidencialidad
          </h2>
          <p className="text-xs text-[#5C524A] leading-relaxed">
            Tanto el consultante como el facilitador se comprometen a sostener un trato digno, libre de discriminación, juicios y violencia verbal. Todo lo expresado en la sesión está protegido por el deber ético de estricta confidencialidad.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            5. Protocolo de Crisis y Emergencias
          </h2>
          <p className="text-xs text-[#5C524A] leading-relaxed">
            Si durante una sesión el facilitador detecta un cuadro de riesgo vital inminente, ideación suicida o descompensación psiquiátrica severa, se activará el protocolo de derivación inmediata a la línea telefónica <strong className="text-terracotta-700">*4141</strong> o a los servicios de urgencia médica.
          </p>
        </section>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="text-xs text-terracotta-600 hover:text-terracotta-700 underline font-semibold"
          >
            ← Volver a la página principal
          </Link>
        </div>

      </main>

      <WatercolorFooter />
    </div>
  );
}
