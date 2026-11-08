export interface CMSWorkshop {
  id: string;
  title: string;
  description: string;
  importantNote: string;
  date: string;
  time: string;
  facilitators: string;
  address: string;
  city: string;
  price: string;
  modality?: "presencial" | "online";
  logoType: "consteladores" | "icalma" | "vortice" | "custom" | "none";
  logoUrl?: string;
  flyerUrl: string;
  phoneContact: string;
  isActive: boolean;
}

export interface CMSHeroSlide {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface CMSTestimonial {
  id: string;
  quote: string;
  attribution: string;
}

export interface CMSValuePillar {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl: string;
}

export interface CMSAbout {
  title: string;
  description: string;
  imageUrl?: string;
  pillars?: CMSValuePillar[];
}

export interface CMSFacilitator {
  id: string;
  name: string;
  headline: string;
  role?: "Facilitador" | "Practicante" | "Consultante" | string;
  schoolAndYear: string;
  city: string;
  modality?: string;
  price: string;
  bio: string;
  imageUrl?: string;
  experienceYears: number;
  specialties?: string[];
  email?: string;
  phone?: string;
  certificationUrl?: string;
  isActive?: boolean;
}

export interface CMSSettings {
  siteLogoUrl: string;
  whatsappNumber: string;
  supportEmail: string;
  telegramUrl: string;
  telegramImage: string;
  telegramBadge: string;
  telegramDescription: string;

  heroTitle: string;
  heroSubtitle: string;
  heroBgImage: string;
  heroOverlayOpacity: number;
  heroMusicUrl: string;

  // Sesión individual
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: string;
  serviceDuration: string;
  serviceImage: string;
  serviceOnlineMaterials: string[];
  serviceOnlineRequirements: string;

  // Acerca del encuentro de talleres
  workshopAboutTitle: string;
  workshopAboutDescription: string;
  workshopAboutNote: string;

  // Si eres facilitador y quieres pertenecer al equipo
  joinTeamTitle: string;
  joinTeamDescription: string;
  joinTeamImageUrl: string;
  joinTeamPostulateUrl: string;
  joinTeamPostulateLabel: string;

  // Textos del formulario de postulación
  postulationTitle?: string;
  postulationDescription?: string;
  postulationSuccessNote?: string;

  about: CMSAbout;

