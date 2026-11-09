import { NextResponse } from "next/server";
import { getCMSContentAsync, saveCMSContentAsync } from "@/lib/cms/server-content";
import { CMSContent } from "@/lib/cms/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  try {
    const data = await getCMSContentAsync();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error al leer contenido" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: CMSContent = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 }
      );
    }
    // Asegurar estructura mínima válida sin rechazar datos válidos
    const sanitized: CMSContent = {
      ...body,
      settings: body.settings || ({} as any),
      workshops: Array.isArray(body.workshops) ? body.workshops : [],
      heroSlides: Array.isArray(body.heroSlides) ? body.heroSlides : [],
      facilitators: Array.isArray(body.facilitators) ? body.facilitators : [],
      updatedAt: Date.now(),
    };
    await saveCMSContentAsync(sanitized);
    return NextResponse.json({ success: true, data: sanitized });
  } catch (err: any) {
    console.error("Error en POST /api/cms:", err);
    return NextResponse.json(
      { error: err?.message || "Error al guardar contenido en servidor" },
      { status: 500 }
    );
  }
}
