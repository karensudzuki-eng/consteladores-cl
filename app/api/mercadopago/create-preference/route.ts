import { NextRequest, NextResponse } from "next/server";
import { createBookingPaymentPreference } from "@/lib/mercadopago";
import fs from "fs/promises";
import path from "path";

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

    // 1. Revisar si hay un Link de Cobro de Mercado Pago configurado en CMS o variables de entorno
    let paymentLink = process.env.MP_PAYMENT_LINK;
    if (!paymentLink) {
      try {
        const filePath = path.join(process.cwd(), "data", "cms-content.json");
        const contentRaw = await fs.readFile(filePath, "utf-8");
        const parsed = JSON.parse(contentRaw);
        paymentLink = parsed?.settings?.mercadopagoPaymentLink;
      } catch (e) {
        // Ignorar si no se puede leer el archivo
      }
    }

    if (paymentLink && paymentLink.trim().startsWith("http")) {
      return NextResponse.json({
        success: true,
        preferenceId: `link_${Date.now()}`,
        checkoutUrl: paymentLink.trim(),
        mode: "payment_link",
      });
    }

    // 2. Si hay un token API real de Mercado Pago configurado en .env.local
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

      if (result.success && (result.initPoint || result.sandboxInitPoint)) {
        return NextResponse.json({
          success: true,
          preferenceId: result.preferenceId,
          checkoutUrl: result.initPoint || result.sandboxInitPoint,
          mode: "mercadopago_live",
        });
      }
    }

    // 3. Si no hay credenciales de pago online configuradas aún:
    return NextResponse.json(
      {
        error:
          "La pasarela de pago en línea está en proceso de activación. Por favor selecciona la opción 'Pagar con Transferencia Bancaria' para asegurar tu hora.",
      },
      { status: 422 }
    );
  } catch (error: any) {
    console.error("Error en API create-preference:", error);
    return NextResponse.json(
      { error: error?.message || "Error interno al procesar el pago" },
      { status: 500 }
    );
  }
}
