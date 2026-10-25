"use server";

export interface CommunityAdmissionResult {
  success: boolean;
  inviteUrl: string;
  admissionNotice: string;
  crisisNotice: string;
  welcomeMessage: string;
}

/**
 * Entrega segura del enlace de la comunidad de Telegram.
 * NUNCA se expone en el HTML público plano del cliente (evita scrapers y spammers).
 * No restringe el acceso solo a certificados, pero advierte con claridad que
 * se reserva el derecho de admisión y que toda solicitud requiere aprobación de los administradores.
 */
export async function requestCommunityAdmission(): Promise<CommunityAdmissionResult> {
  const telegramUrl =
    process.env.TELEGRAM_COMMUNITY_URL ||
    "https://web.telegram.org/a/#-5157628559";

  return {
    success: true,
    inviteUrl: telegramUrl,
    admissionNotice:
      "Nos reservamos el derecho de admisión. Toda solicitud queda sujeta a revisión y aprobación por parte de los administradores del grupo.",
    crisisNotice:
      "Si en algún momento necesitas apoyo urgente o contención emocional, recuerda que la línea de prevención de salud mental *4141 (No estás solo/a) está disponible de manera gratuita y confidencial en Chile las 24 horas.",
    welcomeMessage:
      "Bienvenida/o a la comunidad sistémica de consteladores.cl. Este es un espacio de cuidado, escucha y respeto entre personas comprometidas con los órdenes del amor y la sanación familiar.",
  };
}
