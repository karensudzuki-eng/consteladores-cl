import React from "react";
import Link from "next/link";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { TenderSteps } from "@/components/landing/TenderSteps";
import { ConsultantSection } from "@/components/landing/ConsultantSection";
import { TherapistCommunitySection } from "@/components/landing/TherapistCommunitySection";
import { TherapistCard, TherapistData } from "@/components/landing/TherapistCard";
import { createAdminClient } from "@/lib/supabase/admin";

// Facilitadores de referencia para el MVP
const mockTherapists: TherapistData[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    name: "María Paz Vial",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora Sistémica • Acompañamiento en Duelos y Vínculos Maternos",
    bio: "Acompaño desde una presencia serena y sin apuros. Creo profundamente en la capacidad del alma para encontrar alivio cuando le damos lugar a quienes estuvieron antes.",
    approach: "Formada en el Instituto Bert Hellinger de Chile y Gestalt Sistémica",
    experienceYears: 9,
    priceClp: 45000,
    durationMinutes: 80,
    location: "Santiago • Sesiones Online en todo Chile",
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    name: "Rodrigo San Martín",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    headline: "Constelador Familiar • Vocación, Prosperidad y Órdenes del Amor",
    bio: "Mi labor es ayudarte a destrabar lealtades invisibles que frenan tu desarrollo en el mundo. Un trabajo sobrio, respetuoso y muy clarificador.",
    approach: "Certificado por el Centro Latinoamericano de Pedagogía y Constelaciones Sistémicas",
    experienceYears: 12,
    priceClp: 48000,
    durationMinutes: 75,
    location: "Viña del Mar • Sesiones Online",
  },
  {
    id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
    name: "Camila Echeverría",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    headline: "Facilitadora Sistémica • Síntomas Físicos y Linaje Femenino",
    bio: "Miro los síntomas corporales como mensajeros de historias no resueltas en el árbol genealógico. Trabajamos con mucha delicadeza y escucha interna.",
    approach: "Escuela de Constelaciones Familiares de Chile y Terapia Somática",
    experienceYears: 7,
    priceClp: 42000,
    durationMinutes: 75,
    location: "Concepción • Sesiones Online",
  },
];

async function getApprovedTherapists(): Promise<TherapistData[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("constellation_therapists")
      .select("*, profiles:user_id(full_name, avatar_url)")
      .eq("status", "approved");

    if (error || !data || data.length === 0) {
      return mockTherapists;
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
    }));
  } catch {
    return mockTherapists;
  }
}

