import { MercadoPagoConfig, Preference } from "mercadopago";

// Inicializamos el cliente oficial de Mercado Pago
// Si no hay token en .env.local, usamos un fallback de desarrollo seguro para pruebas
const mpAccessToken =
  process.env.MP_ACCESS_TOKEN ||
  "TEST-0000000000000000-000000-00000000000000000000000000000000-000000000";

export const mpClient = new MercadoPagoConfig({
  accessToken: mpAccessToken,
  options: { timeout: 7000 },
});

export interface CreateBookingPreferenceParams {
  title: string;
  unitPrice: number;
  quantity?: number;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  scheduledAt: string;
  therapistId: string;
  consultationMotive?: string;
  originUrl?: string;
}

export async function createBookingPaymentPreference(
  params: CreateBookingPreferenceParams
) {
  try {
    const preference = new Preference(mpClient);

    const baseUrl =
      params.originUrl ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const response = await preference.create({
      body: {
        items: [
          {
            id: `session-${params.therapistId}`,
            title: params.title,
            description: `Reserva para ${params.clientName} (${params.scheduledAt})`,
            quantity: params.quantity || 1,
            unit_price: Number(params.unitPrice),
            currency_id: "CLP",
          },
        ],
        payer: {
          name: params.clientName,
          email: params.clientEmail,
          phone: params.clientPhone
            ? {
                number: params.clientPhone.replace(/[^0-9]/g, ""),
              }
            : undefined,
        },
        back_urls: {
          success: `${baseUrl}/confirmacion?status=approved`,
          pending: `${baseUrl}/confirmacion?status=pending`,
          failure: `${baseUrl}/confirmacion?status=failure`,
        },
        auto_return: "approved",
        metadata: {
          therapist_id: params.therapistId,
          client_name: params.clientName,
          client_email: params.clientEmail,
          client_phone: params.clientPhone,
          scheduled_at: params.scheduledAt,
          motive: params.consultationMotive,
        },
        notification_url: `${baseUrl}/api/mercadopago/webhook`,
      },
    });

    return {
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    };
  } catch (error: any) {
    console.error("Error creando preferencia de Mercado Pago:", error);
    return {
      success: false,
      error: error?.message || "No se pudo generar el botón de pago de Mercado Pago",
    };
  }
}
