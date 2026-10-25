"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FamilyTreeIcon } from "@/components/icons/FamilyTreeIcon";
import { requestCommunityAccess } from "@/app/actions/community";

export function CommunitySection() {
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [certifiedEmail, setCertifiedEmail] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [telegramUrl, setTelegramUrl] = useState<string | null>(null);

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setFeedbackMessage(null);

    try {
      const res = await requestCommunityAccess(certifiedEmail);
      setIsVerifying(false);

      if (res.isCertified && res.inviteUrl) {
        setIsCertified(true);
        setTelegramUrl(res.inviteUrl);
        setShowVerifyModal(false);
        setShowWelcomeModal(true);
      } else {
        setFeedbackMessage(
          res.deniedMessage ||
            "Este espacio es para consteladores certificados. Si ya completaste tu formación, inicia sesión o verifica tu certificado para continuar."
        );
      }
    } catch {
      setIsVerifying(false);
      setFeedbackMessage(
        "Este espacio es para consteladores certificados. Si ya completaste tu formación, inicia sesión o verifica tu certificado para continuar."
      );
    }
  };

  const handleOpenWelcome = () => {
    if (isCertified && telegramUrl) {
      setShowWelcomeModal(true);
    } else {
      setShowVerifyModal(true);
    }
  };

  return (
    <section id="comunidad" className="py-16 sm:py-24 bg-[#FBF7F2] border-t border-[#E7DECE]/80 relative overflow-hidden">
      
      {/* Símbolo de ramas decorativas sutiles en la esquina */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 pointer-events-none opacity-5 text-sage-700">
        <FamilyTreeIcon className="w-80 h-80" isAnimated={true} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contenedor Cálido con Borde Suave */}
        <div className="bg-[#FCFAF7] border-2 border-[#E7DECE] rounded-3xl p-6 sm:p-12 shadow-sm text-center relative">
          
          {/* Insignia de Sección */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage-50 border border-sage-200 text-sage-700 text-xs font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-sage-500" />
            <span>Red Ética de Acompañamiento entre Pares</span>
          </div>

          {/* ESTADO 1: VISITANTE CERTIFICADO */}
          {isCertified ? (
            <div className="animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-sage-50 text-sage-600 border border-sage-200 flex items-center justify-center mx-auto mb-4">
                <FamilyTreeIcon className="w-7 h-7" isAnimated={true} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F] mb-4">
                Un lugar para caminar acompañado/a
              </h2>

              <p className="text-base sm:text-lg text-[#38322E] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                Quienes han completado su formación como consteladores tienen un espacio propio para compartir,
                preguntar y sostener la práctica entre pares. Aquí no hay juicios ni respuestas correctas: hay escucha,
                respeto y raíces que se encuentran.
              </p>

              <div className="flex flex-col items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenWelcome}
                  className="px-8 py-4 text-base font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 btn-breathe cursor-pointer"
                >
                  <FamilyTreeIcon className="w-5 h-5" isAnimated={true} />
                  <span>Entrar a la comunidad</span>
                </button>

                <p className="text-xs text-[#5C524A] mt-1 font-medium">
                  Al unirte aceptas las normas de cuidado de la comunidad. Solo para consteladores certificados.
                </p>
              </div>
            </div>
          ) : (
            /* ESTADO 2: VISITANTE NO CERTIFICADO */
            <div className="animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-cream-100 text-[#5C524A] border border-[#E7DECE] flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#5C524A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#27221F] mb-4">
                Una comunidad para quienes practican constelaciones
              </h2>

              <p className="text-base sm:text-lg text-[#38322E] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                Este espacio está pensado para consteladores certificados que acompañan procesos sistémicos.
                Si estás en tu camino de formación, puedes conocer cómo certificarte y cuándo se abre el acceso.
              </p>

              <div className="flex flex-col items-center justify-center gap-3.5">
                {/* Botón bloqueado */}
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(true)}
                  className="px-8 py-3.5 text-sm sm:text-base font-medium text-[#5C524A] bg-[#EFE9DF] hover:bg-[#E5DDD2] border border-[#D5C8B4] rounded-full transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
                  title="Haz clic para verificar si tu certificado ya fue acreditado"
                >
                  <svg className="w-4 h-4 text-[#8A7E73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Acceso para consteladores certificados</span>
                </button>

                {/* Enlace secundario */}
                <Link
                  href="/registro-terapeuta"
                  className="text-xs sm:text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 underline underline-offset-4 transition-colors"
                >
                  Conoce el proceso de certificación →
                </Link>

                <button
                  type="button"
                  onClick={() => setShowVerifyModal(true)}
                  className="text-[11px] text-[#8A7E73] hover:text-[#27221F] underline transition-colors mt-2"
                >
                  ¿Ya completaste tu formación y estás acreditado/a? Validar acceso
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: VALIDACIÓN DE CORREO DE CONSTELADOR */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-center">
            
            <button
              onClick={() => {
                setShowVerifyModal(false);
                setFeedbackMessage(null);
              }}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-full bg-cream-100 text-terracotta-600 border border-[#E7DECE] flex items-center justify-center mx-auto mb-3">
              <FamilyTreeIcon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-serif font-semibold text-[#27221F] mb-2">
              Validar Acreditación de Constelador
            </h3>
            <p className="text-xs text-[#5C524A] mb-5 leading-relaxed">
              Ingresa el correo con el que registraste tu diploma de constelador para verificar tu acceso a la comunidad.
            </p>

            <form onSubmit={handleVerifySubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Correo electrónico registrado:
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.cl"
                  value={certifiedEmail}
                  onChange={(e) => setCertifiedEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-sans"
                />
              </div>

              {feedbackMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center leading-relaxed">
                  {feedbackMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 text-xs sm:text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isVerifying ? "Verificando acreditación..." : "Validar mi acceso"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#E7DECE] text-center">
              <Link
                href="/registro-terapeuta"
                className="text-xs text-terracotta-600 hover:text-terracotta-700 underline"
              >
                ¿Aún no subes tu certificado? Postula aquí →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BIENVENIDA Y ACCESO SEGURO A TELEGRAM TRAS APROBACIÓN */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-center">
            
            <button
              onClick={() => setShowWelcomeModal(false)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3ECE2] text-[#5C524A] hover:text-[#27221F] flex items-center justify-center"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <FamilyTreeIcon className="w-7 h-7" isAnimated={true} />
            </div>

            <h3 className="text-2xl font-serif font-semibold text-[#27221F] mb-3">
              Bienvenida/o a la comunidad Consteladores Chile
            </h3>

            {/* Mensaje exacto requerido tras aprobación */}
            <p className="text-xs sm:text-sm text-[#38322E] leading-relaxed mb-6 bg-cream-50 p-4 rounded-2xl border border-[#E7DECE] text-left">
              Este es un espacio de cuidado y respeto. Aquí encontrarás el enlace para unirte al grupo de Telegram. Si en algún momento necesitas apoyo personal, recuerda que la línea de prevención de salud mental <strong>*4141</strong> está disponible en Chile las 24 horas.
            </p>

            {telegramUrl && (
              <div className="mb-4">
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  <span>Solicitar Admisión al Grupo de Telegram →</span>
                </a>
                <p className="text-[10px] text-[#8A7E73] mt-2">
                  * El grupo opera con aprobación manual de solicitudes de admisión para resguardar la privacidad.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowWelcomeModal(false)}
              type="button"
              className="text-xs text-[#5C524A] hover:text-[#27221F] underline mt-2"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
