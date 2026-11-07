"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CMSContent, DEFAULT_CMS_CONTENT } from "./content";

interface CMSContextType {
  content: CMSContent;
  isLoading: boolean;
  updateContent: (newContent: CMSContent) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType>({
  content: DEFAULT_CMS_CONTENT,
  isLoading: true,
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
    try {
      setIsLoading(true);
      const res = await fetch("/api/cms", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (err) {
      console.warn("No se pudo cargar CMS desde la API, usando valores por defecto:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = async (newContent: CMSContent): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent),
      });
      if (res.ok) {
        setContent(newContent);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error guardando contenido CMS:", err);
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        isLoading,
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
