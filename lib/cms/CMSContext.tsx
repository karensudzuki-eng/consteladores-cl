"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CMSContent, DEFAULT_CMS_CONTENT } from "./content";

interface CMSContextType {
  content: CMSContent;
  isLoading: boolean;
  setContent: React.Dispatch<React.SetStateAction<CMSContent>>;
  updateContent: (newContent: CMSContent) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType>({
  content: DEFAULT_CMS_CONTENT,
  isLoading: true,
  setContent: () => {},
  updateContent: async () => false,
  refresh: async () => {},
});

export function CMSProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: CMSContent;
}) {
  const [content, setContent] = useState<CMSContent>(
    initialContent || DEFAULT_CMS_CONTENT
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialContent);

  const fetchContent = async () => {
    let localData: (CMSContent & { updatedAt?: number }) | null = null;

    // 1. Cargar caché inmediata de localStorage si existe
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("cst_cms_content");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.settings && Array.isArray(parsed?.workshops)) {
            localData = parsed;
            setContent(parsed);
          }
        }
      } catch (e) {
        console.warn("Error leyendo localStorage:", e);
      }
    }

    // 2. Sincronizar con el servidor respetando la versión más reciente
    try {
      setIsLoading(true);
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData?.settings) {
          const serverTime = (serverData as any).updatedAt || 0;
          const localTime = localData?.updatedAt || 0;

          // SOLO sobreescribir si los datos del servidor son estrictamente más nuevos
          if (serverTime > localTime) {
            setContent(serverData);
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem("cst_cms_content", JSON.stringify(serverData));
              } catch (e) {}
            }
          } else if (localTime > serverTime && localData) {
            // El usuario guardó cambios localmente que el servidor no tiene aún.
            // Sincronizamos hacia el servidor en segundo plano sin pisar los cambios locales.
            try {
              fetch("/api/cms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(localData),
              });
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      console.warn("Aviso al sincronizar CMS con el servidor:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (newContent: CMSContent): Promise<boolean> => {
    const timestamped = {
      ...newContent,
      updatedAt: Date.now(),
    };

    // Guardar inmediatamente en localStorage del cliente
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cst_cms_content", JSON.stringify(timestamped));
      } catch (e) {
        console.warn("Error al guardar en localStorage (posible exceso de cuota):", e);
      }
    }
    setContent(timestamped as CMSContent);

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(timestamped),
      });
      return res.ok;
    } catch (err) {
      console.error("Error guardando contenido CMS en servidor:", err);
      return true; // Consideramos éxito local ya que está persistido en localStorage
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoading,
        setContent,
        updateContent,
        refresh: fetchContent,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  return useContext(CMSContext);
}
