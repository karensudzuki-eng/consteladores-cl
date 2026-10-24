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
}

export function AppointmentConfirmationEmail({
  clientName,
  therapistName,
  scheduledDate,
  meetLink,
}: AppointmentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Tu espacio está listo: detalles de tu constelación con {therapistName}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Encabezado suave */}
          <Section style={headerSection}>
            <Text style={subBrandText}>consteladores.cl</Text>
            <Heading style={headingStyle}>Un espacio listo para ti</Heading>
          </Section>

          {/* Cuerpo principal */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              Hola {clientName},
            </Text>
            <Text style={paragraph}>
              Te escribimos para confirmarte que tu sesión de constelación familiar junto a{" "}
              <strong>{therapistName}</strong> ha quedado reservada con cariño.
            </Text>

            {/* Tarjeta de detalles de la sesión */}
            <Section style={detailsCard}>
              <Text style={cardLabel}>Cuándo nos encontramos:</Text>
              <Text style={cardValue}>{scheduledDate}</Text>

              <Text style={{ ...cardLabel, marginTop: "14px" }}>Dónde entrar (Google Meet):</Text>
              <Link href={meetLink} style={meetButton}>
                Abrir sala en Google Meet
              </Link>
              <Text style={linkFallback}>
                Enlace directo:{" "}
                <Link href={meetLink} style={{ color: "#A94F32", wordBreak: "break-all" }}>
                  {meetLink}
                </Link>
              </Text>

              <Hr style={{ borderColor: "#E7DECE", margin: "16px 0 12px" }} />

              <Text style={{ ...cardLabel, margin: "0 0 6px" }}>Desglose de Pago:</Text>
              <Text style={{ fontSize: "13px", color: "#5C524A", margin: "0 0 4px" }}>
                • <strong>Abono de Reserva (20% pagado):</strong> $9.000 CLP (Gestión de plataforma consteladores.cl)
              </Text>
              <Text style={{ fontSize: "13px", color: "#5C524A", margin: "0 0 8px" }}>
                • <strong>Saldo a pagar al constelador (80%):</strong> $36.000 CLP
              </Text>
              <Text style={{ fontSize: "12px", color: "#8A7E73", margin: "0", lineHeight: "1.4" }}>
                El saldo del 80% se transfiere directamente al facilitador. Recuerda enviar tu comprobante/voucher de transferencia antes o al finalizar tu constelación.
              </Text>
            </Section>

            {/* Política de Inasistencia y Reagendamiento */}
            <Section style={{ backgroundColor: "#FDF7F4", border: "1px solid #F2D5C8", borderRadius: "12px", padding: "14px 18px", margin: "20px 0" }}>
              <Text style={{ fontSize: "12px", color: "#8B3E25", margin: "0 0 6px", fontWeight: "bold" }}>
                ⚠️ Política de Reserva y Reagendamiento:
              </Text>
              <Text style={{ fontSize: "12px", color: "#5A493B", margin: "0", lineHeight: "1.5" }}>
                El abono del 20% asegura tu cupo en la agenda del constelador y cubre los gastos de gestión de la plataforma. Si no asistes sin previo aviso, este 20% no es reembolsable. En casos excepcionales de fuerza mayor, puedes solicitar reagendamiento con un mínimo de 24 horas de anticipación escribiendo a soporte: <Link href="mailto:contacto@vorticeintegration.com" style={{ color: "#C46849", fontWeight: "bold" }}>contacto@vorticeintegration.com</Link>.
              </Text>
            </Section>

            {/* Consejos para el momento */}
            <Heading as="h3" style={subHeadingStyle}>
              Unas pequeñas sugerencias para tu encuentro
            </Heading>

            <Text style={bulletPoint}>
              🌿 <strong>Tu rincón:</strong> Elige un lugar en el que te sientas en confianza, donde puedas hablar con libertad y sin interrupciones.
            </Text>
            <Text style={bulletPoint}>
              💧 <strong>Agua y abrigo:</strong> Ten a mano un vaso de agua o una infusión tibia, y algo cómodo que te abrigue si el cuerpo lo pide.
            </Text>
            <Text style={bulletPoint}>
              📖 <strong>Sin apuro:</strong> No hace falta que prepares una lista exhaustiva ni explicaciones perfectas. Lo que necesita ser visto encontrará su curso a tu propio ritmo.
            </Text>

            <Hr style={dividerStyle} />

            <Text style={footerNote}>
              Si por algún motivo de fuerza mayor necesitas reprogramar, responde a este mismo correo con al menos 24 horas de anticipación para que podamos acompañarte.
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

// Estilos en línea compatibles con clientes de correo (Gmail, Outlook, Apple Mail)
const mainStyle: React.CSSProperties = {
  backgroundColor: "#FAF8F5",
  fontFamily: "Georgia, serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica",
  padding: "36px 12px",
  color: "#2B221B",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "20px",
  maxWidth: "580px",
  margin: "0 auto",
  border: "1px solid #E7DFD5",
  overflow: "hidden",
  boxShadow: "0 10px 30px -10px rgba(74, 52, 38, 0.05)",
};

const headerSection: React.CSSProperties = {
  backgroundColor: "#F9ECE6",
  padding: "32px 32px 28px",
  textAlign: "center" as const,
  borderBottom: "1px solid #F2D5C8",
};

const subBrandText: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#8B3E25",
  margin: "0 0 8px 0",
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: 600,
};

const headingStyle: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "normal",
  margin: "0",
  color: "#2B221B",
  fontFamily: "Georgia, serif",
};

const contentSection: React.CSSProperties = {
  padding: "32px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "26px",
  color: "#5A493B",
  margin: "0 0 16px 0",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "#FAF8F5",
  borderRadius: "14px",
  padding: "20px",
  border: "1px solid #E7DFD5",
  margin: "24px 0",
};

const cardLabel: React.CSSProperties = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  color: "#8C7561",
  margin: "0 0 4px 0",
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontWeight: 600,
};

const cardValue: React.CSSProperties = {
  fontSize: "16px",
  color: "#2B221B",
  fontWeight: "bold",
  margin: "0",
};

const meetButton: React.CSSProperties = {
  display: "inline-block",
  marginTop: "8px",
  backgroundColor: "#C46849",
  color: "#FFFFFF",
  padding: "11px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const linkFallback: React.CSSProperties = {
  fontSize: "12px",
  color: "#8C7561",
  marginTop: "10px",
  marginBottom: "0",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "normal",
  color: "#2B221B",
  margin: "26px 0 12px 0",
  fontFamily: "Georgia, serif",
};

const bulletPoint: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#5A493B",
  margin: "0 0 10px 0",
};

const dividerStyle: React.CSSProperties = {
  borderColor: "#E7DFD5",
  borderWidth: "1px 0 0 0",
  margin: "28px 0 20px 0",
};

const footerNote: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#8C7561",
  margin: "0 0 20px 0",
};

const signature: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#5A493B",
  margin: "0",
};
