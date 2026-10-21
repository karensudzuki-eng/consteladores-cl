"use server";

import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { createGoogleMeetLink } from "@/lib/google-meet";
import { AppointmentConfirmationEmail } from "@/components/emails/AppointmentConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export interface BookAppointmentInput {
  therapistId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  scheduledAt: string; // ISO String
  consultationMotive?: string;
  paymentId?: string;
  amountPaidClp?: number;
}

export interface BookAppointmentResult {
  success: boolean;
  appointmentId?: string;
  meetLink?: string;
  error?: string;
}

export async function bookAndConfirmAppointment(
  input: BookAppointmentInput
): Promise<BookAppointmentResult> {
  try {
    const supabase = createAdminClient();

    // 1. Obtener los datos del terapeuta y su perfil
    const { data: therapist, error: therapistError } = await supabase
      .from("constellation_therapists")
      .select("*, profiles:user_id(full_name, email)")
      .eq("id", input.therapistId)
      .eq("status", "approved")
      .single();

    if (therapistError || !therapist) {
      return {
        success: false,
        error: "El facilitador seleccionado no se encuentra disponible o aún está en proceso de acreditación.",
      };
    }

    const therapistName = therapist.profiles?.full_name || "Facilitador de consteladores.cl";
    const appointmentDate = new Date(input.scheduledAt);

    // Formatear la fecha en español de forma acogedora
    const formattedDate = new Intl.DateTimeFormat("es-CL", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Santiago",
    }).format(appointmentDate);

    // 2. Generar el enlace de Google Meet
    const meetLink = await createGoogleMeetLink({
      summary: `Constelación Familiar: ${input.clientName} con ${therapistName}`,
      description: `Espacio de encuentro facilitado por ${therapistName}.\nMotivo traído: ${input.consultationMotive || "Por conversar en el encuentro"}.\nOrganizado a través de consteladores.cl`,
      startTime: appointmentDate,
      durationMinutes: therapist.duration_minutes || 75,
      attendeeEmail: input.clientEmail,
    });

    // 3. Crear el registro en Supabase
    const { data: newAppointment, error: insertError } = await supabase
      .from("appointments")
      .insert({
        therapist_id: input.therapistId,
        client_name: input.clientName,
        client_email: input.clientEmail,
        client_phone: input.clientPhone,
        scheduled_at: input.scheduledAt,
        status: "confirmed",
        meet_link: meetLink,
        payment_id: input.paymentId || "simulated_or_confirmed_payment",
        amount_paid_clp: input.amountPaidClp || therapist.price_clp,
        consultation_motive: input.consultationMotive,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error al registrar cita en Supabase:", insertError);
      return {
        success: false,
        error: "No pudimos guardar la reserva en este instante. Por favor intenta nuevamente.",
      };
    }

    // 4. Enviar correo cálido de confirmación vía Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "encuentros@consteladores.cl",
          to: [input.clientEmail],
          bcc: [therapist.profiles?.email || "contacto@consteladores.cl"],
          subject: `Tu espacio está listo: constelación familiar con ${therapistName}`,
          react: AppointmentConfirmationEmail({
            clientName: input.clientName,
            therapistName: therapistName,
            scheduledDate: formattedDate,
            meetLink: meetLink,
          }),
        });
      } catch (emailError) {
        console.error("Error al despachar el correo con Resend:", emailError);
        // No bloqueamos la confirmación si solo falló el email momentáneamente
      }
    } else {
      console.log("ℹ️ [Resend] Omitido: RESEND_API_KEY no configurada aún.");
    }

    return {
      success: true,
      appointmentId: newAppointment.id,
      meetLink,
    };
  } catch (err: any) {
    console.error("Error inesperado en bookAndConfirmAppointment:", err);
    return {
      success: false,
      error: err?.message || "Ocurrió un error inesperado al procesar tu espacio.",
    };
  }
}
