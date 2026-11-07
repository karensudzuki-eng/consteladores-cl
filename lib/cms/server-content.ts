import fs from "fs";
import path from "path";
import { CMSContent, DEFAULT_CMS_CONTENT } from "./types";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "cms-content.json");

export function getCMSContent(): CMSContent {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        settings: {
          ...DEFAULT_CMS_CONTENT.settings,
          ...(parsed.settings || {}),
          bankDetails: {
            ...DEFAULT_CMS_CONTENT.settings.bankDetails,
            ...(parsed.settings?.bankDetails || {}),
          },
        },
        workshops:
          Array.isArray(parsed.workshops) && parsed.workshops.length > 0
            ? parsed.workshops
            : DEFAULT_CMS_CONTENT.workshops,
      };
    }
  } catch (err) {
    console.error("Error reading cms-content.json:", err);
  }
  return DEFAULT_CMS_CONTENT;
}

export function saveCMSContent(content: CMSContent): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(content, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing cms-content.json:", err);
    throw new Error("No se pudo guardar la configuración.");
  }
}
