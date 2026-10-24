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
    if (!input.clientName || !input.clientEmail) {
      return {
        success: false,
        error: "Por favor completa tu nombre y correo electrónico.",
      };
    }

    let therapistName = "Facilitador Certificado de la Red";
    let therapistEmail = "contacto@consteladores.cl";
    let durationMinutes = 75;
    const appointmentDate = new Date(input.scheduledAt);

    // Formatear la fecha en español de forma acogedora
    const formattedDate = !isNaN(appointmentDate.getTime())
      ? new Intl.DateTimeFormat("es-CL", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: "America/Santiago",
        }).format(appointmentDate)
      : "Fecha por coordinar";

    // 1. Obtener los datos del terapeuta si Supabase está activo
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data: therapist } = await supabase
          .from("constellation_therapists")
          .select("*, profiles:user_id(full_name, email)")
          .eq("id", input.therapistId)
          .maybeSingle();

        if (therapist?.profiles?.full_name) {
          therapistName = therapist.profiles.full_name;
          therapistEmail = therapist.profiles.email || therapistEmail;
        }
        if (therapist?.duration_minutes) {
          durationMinutes = therapist.duration_minutes;
        }
      } catch (dbErr) {
        console.warn("Aviso al consultar terapeuta en Supabase:", dbErr);
      }
    }

    // 2. Generar el enlace de Google Meet
    let meetLink = "https://meet.google.com/cst-safe-room";
    try {
      meetLink = await createGoogleMeetLink({
        summary: `Constelación Familiar: ${input.clientName} con ${therapistName}`,
        description: `Espacio de encuentro facilitado por ${therapistName}.\nMotivo traído: ${input.consultationMotive || "Por conversar en el encuentro"}.\nOrganizado a través de consteladores.cl`,
        startTime: !isNaN(appointmentDate.getTime()) ? appointmentDate : new Date(Date.now() + 86400000 * 2),
        durationMinutes,
        attendeeEmail: input.clientEmail,
      });
    } catch (meetErr) {
      console.warn("Aviso al generar enlace de Meet:", meetErr);
    }

    let appointmentId = crypto.randomUUID();

    // 3. Crear el registro en Supabase si está disponible
    if (supabase) {
      try {
        const { data: newAppointment, error: insertError } = await supabase
          .from("appointments")
          .insert({
            therapist_id: input.therapistId,
            client_name: input.clientName,
            client_email: input.clientEmail,
            client_phone: input.clientPhone,
            scheduled_at: input.scheduledAt,
            status: "pending",
            meet_link: meetLink,
            payment_id: input.paymentId || "abono_20_pendiente",
            amount_paid_clp: input.amountPaidClp || 0,
            consultation_motive: input.consultationMotive,
          })
          .select("id")
          .single();

        if (!insertError && newAppointment?.id) {
          appointmentId = newAppointment.id;
        }
      } catch (insertErr) {
        console.warn("Aviso al insertar cita en Supabase:", insertErr);
      }
    }

    // 4. Enviar correos de notificación mediante Resend
    const adminRecipients = [
      "karen.sudzuki@gmail.com",
      "karen.sudzuki@vorticeintegration.com",
      "contacto@vorticeintegration.com",
    ];
    const senderEmail = process.env.RESEND_FROM_EMAIL || "consteladores.cl <onboarding@resend.dev>";

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy_key") {
      try {
        // Correo 1: Notificación directa a Karen (administradora/soporte) para seguimiento de comisión y cita
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; color: #27221F; border: 1px solid #E7DECE; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="font-size: 22px; color: #27221F; margin: 0 0 8px;">🔔 Nueva Solicitud de Cita en consteladores.cl</h2>
              <p style="font-size: 14px; color: #5C524A; margin: 0;">Abono de Reserva (20% - $9.000 CLP) Pendiente de Validación</p>
            </div>

            <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E7DECE; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73; width: 35%;"><strong>Consultante:</strong></td>
                  <td style="padding: 8px 0; color: #27221F; font-weight: bold;">${input.clientName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>Correo:</strong></td>
                  <td style="padding: 8px 0; color: #27221F;"><a href="mailto:${input.clientEmail}" style="color: #D66847;">${input.clientEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>WhatsApp / Tel:</strong></td>
                  <td style="padding: 8px 0; color: #27221F;"><a href="https://wa.me/${(input.clientPhone || '').replace(/[^0-9]/g, '')}" target="_blank" style="color: #128C7E; font-weight: bold;">${input.clientPhone || 'No indicado'} (Abrir WhatsApp)</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>Fecha propuesta:</strong></td>
                  <td style="padding: 8px 0; color: #27221F; font-weight: bold;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>Facilitador(a):</strong></td>
                  <td style="padding: 8px 0; color: #27221F;">${therapistName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>Abono 20% (Plataforma):</strong></td>
                  <td style="padding: 8px 0; color: #166534; font-weight: bold;">$${(input.amountPaidClp || 9000).toLocaleString("es-CL")} CLP (Pendiente de pago/conciliación)</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8A7E73;"><strong>Saldo al constelador (80%):</strong></td>
                  <td style="padding: 8px 0; color: #27221F;">$36.000 CLP (Vía transferencia con voucher)</td>
                </tr>
              </table>

              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E7DECE;">
                <p style="font-size: 13px; color: #8A7E73; margin: 0 0 6px;"><strong>Motivo o inquietud traída por el consultante:</strong></p>
                <p style="font-size: 14px; color: #5C524A; line-height: 1.5; margin: 0; background: #FAF8F5; padding: 12px; border-radius: 8px;">
                  ${input.consultationMotive || "Sin detalle adicional"}
                </p>
              </div>

              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E7DECE;">
                <p style="font-size: 13px; color: #8A7E73; margin: 0 0 6px;"><strong>Sala de Google Meet pre-generada para este encuentro:</strong></p>
                <a href="${meetLink}" style="color: #D66847; font-size: 14px; word-break: break-all;">${meetLink}</a>
                <p style="font-size: 11px; color: #8A7E73; margin: 4px 0 0;">
                  (Por seguridad, este enlace NO fue expuesto al consultante en la web y solo se validará al confirmar su abono de $9.000 CLP).
                </p>
              </div>
            </div>

            <p style="font-size: 11px; color: #8A7E73; text-align: center; margin: 0;">
              consteladores.cl · Notificación Automática de Citas y Comisión
            </p>
          </div>
        `;

        for (const recipient of adminRecipients) {
          try {
            await resend.emails.send({
              from: senderEmail,
              to: [recipient],
              subject: `🔔 Nueva solicitud de cita de ${input.clientName} (Pendiente Abono 20%)`,
              html: adminEmailHtml,
            });
          } catch (admErr) {
            console.warn(`Aviso de Resend al enviar cita a ${recipient}:`, admErr);
          }
        }

        // Correo 2: Notificación para el consultante con instrucciones de abono 20%
        try {
          await resend.emails.send({
            from: senderEmail,
            to: [input.clientEmail],
            subject: `Tu espacio está pre-agendado: completa el abono del 20% para confirmar con ${therapistName}`,
            react: AppointmentConfirmationEmail({
              clientName: input.clientName,
              therapistName: therapistName,
              scheduledDate: formattedDate,
              meetLink: meetLink,
              isConfirmed: false,
            }),
          });
        } catch (clientErr) {
          console.warn("Aviso al notificar al cliente:", clientErr);
        }

        // Si el correo del consultante es distinto a Karen, enviar copia de respaldo a Karen
        if (input.clientEmail !== "karen.sudzuki@gmail.com") {
          try {
            await resend.emails.send({
              from: senderEmail,
              to: ["karen.sudzuki@gmail.com"],
              subject: `[Copia Consultante] Pre-reserva para ${input.clientName} (${input.clientEmail})`,
              react: AppointmentConfirmationEmail({
                clientName: input.clientName,
                therapistName: therapistName,
                scheduledDate: formattedDate,
                meetLink: meetLink,
                isConfirmed: false,
              }),
            });
          } catch (copyErr) {
            console.warn("Aviso al enviar copia de consultante:", copyErr);
          }
        }

        // Correo 3: Notificación al constelador facilitador con los datos del consultante y la sala Meet
        if (therapistEmail && therapistEmail !== "contacto@consteladores.cl" && therapistEmail !== input.clientEmail) {
          const therapistEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; color: #27221F; border: 1px solid #E7DECE; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="font-size: 22px; color: #27221F; margin: 0 0 8px;">🗓️ Nueva Solicitud de Cita</h2>
                <p style="font-size: 14px; color: #5C524A; margin: 0;">Plataforma consteladores.cl</p>
              </div>

              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E7DECE; margin-bottom: 20px; font-size: 14px; line-height: 1.6; color: #5C524A;">
                <p>Hola <strong>${therapistName}</strong>,</p>
                <p>Se ha pre-agendado una sesión de constelación familiar. El consultante ha sido derivado a completar el abono del 20% de plataforma. Te compartimos los detalles para tu preparación:</p>
                
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
                  <tr><td style="padding: 6px 0; color: #8A7E73;"><strong>Consultante:</strong></td><td>${input.clientName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8A7E73;"><strong>Correo:</strong></td><td>${input.clientEmail}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8A7E73;"><strong>WhatsApp:</strong></td><td>${input.clientPhone || 'No indicado'}</td></tr>
                  <tr><td style="padding: 6px 0; color: #8A7E73;"><strong>Fecha y Hora:</strong></td><td><strong>${formattedDate}</strong></td></tr>
                  <tr><td style="padding: 6px 0; color: #8A7E73;"><strong>Saldo a recibir (80%):</strong></td><td>$36.000 CLP (Directo a tu cuenta mediante voucher)</td></tr>
                </table>

                <div style="background-color: #FAF8F5; padding: 12px; border-radius: 8px; margin: 12px 0;">
                  <strong>Motivo de consulta:</strong><br/>
                  ${input.consultationMotive || "Por conversar en el encuentro"}
                </div>

                <div style="text-align: center; margin: 20px 0;">
                  <a href="${meetLink}" style="display: inline-block; background-color: #1a73e8; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-weight: bold; font-size: 14px;">
                    Abrir Sala en Google Meet
                  </a>
                </div>
              </div>
            </div>
          `;

          try {
            await resend.emails.send({
              from: senderEmail,
              to: [therapistEmail],
              subject: `🗓️ Nueva cita asignada con ${input.clientName} (${formattedDate})`,
              html: therapistEmailHtml,
            });
          } catch (tErr) {
            console.warn("Aviso al notificar al terapeuta:", tErr);
          }
        }
      } catch (emailError) {
        console.error("Error al despachar correos con Resend:", emailError);
      }
    } else {
      console.log(`ℹ️ [Modo Simulación] Solicitud recibida de ${input.clientName} (${input.clientEmail}). Tel: ${input.clientPhone}`);
    }

    return {
      success: true,
      appointmentId,
      meetLink,
    };
  } catch (err: any) {
    console.error("Error inesperado en bookAndConfirmAppointment:", err);
    return {
      success: false,
      error: err?.message || "Ocurrió un error inesperado al procesar tu solicitud.",
    };
  }
}
