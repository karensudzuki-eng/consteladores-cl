"use client";

import React, { useState } from "react";
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

  // Pasos: "form" -> "datetime" -> "confirmed"
  const [step, setStep] = useState<"form" | "datetime" | "confirmed">("form");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inPsychTreatment: "no" as "si" | "no",
    takesMedication: false,
    privacyConsent: false,
  });

  // Fecha y hora libres
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [selectedTime, setSelectedTime] = useState("16:00");
  const [timeNotes, setTimeNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const bank = settings.bankDetails || {
    beneficiaryName: "Karen Valeria Sudzuki Toro",
    rut: "13.298.884-6",
    bank: "Mercado Pago",
    accountType: "Cuenta Vista",
    accountNumber: "1038886585",
    email: "karen.sudzuki@gmail.com",
  };

  const servicePrice = settings.servicePrice || "$40.000";

  // Formatear la fecha amigable en español
  const getFriendlyDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyConsent) {
      alert("Por favor acepta el consentimiento para la gestión de tu reserva.");
      return;
    }
    setStep("datetime");
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Por favor selecciona una fecha para tu sesión.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Combinar fecha y hora para el registro
      const scheduledDateTime = `${selectedDate}T${selectedTime || "16:00"}:00`;

      await bookAndConfirmAppointment({
        therapistId: "karen-sudzuki-icalma",
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        scheduledAt: scheduledDateTime,
        consultationMotive: `Sesión Individual (${getFriendlyDate(selectedDate)} a las ${selectedTime || "hora acordada"} hrs${timeNotes ? ` · Nota: ${timeNotes}` : ""} · En tratamiento psicológico/psiquiátrico: ${formData.inPsychTreatment === "si" ? "Sí" : "No"} · Toma medicamentos: ${formData.takesMedication ? "Sí" : "No"})`,
        amountPaidClp: 40000,
      });

      setStep("confirmed");
    } catch (err) {
      // Incluso si la acción de email falla o no hay api keys, confirmamos la reserva para el usuario
      setStep("confirmed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMercadoPagoPayment = async () => {
    if (!selectedDate) {
      alert("Por favor selecciona una fecha para tu sesión.");
      return;
    }

    setIsProcessingPayment(true);
    try {
      const scheduledDateTime = `${selectedDate}T${selectedTime || "16:00"}:00`;

      // Guardar datos en sessionStorage para recuperarlos en la pantalla de confirmación
      const bookingData = {
        ticketId: `CST-MP-${Date.now().toString().slice(-6)}`,
        clientName: formData.fullName,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        facilitatorName: "Karen Valeria Sudzuki Toro",
        scheduledDate: getFriendlyDate(selectedDate),
        scheduledHour: selectedTime || "16:00",
        meetLink: "https://meet.google.com/cst-safe-room",
        deposit: 40000,
        balance: 0,
        total: 40000,
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("cst_last_booking", JSON.stringify(bookingData));
      }

      // Llamar al endpoint de Mercado Pago
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: formData.fullName,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          scheduledAt: scheduledDateTime,
          therapistId: "karen-sudzuki-icalma",
          consultationMotive: `Sesión Individual (${getFriendlyDate(selectedDate)} a las ${selectedTime || "16:00"} hrs${timeNotes ? ` · Nota: ${timeNotes}` : ""})`,
          amountPaidClp: 40000,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || "No se pudo generar el enlace de pago");
      }
    } catch (err: any) {
      alert("Error al conectar con la pasarela de pago: " + (err?.message || "Intenta nuevamente."));
      setIsProcessingPayment(false);
    }
  };

  const resetAndClose = () => {
    setStep("form");
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Karen, acabo de solicitar mi reserva para Sesión Individual Online el día ${getFriendlyDate(selectedDate)} a las ${selectedTime || "horario a coordinar"} hrs a nombre de ${formData.fullName}. Adjunto mi comprobante de pago para recibir el enlace de la videollamada.`
  );

  const whatsappVoucherUrl = `https://wa.me/${rawPhone}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={resetAndClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-xl bg-[#FBF7F2] border border-[#E7DECE] rounded-3xl shadow-2xl p-6 sm:p-9 my-8 text-left text-[#27221F] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={resetAndClose}
          type="button"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 border border-[#E7DECE] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* TÍTULO PRINCIPAL */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F]">
            Reservar sesión
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-1">
            Sesión individual online vía videollamada · Valor: <strong>{servicePrice} CLP</strong>
          </p>
        </div>

        {/* PASO 1: FORMULARIO DE CONTACTO */}
        {step === "form" && (
          <form onSubmit={handleStep1Submit} className="space-y-4 animate-fadeIn">
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

            {/* Pregunta sobre tratamiento psicológico/psiquiátrico y medicamentos */}
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-xl p-3.5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1.5">
                  ¿Estás actualmente en tratamiento psicológico o psiquiátrico? *
                </label>
                <div className="flex items-center gap-5">
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#27221F] cursor-pointer">
                    <input
                      type="radio"
                      name="psychTreatment"
                      value="no"
                      checked={formData.inPsychTreatment === "no"}
                      onChange={() => setFormData({ ...formData, inPsychTreatment: "no" })}
                      className="text-terracotta-600 focus:ring-terracotta-500 cursor-pointer"
                    />
                    <span>No</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-[#27221F] cursor-pointer">
                    <input
                      type="radio"
                      name="psychTreatment"
                      value="si"
                      checked={formData.inPsychTreatment === "si"}
                      onChange={() => setFormData({ ...formData, inPsychTreatment: "si" })}
                      className="text-terracotta-600 focus:ring-terracotta-500 cursor-pointer"
                    />
                    <span>Sí</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E7DECE]/70">
                <label className="flex items-center gap-2 text-xs text-[#5C524A] cursor-pointer">
                  <input
                    type="checkbox"
                    id="modal-meds"
                    checked={formData.takesMedication}
                    onChange={(e) => setFormData({ ...formData, takesMedication: e.target.checked })}
                    className="h-4 w-4 rounded border-[#E7DECE] text-terracotta-600 focus:ring-terracotta-500 cursor-pointer"
                  />
                  <span>¿Tomas medicamentos actualmente? (Psiquiátricos u otros relevantes)</span>
                </label>
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

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                Continuar a Selección de Fecha y Hora →
              </button>
            </div>
          </form>
        )}

        {/* PASO 2: CALENDARIO Y HORARIO LIBRE */}
        {step === "datetime" && (
          <form onSubmit={handleFinalSubmit} className="space-y-5 animate-fadeIn">
            <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-4 text-xs text-[#5C524A] space-y-1">
              <div className="font-semibold text-[#27221F] text-sm">
                Hola {formData.fullName.split(" ")[0] || "Consultante"}
              </div>
              <p>
                Elige la fecha y el horario que más te acomoden. El calendario es libre y coordinaremos el espacio ideal para tu sesión.
              </p>
            </div>

            {/* Selector de Fecha */}
            <div>
              <label className="block text-xs font-bold text-[#5C524A] mb-1.5">
                Fecha deseada para tu sesión *
              </label>
              <input
                type="date"
                required
                min={tomorrow}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7DECE] text-sm font-medium text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer shadow-sm"
              />
              {selectedDate && (
                <p className="text-xs text-terracotta-700 font-medium mt-1.5 capitalize">
                  📅 {getFriendlyDate(selectedDate)}
                </p>
              )}
            </div>

            {/* Selector Libre de Hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1.5">
                  Hora preferida *
                </label>
                <input
                  type="time"
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7DECE] text-sm font-medium text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1.5">
                  Franja horaria u otra preferencia
                </label>
                <input
                  type="text"
                  placeholder="Ej. Tarde, o a partir de las 18:00"
                  value={timeNotes}
                  onChange={(e) => setTimeNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-sm"
                />
              </div>
            </div>

            {/* OPCIONES DE PAGO */}
            <div className="pt-2 space-y-3">
              {/* Botón Principal: Mercado Pago / Webpay */}
              <button
                type="button"
                onClick={handleMercadoPagoPayment}
                disabled={isProcessingPayment || isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#009EE3] to-[#007EB5] hover:from-[#008CC9] hover:to-[#006E9E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white text-[#009EE3] flex items-center justify-center font-bold text-xs">
                    💳
                  </span>
                  <div className="text-left">
                    <div className="leading-tight">
                      {isProcessingPayment ? "Conectando con Mercado Pago..." : "Pagar con Mercado Pago / Webpay"}
                    </div>
                    <div className="text-[10px] font-normal text-white/90">
                      Débito, Crédito o Transferencia · Confirmación inmediata
                    </div>
                  </div>
                </div>
                <span className="font-mono text-sm bg-white/20 px-2.5 py-1 rounded-lg">
                  {servicePrice}
                </span>
              </button>

              {/* Botón Secundario: Transferencia Bancaria Manual */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full sm:w-1/3 py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F3ECE2] border border-[#E7DECE] text-xs text-[#5C524A] font-medium transition-all cursor-pointer"
                >
                  ← Volver
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isProcessingPayment}
                  className="w-full sm:w-2/3 py-3 px-4 rounded-xl bg-white hover:bg-[#FDFBF7] border border-[#E7DECE] text-[#5C524A] hover:text-[#27221F] font-semibold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <span>🏦</span>
                  <span>{isSubmitting ? "Registrando..." : "Pagar con Transferencia Bancaria"}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* PASO 3: CONFIRMACIÓN DE RESERVA CON DATOS BANCARIOS */}
        {step === "confirmed" && (
          <div className="space-y-5 animate-fadeIn">
            {/* Mensaje de Reserva Exitosa */}
            <div className="p-5 rounded-2xl bg-[#EBF7F2] border border-[#BDE3D1] text-[#1B5E3C] space-y-1.5">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#166534]">
                <span>✓ ¡Reserva Pre-bloqueada con Éxito!</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-[#2D5A43]">
                Tu solicitud para el <strong>{getFriendlyDate(selectedDate)}</strong> a las <strong>{selectedTime} hrs</strong> a nombre de <strong>{formData.fullName}</strong> ha quedado pre-registrada.
              </p>
              <div className="text-xs bg-white/70 p-2.5 rounded-xl border border-[#BDE3D1] text-[#166534] mt-1 space-y-1">
                <p>⏳ <strong>Plazo de confirmación:</strong> Tu espacio se mantendrá reservado durante <strong>2 horas</strong> para recibir tu comprobante de pago.</p>
                <p>🔒 <strong>Enlace Google Meet:</strong> El link oficial a la sala privada de videollamada se enviará a tu correo (<strong>{formData.email}</strong>) una vez verificado tu comprobante.</p>
              </div>
            </div>

            {/* BOTÓN PROMINENTE DE PAGO ONLINE CON MERCADO PAGO */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#009EE3]/10 to-[#007EB5]/10 border-2 border-[#009EE3]/30 text-left">
              <div className="text-xs font-semibold text-[#007EB5] uppercase tracking-wider mb-1">
                Opción Rápida con Tarjetas
              </div>
              <p className="text-xs text-[#5C524A] mb-3">
                Puedes pagar directamente los $40.000 ahora con débito, crédito o Webpay con confirmación instantánea:
              </p>
              <button
                type="button"
                onClick={handleMercadoPagoPayment}
                disabled={isProcessingPayment}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#009EE3] to-[#007EB5] hover:from-[#008CC9] hover:to-[#006E9E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white text-[#009EE3] flex items-center justify-center font-bold text-xs shadow-sm">
                    💳
                  </span>
                  <span>{isProcessingPayment ? "Conectando con pasarela..." : "Pagar $40.000 con Mercado Pago / Webpay"}</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Pagar Online →</span>
              </button>
            </div>

            {/* Aviso de Comprobante y Envío de la Meet */}
            <div className="p-4 rounded-2xl bg-[#FFF8EB] border border-[#F5E0B8] text-[#7A4B10] text-xs sm:text-sm leading-relaxed space-y-1 shadow-sm">
              <div className="font-bold flex items-center gap-1.5 text-[#8F5614]">
                <span>🏦 O pagar mediante Transferencia Bancaria Directa</span>
              </div>
              <p>
                Transfiere el valor total de <strong>$40.000 CLP</strong> a los siguientes datos y luego presiona &ldquo;Enviar Comprobante por WhatsApp&rdquo;:
              </p>
            </div>

            {/* DATOS DE TRANSFERENCIA BANCARIA */}
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
            </div>

            {/* BOTÓN DIRECTO DE WHATSAPP */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappVoucherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold text-xs sm:text-sm text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enviar Comprobante por WhatsApp</span>
                <span>→</span>
              </a>

              <button
                onClick={resetAndClose}
                type="button"
                className="py-3 px-6 rounded-full bg-[#27221F] hover:bg-[#3D3530] text-white font-medium text-xs text-center transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
