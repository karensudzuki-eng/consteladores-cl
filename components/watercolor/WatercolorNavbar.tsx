"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

interface WatercolorNavbarProps {
  onBookClick?: () => void;
  onOpenTriage?: () => void;
}

export function AmmoniteIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
      <path
        d="M24 6C33.941 6 42 14.059 42 24C42 33.941 33.941 42 24 42C14.059 42 7 34.5 7 25.5C7 17.5 13.5 12 21 12C27.5 12 32 16.5 32 23C32 28.5 28 32 23.5 32C19.5 32 17 29 17 25C17 22 19 20 21.5 20C23.5 20 24.5 21.2 24.5 22.8C24.5 24 23.8 24.8 23 24.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M37 13L32 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M41 24L34 25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M36 35L30 31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M24 41L23 35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M12 33L16 29" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

export function WatercolorNavbar({ onBookClick, onOpenTriage }: WatercolorNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryCtaLabel = CONFIG.PRICING_ENABLED ? "Reservar sesión" : "Consultar disponibilidad";

  return (
    <header className="sticky top-0 z-40 bg-[#FBF7F2]/95 backdrop-blur-md border-b border-[#E7DECE]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Principal con Amonite */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 rounded-lg p-1"
          >
            <div className="text-terracotta-500 group-hover:scale-105 transition-transform duration-300">
              <AmmoniteIcon className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight text-[#27221F] group-hover:text-terracotta-600 transition-colors">
                consteladores<span className="text-terracotta-500 italic font-serif">.cl</span>
              </span>
            </div>
          </Link>

          {/* Menú de Navegación: Talleres · Sesión Online · Comunidad · Facilitadores */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Navegación principal">
            <a
              href="#talleres"
              className="text-[15px] font-medium text-[#5C524A] hover:text-[#27221F] transition-colors py-1"
            >
              Talleres
            </a>
            <a
              href="#servicios"
              className="text-[15px] font-medium text-[#5C524A] hover:text-[#27221F] transition-colors py-1"
            >
              Sesión Individual
            </a>
            <a
              href="#comunidad-telegram"
              className="text-[15px] font-medium text-[#5C524A] hover:text-[#27221F] transition-colors py-1 flex items-center gap-1.5"
            >
              <span>Telegram</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            </a>
            <a
              href="#facilitadores"
              className="text-[15px] font-medium text-[#5C524A] hover:text-[#27221F] transition-colors py-1"
            >
              Facilitadores
            </a>
          </nav>

          {/* Botones de Acción: Primario y Enlace a Panel Admin */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              title="Panel de Administración"
              className="px-3 py-1.5 text-xs text-[#8A7E73] hover:text-terracotta-600 transition-colors flex items-center gap-1"
            >
              <span>⚙️</span>
              <span>Admin</span>
            </Link>

            {onBookClick ? (
              <button
                onClick={onBookClick}
                type="button"
                className="px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
              >
                {primaryCtaLabel}
              </button>
            ) : (
              <Link
                href="/#servicios"
                className="px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
              >
                {primaryCtaLabel}
              </Link>
            )}
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex sm:hidden items-center gap-2">
            {onBookClick ? (
              <button
                onClick={onBookClick}
                type="button"
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-terracotta-500 rounded-full shadow-sm"
              >
                {CONFIG.PRICING_ENABLED ? "Reservar" : "Consultar"}
              </button>
            ) : (
              <Link
                href="/#servicios"
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-terracotta-500 rounded-full shadow-sm"
              >
                {CONFIG.PRICING_ENABLED ? "Reservar" : "Consultar"}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5C524A] hover:text-[#27221F] rounded-lg"
              aria-label="Abrir menú"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E7DECE] py-4 space-y-3 animate-fadeIn">
            <a
              href="#talleres"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C524A] hover:text-[#27221F] py-1.5"
            >
              Talleres
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C524A] hover:text-[#27221F] py-1.5"
            >
              Sesión Individual Online
            </a>
            <a
              href="#comunidad-telegram"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C524A] hover:text-[#27221F] py-1.5"
            >
              Comunidad Telegram
            </a>
            <a
              href="#facilitadores"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C524A] hover:text-[#27221F] py-1.5"
            >
              Facilitadores
            </a>
            <div className="pt-2 border-t border-[#E7DECE] flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#8A7E73] hover:text-[#27221F] py-1 flex items-center gap-1.5"
              >
                <span>⚙️ Panel de Administración</span>
              </Link>
              {onBookClick ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-2.5 text-xs font-medium text-white bg-terracotta-500 rounded-full"
                >
                  {primaryCtaLabel}
                </button>
              ) : (
                <Link
                  href="/#servicios"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-2.5 text-xs font-medium text-white bg-terracotta-500 rounded-full"
                >
                  {primaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
