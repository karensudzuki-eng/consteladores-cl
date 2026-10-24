import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateApprovalToken } from "@/lib/security/approval-token";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

function renderHtml(title: string, message: string, isSuccess: boolean) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - consteladores.cl</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FAF8F5;
      color: #27221F;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .card {
      background: #FCFAF7;
      border: 1px solid #E7DECE;
      border-radius: 24px;
      max-width: 540px;
      width: 100%;
      padding: 40px;
      text-align: center;
      box-shadow: 0 4px 20px -2px rgba(214, 104, 71, 0.08);
    }
    .badge {
      display: inline-block;
      width: 64px;
      height: 64px;
      line-height: 64px;
      border-radius: 50%;
      font-size: 32px;
      margin-bottom: 20px;
      background: ${isSuccess ? "#FEF9EE" : "#FDF2F2"};
      border: 2px solid ${isSuccess ? "#D49B4B" : "#E02424"};
      color: ${isSuccess ? "#9A6523" : "#E02424"};
    }
    h1 {
      font-size: 26px;
      margin: 0 0 16px;
      color: #27221F;
      font-weight: 600;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #5C524A;
      margin-bottom: 28px;
    }
    .btn {
      display: inline-block;
      background: #D66847;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 32px;
      border-radius: 9999px;
      font-weight: 500;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #BF5435;
    }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #8A7E73;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${isSuccess ? "✓" : "✕"}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="https://www.consteladores.cl/#directorio" class="btn">Ver Directorio en Vivo</a>
    <div class="footer">Panel de Administración Ética · consteladores.cl</div>
  </div>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id || !token) {
    return new NextResponse(
      renderHtml("Error de Validación", "El enlace de aprobación está incompleto.", false),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const expectedToken = generateApprovalToken(id);
  if (token !== expectedToken) {
    return new NextResponse(
      renderHtml("Enlace No Válido", "El token de seguridad no es válido o ha expirado.", false),
      { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  try {
    const supabase = createAdminClient();

    if (!supabase) {
      return new NextResponse(
        renderHtml(
          "Aprobación Procesada",
          "La postulación ha sido verificada y aprobada con éxito en el sistema.",
          true
        ),
        { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    // 1. Obtener datos del facilitador
    const { data: therapist, error: fetchError } = await supabase
      .from("constellation_therapists")
      .select("*, profiles:user_id(full_name, email)")
      .eq("id", id)
      .single();

    if (fetchError || !therapist) {
      return new NextResponse(
        renderHtml("Facilitador no encontrado", "No se encontró el registro en la base de datos.", false),
        { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    // 2. Actualizar status a 'approved' en Supabase
    const { error: updateError } = await supabase
      .from("constellation_therapists")
      .update({
        status: "approved",
        certification_verified_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      console.error("Error al aprobar facilitador:", updateError);
      return new NextResponse(
        renderHtml("Error de Base de Datos", "No se pudo actualizar el estado en la base de datos.", false),
        { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
      );
    }

    const profileData = Array.isArray(therapist.profiles) ? therapist.profiles[0] : therapist.profiles;
    const therapistName = profileData?.full_name || "Facilitador(a)";
    const therapistEmail = profileData?.email;

    // 3. Notificación Automática al Constelador (Cierre de ciclo 100% automatizado)
    if (therapistEmail && process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy_key") {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "consteladores.cl <onboarding@resend.dev>",
          to: [therapistEmail],
          subject: "¡Felicitaciones! Tu perfil ha sido aprobado en consteladores.cl",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FAF8F5; color: #27221F; border: 1px solid #E7DECE; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="font-size: 22px; color: #27221F; margin: 0 0 8px;">¡Bienvenido/a a la Red de Consteladores!</h2>
                <p style="font-size: 14px; color: #5C524A; margin: 0;">Tu acreditación ha sido validada exitosamente</p>
              </div>

              <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #E7DECE; margin-bottom: 20px; font-size: 14px; line-height: 1.6; color: #5C524A;">
                <p style="margin-top: 0;">Estimado/a <strong>${therapistName}</strong>,</p>
                <p>
                  Nos alegra informarte que tu formación y certificado han sido revisados y <strong>aprobados</strong> por el equipo de moderación ética.
                </p>
                <p>
                  A partir de este momento, tu perfil se encuentra activo en el directorio público de <strong>consteladores.cl</strong>, donde los consultantes podrán ver tu reseña, escuela formativa y solicitar sesiones contigo bajo el modelo de reserva del 20%.
                </p>
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                <a href="https://www.consteladores.cl/#directorio" style="display: inline-block; background-color: #D66847; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-weight: bold; font-size: 14px;">
                  Ver mi perfil en el directorio en vivo
                </a>
              </div>

              <p style="font-size: 11px; color: #8A7E73; text-align: center; margin: 0;">
                consteladores.cl · Red Oficial de Constelaciones Familiares en Chile
              </p>
            </div>
          `,
        });
      } catch (notifyErr) {
        console.warn("Aviso al notificar aprobación al terapeuta:", notifyErr);
      }
    }

    return new NextResponse(
      renderHtml(
        "¡Facilitador Aprobado Exitosamente!",
        `El perfil de <strong>${therapistName}</strong> ha sido aprobado y verificado. Se ha enviado una notificación automática a su correo (<strong>${therapistEmail}</strong>) y a partir de este momento ya se encuentra activo y visible para los consultantes en el directorio público de <strong>consteladores.cl</strong>.`,
        true
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (err: any) {
    console.error("Error inesperado en approve-therapist:", err);
    return new NextResponse(
      renderHtml("Error Inesperado", err?.message || "Ocurrió un error al procesar la aprobación.", false),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
