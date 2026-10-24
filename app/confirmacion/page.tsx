"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { confirmAppointmentPaymentAction } from "@/app/actions/appointments";

interface BookingData {
  ticketId: string;
  appointmentId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  facilitatorName: string;
  scheduledDate: string;
  scheduledHour: string;
  meetLink: string;
  deposit: number;
  balance: number;
  total: number;
}

export default function ConfirmacionPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [copied, setCopied] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  useEffect(() => {
    // 1. Cargar datos de la última reserva desde sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cst_last_booking");
      if (stored) {
        try {
          const parsed: BookingData = JSON.parse(stored);
          setBooking(parsed);

          // 2. Disparar confirmación definitiva y despacho de correos
          setIsNotifying(true);
          confirmAppointmentPaymentAction({
            appointmentId: parsed.appointmentId,
            ticketId: parsed.ticketId,
            clientName: parsed.clientName,
            clientEmail: parsed.clientEmail,
            clientPhone: parsed.clientPhone,
            facilitatorName: parsed.facilitatorName,
            scheduledDate: parsed.scheduledDate,
            scheduledHour: parsed.scheduledHour,
            meetLink: parsed.meetLink,
          }).finally(() => {
            setIsNotifying(false);
          });
        } catch (e) {
          console.warn("No se pudieron leer datos de reserva previa:", e);
        }
      }
    }
  }, []);

  const clientName = booking?.clientName || "Consultante";
  const facilitatorName = booking?.facilitatorName || "Karen Sudzuki";
  const meetLink = booking?.meetLink || "https://meet.google.com/cst-safe-room";
  const scheduledDate = booking?.scheduledDate || "Fecha coordinada";
  const scheduledHour = booking?.scheduledHour || "16:30";
  const ticketId = booking?.ticketId || "CST-CONFIRMADO";
  const deposit = booking?.deposit || 9000;
  const balance = booking?.balance || 36000;

  const handleCopyMeet = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl shadow-xl p-6 sm:p-10 animate-fadeIn text-center">
        
        {/* Logo suave y retorno */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-serif tracking-widest text-[#5C524A] hover:text-[#27221F] uppercase mb-6 transition-colors"
        >
          <span>← consteladores.cl</span>
        </Link>

        {/* Insignia de Éxito */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 text-4xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          ✓
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-3">
          <span>Abono del 20% Conciliado con Éxito</span>
          <span>•</span>
          <span className="font-mono">{ticketId}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#27221F] mb-3">
          ¡Tu espacio está 100% confirmado!
        </h1>
        <p className="text-xs sm:text-sm text-[#5C524A] max-w-lg mx-auto mb-8 leading-relaxed">
          Hola <strong>{clientName}</strong>, tu cita de constelación familiar online junto a <strong>{facilitatorName}</strong> ha quedado confirmada y agendada.
        </p>

        {/* BOTÓN PROMINENTE DE ACCESO A GOOGLE MEET */}
        <div className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 mb-8 shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">
            Tu Sala Virtual Privada
          </span>
          <h2 className="text-lg font-serif font-semibold text-[#27221F] mb-4">
            Espacio de Encuentro en Google Meet
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
              </svg>
              <span>Abrir Sala en Google Meet →</span>
            </a>

            <button
              type="button"
              onClick={handleCopyMeet}
              className="w-full sm:w-auto px-5 py-4 rounded-full bg-[#F3ECE2] hover:bg-[#E7DECE] text-[#27221F] text-xs font-medium transition-all"
            >
              {copied ? "✓ Enlace Copiado" : "Copiar Enlace"}
            </button>
          </div>

          <p className="text-[11px] text-[#8A7E73] break-all">
            Enlace permanente: <span className="text-terracotta-600 select-all">{meetLink}</span>
          </p>
        </div>

        {/* Resumen del Encuentro y Finanzas */}
        <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 text-left text-xs space-y-2.5 mb-8">
          <div className="flex justify-between border-b border-[#E7DECE] pb-2">
            <span className="text-[#8A7E73]">Facilitadora:</span>
            <span className="font-semibold text-[#27221F]">{facilitatorName}</span>
          </div>
          <div className="flex justify-between border-b border-[#E7DECE] pb-2">
            <span className="text-[#8A7E73]">Fecha y Horario:</span>
            <span className="font-semibold text-[#27221F] capitalize">
              {scheduledDate} a las {scheduledHour} hrs (Chile CLT)
            </span>
          </div>
          <div className="flex justify-between border-b border-[#E7DECE] pb-2">
            <span className="text-[#8A7E73]">Abono pagado (20% - Plataforma):</span>
            <span className="font-bold text-emerald-700">${deposit.toLocaleString("es-CL")} CLP (Pagado)</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-[#8A7E73]">Saldo restante al constelador (80%):</span>
            <span className="font-semibold text-[#27221F]">${balance.toLocaleString("es-CL")} CLP</span>
          </div>
          <p className="text-[11px] text-[#8A7E73] pt-1">
            * El saldo restante del 80% se transfiere directamente a la cuenta del constelador. Recuerda enviar tu comprobante/voucher antes o al finalizar la sesión.
          </p>
        </div>

        {/* Recomendaciones para la Sesión */}
        <div className="bg-[#FEF9EE] border border-ochre-300 rounded-2xl p-5 mb-8 text-left text-xs text-[#9A6523] space-y-2">
          <div className="font-bold text-sm text-[#7C5217] flex items-center gap-2">
            <span>🌿 Consejos para tu encuentro sistémico:</span>
          </div>
          <ul className="space-y-1.5 text-[11px] leading-relaxed text-[#7C5217]">
            <li>• <strong>Espacio privado:</strong> Busca un lugar tranquilo y cómodo donde puedas hablar con libertad y sin interrupciones.</li>
            <li>• <strong>Dispositivo y cámara:</strong> Recomendamos conectarte desde un computador o tablet con cámara activa para facilitar el trabajo fenomenológico.</li>
            <li>• <strong>Agua y abrigo:</strong> Ten a mano un vaso de agua y ropa cómoda.</li>
          </ul>
        </div>

        {/* Botones de Soporte y WhatsApp */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href={`https://wa.me/56963730998?text=${encodeURIComponent(
              `Hola Karen, acabo de confirmar mi abono para la constelación con ticket ${ticketId}. Mi fecha es ${scheduledDate} a las ${scheduledHour} hrs.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold shadow transition-all flex items-center justify-center gap-2"
          >
            <span>WhatsApp de Soporte (+56 9 6373 0998)</span>
          </a>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#27221F] hover:bg-[#3D3530] text-white text-xs font-semibold transition-all"
          >
            Volver a consteladores.cl
          </Link>
        </div>

        <p className="text-[11px] text-[#8A7E73]">
          También hemos enviado un respaldo con estos mismos datos a tu correo electrónico.
        </p>
      </div>
    </div>
  );
}
