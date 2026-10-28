import React from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "Política de Cancelación y Reembolsos · consteladores.cl",
  description: "Condiciones de reprogramación, cancelación y restitución de abonos por transferencia bancaria.",
};

export default function CancelacionPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-sm text-[#38322E] leading-relaxed space-y-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Políticas Transparentes
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F]">
            Política de Cancelación y Reprogramación
          </h1>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
            Última actualización: octubre 2026
          </p>
        </div>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            1. Reprogramación con anticipación (mínimo 24 horas)
          </h2>
          <p>
            Entendemos que pueden surgir imprevistos laborales, familiares o de salud. Si necesitas postergar tu hora, debes avisar con al menos <strong>{CONFIG.CANCELLATION_HOURS_NOTICE} horas de anticipación</strong> a la fecha y hora agendada.
          </p>
          <p>
            En este caso, tu abono del 20% se mantiene intacto y podrás reasignar una nueva fecha y horario con tu facilitador <strong>sin ningún recargo adicional</strong>.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            2. Devolución del 100% del abono
          </h2>
          <p>
            Si decides no reagendar y solicitas la cancelación definitiva de tu cita con al menos 24 horas de anticipación, tendrás derecho a la <strong>devolución del 100% del abono pagado</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#5C524A]">
            <li>La devolución se realiza exclusivamente mediante transferencia bancaria a la cuenta indicada por el consultante.</li>
            <li>Se emitirá el respectivo comprobante bancario oficial de respaldo.</li>
            <li>
              Plazo de devolución: dentro de un plazo máximo de <strong>{CONFIG.REFUND_BUSINESS_DAYS} días hábiles</strong> desde la recepción de la solicitud formal.
            </li>
          </ul>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            3. Inasistencias sin aviso (No-Show)
          </h2>
          <p>
            Si el consultante no asiste a la reunión de Google Meet o consulta presencial sin previo aviso dentro del plazo de 24 horas, el abono del 20% <strong>no será reembolsable</strong>, ya que cubre el tiempo reservado por el facilitador y los costos operativos de plataforma.
          </p>
          <p className="text-xs text-[#5C524A]">
            En situaciones excepcionales de fuerza mayor comprobable (emergencia médica grave o duelo inmediato), se evaluará la reprogramación sin costo a través de nuestro canal de soporte: <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-terracotta-600 underline font-semibold">{CONFIG.SUPPORT_EMAIL}</a>.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            4. Cancelación por parte del facilitador o de la plataforma
          </h2>
          <p>
            Si por razones de fuerza mayor el facilitador debe cancelar el encuentro, el consultante podrá optar entre:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C524A]">
            <li>Reagendamiento prioritario en el horario que más le acomode.</li>
            <li>Reasignación inmediata con otro facilitador acreditado.</li>
            <li>Devolución íntegra e inmediata del 100% del abono transferido.</li>
          </ul>
        </section>

        <section className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-6 space-y-2 text-xs text-[#7C5217]">
          <h3 className="font-serif font-semibold text-base text-[#9A6523]">
            Protocolo de Seguridad y Conciliación Antifraude
          </h3>
          <p>
            Si tras realizar tu transferencia del abono tu facilitador no confirma la recepción dentro de las 48 horas hábiles siguientes, tu reserva ingresa en revisión automática por parte de la plataforma para proteger tu pago y asegurar tu atención.
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
