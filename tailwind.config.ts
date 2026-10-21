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
        // Paleta oficial solicitada
        forest: {
          50: "#F2F6F3",
          100: "#E3ECE6",
          200: "#C4D8CB",
          500: "#446D56",
          700: "#2F4F3E", // Color primario verde bosque
          800: "#243E31",
          900: "#1A2C23",
        },
        ochre: {
          50: "#FDF9F2",
          100: "#FAF1E2",
          200: "#F4E1C1",
          500: "#DCA152",
          600: "#C98B3C", // Color de acento ocre para botones CTA
          700: "#AB722D",
          800: "#8C5B23",
        },
        cream: {
          50: "#FCFAF7",
          100: "#F7F3EC", // Fondo crema suave
          200: "#EFE8DC",
          300: "#E4D9C5",
        },
        charcoal: {
          400: "#757575",
          500: "#575757",
          600: "#404040",
          700: "#333333",
          900: "#2B2B2B", // Color de texto principal
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(43, 43, 43, 0.05), 0 1px 2px rgba(43, 43, 43, 0.03)",
        card: "0 4px 12px rgba(43, 43, 43, 0.06)",
        hover: "0 10px 24px -4px rgba(47, 79, 62, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
