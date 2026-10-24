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

export const directoryFacilitators: FacilitatorProfile[] = [
  {
    id: "maria-paz-vial",
    name: "María Paz Vial",
    headline: "Facilitadora Sistémica Senior · Duelo y Linaje Femenino",
    schoolAndYear: "Formada en el Instituto Bert Hellinger (2016)",
    specialties: ["ancestros", "pareja", "sintomas"],
    modalities: ["online", "presencial", "taller_grupal"],
    city: "Santiago (Providencia)",
    locationDetails: "Consulta en Providencia (Metro Manuel Montt) & Online vía Google Meet",
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    experienceYears: 8,
    completedSessions: 840,
    rating: 4.9,
    reviewCount: 38,
    bio: "Acompaño procesos de reconciliación profunda con las raíces familiares. Me especializo en liberar lealtades invisibles en el linaje materno, duelos congelados e interrupciones en el movimiento hacia los padres.",
    approachDetails: "Trabajo fenomenológico clásico con figuras sistémicas, anclajes de suelo y visualizaciones guiadas. Espacio de máxima calidez y confidencialidad.",
    nextAvailableDate: "Jueves 29 de Octubre",
    isValidated: true,
    reviews: [
      {
        author: "Claudia M.",
        city: "Santiago",
        theme: "Linaje y Madre",
        text: "Pude mirar a mi madre con ojos de compasión después de 15 años de distancia emocional. El orden que se restableció en la sesión me devolvió una paz que no conocía.",
      },
      {
        author: "Verónica R.",
        city: "Viña del Mar",
        theme: "Duelo Gestacional",
        text: "Darle un lugar a mi bebé en el sistema familiar fue el inicio de mi sanación real. La delicadeza de María Paz no tiene precio.",
      },
    ],
    upcomingWorkshops: [
      {
        id: "taller-mpv-nov",
        title: "Taller Vivencial: Tomar la Fuerza del Linaje",
        date: "Sábado 15 de Noviembre · 10:00 a 14:00",
        city: "Santiago",
        location: "Espacio Sagrado, Providencia",
        priceClp: 35000,
        depositClp: 7000,
        spotsLeft: 4,
      },
    ],
  },
  {
    id: "rodrigo-san-martin",
    name: "Rodrigo San Martín",
    headline: "Constelador Sistémico · Prosperidad, Dinero y Vocación",
    schoolAndYear: "Centro Latinoamericano de Constelaciones (2018)",
    specialties: ["dinero", "organizacional", "pareja"],
    modalities: ["online", "presencial", "taller_grupal"],
    city: "Santiago (Las Condes) & Concepción",
    locationDetails: "Consulta en Las Condes & Sesiones Online en todo Chile",
    totalPriceClp: 48000,
    depositPriceClp: 9600,
    balancePriceClp: 38400,
    experienceYears: 6,
    completedSessions: 620,
    rating: 5.0,
    reviewCount: 29,
    bio: "Facilitador enfocado en desbloquear el flujo del dinero, el éxito laboral y la fuerza del padre. Ayudo a emprendedores, profesionales y familias a salir de dinámicas de quiebra repetitiva y escasez aprendida.",
    approachDetails: "Integración de pedagogía sistémica de Bert Hellinger con dinámicas de campo para decisiones empresariales y proyectos de vida.",
    nextAvailableDate: "Viernes 30 de Octubre",
    isValidated: true,
    reviews: [
      {
        author: "Fernando A.",
        city: "Concepción",
        theme: "Dinero y Carrera",
        text: "Tenía un patrón donde cada vez que facturaba bien, surgía una deuda imprevista. Descubrí una lealtad con una quiebra de mi abuelo paterno. Tres meses después mi relación con el dinero cambió por completo.",
      },
      {
        author: "Sebastián T.",
        city: "Santiago",
        theme: "Sociedad Comercial",
        text: "La mirada sistémica que me entregó Rodrigo nos evitó un litigio de años con mi socio. Puso orden donde solo había reproche.",
      },
    ],
    upcomingWorkshops: [
      {
        id: "taller-rsm-nov",
        title: "Taller Grupal: Reconciliarse con el Éxito y la Abundancia",
        date: "Sábado 22 de Noviembre · 15:00 a 19:30",
        city: "Santiago",
        location: "Centro Sistémico Las Condes",
        priceClp: 38000,
        depositClp: 7600,
        spotsLeft: 6,
      },
    ],
  },
  {
    id: "camila-echeverria",
    name: "Camila Echeverría",
    headline: "Psicóloga y Facilitadora Sistémica · Pareja y Síntomas",
    schoolAndYear: "Escuela Gestalt & Formación Hellinger Sciencia (2019)",
    specialties: ["pareja", "sintomas", "ancestros"],
    modalities: ["online", "presencial"],
    city: "Viña del Mar / Valparaíso",
    locationDetails: "Consulta en Viña del Mar (1 Norte) & Online para todo Chile",
    totalPriceClp: 45000,
    depositPriceClp: 9000,
    balancePriceClp: 36000,
    experienceYears: 5,
    completedSessions: 510,
    rating: 4.9,
    reviewCount: 31,
    bio: "Combino la profundidad del enfoque sistémico con la contención clínica para abordar crisis de pareja, patrones de abandono y síntomas psicosomáticos recurrentes.",
    approachDetails: "Uso de anclajes espaciales, muñecos sistémicos en alta definición online y trabajo corporal de respiración consciente.",
    nextAvailableDate: "Lunes 2 de Noviembre",
    isValidated: true,
    reviews: [
      {
        author: "Marcela P.",
        city: "Valparaíso",
        theme: "Patrones de Pareja",
        text: "Entendí por qué siempre me vinculaba con hombres no disponibles emocionalmente. Estaba buscando salvar a mi papá ausente. Camila es sumamente clara, empática y respetuosa.",
      },
      {
        author: "Jorge L.",
        city: "Santiago",
        theme: "Ansiedad Persistente",
        text: "La sesión online fue reveladora. Pude sentir en el cuerpo el alivio de no tener que llevar cargas ajenas.",
      },
    ],
  },
  {
    id: "ignacio-larrain",
    name: "Ignacio Larraín",
    headline: "Facilitador en Constelaciones Organizacionales y Familiares",
    schoolAndYear: "Instituto de Estudios Sistémicos de Barcelona & Chile (2017)",
    specialties: ["organizacional", "dinero", "ancestros"],
    modalities: ["online", "presencial", "taller_grupal"],
    city: "Santiago (Vitacura / Las Condes)",
    locationDetails: "Sesiones presenciales en Vitacura & Consultoría Organizacional Online",
    totalPriceClp: 65000,
    depositPriceClp: 13000,
    balancePriceClp: 52000,
    experienceYears: 7,
    completedSessions: 470,
    rating: 4.9,
    reviewCount: 22,
    bio: "Especialista en diagnosticar dinámicas invisibles en empresas familiares, liderazgos en tensión y herencias complejas. Ayudo a separar los roles afectivos de las funciones operativas.",
    approachDetails: "Configuración sistémica con representantes o plantillas arquetípicas para destrabar decisiones estratégicas de alta inversión.",
    nextAvailableDate: "Miércoles 4 de Noviembre",
    isValidated: true,
    reviews: [
      {
        author: "Eduardo M.",
        city: "Santiago",
        theme: "Empresa Familiar",
        text: "Resolver el orden entre mi hermano mayor y yo fue la clave para que la empresa volviera a crecer sin destruir nuestra relación filial.",
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

export const upcomingWorkshopsList: SystemicWorkshop[] = [
  {
    id: "ws-1",
    title: "Taller Vivencial: Sanar el Vínculo con los Padres y las Raíces",
    facilitatorName: "María Paz Vial",
    facilitatorId: "maria-paz-vial",
    date: "Sábado 15 de Noviembre · 10:00 a 14:00 hrs",
    city: "Santiago",
    location: "Espacio Sagrado, Providencia (Metro Manuel Montt)",
    modality: "presencial",
    theme: "Linaje y Padres",
    totalPriceClp: 35000,
    depositPriceClp: 7000,
    spotsTotal: 14,
    spotsLeft: 4,
    description: "Una jornada presencial de 4 horas para constelar tu tema o participar como representante activo. Incluye coffee break y contención personalizada.",
  },
  {
    id: "ws-2",
    title: "Taller Online: El Dinero, el Éxito y la Fuerza del Padre",
    facilitatorName: "Rodrigo San Martín",
    facilitatorId: "rodrigo-san-martin",
    date: "Sábado 22 de Noviembre · 15:00 a 19:30 hrs",
    city: "Online Chile",
    location: "Sala interactiva privada vía Google Meet",
    modality: "online",
    theme: "Dinero y Prosperidad",
    totalPriceClp: 38000,
    depositPriceClp: 7600,
    spotsTotal: 12,
    spotsLeft: 5,
    description: "Taller grupal online para comprender por qué el dinero es energía de vida y cómo la reconciliación con el linaje paterno abre las puertas a la vocación real.",
  },
];
