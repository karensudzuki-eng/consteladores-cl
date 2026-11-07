import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/png";

    // 1. Intentar subir a Supabase Storage si está disponible
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const timestamp = Date.now();
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const storagePath = `flyers/${timestamp}_${cleanName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("flyers")
          .upload(storagePath, buffer, {
            contentType: mimeType,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from("flyers")
            .getPublicUrl(storagePath);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
          }
        }
      } catch (err) {
        console.warn("Aviso en subida a Supabase Storage:", err);
      }
    }

    // 2. Intentar guardar en disco local si el sistema de archivos es escribible
    try {
      const timestamp = Date.now();
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `flyer_${timestamp}_${cleanName}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ success: true, url: publicUrl });
    } catch (fsErr) {
      // 3. Fallback Infalible en Serverless (Vercel): Convertir a Data URL Base64 optimizada
      // De esta manera jamás falla por EROFS (sistema de solo lectura)
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl });
    }
  } catch (err: any) {
    console.error("Error procesando imagen:", err);
    return NextResponse.json(
      { error: err?.message || "Error al procesar la imagen" },
      { status: 500 }
    );
  }
}
