import React from "react";
import Link from "next/link";

export function ModernNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo moderno de consteladores.cl */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 shadow-sm group-hover:bg-brand-100 transition-colors">
            {/* Isotipo sistémico limpio: 3 nodos conectados */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="18" r="3" />
              <circle cx="12" cy="6" r="3" />
              <path d="M8.5 16.5l2-8M15.5 16.5l-2-8M9 18h6" strokeLinecap="round" strokeDasharray="1 3" />
            </svg>
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-slate-900">
            consteladores<span className="text-brand-600">.cl</span>
          </span>
        </Link>

        {/* Navegación central limpia */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#terapeutas" className="hover:text-brand-700 transition-colors">
            Encontrar terapeuta
          </a>
          <a href="#temas" className="hover:text-brand-700 transition-colors">
            ¿Qué temas se miran?
          </a>
          <a href="#como-funciona" className="hover:text-brand-700 transition-colors">
            Cómo funciona
          </a>
          <a href="#preguntas-frecuentes" className="hover:text-brand-700 transition-colors">
            Preguntas frecuentes
          </a>
        </nav>

        {/* Botones de acción del Marketplace */}
        <div className="flex items-center gap-3">
          <Link
            href="/registro-terapeuta"
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-700 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-all border border-slate-200/80"
          >
            Soy Constelador
          </Link>
          <a
            href="#terapeutas"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
          >
            Buscar terapeuta
          </a>
        </div>

      </div>
    </header>
  );
}
