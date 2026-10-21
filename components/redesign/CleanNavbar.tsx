"use client";

import React from "react";
import Link from "next/link";

interface CleanNavbarProps {
  onBookClick: () => void;
}

export function CleanNavbar({ onBookClick }: CleanNavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Logo sobrio y tipográfico */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-charcoal-900">
            consteladores<span className="text-forest-700">.cl</span>
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-cream-200 text-charcoal-600 uppercase">
            Online Chile
          </span>
        </Link>

        {/* Navegación desktop limpia */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-charcoal-600">
          <a href="#servicios-online" className="hover:text-forest-700 transition-colors">
            Servicios (Reserva 20%)
          </a>
          <a href="#como-funciona-el-pago" className="hover:text-forest-700 transition-colors">
            Cómo funciona el pago
          </a>
          <a href="#facilitadores" className="hover:text-forest-700 transition-colors">
            Facilitadores
          </a>
          <a href="#faq" className="hover:text-forest-700 transition-colors">
            Preguntas frecuentes
          </a>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center gap-3">
          <Link
            href="/registro-terapeuta"
            className="text-xs font-semibold text-charcoal-600 hover:text-forest-700 px-3 py-1.5 rounded-lg border border-cream-300 hover:bg-cream-100 transition-colors hidden sm:inline-block"
          >
            Postular facilitador
          </Link>

          <button
            onClick={onBookClick}
            className="px-4 py-2 rounded-xl bg-ochre-600 hover:bg-ochre-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-forest-700"
          >
            Reservar sesión
          </button>
        </div>

      </div>
    </header>
  );
}
