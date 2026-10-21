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
        // Mercury Alpine Banking tokens (DESIGN.md)
        onyx: {
          canvas: "#171721", // Dominant page background
          DEFAULT: "#171721",
        },
        graphite: {
          card: "#1e1e2a", // Elevated card surfaces sit flat on onyx
          DEFAULT: "#1e1e2a",
        },
        obsidian: {
          button: "#272735", // Secondary button fills, interactive surfaces
          DEFAULT: "#272735",
        },
        cobalt: {
          DEFAULT: "#5266eb", // Sole chromatic punctuation for primary actions
          hover: "#4355db",
          glow: "rgba(82, 102, 235, 0.25)",
        },
        slate: {
          border: "#70707d", // Medium dividers and structural borders
        },
        mist: {
          border: "#e2e3ed", // Hairline borders, ghost outlines
        },
        ash: {
          text: "#c3c3cc", // Muted body copy, helper text, secondary labels
          DEFAULT: "#c3c3cc",
        },
        ivory: {
          text: "#ededf3", // Primary text, icons, ghost button strokes
          DEFAULT: "#ededf3",
        },
        // Warm pastel neutrals for harmonized subtle badges (cero verdes)
        pastel: {
          sand: "#f7f0e8",
          rose: "#f5e8e8",
          warmth: "#e8ded2",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-geist-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "480", // Signature Mercury intermediate weight
        semibold: "530",
      },
      letterSpacing: {
        architectural: "0.015em",
        display: "0.02em",
        caption: "0.01em",
      },
      borderRadius: {
        DEFAULT: "4px",
        card: "12px", // Mercury graphite card radius
        pill: "32px", // Mercury button/input radius
        "pill-lg": "40px", // Mercury nav/tag radius
        full: "9999px",
      },
      spacing: {
        "72": "72px", // Mercury signature section rhythm
        "112": "112px",
        "128": "128px",
      },
    },
  },
  plugins: [],
};

export default config;
