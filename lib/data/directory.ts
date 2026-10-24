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
  availableHours?: string[];
  googleCalendarUrl?: string;
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

// Lista de facilitadores certificados (perfil de Karen Sudzuki verificado por Centro Icalma + facilitadores aprobados)
export const directoryFacilitators: FacilitatorProfile[] = [
  {
    id: "karen-sudzuki-icalma",
    name: "Karen Sudzuki",
    headline: "Facilitadora en Constelaciones Familiares y Organizacionales",
    schoolAndYear: "Centro de Formación Icalma · Formación Sistémica",
    specialties: ["ancestros", "pareja", "dinero", "organizacional"],
    modalities: ["online"],
    city: "Santiago / Online Chile",
    locationDetails: "Online vía Google Meet",
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    experienceYears: 6,
    completedSessions: 92,
    rating: 5.0,
    reviewCount: 24,
    bio: "Consteladora familiar y organizacional con más de 6 años de experiencia en acompañamiento individual y empresarial. Ayudo a mirar con respeto y amor los nudos del sistema familiar, desarticulando lealtades inconscientes y abriendo camino a la paz y la prosperidad.",
    approachDetails: "Formada en Centro de Formación Icalma con enfoque sistémico y fenomenológico.",
    nextAvailableDate: "A coordinar en agenda",
    isValidated: true,
    availableHours: ["10:00", "11:30", "15:00", "16:30", "18:00", "19:30"],
    googleCalendarUrl: "", // Enlace opcional de Google Calendar Appointment Schedule de Karen
    reviews: [
      {
        author: "Camila R.",
        city: "Santiago",
        text: "La constelación con Karen me permitió ver con total claridad un nudo que llevaba años cargando en mis relaciones. Su mirada fue súper acogedora, respetuosa y certera.",
        theme: "Pareja y Vínculos",
      },
      {
        author: "Marcelo T.",
        city: "Viña del Mar",
        text: "Pudimos mirar un bloqueo laboral y familiar muy profundo. Me sentí completamente sostenido en todo el proceso por Google Meet. Muy agradecido.",
        theme: "Vocación y Dinero",
      },
    ],
  },
];

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
