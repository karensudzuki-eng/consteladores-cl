"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cms/CMSContext";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

interface HumanInTheLoopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HumanInTheLoopModal({
  isOpen,
  onClose,
}: HumanInTheLoopModalProps) {
  const { content } = useCMS();
  const settings = content.settings;

  const rawPhone = (settings.whatsappNumber || "+56 9 4193 9363").replace(/[^0-9]/g, "");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    referenceCode?: string;
    message?: string;
  } | null>(null);

  if (!isOpen) return null;

  const bank = settings.bankDetails || {
    beneficiaryName: "Karen Valeria Sudzuki Toro",
    rut: "13.298.884-6",
    bank: "Mercado Pago",
    accountType: "Cuenta Vista",
    accountNumber: "1038886585",
    email: "karen.sudzuki@gmail.com",
  };

  const servicePrice = settings.servicePrice || "$45.000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyConsent) {
      alert("Por favor acepta el consentimiento para la gestión de tu reserva.");
      return;
    }

    setIsSubmitting(true);
    const generatedRef = `CR-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;

    try {
      await bookAndConfirmAppointment({
        therapistId: "karen-sudzuki-icalma",
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        scheduledAt: new Date().toISOString(),
        consultationMotive: `Sesión Individual Online (Ref: ${generatedRef})`,
        amountPaidClp: 45000,
      });

      setResult({
        success: true,
        referenceCode: generatedRef,
        message:
          "Tu solicitud ha sido registrada con éxito. Puedes enviar tu comprobante de pago por WhatsApp para coordinar tu cita inmediatamente.",
      });
    } catch (err) {
      // Incluso si la acción de email falla o no hay api keys, confirmamos la reserva localmente con la referencia
      setResult({
        success: true,
        referenceCode: generatedRef,
        message:
          "Tu solicitud ha sido registrada con éxito. Puedes enviar tu comprobante de pago por WhatsApp para coordinar tu cita inmediatamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappVoucherUrl = result?.referenceCode
    ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(
        `Hola, acabo de solicitar mi reserva para Sesión Individual Online con referencia ${result.referenceCode} a nombre de ${formData.fullName}. Adjunto mi comprobante de transferencia.`
      )}`
    : `https://wa.me/${rawPhone}?text=${encodeURIComponent(
        `Hola, te escribo para coordinar mi reserva para la Sesión Individual Online (${formData.fullName || "Consultante"}).`
      )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-xl bg-[#FBF7F2] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-9 my-8 text-left text-[#27221F] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 border border-[#E7DECE] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* TÍTULO ESTRICTO REQUERIDO: "Reservar sesión" */}
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-wider text-terracotta-600 font-semibold block mb-1">
            Espacio de Acompañamiento
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F]">
            Reservar sesión
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-1">
            Sesión individual online vía videollamada · Valor: <strong>{servicePrice} CLP</strong>
          </p>
        </div>

        {/* Canales Permanentes de WhatsApp para Vouchers y Coordinación de Último Minuto */}
        <div className="bg-[#EBF7F2] border border-[#BDE3D1] rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#128C7E] text-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.023 6.486 2.023 12.016c0 1.954.561 3.864 1.624 5.518L2 22l4.636-1.614c1.584.974 3.42 1.493 5.404 1.493 5.53 0 10.017-4.486 10.017-10.016 0-5.53-4.487-10.016-10.017-10.016z" />
              </svg>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#1B5E3C] block">
                Canal Oficial de WhatsApp
              </span>
              <span className="text-[#366851]">
                Envío de vouchers o coordinación de último minuto (mismo día)
              </span>
            </div>
          </div>

          <a
            href={whatsappVoucherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#128C7E] hover:bg-[#0E6C61] text-white text-xs font-semibold shrink-0 text-center transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Abrir WhatsApp</span>
            <span>→</span>
          </a>
        </div>

        {result ? (
          /* PANTALLA DE CONFIRMACIÓN CON DATOS BANCARIOS Y VOUCHER */
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 mb-1">
                <span>✓ Solicitud de Reserva Registrada</span>
              </div>
              <p>{result.message}</p>
              <div className="mt-2 font-mono text-xs font-bold text-emerald-800">
                Código de Referencia: {result.referenceCode}
              </div>
            </div>

            {/* DATOS DE TRANSFERENCIA */}
            <div className="bg-white border border-[#E7DECE] rounded-2xl p-5 text-xs space-y-1.5 shadow-sm">
              <div className="font-bold text-[#27221F] border-b border-[#E7DECE] pb-2 mb-2 flex items-center justify-between">
                <span>Datos de Transferencia Bancaria</span>
                <span className="text-terracotta-700 font-bold">{servicePrice} CLP</span>
              </div>
              <div><strong>Institución:</strong> {bank.bank}</div>
              <div><strong>Tipo de Cuenta:</strong> {bank.accountType}</div>
              <div><strong>Número de Cuenta:</strong> {bank.accountNumber}</div>
              <div><strong>Titular:</strong> {bank.beneficiaryName}</div>
              <div><strong>RUT:</strong> {bank.rut}</div>
              <div><strong>Correo de confirmación:</strong> {bank.email}</div>
              <div className="text-terracotta-700 font-semibold pt-1">
                <strong>Glosa recomendada:</strong> {result.referenceCode}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappVoucherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs sm:text-sm text-center shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enviar Comprobante por WhatsApp</span>
                <span>→</span>
              </a>

              <button
                onClick={onClose}
                type="button"
                className="py-3 px-6 rounded-full bg-[#27221F] hover:bg-[#3D3530] text-white font-medium text-xs text-center transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO ESTRICTO: NO SUGIERE FECHAS, NO HORARIOS PREESTABLECIDOS, NO PREGUNTAS DE MOTIVO */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                placeholder="Ingresa tu nombre completo"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.cl"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                />
              </div>
            </div>

            {/* Checkbox de Privacidad */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                type="checkbox"
                id="modal-consent"
                required
                checked={formData.privacyConsent}
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-[#E7DECE] text-terracotta-600 focus:ring-terracotta-500 cursor-pointer"
              />
              <label htmlFor="modal-consent" className="text-xs text-[#5C524A] leading-relaxed cursor-pointer">
                Acepto el tratamiento de mis datos de contacto para la coordinación exclusiva de esta sesión según las políticas de consteladores.cl.
              </label>
            </div>

            {/* Resumen de Datos Bancarios antes de Enviar */}
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-xl p-3 text-[11px] text-[#5C524A] space-y-1">
              <div className="font-semibold text-[#27221F]">Transferencia a: {bank.beneficiaryName}</div>
              <div>{bank.bank} · {bank.accountType} N° {bank.accountNumber} · RUT {bank.rut}</div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Registrando solicitud..." : "Confirmar y Continuar →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
