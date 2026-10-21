import React from "react";
import { ModernNavbar } from "@/components/landing/ModernNavbar";
import { ModernHero } from "@/components/landing/ModernHero";
import { ModernTherapistDirectory, TherapistItem } from "@/components/landing/ModernTherapistDirectory";
import { HowItWorksModern } from "@/components/landing/HowItWorksModern";
import { TopicsGridModern } from "@/components/landing/TopicsGridModern";
import { ConsteladorCTAModern } from "@/components/landing/ConsteladorCTAModern";
import { FAQSectionModern } from "@/components/landing/FAQSectionModern";
import { ModernFooter } from "@/components/landing/ModernFooter";
import { createAdminClient } from "@/lib/supabase/admin";

// Facilitadores de referencia para el marketplace
const fallbackTherapists: TherapistItem[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    name: "María Paz Vial",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora en Constelaciones Familiares y Duelo",
    bio: "Acompaño procesos de reconciliación con el linaje materno y resolución de duelos difíciles con un enfoque de respeto y serenidad.",
    approach: "Formada en Instituto Bert Hellinger de Chile",
    experienceYears: 9,
    priceClp: 45000,
    durationMinutes: 75,
    location: "Online en todo Chile (Google Meet)",
    specialties: ["Madre y Padre", "Duelos", "Vínculos afectivos"],
    nextAvailable: "Jueves disponible",
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    name: "Rodrigo San Martín",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    headline: "Constelador Sistémico • Vocación y Prosperidad",
    bio: "Especialista en destrabar lealtades familiares invisibles que frenan el desarrollo laboral, la relación con el dinero y los proyectos de vida.",
    approach: "Certificado por Centro Latinoamericano de Constelaciones",
    experienceYears: 12,
    priceClp: 48000,
    durationMinutes: 75,
    location: "Online en todo Chile (Google Meet)",
    specialties: ["Trabajo y Dinero", "Vocación", "Padre y Éxito"],
    nextAvailable: "Viernes disponible",
  },
  {
    id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
    name: "Camila Echeverría",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora Sistémica • Pareja y Síntomas Corporales",
    bio: "Miro con delicadeza dinámicas de pareja recurrentes y síntomas corporales que manifiestan historias inconclusas en el árbol familiar.",
    approach: "Escuela de Constelaciones Familiares de Chile",
    experienceYears: 7,
    priceClp: 42000,
    durationMinutes: 75,
    location: "Online en todo Chile (Google Meet)",
    specialties: ["Pareja y Relaciones", "Síntomas", "Linaje Femenino"],
    nextAvailable: "Lunes disponible",
  },
];

async function getTherapists(): Promise<TherapistItem[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("constellation_therapists")
      .select("*, profiles:user_id(full_name, avatar_url)")
      .eq("status", "approved");

    if (error || !data || data.length === 0) {
      return fallbackTherapists;
    }

    return data.map((t) => ({
      id: t.id,
      name: t.profiles?.full_name || "Facilitador",
      avatarUrl:
        t.profiles?.avatar_url ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      headline: t.headline,
      bio: t.bio,
      approach: t.approach,
      experienceYears: t.experience_years,
      priceClp: t.price_clp,
      durationMinutes: t.duration_minutes,
      location: t.location,
      specialties: t.modalities || ["Familia", "Pareja", "Duelo"],
      nextAvailable: "Horas disponibles esta semana",
    }));
  } catch {
    return fallbackTherapists;
  }
}

export default async function HomePage() {
  const therapists = await getTherapists();

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* 1. Barra de Navegación Moderna */}
      <ModernNavbar />

      {/* 2. Hero de Alta Conversión con Buscador */}
      <ModernHero />

      {/* 3. Directorio de Terapeutas con Filtros y Reserva */}
      <ModernTherapistDirectory initialTherapists={therapists} />

      {/* 4. Cómo Funciona en 3 Pasos */}
      <HowItWorksModern />

      {/* 5. Temas que se Trabajan */}
      <TopicsGridModern />

      {/* 6. Llamado a la Acción para Consteladores ("Soy Constelador") */}
      <ConsteladorCTAModern />

      {/* 7. Preguntas Frecuentes (Acordeón) */}
      <FAQSectionModern />

      {/* 8. Footer Moderno */}
      <ModernFooter />
    </div>
  );
}
