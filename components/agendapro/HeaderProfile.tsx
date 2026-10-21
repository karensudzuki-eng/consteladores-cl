"use client";

import React from "react";
import Link from "next/link";

interface HeaderProfileProps {
  onBookClick: () => void;
}

export function HeaderProfile({ onBookClick }: HeaderProfileProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      
      {/* Portada sobria e institucional estilo Icalma / AgendaPro */}
      <div className="relative h-44 sm:h-56 md:h-64 w-full bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 overflow-hidden">
        {/* Patrón sutil de fondo */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-end pb-4 sm:pb-6 text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold backdrop-blur-sm w-fit mb-2">
            <span>🇨🇱</span> Red Chilena de Constelaciones Familiares Sistémicas
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            consteladores<span className="text-teal-400">.cl</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1 line-clamp-1">
            Espacio de acompañamiento individual y talleres vivenciales • Inspirado en los Órdenes del Amor de Bert Hellinger
          </p>
        </div>
      </div>

      {/* Barra de datos del centro estilo AgendaPro (Rumbo Sagrado) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Metadatos del centro */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-900">Agenda abierta:</span>
              <span>Lunes a Sábado (09:00 - 20:30 hrs)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Online vía Google Meet & Presencial Providencia, Santiago</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Facilitadores con titulación avalada</span>
            </div>
          </div>

          {/* Acciones principales de la cabecera */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {/* Botón WhatsApp de atención rápida */}
            <a
              href="https://wa.me/56984521190?text=Hola,%20quisiera%20consultar%20por%20una%20constelaci%C3%B3n%20familiar%20en%20consteladores.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span className="text-emerald-600 font-bold">WhatsApp:</span> +56 9 8452 1190
            </a>

            {/* Botón principal de Reserva estilo AgendaPro */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar hora
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
