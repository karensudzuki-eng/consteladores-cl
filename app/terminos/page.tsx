import React from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "Términos y Condiciones del Servicio · consteladores.cl",
  description: "Términos generales de uso, modelo de agendamiento, política de pagos 100%, cancelación y protección de datos bajo legislación chilena.",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-sm text-[#38322E] leading-relaxed space-y-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Marco Legal y Regulatorio
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#27221F]">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-3 max-w-2xl mx-auto">
            Plataforma operada por <strong>Vórtice Integration Holding SpA</strong> (RUT 78.377.882-3). Rige para consultantes, facilitadores y visitantes en consteladores.cl.
          </p>
          <p className="text-[11px] text-[#8A7E73] mt-1">
            Última actualización: Noviembre de 2026
          </p>
        </div>

        {/* 1. Naturaleza de la Plataforma */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            PRIMERO. Naturaleza de la Plataforma e Intermediación Tecnológica
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            <strong>consteladores.cl</strong> es una plataforma de software y marketplace digital provisto por <strong>Vórtice Integration Holding SpA</strong>. Su finalidad es centralizar el directorio de facilitadores, facilitar el agendamiento de citas, la recaudación de pagos y la provisión de salas virtuales seguras de videollamada (Google Meet).
          </p>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            La Plataforma actúa en calidad de intermediario tecnológico y mandatario de recaudación. Los facilitadores independientes ejercen su labor bajo su propia responsabilidad profesional y deontológica, sin que exista una relación laboral de subordinación con la Plataforma.
          </p>
        </section>

        {/* 2. Alcance Fenomenológico y Carácter Complementario */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            SEGUNDO. Alcance Terapéutico Complementario y Deberes de Salud
          </h2>
          <div className="p-4 bg-[#FEF9EE] border border-ochre-300 rounded-2xl text-xs text-[#7C5217] space-y-2">
            <p className="font-bold">
              ⚠️ Aviso esencial de salud complementaria:
            </p>
            <p>
              {CONFIG.DISCLAIMER_NOTICE} Las constelaciones familiares constituyen un abordaje fenomenológico y sistémico vivencial. En ningún caso reemplazan la consulta, diagnóstico ni tratamiento de médicos, psiquiatras o psicólogos clínicos.
            </p>
          </div>
          <p className="text-xs text-[#5C524A]">
            El consultante tiene la obligación de informar con veracidad si se encuentra bajo tratamiento psiquiátrico o si ingiere medicación controlada. Si el facilitador detecta un cuadro de descompensación severa o riesgo vital, se activará de inmediato la derivación a la línea pública de apoyo en crisis <strong>*4141 (Salud Responde, Minsal)</strong> o a urgencias médicas.
          </p>
        </section>

        {/* 3. Modelo de Cobro y Pagos 100% Total */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            TERCERO. Modelo de Cobro y Pago del 100% de los Servicios
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            El valor de la sesión es fijado en la plataforma (valor referencial estándar: <strong>$40.000 CLP</strong>). Para asegurar la reserva del bloque horario, se exige el pago del <strong>100% del valor del servicio</strong> a través de los canales habilitados:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#5C524A]">
            <li>
              <strong>Pago en línea (Mercado Pago / Webpay):</strong> Permite pagar con tarjeta de débito, crédito o dinero en cuenta. Al confirmarse la transacción por la pasarela, la cita queda agendada de forma automática y se entrega el enlace a la sala privada de Google Meet.
            </li>
            <li>
              <strong>Transferencia Bancaria Directa:</strong> Si el consultante opta por transferencia, la hora queda <em>pre-reservada por un lapso máximo de 2 horas</em>. El consultante debe transferir el 100% del valor a la cuenta informada y enviar el comprobante por WhatsApp o correo. Una vez verificado el pago por el equipo de administración, se enviará el enlace oficial de Google Meet. De no recibirse el comprobante dentro del plazo, el horario quedará liberado automáticamente para otros consultantes.
            </li>
          </ul>
        </section>

        {/* 4. Política de Reagendamiento y Cancelación */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            CUARTO. Política de Reagendamiento, Cancelación y "No-Show"
          </h2>
          <div className="bg-[#FDF7F4] border border-[#F2D5C8] rounded-2xl p-4 text-xs text-[#8B3E25] space-y-2 mb-3">
            <p className="font-bold">
              Plazo límite de 24 horas para reprogramaciones:
            </p>
            <p>
              El consultante podrá solicitar el reagendamiento de su hora sin costo alguno con un mínimo de <strong>24 horas de anticipación</strong> a la hora fijada, escribiendo a contacto@consteladores.cl o al canal de WhatsApp oficial.
            </p>
          </div>
          <p className="text-xs text-[#5C524A]">
            <strong>Inasistencia ("No-Show") o Cancelación Tardía:</strong> Dado que el facilitador reserva su tiempo y espacio de manera exclusiva, aquellas cancelaciones o solicitudes de cambio solicitadas con menos de 24 horas de anticipación, así como la inasistencia a la sesión pactada, <strong>no darán derecho a devolución ni reembolso de los fondos abonados</strong>, salvo casos fortuitos o de fuerza mayor debidamente acreditados ante la administración.
          </p>
        </section>

        {/* 5. Protección de Datos Personales (Ley 21.719) */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            QUINTO. Privacidad y Protección de Datos Personales (Ley N° 21.719)
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            En cumplimiento de la legislación chilena sobre protección de datos personales (Ley N° 21.719 y concordantes), los datos de contacto y motivos de consulta entregados por los usuarios son tratados bajo estricta confidencialidad con el único fin de coordinar y ejecutar la atención. La Plataforma no comercializa ni cede bases de datos a terceros ajenos a la prestación del servicio.
          </p>
        </section>

        {/* 6. Limitación de Responsabilidad */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            SEXTO. Limitación de Responsabilidad
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            Vórtice Integration Holding SpA no se hace responsable por fallas de conexión a internet o equipamiento técnico atribuibles al consultante que impidan el normal desarrollo de la videollamada. Asimismo, la Plataforma no garantiza resultados específicos derivados del proceso de constelación familiar, tratándose de una experiencia de exploración y acompañamiento personal.
          </p>
        </section>

        {/* 7. Contacto y Jurisdicción */}
        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-[#27221F]">
            SÉPTIMO. Contacto y Jurisdicción
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A]">
            Para cualquier consulta sobre estos términos o el estado de sus reservas, los usuarios pueden dirigirse a <strong>contacto@consteladores.cl</strong> o <strong>contacto@vorticeintegration.com</strong>. Para todos los efectos legales, las partes se someten a la jurisdicción de los Tribunales Ordinarios de Justicia de la comuna de Santiago de Chile.
          </p>
        </section>

        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs shadow-md transition-all"
          >
            ← Volver a la página principal
          </Link>
        </div>

      </main>

      <WatercolorFooter />
    </div>
  );
}
