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
        // Paleta moderna, limpia y de confianza (Estilo Headway / Alma / Calm)
        brand: {
          50: "#F0FDF4",   // Menta muy suave
          100: "#DCFCE7",
          200: "#BBF7D0",
          500: "#10B981",  // Verde esmeralda vivo
          600: "#059669",  // Acento primario de bienestar y salud
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",  // Verde bosque profundo
        },
        slate: {
          50: "#F8FAFC",   // Fondo secundario ultra limpio
          100: "#F1F5F9",  // Borde y divisores sutiles
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",  // Texto secundario
          600: "#475569",
          700: "#334155",  // Texto legible principal
          800: "#1E293B",
          900: "#0F172A",  // Tinta moderna de títulos
        },
        warm: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",  // Ámbar cálido para detalles
          600: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        "card": "0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 12px 30px -10px rgba(6, 78, 59, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
