import { NextRequest, NextResponse } from "next/server";
import { createBookingPaymentPreference } from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      scheduledAt,
      therapistId = "karen-sudzuki-icalma",
      consultationMotive = "Sesión Individual de Constelaciones Familiares",
      amountPaidClp = 40000,
    } = body;

    if (!clientName || !clientEmail || !scheduledAt) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para la reserva" },
        { status: 400 }
      );
    }

    const origin = req.nextUrl.origin;

    // Si hay un token real de Mercado Pago configurado, creamos la preferencia oficial
    if (
      process.env.MP_ACCESS_TOKEN &&
      !process.env.MP_ACCESS_TOKEN.startsWith("TEST-000000")
    ) {
      const result = await createBookingPaymentPreference({
        title: "Sesión Individual - Constelaciones Familiares",
        unitPrice: amountPaidClp,
        clientName,
        clientEmail,
        clientPhone,
        scheduledAt,
        therapistId,
        consultationMotive,
        originUrl: origin,
      });

      if (result.success) {
        return NextResponse.json({
          success: true,
          preferenceId: result.preferenceId,
          // En modo test usamos sandboxInitPoint si está disponible
          checkoutUrl: result.sandboxInitPoint || result.initPoint,
          mode: "mercadopago_live",
        });
      }
    }

    // Modo Demostración / Simulación de Pasarela
    // Esto permite probar el flujo completo de pago, redirección y confirmación
    // sin requerir credenciales reales inmediatamente (ideal para la demo de Start-Up Chile).
    const simulatedSuccessUrl = `${origin}/confirmacion?status=approved&collection_id=demo_${Date.now()}&preference_id=pref_demo&payment_id=pay_${Date.now()}&clientName=${encodeURIComponent(
      clientName
    )}&clientEmail=${encodeURIComponent(
      clientEmail
    )}&scheduledAt=${encodeURIComponent(scheduledAt)}`;

    return NextResponse.json({
      success: true,
      preferenceId: `demo_pref_${Date.now()}`,
      checkoutUrl: simulatedSuccessUrl,
      mode: "simulation",
      message:
        "Modo de prueba activo. Puedes agregar tu MP_ACCESS_TOKEN en .env.local para procesar pagos reales.",
    });
  } catch (error: any) {
    console.error("Error en API create-preference:", error);
    return NextResponse.json(
      { error: error?.message || "Error interno al procesar el pago" },
      { status: 500 }
    );
  }
}
