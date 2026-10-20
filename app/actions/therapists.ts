"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export interface RegisterTherapistInput {
  email: string;
  fullName: string;
  phone?: string;
  headline: string;
  bio: string;
  approach: string;
  experienceYears: number;
  priceClp: number;
  certificationUrl: string; // URL en Supabase Storage
}

export interface RegisterTherapistResult {
  success: boolean;
  therapistId?: string;
  error?: string;
}

export async function registerTherapistApplication(
  input: RegisterTherapistInput
): Promise<RegisterTherapistResult> {
  try {
    const supabase = createAdminClient();

    // 1. Crear el usuario en auth si no existe, o vincular su perfil
    // Para el registro inicial, creamos un perfil o verificamos si ya existe
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", input.email)
      .maybeSingle();

    let userId = existingProfile?.id;

    if (!userId) {
      // Creamos un usuario de Supabase Auth con rol 'constelador'
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: input.email,
        email_confirm: true,
        user_metadata: {
          full_name: input.fullName,
          role: "constelador",
        },
      });

      if (authError || !authUser.user) {
        return {
          success: false,
          error: "No se pudo registrar la cuenta. Verifica que el correo sea válido.",
        };
      }
      userId = authUser.user.id;
    } else {
      // Si ya existía, nos aseguramos de que su rol sea constelador
      await supabase
        .from("profiles")
        .update({ role: "constelador", full_name: input.fullName, phone: input.phone })
        .eq("id", userId);
    }

    // 2. Registrar en constellation_therapists con status 'pending_approval'
    const { data: therapist, error: therapistError } = await supabase
      .from("constellation_therapists")
      .upsert(
        {
          user_id: userId,
          headline: input.headline,
          bio: input.bio,
          approach: input.approach,
          experience_years: input.experienceYears,
          price_clp: input.priceClp,
          certification_url: input.certificationUrl,
          status: "pending_approval", // Obligatoriamente pendiente hasta revisión del admin
        },
        { onConflict: "user_id" }
      )
      .select("id")
      .single();

    if (therapistError) {
      console.error("Error al registrar constelador:", therapistError);
      return {
        success: false,
        error: "Ocurrió un error al guardar la postulación. Por favor intenta de nuevo.",
      };
    }

    return {
      success: true,
      therapistId: therapist.id,
    };
  } catch (err: any) {
    console.error("Error inesperado en registerTherapistApplication:", err);
    return {
      success: false,
      error: err?.message || "Error inesperado al procesar la postulación.",
    };
  }
}
