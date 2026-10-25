import React from "react";

interface FamilyTreeIconProps {
  className?: string;
  isAnimated?: boolean;
}

/**
 * Ilustración SVG del Árbol de Raíces Sistémicas (Símbolo vivo de los vínculos familiares).
 * Realizado en CSS y SVG puro, sin librerías pesadas.
 */
export function FamilyTreeIcon({
  className = "w-6 h-6",
  isAnimated = false,
}: FamilyTreeIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${isAnimated ? "animate-gentleSway" : ""}`}
      aria-hidden="true"
    >
      {/* Círculo áurico suave de pertenencia */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="2 3"
      />

      {/* Raíces profundas (Ancestros y linaje familiar) */}
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.85">
        <path d="M32 38C32 44 26 49 22 54M32 38C32 45 36 50 40 55" />
        <path d="M32 41C30 46 29 51 29 57M32 41C34 46 35 51 35 57" />
        <path d="M26 46C23 49 18 51 15 52" strokeWidth="1.2" strokeOpacity="0.65" />
        <path d="M38 46C41 49 46 51 49 52" strokeWidth="1.2" strokeOpacity="0.65" />
        <path d="M22 54C20 56 16 57 13 57" strokeWidth="1.1" strokeOpacity="0.5" />
        <path d="M40 55C42 57 47 58 50 57" strokeWidth="1.1" strokeOpacity="0.5" />
      </g>

      {/* Tronco central firme (El presente, el consultante sostenido por sus órdenes) */}
      <path
        d="M30 38C30.5 33 30.5 28 29.5 24C31 24.5 33 24.5 34.5 24C33.5 28 33.5 33 34 38C33 39 31 39 30 38Z"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Ramas y copa que florece (Vida, descendencia y futuro) */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M30 24C27 19 22 17 17 18M34 24C37 19 42 17 47 18" />
        <path d="M32 24C32 18 30 14 26 11M32 24C32 18 34 14 38 11" />
        <path d="M27 19C25 15 20 13 16 13" strokeWidth="1.2" strokeOpacity="0.75" />
        <path d="M37 19C39 15 44 13 48 13" strokeWidth="1.2" strokeOpacity="0.75" />
      </g>

      {/* Brotes y hojas sutiles en los extremos */}
      <g fill="currentColor" fillOpacity="0.55">
        <circle cx="17" cy="18" r="2.2" />
        <circle cx="47" cy="18" r="2.2" />
        <circle cx="26" cy="11" r="2.2" />
        <circle cx="38" cy="11" r="2.2" />
        <circle cx="16" cy="13" r="1.8" />
        <circle cx="48" cy="13" r="1.8" />
        <circle cx="32" cy="8" r="2.4" />
      </g>
    </svg>
  );
}
