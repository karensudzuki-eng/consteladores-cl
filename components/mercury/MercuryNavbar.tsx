"use client";

import React from "react";
import Link from "next/link";

interface MercuryNavbarProps {
  onBookClick: () => void;
}

export function MercuryNavbar({ onBookClick }: MercuryNavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#171721]/80 backdrop-blur-md border-b border-[#e2e3ed]/10 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Mark: Concentric Circles sistémicos + consteladores.cl */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#1e1e2a] border border-[#e2e3ed]/20 flex items-center justify-center text-[#ededf3]">
            <svg className="w-4 h-4 text-[#5266eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
              <circle cx="12" cy="12" r="5" strokeOpacity="0.6" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="font-sans text-lg tracking-[0.015em] font-[480] text-[#ededf3]">
            consteladores<span className="text-[#5266eb]">.cl</span>
          </span>
        </Link>

        {/* Navigation Items (Ivory 400 / 40px pill hover) */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-[400] text-[#c3c3cc]">
          <a
            href="#que-es"
            className="px-4 py-2 rounded-[40px] hover:text-[#ededf3] hover:bg-[#1e1e2a] transition-all"
          >
            ¿Qué es una constelación?
          </a>
          <a
            href="#servicios-online"
            className="px-4 py-2 rounded-[40px] hover:text-[#ededf3] hover:bg-[#1e1e2a] transition-all"
          >
            Servicios (Reserva 20%)
          </a>
          <a
            href="#como-funciona-el-pago"
            className="px-4 py-2 rounded-[40px] hover:text-[#ededf3] hover:bg-[#1e1e2a] transition-all"
          >
            Cómo funciona el pago
          </a>
          <a
            href="#facilitadores"
            className="px-4 py-2 rounded-[40px] hover:text-[#ededf3] hover:bg-[#1e1e2a] transition-all"
          >
            Facilitadores
          </a>
        </nav>

        {/* Dual Actions: Ghost Button (Soy Constelador) + Cobalt Primary CTA (Reservar) */}
        <div className="flex items-center gap-3">
          <Link
            href="/registro-terapeuta"
            className="px-5 py-2.5 rounded-[40px] border border-[#ededf3]/30 hover:border-[#ededf3] text-[#ededf3] text-xs sm:text-sm font-[400] transition-all hidden sm:inline-block"
          >
            Soy Constelador
          </Link>

          <button
            onClick={onBookClick}
            className="px-5 sm:px-6 py-2.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] text-xs sm:text-sm font-[400] transition-all shadow-none"
          >
            Reservar sesión
          </button>
        </div>

      </div>
    </header>
  );
}
