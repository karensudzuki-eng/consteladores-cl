import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";
import { bookAndConfirmAppointment } from "@/app/actions/appointments";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("data.id") || url.searchParams.get("id");

    // Mercado Pago envía notificaciones por 'payment'
    if (topic === "payment" && id && !id.startsWith("demo_")) {
      try {
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id });

        if (paymentData.status === "approved") {
          const metadata = paymentData.metadata || {};

          // Confirmar automáticamente la cita en base de datos y enviar emails
          await bookAndConfirmAppointment({
            therapistId: metadata.therapist_id || "karen-sudzuki-icalma",
            clientName: metadata.client_name || "Consultante",
            clientEmail: metadata.client_email,
            clientPhone: metadata.client_phone,
            scheduledAt: metadata.scheduled_at,
            consultationMotive: metadata.motive || "Sesión Individual con Pago Online Aprobado",
            paymentId: String(id),
            amountPaidClp: paymentData.transaction_amount || 40000,
          });
        }
      } catch (mpErr) {
        console.warn("Aviso procesando pago en webhook:", mpErr);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error en Webhook Mercado Pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
