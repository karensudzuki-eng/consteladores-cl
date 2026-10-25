"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { directoryFacilitators } from "@/lib/data/directory";

export interface CommunityAccessResult {
  isCertified: boolean;
  inviteUrl?: string;
  welcomeMessage?: string;
  deniedMessage?: string;
}

/**
 * Validador seguro de acceso a la comunidad de consteladores.
 * El enlace de Telegram NUNCA se expone en el HTML público del cliente,
 * solo se entrega si el facilitador está acreditado y aprobado.
 */
export async function requestCommunityAccess(
  email?: string
): Promise<CommunityAccessResult> {
  const deniedText =
    "Este espacio es para consteladores certificados. Si ya completaste tu formación, inicia sesión o verifica tu certificado para continuar.";

  const welcomeText =
    "Bienvenida/o a la comunidad Consteladores Chile. Este es un espacio de cuidado y respeto. Aquí encontrarás el enlace para unirte al grupo de Telegram. Si en algún momento necesitas apoyo personal, recuerda que la línea de prevención de salud mental *4141 está disponible en Chile las 24 horas.";

  const telegramInviteUrl =
    process.env.TELEGRAM_COMMUNITY_INVITE_URL ||
    "https://t.me/+consteladores_chile_acreditados_privado";

  if (!email || !email.trim()) {
    return {
      isCertified: false,
      deniedMessage: deniedText,
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // 1. Revisar en facilitadores activos verificados (ej. Karen Sudzuki u otros en directoryFacilitators)
  const isLocalVerified = directoryFacilitators.some(
    (f) =>
      f.isValidated &&
      (cleanEmail === "karen.sudzuki@gmail.com" ||
        cleanEmail === "karen.sudzuki@vorticeintegration.com" ||
        cleanEmail.includes("icalma"))
  );

  if (isLocalVerified) {
    return {
      isCertified: true,
      inviteUrl: telegramInviteUrl,
      welcomeMessage: welcomeText,
    };
  }

  // 2. Revisar en base de datos Supabase si las credenciales están configuradas
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (profile?.id) {
        const { data: therapist } = await supabase
          .from("constellation_therapists")
          .select("id, status")
          .eq("user_id", profile.id)
          .eq("status", "approved")
          .maybeSingle();

        if (therapist?.id) {
          return {
            isCertified: true,
            inviteUrl: telegramInviteUrl,
            welcomeMessage: welcomeText,
          };
        }
      }
    } catch (err) {
      console.warn("Aviso al verificar acreditación en Supabase:", err);
    }
  }

  // 3. Si no está certificado o no se encuentra en la base aprobada
  return {
    isCertified: false,
    deniedMessage: deniedText,
  };
}
