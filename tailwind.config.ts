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
        parchment: {
          50: "#FCFAF7",
          100: "#FAF8F5", // Fondo principal marfil pergamino
          200: "#F3EFE9",
          300: "#E8E2D8",
        },
        terracotta: {
          50: "#FDF7F4",
          100: "#F9ECE6",
          200: "#F2D8CC",
          500: "#D66847", // Terracota cálida
          600: "#BF5435",
          700: "#A34327",
        },
        ochre: {
          50: "#FEF9EE",
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
          100: "#F3ECE2",
          200: "#E7DECE",
          300: "#D5C8B4",
          500: "#9E8C76",
        },
        earth: {
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
    },
  },
  plugins: [],
};

export default config;