  bankDetails: {
    beneficiaryName: string;
    rut: string;
    bank: string;
    accountType: string;
    accountNumber: string;
    email: string;
  };
}

export interface CMSContent {
  updatedAt?: number;
  settings: CMSSettings;
  workshops: CMSWorkshop[];
  heroSlides: CMSHeroSlide[];
  testimonials: CMSTestimonial[];
  facilitators: CMSFacilitator[];
}

export const DEFAULT_CMS_CONTENT: CMSContent = {
  settings: {
    siteLogoUrl: "/images/logo-consteladores.jpg",
    whatsappNumber: "+56 9 4193 9363",
    supportEmail: "contacto@consteladores.cl",
    telegramUrl: "https://web.telegram.org/a/#-5157628559",
    telegramImage: "/images/comunidad-encuentro.png",
    telegramBadge: "Comunidad de Consteladores en Telegram",
    telegramDescription:
      "Únete a nuestro espacio seguro de acompañamiento, lecturas y encuentros sistémicos entre pares.",

    heroTitle: "¿Sientes que cargas con un peso que no te pertenece?",
    heroSubtitle:
      "Consteladores: un espacio cuidado para mirar el orden de tu sistema familiar y retomar tu propio lugar con calma.",
    heroBgImage: "/images/mirar-historia-sanar.png",
    heroOverlayOpacity: 0.8,
    heroMusicUrl: "",

    serviceTitle: "Sesión Individual",
    serviceDescription:
      "La sesión puede ser individual online, presencial o por videollamada. Su objetivo es identificar y resolver bloqueos emocionales, patrones repetitivos, duelos o conflictos familiares, de pareja y laborales no resueltos, donde un terapeuta constelador te acompañará a mirar tu situación, traer una imagen del conflicto y, desde la comprensión, algo dentro se alivia y se calma el sistema.",
    servicePrice: "$40.000",
    serviceDuration: "1 hora aprox.",
    serviceImage: "/images/mirar-historia-sanar.png",
    serviceOnlineMaterials: [
      "6 papelitos blancos de 7x7 cm aproximadamente, cada uno con una flecha dibujada con plumón en color oscuro.",
      "Pañuelos desechables o similar.",
    ],
    serviceOnlineRequirements:
      "Contar con un espacio privado e internet a través de computador o teléfono móvil.",

    workshopAboutTitle: "Talleres",
    workshopAboutDescription:
      'Te invitamos a un taller de constelaciones donde, a través de la escenificación de dinámicas personales, podrás mirar tu vida desde una perspectiva más profunda y liberadora.\n\nLos casos a constelar se seleccionarán durante el encuentro. Aunque no todos los asistentes constelarán de forma individual, la experiencia demuestra que el trabajo de cada compañero resuena con nuestras propias vivencias, permitiendo que todos los presentes vivan un proceso de aprendizaje y transformación compartida: "Cuando tú constelas, todos constelamos".',
    workshopAboutNote: "",

    joinTeamTitle: "Si eres facilitador (o practicante) y quieres pertenecer al equipo",
    joinTeamDescription: "Postula para ser parte de nuestra red",
    joinTeamImageUrl: "/images/comunidad-encuentro.png",
    joinTeamPostulateUrl: "/registro-terapeuta",
    joinTeamPostulateLabel: "Postular facilitador / practicante",

    postulationTitle: "Postulación a la Red de Consteladores",
    postulationDescription: "Postula para formar parte de nuestro equipo de facilitadores y practicantes.",
    postulationSuccessNote: "Tu postulación será evaluada. En caso de necesitar mayor información nos contactaremos contigo.",

    about: {
      title: "Quiénes somos",
      description:
        "consteladores.cl es una plataforma orientada a conectar a personas que buscan mirar y ordenar dinámicas de su sistema familiar con facilitadores acreditados y con respaldo docente Icalma Constelaciones (formación desde 2006).",
      imageUrl: "/images/arbol-generaciones.png",
      pillars: [
        {
          id: "respeto",
          title: "Respeto y Confidencialidad",
          description:
            "Cada historia y motivo de consulta es tratado como un espacio sagrado, bajo el más riguroso resguardo ético y privacidad.",
          imageUrl: "/images/mirar-historia-sanar.png",
          linkUrl: "/#servicios",
        },
        {
          id: "mirada",
          title: "Mirada Fenomenológica",
          description:
            "No imponemos interpretaciones ni juicios morales; observamos lo que se muestra y acogemos lo que emerge con compasión.",
          imageUrl: "/images/arbol-generaciones.png",
          linkUrl: "/#talleres",
        },
        {
          id: "comunidad",
          title: "Comunidad Viva",
          description:
            "Fomentamos el encuentro continuo de facilitadores, practicantes y consultantes para aprender juntos y apoyarnos mutuamente.",
          imageUrl: "/images/comunidad-encuentro.png",
          linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx",
        },
      ],
    },

    bankDetails: {
      beneficiaryName: "Karen Valeria Sudzuki Toro",
      rut: "13.298.884-6",
      bank: "Mercado Pago",
      accountType: "Cuenta Vista",
      accountNumber: "1038886585",
      email: "karen.sudzuki@gmail.com",
    },
  },
  heroSlides: [
    {
      id: "slide-1",
      imageUrl: "/images/mirar-historia-sanar.png",
      title: "¿Qué es una constelación familiar?",
      description:
        "Es un abordaje vivencial y fenomenológico donde, guiado por un facilitador, puedes mirar la dinámica oculta de tu sistema y dar un paso hacia el orden y la reconciliación.",
    },
    {
      id: "slide-2",
      imageUrl: "/images/arbol-generaciones.png",
      title: "Reconocer el orden y dar lugar a lo excluido",
      description:
        "Al traer una imagen clara del conflicto y reconocer a quienes llegaron antes, algo dentro se alivia y el sistema familiar se calma.",
    },
    {
      id: "slide-3",
      imageUrl: "/images/comunidad-encuentro.png",
      title: "Nuevas posibilidades y alivio interior",
      description:
        "Desde la comprensión y el respeto por tu propia historia, dejas de cargar lealtades o pesos que no te corresponden para retomar tu propia vida.",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      quote:
        "La sesión me permitió observar con serenidad la dinámica que se repetía en mis relaciones y comprender el lugar que ocupo en mi sistema de origen. El espacio fue de profundo respeto.",
      attribution: "Consultante, Región Metropolitana · marzo 2026",
    },
    {
      id: "test-2",
      quote:
        "Tenía dudas sobre cómo se desarrollaría el acompañamiento online. El trabajo con anclajes y figuras sistémicas fue sobrio, claro y muy respetuoso de mis tiempos.",
      attribution: "Consultante, Región de Valparaíso · enero 2026",
    },
    {
      id: "test-3",
      quote:
        "Valoro especialmente la claridad: no te prometen soluciones mágicas, sino que te acompañan a mirar lo que necesitas ordenar. El alivio se siente de inmediato.",
      attribution: "Consultante, Región del Biobío · febrero 2026",
    },
  ],
  facilitators: [
    {
      id: "karen-sudzuki",
      name: "Karen Sudzuki",
      headline: "Facilitadora Acreditada en Constelaciones Familiares y Organizacionales",
      role: "Facilitador",
      schoolAndYear: "Centro de Formación Icalma · Formación Sistémica",
      city: "Santiago / Online Chile",
      modality: "Online (Google Meet)",
      price: "$40.000",
      experienceYears: 6,
      bio: "Facilitadora con más de 6 años de experiencia en acompañamiento individual y organizacional. Mi labor consiste en abrir un espacio de respeto y escucha para mirar el orden en el sistema familiar, reconociendo a quienes llegaron antes y permitiendo que cada persona ocupe su propio lugar en la vida.",
      imageUrl: "",
      specialties: ["Familia y Origen", "Pareja y Vínculos", "Trabajo y Vocación", "Empresas y Equipos"],
      email: "karen.sudzuki@gmail.com",
      phone: "+56 9 4193 9363",
      certificationUrl: "",
      isActive: true,
    },
    {
      id: "erika-alert",
      name: "Erika Alert",
      headline: "Facilitadora de Constelaciones Familiares y Talleres Vivenciales",
      role: "Facilitador",
      schoolAndYear: "Formación en Constelaciones Sistémicas",
      city: "Concón / Valparaíso y Online",
      modality: "Online y Presencial",
      price: "$40.000",
      experienceYears: 7,
      bio: "Facilitadora con amplia experiencia en constelaciones familiares grupales e individuales. Acompaña procesos de reconciliación y comprensión de nudos familiares en la V Región y vía online.",
      imageUrl: "",
      specialties: ["Familia y Origen", "Pareja y Vínculos", "Vocación y Trabajo"],
      email: "contacto@consteladores.cl",
      phone: "+56 9 4193 9363",
      certificationUrl: "",
      isActive: true,
    },
  ],
  workshops: [
    {
      id: "taller-concon-enero",
      title: "Sana tu historia y conecta con nuevas posibilidades. ✨",
      description:
        "Te invitamos a un taller vivencial donde, a través de la escenificación de dinámicas personales, podrás mirar tu vida desde una perspectiva más profunda y liberadora.",
      importantNote:
        '⚠️ Los casos a constelar se seleccionarán durante el encuentro. Aunque no todos los asistentes constelarán de forma individual, la experiencia demuestra que el trabajo de cada compañero resuena con nuestras propias vivencias, permitiendo que todos los presentes vivan un proceso de aprendizaje y transformación compartida. "Cuando tú constelas, todos constelamos".',
      date: "16 de enero de 2026",
      time: "10:00 a 14:00 hrs",
      facilitators: "Erika Alert y Karen Sudzuki",
      address: "Edmundo Eluchans 3047, ofic. 22, Concón",
      city: "Concón, Valparaíso",
      price: "$35.000",
      modality: "presencial",
      logoType: "icalma",
      logoUrl: "",
      flyerUrl: "/images/arbol-generaciones.png",
      phoneContact: "+56 9 4193 9363",
      isActive: true,
    },
  ],
};
