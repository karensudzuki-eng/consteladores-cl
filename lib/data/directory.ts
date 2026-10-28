export type FacilitatorStatusType = "FORMADO" | "SUPERVISADO" | "ACREDITADO";

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
    description: "Reconocimiento de dinámicas vinculares, rupturas, distancia afectiva y reciprocidad entre iguales.",
    painPoint: "¿Sientes que repites dinámicas en tus relaciones o que te cuesta encontrar tu lugar con la pareja?",
  },
  {
    id: "dinero",
    name: "Vocación, Proyectos y Trabajo",
    shortLabel: "Trabajo y Vocación",
    description: "Mirada sistémica hacia el desarrollo profesional, lealtades familiares con el esfuerzo y reconocimiento del valor propio.",
    painPoint: "¿Sientes que tu trabajo no avanza como esperas o que te cuesta tomar la fuerza para tus proyectos?",
  },
  {
    id: "ancestros",
    name: "Familia de Origen y Linaje",
    shortLabel: "Familia y Origen",
    description: "Acompañamiento en el vínculo con madre y padre, duelos pendientes, secretos familiares e inclusión de quienes fueron apartados.",
    painPoint: "¿Sientes que cargas con historias de tu familia que necesitas comprender y dejar en su lugar?",
  },
  {
    id: "organizacional",
    name: "Sistémica Organizacional y Equipos",
    shortLabel: "Empresas y Equipos",
    description: "Mirada del orden, jerarquía y pertenencia en empresas familiares, sociedades y proyectos compartidos.",
    painPoint: "¿Tu equipo o emprendimiento experimenta tensiones de liderazgo o desorden en los roles?",
  },
];

export interface FacilitatorProfile {
  id: string;
  name: string;
  headline: string;
  schoolAndYear: string;
  status: FacilitatorStatusType;
  supervisorName?: string;
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
  bankDetails?: {
    beneficiaryName: string;
    rut: string;
    bank: string;
    accountType: string;
    accountNumber: string;
    email: string;
  };
  reviews: {
    author: string;
    city: string;
    text: string;
    theme: string;
    date: string;
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

// Lista de facilitadores acreditados según criterios públicos
export const directoryFacilitators: FacilitatorProfile[] = [
  {
    id: "karen-sudzuki-icalma",
    name: "Karen Sudzuki",
    headline: "Facilitadora Acreditada en Constelaciones Familiares y Organizacionales",
    schoolAndYear: "Centro de Formación Icalma · Formación Sistémica",
    status: "ACREDITADO",
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
    bio: "Facilitadora con más de 6 años de experiencia en acompañamiento individual y organizacional. Mi labor consiste en abrir un espacio de respeto y escucha para mirar el orden en el sistema familiar, reconociendo a quienes llegaron antes y permitiendo que cada persona ocupe su propio lugar en la vida.",
    approachDetails: "Formada en Centro de Formación Icalma con enfoque sistémico y fenomenológico.",
    nextAvailableDate: "A coordinar en agenda",
    isValidated: true,
    availableHours: ["10:00", "11:30", "15:00", "16:30", "18:00", "19:30"],
    googleCalendarUrl: "",
    bankDetails: {
      beneficiaryName: "Karen Valeria Sudzuki Toro",
      rut: "13.298.884-6",
      bank: "Mercado Pago",
      accountType: "Cuenta Vista",
      accountNumber: "1038886585",
      email: "karen.sudzuki@gmail.com",
    },
    reviews: [
      {
        author: "Consultante",
        city: "Región Metropolitana",
        text: "La sesión me permitió observar con claridad una dinámica que llevaba años repitiendo en mis vínculos. El espacio fue de mucho respeto y contención.",
        theme: "Pareja y Vínculos",
        date: "marzo 2026",
      },
      {
        author: "Consultante",
        city: "Región de Valparaíso",
        text: "Pudimos mirar un aspecto familiar y vocacional complejo. Me sentí acompañado durante todo el proceso por Google Meet.",
        theme: "Vocación y Trabajo",
        date: "enero 2026",
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

export const upcomingWorkshopsList: SystemicWorkshop[] = [];
