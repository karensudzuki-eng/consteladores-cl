import fs from "fs";
import path from "path";
import { CMSContent, DEFAULT_CMS_CONTENT } from "./types";
import { createAdminClient } from "@/lib/supabase/admin";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "cms-content.json");
const TMP_FILE_PATH = path.join("/tmp", "cms-content.json");

export async function getCMSContentAsync(): Promise<CMSContent> {
  // 1. Intentar leer desde Supabase si está configurado
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("content")
        .eq("key", "main_cms_content")
        .single();

      if (!error && data?.content) {
        return mergeWithDefaults(data.content);
      }
    } catch (e) {
      // Continuar con fallback
    }
  }

  // 2. Intentar leer desde /tmp (serverless cache)
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const raw = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (e) {}

  // 3. Intentar leer desde data/cms-content.json local
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (e) {}

  return DEFAULT_CMS_CONTENT;
}

export function getCMSContent(): CMSContent {
  // Fallback síncrono para rutas estáticas
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const raw = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (e) {}

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch (e) {}

  return DEFAULT_CMS_CONTENT;
}

export async function saveCMSContentAsync(content: CMSContent): Promise<void> {
  // 1. Intentar persistir en Supabase si está disponible
  const supabase = createAdminClient();
  if (supabase) {
    try {
      await supabase.from("site_settings").upsert(
        {
          key: "main_cms_content",
          content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );
    } catch (e) {
      console.warn("No se pudo guardar en Supabase site_settings:", e);
    }
  }

  // 2. Intentar guardar en /tmp (siempre escribible en Vercel/serverless)
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (e) {}

  // 3. Intentar guardar en data/cms-content.json (en entornos con disco escribible)
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    // En Vercel lanzará EROFS, lo cual es normal en serverless
    console.warn("Aviso: Sistema de archivos de solo lectura en servidor (esperado en serverless).");
  }
}

export function saveCMSContent(content: CMSContent): void {
  try {
    fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (e) {}

  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    console.warn("Aviso: Disco de solo lectura.");
  }
}

function mergeWithDefaults(parsed: any): CMSContent {
  return {
    settings: {
      ...DEFAULT_CMS_CONTENT.settings,
      ...(parsed.settings || {}),
      about: {
        ...DEFAULT_CMS_CONTENT.settings.about,
        ...(parsed.settings?.about || {}),
      },
      bankDetails: {
        ...DEFAULT_CMS_CONTENT.settings.bankDetails,
        ...(parsed.settings?.bankDetails || {}),
      },
    },
    workshops:
      Array.isArray(parsed.workshops) && parsed.workshops.length > 0
        ? parsed.workshops
        : DEFAULT_CMS_CONTENT.workshops,
    heroSlides:
      Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0
        ? parsed.heroSlides
        : DEFAULT_CMS_CONTENT.heroSlides,
    testimonials:
      Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0
        ? parsed.testimonials
        : DEFAULT_CMS_CONTENT.testimonials,
    facilitators:
      Array.isArray(parsed.facilitators) && parsed.facilitators.length > 0
        ? parsed.facilitators
        : DEFAULT_CMS_CONTENT.facilitators,
  };
}
