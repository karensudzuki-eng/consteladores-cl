import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
} from "@react-email/components";

interface AppointmentEmailProps {
  clientName: string;
  therapistName: string;
  scheduledDate: string; // Ej: "Jueves 24 de Octubre a las 18:00 hrs (Hora de Chile)"
  meetLink: string;
  isConfirmed?: boolean;
  totalPrice?: string;
  paymentMethod?: "online" | "transfer";
}

export function AppointmentConfirmationEmail({
  clientName,
  therapistName,
  scheduledDate,
  meetLink,
  isConfirmed = false,
  totalPrice = "$40.000 CLP",
  paymentMethod = "online",
}: AppointmentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {isConfirmed
          ? `Tu espacio está 100% confirmado con ${therapistName}`
          : `Tu sesión está pre-agendada: completa tu transferencia para confirmar con ${therapistName}`}
      </Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Encabezado suave */}
          <Section style={headerSection}>
            <Text style={subBrandText}>consteladores.cl</Text>
            <Heading style={headingStyle}>
              {isConfirmed ? "Tu espacio está 100% confirmado" : "Tu sesión está pre-agendada"}
            </Heading>
          </Section>

          {/* Cuerpo principal */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              Hola {clientName},
            </Text>
            <Text style={paragraph}>
              {isConfirmed
                ? `Te confirmamos que el pago de tu sesión de constelación familiar junto a ${therapistName} ha sido recibido y tu encuentro está 100% agendado.`
                : `Tu solicitud de constelación familiar junto a ${therapistName} ha sido pre-bloqueada con éxito en nuestra agenda.`}
            </Text>

            {/* Tarjeta de detalles de la sesión */}
            <Section style={detailsCard}>
              <Text style={cardLabel}>Cuándo nos encontramos:</Text>
              <Text style={cardValue}>{scheduledDate}</Text>

              {isConfirmed ? (
                <>
                  <Text style={{ ...cardLabel, marginTop: "16px" }}>Tu Sala Virtual Privada (Google Meet):</Text>
                  <div style={{ textAlign: "center", margin: "14px 0" }}>
                    <Link href={meetLink} style={meetButton}>
                      Abrir Sala en Google Meet →
                    </Link>
                  </div>
                  <Text style={linkFallback}>
                    Enlace permanente:{" "}
                    <Link href={meetLink} style={{ color: "#A94F32", wordBreak: "break-all" }}>
                      {meetLink}
                    </Link>
                  </Text>
                </>
              ) : (
                <div style={{ backgroundColor: "#FFF8EB", border: "1px solid #F5E0B8", padding: "14px 16px", borderRadius: "8px", margin: "14px 0" }}>
                  <Text style={{ fontSize: "12px", color: "#7A4B10", margin: "0", lineHeight: "1.4" }}>
                    🔒 <strong>Acceso a Google Meet:</strong> Tu hora está pre-reservada por 2 horas. El enlace seguro a la sala virtual te será enviado a este correo en cuanto verifiquemos tu comprobante de transferencia bancaria.
                  </Text>
                </div>
              )}

              <Hr style={{ borderColor: "#E7DECE", margin: "16px 0 12px" }} />

              <Text style={{ ...cardLabel, margin: "0 0 6px" }}>Valor del Servicio:</Text>
              <Text style={{ fontSize: "15px", color: "#27221F", fontWeight: "bold", margin: "0 0 8px" }}>
                Valor Total de la Sesión: {totalPrice} (Pago 100%)
              </Text>

              {!isConfirmed && (
                <>
                  <div style={{ backgroundColor: "#FAF8F5", border: "1px solid #E7DECE", borderRadius: "8px", padding: "14px", margin: "12px 0" }}>
                    <Text style={{ fontSize: "12px", color: "#27221F", margin: "0 0 6px", fontWeight: "bold" }}>
                      Datos para Transferencia Bancaria (Total {totalPrice}):
                    </Text>
                    <Text style={{ fontSize: "12px", color: "#5C524A", margin: "0", lineHeight: "1.6" }}>
                      • <strong>Institución:</strong> Mercado Pago<br />
                      • <strong>Tipo de Cuenta:</strong> Cuenta Vista<br />
                      • <strong>N° de Cuenta:</strong> 1038886585<br />
                      • <strong>Titular:</strong> Karen Valeria Sudzuki Toro<br />
                      • <strong>RUT:</strong> 13.298.884-6<br />
                      • <strong>Correo de confirmación:</strong> karen.sudzuki@gmail.com
                    </Text>
                  </div>

                  <Text style={{ fontSize: "12px", color: "#5C524A", margin: "10px 0" }}>
                    Una vez realizada la transferencia, envía tu comprobante respondiendo a este correo o por WhatsApp al <strong>+56 9 4193 9363</strong>.
                  </Text>
                </>
              )}
            </Section>

            {/* Política de Reserva y Reagendamiento */}
            <Section style={{ backgroundColor: "#FDF7F4", border: "1px solid #F2D5C8", borderRadius: "12px", padding: "14px 18px", margin: "20px 0" }}>
              <Text style={{ fontSize: "12px", color: "#8B3E25", margin: "0 0 6px", fontWeight: "bold" }}>
                ⚠️ Política de Reagendamiento y Cancelación:
              </Text>
              <Text style={{ fontSize: "12px", color: "#5A493B", margin: "0", lineHeight: "1.5" }}>
                El pago del 100% reserva de manera exclusiva el horario del facilitador. Puedes solicitar reagendamiento sin costo con un mínimo de <strong>24 horas de anticipación</strong>. Las cancelaciones con menos de 24 horas o la inasistencia ("no-show") no tienen derecho a devolución.
              </Text>
            </Section>

            {/* Consejos para el momento */}
            <Heading as="h3" style={subHeadingStyle}>
              Orientaciones para tu encuentro
            </Heading>

            <Text style={bulletPoint}>
              🌿 <strong>Tu rincón:</strong> Elige un lugar tranquilo y privado donde puedas hablar con libertad y sin interrupciones.
            </Text>
            <Text style={bulletPoint}>
              💧 <strong>Agua y abrigo:</strong> Ten a mano un vaso de agua o una infusión tibia, y algo cómodo que te abrigue.
            </Text>
            <Text style={bulletPoint}>
              📖 <strong>Sin apuro:</strong> No hace falta que prepares explicaciones exhaustivas; el trabajo fenomenológico se desplegará a tu propio ritmo.
            </Text>

            <Hr style={dividerStyle} />

            <Text style={footerNote}>
              Si necesitas asistencia técnica o consultar sobre tu sesión, contáctanos a contacto@consteladores.cl.
            </Text>

            <Text style={signature}>
              Con respeto y calidez,<br />
              <strong>El equipo de consteladores.cl</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos sobrios y naturales acordes al diseño de consteladores.cl
const mainStyle: React.CSSProperties = {
  backgroundColor: "#FBF7F2",
  fontFamily: "HelveticaNeue, Helvetica, Arial, sans-serif",
  padding: "20px 0",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#FCFAF7",
  border: "1px solid #E7DECE",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const headerSection: React.CSSProperties = {
  backgroundColor: "#F3ECE2",
  padding: "32px 24px 24px",
  textAlign: "center" as const,
  borderBottom: "1px solid #E7DECE",
};

const subBrandText: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#8A7E73",
  margin: "0 0 8px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  color: "#27221F",
  margin: "0",
  fontWeight: "bold",
};

const contentSection: React.CSSProperties = {
  padding: "32px 24px",
};

const paragraph: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#5C524A",
  margin: "0 0 16px",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E7DECE",
  borderRadius: "12px",
  padding: "20px",
  margin: "24px 0",
};

const cardLabel: React.CSSProperties = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  color: "#8A7E73",
  margin: "0 0 4px",
  fontWeight: "bold",
};

const cardValue: React.CSSProperties = {
  fontSize: "16px",
  color: "#27221F",
  fontWeight: "bold",
  margin: "0",
};

const meetButton: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#1a73e8",
  color: "#FFFFFF",
  padding: "14px 28px",
  borderRadius: "50px",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
};

const linkFallback: React.CSSProperties = {
  fontSize: "11px",
  color: "#8A7E73",
  marginTop: "12px",
  textAlign: "center" as const,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#27221F",
  margin: "24px 0 12px",
};

const bulletPoint: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#5C524A",
  margin: "0 0 10px",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#E7DECE",
  margin: "28px 0 20px",
};

const footerNote: React.CSSProperties = {
  fontSize: "12px",
  color: "#8A7E73",
  margin: "0 0 16px",
  lineHeight: "1.5",
};

const signature: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#27221F",
  margin: "0",
};
