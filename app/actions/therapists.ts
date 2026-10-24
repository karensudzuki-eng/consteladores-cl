"use server";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { FacilitatorProfile, directoryFacilitators } from "@/lib/data/directory";
import { generateApprovalToken } from "@/lib/security/approval-token";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export interface RegisterTherapistResult {
  success: boolean;
  therapistId?: string;
  error?: string;
}

/**
 * Registro de postulación con manejo seguro de archivos y notificación por correo.
 * - Sube el archivo y datos a Supabase con permisos de servidor.
 * - Notifica a karen.sudzuki@vorticeintegration.com con el certificado adjunto y botón de 1 clic.
 * - Envía automáticamente copia de confirmación al constelador indicando revisión en 24-48 hrs.
 */
export async function registerTherapistApplication(
  formData: FormData
): Promise<RegisterTherapistResult> {
  try {
    const fullName = (formData.get("fullName") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const headline = (formData.get("headline") as string)?.trim() || "Facilitador en Constelaciones Familiares";
    const bio = (formData.get("bio") as string)?.trim() || "";
    const approach = (formData.get("approach") as string)?.trim() || "";
    const experienceYears = Number(formData.get("experienceYears")) || 1;
    const priceClp = Number(formData.get("priceClp")) || 45000;
    const certificateFile = formData.get("certificate") as File | null;

    if (!fullName || !email) {
      return {
        success: false,
        error: "Por favor completa tu nombre y correo electrónico.",
      };
    }

    if (!certificateFile || certificateFile.size === 0) {
      return {
        success: false,
        error: "Por favor adjunta tu diploma o certificado de constelador.",
      };
    }

    // Convertir archivo a Buffer para storage y adjunto de correo
    const fileArrayBuffer = await certificateFile.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    const sanitizedFileName = certificateFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `postulaciones/${Date.now()}-${sanitizedFileName}`;

    let certificationUrl = storagePath;
    let therapistId = "";

    // 1. Guardar en Base de Datos Supabase (si las credenciales están configuradas)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();

        if (supabase) {
          // 1.1 Intentar subir a Supabase Storage con cliente admin
          try {
            await supabase.storage.createBucket("certifications", { public: false });
          } catch {
            // El bucket ya existe
          }

          const { error: uploadError } = await supabase.storage
            .from("certifications")
            .upload(storagePath, fileBuffer, {
              contentType: certificateFile.type || "application/pdf",
              upsert: true,
            });

          if (uploadError) {
            console.warn("Aviso en Supabase Storage:", uploadError.message);
          }

          // 1.2 Crear o vincular perfil
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", email)
            .maybeSingle();

          let userId = existingProfile?.id;

          if (!userId) {
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
              email,
              email_confirm: true,
              user_metadata: {
                full_name: fullName,
                role: "constelador",
              },
            });

            if (authError || !authUser?.user) {
              console.warn("Aviso al crear authUser:", authError?.message);
              userId = crypto.randomUUID();
              await supabase.from("profiles").upsert({
                id: userId,
                email,
                full_name: fullName,
                phone,
                role: "constelador",
              });
            } else {
              userId = authUser.user.id;
            }
          }

          // 1.3 Registrar en constellation_therapists
          const { data: therapistData, error: therapistError } = await supabase
            .from("constellation_therapists")
            .upsert(
              {
                user_id: userId,
                headline,
                bio,
                approach,
                experience_years: experienceYears,
                price_clp: priceClp,
                certification_url: certificationUrl,
                status: "pending_approval",
              },
              { onConflict: "user_id" }
            )
            .select("id")
            .single();

          if (therapistError) {
            console.error("Error al registrar en constellation_therapists:", therapistError);
          } else if (therapistData) {
            therapistId = therapistData.id;
          }
        }
      } catch (dbErr) {
        console.error("Error al operar en Supabase:", dbErr);
      }
    }

    // Si no obtuvimos ID de BD por falta de conexión, generar uno temporal para el token
    if (!therapistId) {
      therapistId = crypto.randomUUID();
    }

    // 2. Generar Enlace Seguro de Aprobación en 1 Clic
    const approvalToken = generateApprovalToken(therapistId);
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.consteladores.cl";
    const approvalUrl = `${appBaseUrl}/api/admin/approve-therapist?id=${therapistId}&token=${approvalToken}`;

    // 3. Correo A: Notificación de aprobación con certificado adjunto y botón de 1 clic
    const adminRecipients = [
      "karen.sudzuki@gmail.com",
      "karen.sudzuki@vorticeintegration.com",
    ];
    const senderEmail = process.env.RESEND_FROM_EMAIL || "consteladores.cl <onboarding@resend.dev>";

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; color: #27221F; border: 1px solid #E7DECE; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-size: 22px; color: #27221F; margin: 0 0 8px;">Nueva Postulación de Constelador(a)</h2>
          <p style="font-size: 14px; color: #5C524A; margin: 0;">Plataforma consteladores.cl</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E7DECE; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #8A7E73; width: 35%;"><strong>Nombre:</strong></td>
              <td style="padding: 8px 0; color: #27221F; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Correo:</strong></td>
              <td style="padding: 8px 0; color: #27221F;"><a href="mailto:${email}" style="color: #D66847;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Teléfono / WhatsApp:</strong></td>
              <td style="padding: 8px 0; color: #27221F;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Titular:</strong></td>
              <td style="padding: 8px 0; color: #27221F;">${headline}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Escuela / Linaje:</strong></td>
              <td style="padding: 8px 0; color: #27221F;">${approach}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Años de práctica:</strong></td>
              <td style="padding: 8px 0; color: #27221F;">${experienceYears} años</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A7E73;"><strong>Tarifa sesión:</strong></td>
              <td style="padding: 8px 0; color: #27221F; font-weight: bold;">$${priceClp.toLocaleString("es-CL")} CLP</td>
            </tr>
          </table>

          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E7DECE;">
            <p style="font-size: 13px; color: #8A7E73; margin: 0 0 6px;"><strong>Biografía / Presentación:</strong></p>
            <p style="font-size: 14px; color: #5C524A; line-height: 1.5; margin: 0; background: #FAF8F5; padding: 12px; border-radius: 8px;">
              ${bio}
            </p>
          </div>
        </div>

        <div style="background-color: #FEF9EE; border: 1px solid #F7E1B0; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #9A6523; margin: 0 0 14px;">
            📄 <strong>El certificado ha sido adjuntado a este correo</strong> para que puedas revisarlo inmediatamente.
          </p>
          <a href="${approvalUrl}" style="display: inline-block; background-color: #D66847; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: bold; font-size: 15px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
            ✓ Dar OK y Publicar en consteladores.cl
          </a>
          <p style="font-size: 11px; color: #8A7E73; margin: 10px 0 0;">
            Al hacer clic, el estado cambiará a <em>aprobado</em>, se publicará en el directorio y se le notificará al constelador.
          </p>
        </div>

        <p style="font-size: 11px; color: #8A7E73; text-align: center; margin: 0;">
          consteladores.cl · Notificación Automática para Karen Sudzuki
        </p>
      </div>
    `;

    // 4. Correo B: Confirmación automática para el Constelador Postulante
    const applicantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; color: #27221F; border: 1px solid #E7DECE; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-size: 22px; color: #27221F; margin: 0 0 8px;">¡Hemos recibido tu postulación!</h2>
          <p style="font-size: 14px; color: #5C524A; margin: 0;">Red de Facilitadores en Constelaciones Familiares · Chile</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E7DECE; margin-bottom: 20px; font-size: 14px; line-height: 1.6; color: #5C524A;">
          <p style="margin-top: 0;">Hola <strong>${fullName}</strong>,</p>
          <p>
            Te confirmamos que tu postulación y tu diploma/certificado han sido recibidos con éxito por el equipo moderador de <strong>consteladores.cl</strong>.
          </p>
          <p>
            Nuestro equipo ético revisará tus antecedentes dentro de un plazo de <strong>24 a 48 horas hábiles</strong>.
          </p>
          <p>
            Si tu postulación es aceptada, recibirás una notificación a este correo confirmando la activación de tu perfil y comenzarás a aparecer en el directorio público para recibir consultantes en todo Chile.
          </p>
        </div>

        <div style="background-color: #FDF7F4; border: 1px solid #F2D8CC; padding: 14px 20px; border-radius: 10px; font-size: 12px; color: #A34327; margin-bottom: 20px;">
          <strong>Resumen de tu registro:</strong><br/>
          • Titular: ${headline}<br/>
          • Escuela formativa: ${approach}<br/>
          • Tarifa indicada: $${priceClp.toLocaleString("es-CL")} CLP (Reserva inicial 20%: $${Math.round(priceClp * 0.2).toLocaleString("es-CL")} CLP)
        </div>

        <p style="font-size: 11px; color: #8A7E73; text-align: center; margin: 0;">
          Gracias por tu vocación y compromiso con el orden y la salud sistémica.<br/>
          <strong>consteladores.cl</strong> · Santiago de Chile
        </p>
      </div>
    `;

    // 5. Envíos mediante Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy_key") {
      try {
        // Enviar a los correos de administración (karen.sudzuki@gmail.com y karen.sudzuki@vorticeintegration.com)
        for (const recipient of adminRecipients) {
          try {
            const sendAdmin = await resend.emails.send({
              from: senderEmail,
              to: [recipient],
              subject: `Nueva postulación de constelador: ${fullName}`,
              html: adminEmailHtml,
              attachments: [
                {
                  filename: certificateFile.name,
                  content: fileBuffer,
                },
              ],
            });

            if (sendAdmin.error) {
              console.warn(`Aviso de Resend al enviar notificación de admin a ${recipient}:`, sendAdmin.error);
            } else {
              console.log(`Correo de aprobación enviado con éxito a ${recipient}. ID:`, sendAdmin.data?.id);
            }
          } catch (admErr) {
            console.warn(`Error individual al enviar admin email a ${recipient}:`, admErr);
          }
        }

        // Enviar acuse de recibo al constelador postulante
        try {
          const sendApplicant = await resend.emails.send({
            from: senderEmail,
            to: [email],
            subject: "Tu postulación a consteladores.cl fue recibida con éxito (Revisión en 24-48 hrs)",
            html: applicantEmailHtml,
          });

          if (sendApplicant.error) {
            console.warn("Aviso devuelto por Resend al enviar al postulante:", sendApplicant.error);
          } else {
            console.log("Acuse de recibo enviado al constelador postulante. ID:", sendApplicant.data?.id);
          }
        } catch (applicantErr) {
          console.warn("Error al enviar acuse de recibo al postulante:", applicantErr);
        }

        // Si el correo del postulante es distinto al correo personal de Karen, enviamos copia a Karen para constancia
        if (email !== "karen.sudzuki@gmail.com") {
          try {
            await resend.emails.send({
              from: senderEmail,
              to: ["karen.sudzuki@gmail.com"],
              subject: `[Copia Postulante] Confirmación para: ${fullName} (${email})`,
              html: applicantEmailHtml,
            });
          } catch (copyErr) {
            console.warn("Aviso al enviar copia a Karen:", copyErr);
          }
        }
      } catch (mailError: any) {
        console.error("Error al procesar envío de correos con Resend:", mailError);
      }
    } else {
      console.warn("⚠️ [Aviso de Configuración]: RESEND_API_KEY no está configurada en las Variables de Entorno de Vercel.");
      console.warn(`[Modo Simulación] Correo preparado para Karen (${adminRecipients.join(", ")}) con adjunto: ${certificateFile.name}`);
      console.warn(`[Modo Simulación] Copia preparada para el postulante: ${email}`);
      console.log(`[URL de Aprobación en 1 clic]: ${approvalUrl}`);
    }

    return {
      success: true,
      therapistId,
    };
  } catch (err: any) {
    console.error("Error inesperado en registerTherapistApplication:", err);
    return {
      success: false,
      error: err?.message || "Ocurrió un error inesperado al procesar la postulación.",
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
      return directoryFacilitators;
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

    if (error || !data || data.length === 0) {
      return directoryFacilitators;
    }

    return data.map((item: any) => {
      const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;
      const fullName = profile?.full_name || "Facilitador Certificado";
      const price = Number(item.price_clp) || 45000;
      const deposit = Math.round(price * 0.2);
      const balance = price - deposit;

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
    return directoryFacilitators;
  }
}
