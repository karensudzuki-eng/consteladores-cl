import React from "react";
import Link from "next/link";
import { HeroCarousel } from "@/components/landing/HeroCarousel";
import { TenderSteps } from "@/components/landing/TenderSteps";
import { TherapistCard, TherapistData } from "@/components/landing/TherapistCard";
import { createAdminClient } from "@/lib/supabase/admin";

// Datos de terapeutas iniciales para el MVP (si la BD aún no tiene registros)
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
    headline: "Constelador Familiar • Vocación, Éxito y Órdenes del Amor",
    bio: "Mi labor es ayudarte a destrabar lealtades invisibles que frenan tu prosperidad y tu desarrollo en el mundo. Un trabajo sobrio, respetuoso y muy clarificador.",
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
      
      {/* Barra de navegación superior sobria y acogedora */}
      <header className="sticky top-0 z-40 bg-earth-50/90 backdrop-blur-md border-b border-earth-200/60">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500 group-hover:scale-125 transition-transform" />
            <span className="font-serif text-2xl tracking-tight text-earth-900 font-semibold">
              consteladores<span className="text-terracotta-600 font-normal">.cl</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-earth-700 font-medium">
            <a href="#que-es" className="hover:text-terracotta-600 transition-colors">
              ¿Qué es una constelación?
            </a>
            <a href="#pasos" className="hover:text-terracotta-600 transition-colors">
              Cómo funciona
            </a>
            <a href="#terapeutas" className="hover:text-terracotta-600 transition-colors">
              Facilitadores certificados
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/registro-terapeuta"
              className="text-xs sm:text-sm font-medium text-earth-700 hover:text-terracotta-600 px-3.5 py-2 transition-colors"
            >
              Soy Constelador
            </Link>
            <a
              href="#terapeutas"
              className="px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              Buscar facilitador
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section con Carrusel de Calma */}
      <HeroCarousel />

      {/* Sección intermedia: Una reflexión sincera */}
      <section id="que-es" className="py-20 max-w-4xl mx-auto px-6 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-olive-700 font-semibold">
          Un refugio para tu historia
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 leading-tight">
          "Hay dolores que no nacieron en ti, pero sí tienen en ti la oportunidad de encontrar paz."
        </h2>
        <p className="text-earth-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          En las constelaciones no venimos a juzgar a quienes estuvieron antes, ni a buscar culpables.
          Venimos a mirar con los ojos del corazón aquello que quedó excluido o silenciado, para que puedas caminar con tu propia vida, libre y en paz.
        </p>
      </section>

      {/* Pasos a seguir (explicados con ternura) */}
      <TenderSteps />

      {/* Directorio de Facilitadores Certificados */}
      <section id="terapeutas" className="py-20 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Terapeutas con acreditación verificada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 tracking-tight">
            Nuestros facilitadores
          </h2>
          <p className="text-earth-700 text-base">
            Cada facilitador listado aquí ha completado su formación en escuelas reconocidas de constelaciones y cuenta con certificación revisada manualmente por nuestro equipo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>
      </section>

      {/* Llamado para Terapeutas */}
      <section className="bg-earth-100/70 border-t border-earth-200/80 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-olive-700 font-semibold">
            Espacio para profesionales
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-earth-900">
            ¿Eres facilitador en constelaciones familiares certificado?
          </h3>
          <p className="text-earth-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Te invitamos a sumarte a este espacio cuidado. Podrás crear tu perfil, subir tu certificado de acreditación y comenzar a recibir a personas que buscan un acompañamiento consciente.
          </p>
          <div className="pt-2">
            <Link
              href="/registro-terapeuta"
              className="inline-flex items-center px-6 py-3 rounded-full bg-earth-900 hover:bg-earth-800 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Postular mi certificación como facilitador
            </Link>
          </div>
        </div>
      </section>

      {/* Pie de página cálido y humano */}
      <footer className="bg-earth-900 text-earth-200 py-16 border-t border-earth-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <span className="font-serif text-2xl text-white font-semibold">
              consteladores<span className="text-terracotta-400 font-normal">.cl</span>
            </span>
            <p className="text-xs text-earth-300 leading-relaxed">
              Plataforma chilena dedicada al encuentro amoroso y consciente entre personas y facilitadores certificados en constelaciones familiares sistémicas.
            </p>
          </div>

          <div className="space-y-2 text-xs text-earth-300">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Cuidado y respeto
            </p>
            <p>• Toda sesión es de estricta confidencialidad entre tú y el terapeuta.</p>
            <p>• Las constelaciones son un camino de autoconocimiento complementario y no reemplazan atención médica o psiquiátrica clínica.</p>
          </div>

          <div className="space-y-2 text-xs text-earth-300">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Contacto humano
            </p>
            <p>Escríbenos directamente con cualquier duda o inquietud a:</p>
            <p className="text-white font-medium">contacto@consteladores.cl</p>
            <p className="text-[11px] text-earth-400 mt-4">
              Hecho con cariño y presencia en Chile • © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
