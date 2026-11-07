import { NextResponse } from "next/server";
import { getCMSContent, saveCMSContent } from "@/lib/cms/server-content";
import { CMSContent } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = getCMSContent();
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
    if (!body || !body.settings || !Array.isArray(body.workshops)) {
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 }
      );
    }
    saveCMSContent(body);
    return NextResponse.json({ success: true, data: body });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error al guardar contenido" },
      { status: 500 }
    );
  }
}
