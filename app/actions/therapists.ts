"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { FacilitatorProfile } from "@/lib/data/directory";

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

/**
 * Consulta dinámica a Supabase:
 * Obtiene únicamente a los facilitadores con status 'approved'.
 * Si no hay facilitadores aprobados aún, retorna un array vacío de forma segura.
 */
export async function getApprovedTherapists(): Promise<FacilitatorProfile[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Si no están configuradas las variables en tiempo de build o local, retornar vacío sin romper
      return [];
    }

    const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("constellation_therapists")
      .select(`
        id,
        user_id,
        headline,
        bio,
        approach,
        experience_years,
        price_clp,
        duration_minutes,
        certification_url,
        status,
        location,
        modalities,
        created_at,
        profiles:user_id (
          id,
          full_name,
          email,
          phone,
          avatar_url
        )
      `)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al consultar facilitadores aprobados en Supabase:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((item: any) => {
      const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
      const fullName = profile?.full_name || "Facilitador Certificado";
      const price = Number(item.price_clp) || 45000;
      const deposit = Math.round(price * 0.2);
      const balance = price - deposit;

      // Detección de especialidades por palabras clave
      const bioText = `${item.headline || ""} ${item.bio || ""}`.toLowerCase();
      const detectedSpecialties: string[] = [];
      if (bioText.includes("pareja") || bioText.includes("vínculo")) detectedSpecialties.push("pareja");
      if (bioText.includes("dinero") || bioText.includes("vocación") || bioText.includes("trabajo") || bioText.includes("éxito")) detectedSpecialties.push("dinero");
      if (bioText.includes("duelo") || bioText.includes("linaje") || bioText.includes("padre") || bioText.includes("madre") || bioText.includes("ancestro")) detectedSpecialties.push("ancestros");
      if (bioText.includes("síntoma") || bioText.includes("salud") || bioText.includes("cuerpo")) detectedSpecialties.push("sintomas");
      if (bioText.includes("organiza") || bioText.includes("empresa") || bioText.includes("equipo")) detectedSpecialties.push("organizacional");

      const specialties = detectedSpecialties.length > 0 ? detectedSpecialties : ["ancestros", "pareja"];

      const modalities = Array.isArray(item.modalities) && item.modalities.length > 0
        ? item.modalities.map((m: string) => {
            const low = m.toLowerCase();
            if (low.includes("online")) return "online";
            if (low.includes("presencial")) return "presencial";
            if (low.includes("taller") || low.includes("grupal")) return "taller_grupal";
            return "online";
          })
        : (["online"] as ("online" | "presencial" | "taller_grupal")[]);

      return {
        id: item.id,
        name: fullName,
        headline: item.headline || "Facilitador en Constelaciones Familiares",
        schoolAndYear: item.approach || "Escuela formativa acreditada",
        specialties,
        modalities,
        city: item.location || "Online en todo Chile",
        locationDetails: item.location || "Online vía Google Meet",
        totalPriceClp: price,
        depositPriceClp: deposit,
        balancePriceClp: balance,
        experienceYears: Number(item.experience_years) || 1,
        completedSessions: 0,
        rating: 5.0,
        reviewCount: 0,
        bio: item.bio || "Facilitador certificado en constelaciones familiares sistémicas.",
        approachDetails: item.approach || "Acompañamiento sistémico y fenomenológico.",
        nextAvailableDate: "Por coordinar en agenda",
        isValidated: true,
        reviews: [],
        upcomingWorkshops: [],
      };
    });
  } catch (err) {
    console.error("Error inesperado en getApprovedTherapists:", err);
    return [];
  }
}
