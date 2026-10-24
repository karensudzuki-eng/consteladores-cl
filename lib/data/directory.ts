export interface SpecialtyOption {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  painPoint: string;
}

export const specialtiesList: SpecialtyOption[] = [
  {
    id: "pareja",
    name: "Pareja y Vínculos Afectivos",
    shortLabel: "Pareja y Vínculos",
    description: "Repetición de patrones afectivos, rupturas dolorosas, celos, infidelidades y dificultad para consolidar un vínculo.",
    painPoint: "¿Sientes que siempre atraes el mismo tipo de relación o que das mucho más de lo que recibes?",
  },
  {
    id: "dinero",
    name: "Prosperidad, Vocación y Dinero",
    shortLabel: "Dinero y Éxito",
    description: "Lealtades de carencia, autosabotaje profesional, miedo al éxito y bloqueos para retener o hacer crecer el dinero.",
    painPoint: "¿Trabajas incansablemente pero el dinero se te escapa o sientes culpa inconsciente al prosperar?",
  },
  {
    id: "ancestros",
    name: "Linaje Familiar, Padres y Duelo",
    shortLabel: "Familia y Linaje",
    description: "Sanación del vínculo con la madre y el padre, duelos no cerrados, secretos familiares e hijos no reconocidos.",
    painPoint: "¿Cargas con una tristeza o enojo que intuyes que no empezó en ti sino en tus padres o abuelos?",
  },
  {
    id: "sintomas",
    name: "Síntomas Físicos y Emocionales",
    shortLabel: "Síntomas y Salud",
    description: "Comprensión del sentido biológico y sistémico detrás de ansiedades crónicas, fobias o malestares corporales recurrentes.",
    painPoint: "¿Tu cuerpo te está pidiendo a gritos que mires algo del sistema que fue silenciado en el pasado?",
  },
  {
    id: "organizacional",
    name: "Sistémica Organizacional y Equipos",
    shortLabel: "Empresas y Proyectos",
    description: "Diagnóstico sistémico de empresas familiares, conflictos societarios, liderazgo y alineación de equipos.",
    painPoint: "¿Tu emprendimiento o equipo está estancado por dinámicas jerárquicas o desorden entre socios?",
  },
];

export interface FacilitatorProfile {
  id: string;
  name: string;
  headline: string;
  schoolAndYear: string;
  specialties: string[];
  modalities: ("online" | "presencial" | "taller_grupal")[];
  city: string;
  locationDetails: string;
  totalPriceClp: number;
  depositPriceClp: number; // 20%
  balancePriceClp: number; // 80%
  experienceYears: number;
  completedSessions: number;
  rating: number;
  reviewCount: number;
  bio: string;
  approachDetails: string;
  nextAvailableDate: string;
  isValidated: boolean;
  reviews: {
    author: string;
    city: string;
    text: string;
    theme: string;
  }[];
  upcomingWorkshops?: {
    id: string;
    title: string;
    date: string;
    city: string;
    location: string;
    priceClp: number;
    depositClp: number;
    spotsLeft: number;
  }[];
}

// Lista dinámica alimentada desde la base de datos Supabase (constellation_therapists con status='approved')
// Inicializada vacía para que no contenga datos ficticios ni referenciales
export const directoryFacilitators: FacilitatorProfile[] = [];

export interface SystemicWorkshop {
  id: string;
  title: string;
  facilitatorName: string;
  facilitatorId: string;
  date: string;
  city: string;
  location: string;
  modality: "presencial" | "online";
  theme: string;
  totalPriceClp: number;
  depositPriceClp: number;
  spotsTotal: number;
  spotsLeft: number;
  description: string;
}

// Talleres dinámicos (inicialmente vacío hasta que los facilitadores publiquen en base de datos)
export const upcomingWorkshopsList: SystemicWorkshop[] = [];
