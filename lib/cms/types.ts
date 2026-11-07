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
  logoType: "consteladores" | "icalma" | "vortice" | "custom";
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

export interface CMSAbout {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface CMSFacilitator {
  id: string;
  name: string;
  headline: string;
  schoolAndYear: string;
  city: string;
  price: string;
  bio: string;
  imageUrl?: string;
  experienceYears: number;
  specialties: string[];
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

  // Si eres facilitador y quieres pertenecer al equipo
  joinTeamTitle: string;
  joinTeamDescription: string;
  joinTeamImageUrl: string;
  joinTeamPostulateUrl: string;
  joinTeamPostulateLabel: string;

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
      "Un espacio cuidado para mirar el orden de tu sistema familiar y retomar tu propio lugar con calma.",
    heroBgImage: "/images/mirar-historia-sanar.png",
    heroOverlayOpacity: 0.8,
    heroMusicUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c89b2713f0.mp3?filename=meditation-relaxing-ambient-112191.mp3",

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

    joinTeamTitle: "Si eres facilitador y quieres pertenecer al equipo",
    joinTeamDescription:
      "Buscamos facilitadores comprometidos con la ética sistémica y el cuidado humano. Postula para formar parte de nuestra red, o únete a nuestros espacios comunitarios de profundización.",
    joinTeamImageUrl: "/images/comunidad-encuentro.png",
    joinTeamPostulateUrl: "/registro-terapeuta",
    joinTeamPostulateLabel: "Postular como facilitador",

    about: {
      title: "Quiénes somos",
      description:
        "consteladores.cl es una plataforma orientada a conectar a personas que buscan mirar y ordenar dinámicas de su sistema familiar con facilitadores acreditados y con respaldo docente Icalma Constelaciones (formación desde 2006).",
      imageUrl: "/images/arbol-generaciones.png",
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
      schoolAndYear: "Centro de Formación Icalma · Formación Sistémica",
      city: "Santiago / Online Chile",
      price: "$40.000",
      experienceYears: 6,
      bio: "Facilitadora con más de 6 años de experiencia en acompañamiento individual y organizacional. Mi labor consiste en abrir un espacio de respeto y escucha para mirar el orden en el sistema familiar, reconociendo a quienes llegaron antes y permitiendo que cada persona ocupe su propio lugar en la vida.",
      imageUrl: "",
      specialties: ["Familia y Origen", "Pareja y Vínculos", "Trabajo y Vocación", "Empresas y Equipos"],
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
