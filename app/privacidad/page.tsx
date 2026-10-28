import React from "react";
import Link from "next/link";
import { WatercolorNavbar } from "@/components/watercolor/WatercolorNavbar";
import { WatercolorFooter } from "@/components/watercolor/WatercolorFooter";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "Política de Privacidad y Protección de Datos · consteladores.cl",
  description:
    "Tratamiento de datos personales y sensibles conforme a la Ley 21.719 de protección de datos personales en Chile.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#27221F] font-sans antialiased">
      <WatercolorNavbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-sm text-[#38322E] leading-relaxed space-y-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Privacidad y Ética
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F]">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
            Marco normativo conforme a la <strong>Ley 21.719</strong> sobre Protección de Datos Personales en Chile
          </p>
        </div>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            1. Responsable del Tratamiento
          </h2>
          <p>
            El responsable del tratamiento de los datos recopilados a través de <strong>consteladores.cl</strong> es el equipo administrador de la plataforma, en coordinación docente con <strong>Icalma Constelaciones</strong>. Para cualquier solicitud relacionada con tus datos personales, puedes escribir a <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-terracotta-600 underline font-semibold">{CONFIG.SUPPORT_EMAIL}</a>.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            2. Principio de Minimización de Datos
          </h2>
          <p>
            Solo solicitamos la información estrictamente indispensable para gestionar tu solicitud y coordinar el enlace de Google Meet:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C524A]">
            <li><strong>Nombre completo:</strong> Para identificar al consultante en la agenda.</li>
            <li><strong>Correo electrónico:</strong> Para enviar el enlace seguro de la sala virtual y la confirmación de la cita.</li>
            <li><strong>Teléfono de contacto:</strong> Para avisos urgentes sobre la sesión o coordinación directa vía WhatsApp si lo autorizas.</li>
            <li><strong>Motivo de consulta (opcional / breve):</strong> Para que el facilitador evalúe la pertinencia sistémica antes del encuentro.</li>
          </ul>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            3. Tratamiento de Datos de Salud y Motivos Personales
          </h2>
          <p>
            En conformidad con la <strong>Ley 21.719</strong>, los datos referidos a la salud emocional o motivos familiares íntimos son tratados como datos sensibles bajo deber estricto de secreto profesional:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-[#5C524A]">
            <li>Solo tiene acceso a tu motivo de consulta el facilitador que conducirá tu sesión.</li>
            <li>Los servidores y logs técnicos de la plataforma <strong>no almacenan contenido sensible ni grabaciones</strong> de las sesiones.</li>
            <li>Las sesiones por Google Meet son de acceso privado y no son grabadas por la plataforma.</li>
          </ul>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            4. Seguridad en Pagos y Cero Retención de Datos Financieros
          </h2>
          <p>
            La plataforma opera bajo el modelo de transferencia bancaria directa o redirección oficial a proveedores autorizados:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C524A]">
            <li>La plataforma <strong>nunca recibe, procesa, muestra ni almacena</strong> números de tarjeta de crédito, débito, claves de coordenadas ni códigos CVV.</li>
            <li>No existen formularios de tarjeta propios ni scripts de terceros (como píxeles publicitarios o analytics invasivos) en las páginas de reserva y pago.</li>
            <li>En transferencias bancarias, solo se almacena el código de referencia (ej. CR-2026-000123), el monto del abono, la fecha y el estado de conciliación.</li>
          </ul>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            5. Derechos del Titular (Derechos ARCO)
          </h2>
          <p>
            Como titular de tus datos personales, tienes derecho a ejercer tus facultades de <strong>acceso, rectificación, cancelación, oposición, bloqueo y portabilidad</strong> garantizadas por la legislación chilena.
          </p>
          <p className="text-xs text-[#5C524A]">
            Para ejercer cualquiera de estos derechos o solicitar la eliminación total de tus registros una vez realizada tu sesión, basta con enviar un correo a <a href={`mailto:${CONFIG.SUPPORT_EMAIL}`} className="text-terracotta-600 underline font-semibold">{CONFIG.SUPPORT_EMAIL}</a>. Tu solicitud será respondida en un plazo máximo de 10 días hábiles.
          </p>
        </section>

        <section className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-serif font-semibold text-[#27221F]">
            6. Plazos de Conservación
          </h2>
          <p className="text-xs text-[#5C524A] leading-relaxed">
            Los datos de contacto y comprobantes de transferencia se conservan únicamente durante el tiempo necesario para la adecuada prestación del servicio, la resolución de eventuales reprogramaciones y el cumplimiento de las obligaciones tributarias chilenas.
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
