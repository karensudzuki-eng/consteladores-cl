/**
 * Configuración centralizada de consteladores.cl
 * Define flags de negocio, parámetros de contacto, escala de estados y textos éticos normativos.
 */

export const CONFIG = {
  // Flag de visualización de precios. Activado con indicación de valores referenciales.
  PRICING_ENABLED: true,
  PRICING_NOTE: "Valores referenciales sujetos a cambio según facilitador y disponibilidad.",

  // Método de pago para el abono del 20%: "transfer" (transferencia bancaria) | "gateway" (pasarela oficial)
  PAYMENT_DEPOSIT_METHOD: "transfer" as "transfer" | "gateway",

  // Datos de contacto oficial (el número no debe mostrarse como texto plano en el diseño visual)
  WHATSAPP_NUMBER: "+56941939363",
  SUPPORT_EMAIL: "contacto@consteladores.cl",

  // Relación y respaldo de Icalma Constelaciones
  ICALMA_URL: "https://constelacionesfamiliares.cl",
  ICALMA_FOUNDATION_YEAR: "2006",
  ICALMA_BACKING_NOTICE: "consteladores.cl es impulsado por Icalma Constelaciones (formación desde 2006).",

  // Escala única de estados (prohibido usar "certificado" como sinónimo de "acreditado")
  FACILITATOR_STATUS: {
    FORMADO: {
      key: "FORMADO",
      label: "Formado",
      description: "Completó la formación básica/integral en constelaciones familiares.",
    },
    SUPERVISADO: {
      key: "SUPERVISADO",
      label: "Supervisado",
      description: "Realiza práctica activa bajo supervisión directa de un docente con nombre visible.",
    },
    ACREDITADO: {
      key: "ACREDITADO",
      label: "Acreditado",
      description: "Cumple los requisitos verificados de formación, práctica y horas clínicas según criterios públicos.",
    },
  },

  // Avisos éticos de responsabilidad obligatorios
  DISCLAIMER_NOTICE:
    "La constelación familiar es un abordaje fenomenológico complementario. No reemplaza la atención psicológica ni psiquiátrica formal.",

  // Línea oficial de contención y prevención del suicidio de Minsal (*4141)
  CRISIS_LINE_NOTICE:
    "Si estás en crisis, llama al *4141 (Salud Responde, gratuito, 24/7) o acude a urgencias.",

  // Política de cancelación
  CANCELLATION_HOURS_NOTICE: 24, // horas mínimas de anticipación
  REFUND_BUSINESS_DAYS: "3 a 5", // Plazo de 3 a 5 días hábiles para devolución por transferencia bancaria
};
