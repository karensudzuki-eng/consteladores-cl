import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Acuarela Orgánica & Refugio Cálido
        cream: {
          50: "#FDFBF7",
          100: "#FBF7F2", // Fondo crema suave principal
          200: "#F5EFE6",
          300: "#ECE3D5",
        },
        sage: {
          50: "#F4F7F5",
          soft: "#E9EFEA", // Verde salvia suave para alternar secciones
          100: "#E5ECE7",
          200: "#CCD9CF",
          500: "#6E8B76", // Verde salvia suave
          deep: "#5E7A6A", // Verde salvia profundo para acentos e íconos
          600: "#5B7B66",
          700: "#486352",
          dark: "#2F3E36", // Verde salvia muy oscuro para la sección comunidad
          800: "#394E41",
        },
        parchment: {
          50: "#FCFAF7",
          100: "#FBF7F2", // Fondo principal marfil pergamino unificado
          200: "#F3EFE9",
          300: "#E8E2D8",
        },
        terracotta: {
          50: "#FDF7F4",
          100: "#F9ECE6",
          200: "#F2D8CC",
          300: "#E8A793",
          400: "#DE7E64",
          accent: "#D9664A", // Terracota principal de acento
          500: "#D66847", // Terracota cálida
          600: "#BF5435",
          700: "#A34327",
        },
        ochre: {
          50: "#FEF9EE",
          soft: "#E8C58A", // Ocre suave para destellos y fondos
          100: "#FCF2DA",
          200: "#F7E1B0",
          500: "#D49B4B", // Ocre suave de acuarela
          600: "#BA8033",
          700: "#9A6523",
        },
        indigo: {
          warm: "#2E3A5A", // Azul índigo profundo pero cálido
          soft: "#45547C",
          50: "#F2F4F9",
          100: "#E5E9F3",
        },
        sand: {
          50: "#FAF7F2",
          soft: "#F3E9DC", // Tono arena suave para alternancia
          100: "#F3ECE2",
          200: "#E7DECE",
          300: "#D5C8B4",
          500: "#9E8C76",
        },
        earth: {
          700: "#4A423D",
          800: "#38322E", // Texto de lectura noble
          900: "#27221F", // Tinta profunda y cálida
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        cursive: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
        card: "16px",
        pill: "9999px", // Formato píldora redondeado suave
        full: "9999px",
      },
      boxShadow: {
        watercolor: "0 4px 20px -2px rgba(214, 104, 71, 0.08), 0 2px 6px -1px rgba(46, 58, 90, 0.04)",
        card: "0 2px 12px rgba(56, 50, 46, 0.05)",
        hover: "0 8px 24px -4px rgba(214, 104, 71, 0.12), 0 2px 6px rgba(46, 58, 90, 0.04)",
      },
      keyframes: {
        gentleSway: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(1.2deg) scale(1.01)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 4px 14px rgba(214, 104, 71, 0.25)" },
          "50%": { transform: "scale(1.025)", boxShadow: "0 8px 24px rgba(214, 104, 71, 0.38)" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "gentle-sway": "gentleSway 14s ease-in-out infinite",
        "breathe-slow": "breathe 3.5s ease-in-out infinite",
        "fade-slide-up": "fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
