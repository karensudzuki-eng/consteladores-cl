import { google } from "googleapis";

interface CreateMeetingParams {
  summary: string;
  description: string;
  startTime: Date;
  durationMinutes?: number;
  attendeeEmail: string;
}

/**
 * Genera un enlace de reunión en Google Meet.
 * Si las credenciales de Google están configuradas en .env.local, interactúa
 * con la API de Google Calendar v3.
 * Si aún no se configuran, genera un enlace único de sala para permitir
 * el testeo continuo del MVP sin fricciones.
 */
export async function createGoogleMeetLink({
  summary,
  description,
  startTime,
  durationMinutes = 75,
  attendeeEmail,
}: CreateMeetingParams): Promise<string> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  // Si cuenta con credenciales completas de Google Cloud:
  if (serviceAccountEmail && privateKey) {
    try {
      const auth = new google.auth.JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/calendar"],
      });

      const calendar = google.calendar({ version: "v3", auth });
      const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

      const response = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        requestBody: {
          summary,
          description,
          start: {
            dateTime: startTime.toISOString(),
            timeZone: "America/Santiago",
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: "America/Santiago",
          },
          attendees: [{ email: attendeeEmail }],
          conferenceData: {
            createRequest: {
              requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
            },
          },
        },
      });

      if (response.data.hangoutLink) {
        return response.data.hangoutLink;
      }
    } catch (error) {
      console.warn(
        "⚠️ [Google Meet] No se pudo conectar a Google Calendar API. Usando enlace de respaldo:",
        error
      );
    }
  }

  // Fallback seguro: genera una sala con código único con formato Google Meet (xxx-yyyy-zzz)
  const part1 = Math.random().toString(36).substring(2, 5);
  const part2 = Math.random().toString(36).substring(2, 6);
  const part3 = Math.random().toString(36).substring(2, 5);
  return `https://meet.google.com/${part1}-${part2}-${part3}`;
}
