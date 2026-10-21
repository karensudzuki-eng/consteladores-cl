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
        // Paleta de tonos tierra suaves y refugio humano
        earth: {
          50: "#FAF8F5",   // Crema suave de fondo general (lino / papel artesanal)
          100: "#F4EFEA",  // Arena cálida para tarjetas y secciones alternas
          200: "#E7DFD5",  // Arcilla clara para bordes tenues y divisores
          300: "#D3C5B5",  // Tono piedra sutil
          400: "#B8A390",  // Acento neutro suave
          500: "#8C7561",  // Tono madera serena
          700: "#5A493B",  // Texto secundario legible y cálido
          900: "#2B221B",  // Tinta profunda (reemplaza al negro puro frío)
        },
        terracotta: {
          50: "#FDF6F3",
          100: "#F9ECE6",
          200: "#F2D5C8",
          400: "#DE8E73",
          500: "#C46849",  // Color principal de llamada a la calma y acción
          600: "#A94F32",
          700: "#8B3E25",
        },
        olive: {
          50: "#F7F8F5",
          100: "#EDF0E8",
          200: "#D8DEC9",
          500: "#6B7B5C",  // Verde salvia / oliva para detalles de serenidad
          700: "#49553E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "organic": "1.75rem",
        "organic-lg": "2.25rem",
      },
      boxShadow: {
        "warm-subtle": "0 10px 30px -10px rgba(74, 52, 38, 0.05)",
        "warm-card": "0 14px 40px -12px rgba(89, 63, 47, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