export default async function HomePage() {
  const therapists = await getApprovedTherapists();

  return (
    <div className="min-h-screen bg-earth-50 text-earth-900 selection:bg-terracotta-100 selection:text-terracotta-700">
      
      {/* Barra de navegación superior con doble enfoque */}
      <header className="sticky top-0 z-40 bg-earth-50/95 backdrop-blur-md border-b border-earth-200/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500 group-hover:scale-125 transition-transform" />
            <span className="font-serif text-2xl tracking-tight text-earth-900 font-semibold">
              consteladores<span className="text-terracotta-600 font-normal">.cl</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-earth-700 font-medium">
            <a href="#proposito" className="hover:text-terracotta-600 transition-colors">
              Propósito y Ética
            </a>
            <a href="#consultantes" className="hover:text-terracotta-600 transition-colors">
              Para Consultantes
            </a>
            <a href="#terapeutas" className="hover:text-terracotta-600 transition-colors">
              Facilitadores Certificados
            </a>
            <a href="#soy-constelador" className="hover:text-terracotta-600 transition-colors">
              Soy Constelador
            </a>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/registro-terapeuta"
              className="text-xs sm:text-sm font-medium text-earth-700 hover:text-terracotta-600 px-3 py-1.5 transition-colors border border-earth-200 rounded-full bg-white/70 hover:bg-white"
            >
              Postular como Facilitador
            </Link>
            <a
              href="#terapeutas"
              className="px-4 sm:px-5 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              Agendar Sesión
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section con Carrusel de Calma */}
      <HeroCarousel />

      {/* 1. SECCIÓN: PROPÓSITO Y BIENVENIDA ÉTICA */}
      <section id="proposito" className="py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-olive-50 border border-olive-200 text-olive-700 text-xs tracking-wider uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-olive-500" />
          Propósito y Encuentro Ético
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 leading-tight">
          "Un puente seguro para mirar el origen de lo que duele, con amor y sin apuro."
        </h2>

        <p className="text-earth-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Las constelaciones familiares sistémicas nos invitan a comprender que ningún sufrimiento ocurre de forma aislada. Pertenecemos a un entramado vivo donde cada generación intenta equilibrar las heridas, los duelos y los silencios del pasado.
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-earth-200/80 shadow-warm-subtle">
            <p className="font-serif text-lg text-earth-900 mb-1">Sin juicio</p>
            <p className="text-xs text-earth-600 leading-relaxed">
              No buscamos culpables ni juzgamos a los ancestros. Miramos con compasión lo que fue posible para ellos.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-earth-200/80 shadow-warm-subtle">
            <p className="font-serif text-lg text-earth-900 mb-1">Rigor verificado</p>
            <p className="text-xs text-earth-600 leading-relaxed">
              Cada facilitador cuenta con diploma avalado por escuelas sistémicas y revisión humana de sus credenciales.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-earth-200/80 shadow-warm-subtle">
            <p className="font-serif text-lg text-earth-900 mb-1">Tu propio ritmo</p>
            <p className="text-xs text-earth-600 leading-relaxed">
              El alma necesita tiempo para asimilar. Acompañamos el proceso respetando tus tiempos internos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN: PARA CONSULTANTES (TEMAS Y CONTENCIÓN) */}
      <ConsultantSection />

      {/* PASOS A SEGUIR EXPLICADOS CON TERNURA */}
      <TenderSteps />

      {/* DIRECTORIO DE FACILITADORES CERTIFICADOS */}
      <section id="terapeutas" className="py-20 max-w-6xl mx-auto px-6 sm:px-8 border-b border-earth-200/70">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Terapeutas con certificación comprobada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 tracking-tight">
            Nuestros facilitadores
          </h2>
          <p className="text-earth-700 text-base">
            Lee sus biografías en primera persona, conoce sus escuelas formativas y selecciona a quien resuene de forma genuina con tu momento presente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </section>

      {/* 3. SECCIÓN: PARA CONSTELADORES ("SOY CONSTELADOR") */}
      <TherapistCommunitySection />

      {/* PIE DE PÁGINA CÁLIDO Y SERENO */}
      <footer className="bg-earth-900 text-earth-200 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <span className="font-serif text-2xl text-white font-semibold">
              consteladores<span className="text-terracotta-400 font-normal">.cl</span>
            </span>
            <p className="text-xs text-earth-300 leading-relaxed">
              Plataforma chilena dedicada al encuentro amoroso y consciente entre personas y facilitadores certificados en constelaciones familiares sistémicas.
            </p>
            <p className="text-xs text-terracotta-300 font-serif italic pt-1">
              "Honrar lo que fue para abrazar lo que viene."
            </p>
          </div>

          <div className="space-y-2 text-xs text-earth-300">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Cuidado y Ética Terapéutica
            </p>
            <p>• Toda sesión es de estricta confidencialidad entre tú y el terapeuta.</p>
            <p>• Las constelaciones son una disciplina de autoconocimiento sistémico y no sustituyen atención médica, psiquiátrica o farmacológica.</p>
          </div>

          <div className="space-y-2 text-xs text-earth-300">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Contacto y Red
            </p>
            <p>Escríbenos directamente con cualquier consulta o para verificar antecedentes:</p>
            <p className="text-white font-medium">contacto@consteladores.cl</p>
            <div className="pt-2">
              <Link
                href="/registro-terapeuta"
                className="text-xs text-terracotta-400 hover:text-terracotta-300 underline font-medium"
              >
                Postulación para consteladores certificados →
              </Link>
            </div>
            <p className="text-[11px] text-earth-400 mt-4">
              Hecho con cariño, rigor y presencia en Chile • © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
