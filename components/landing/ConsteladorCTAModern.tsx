import React from "react";
import Link from "next/link";

export function ConsteladorCTAModern() {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Decoración geométrica sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/80 border border-brand-700/80 text-brand-300 text-xs font-bold uppercase tracking-wider">
              Portal para Facilitadores
            </div>

            <h2 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
              ¿Eres constelador familiar certificado?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Te invitamos a formar parte de la plataforma de referencia en Chile. Recibe consultantes interesados en tu enfoque, automatiza tus videollamadas con Google Meet y cuenta con un perfil verificado con rigor ético.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold">✓</span>
                Validación de diploma y escuela
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold">✓</span>
                Cobros en CLP a tu cuenta
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center font-bold">✓</span>
                Sin contratos de permanencia
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <Link
              href="/registro-terapeuta"
              className="w-full sm:w-auto text-center px-7 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              Postular mi acreditación →
            </Link>
            <p className="mt-3 text-xs text-slate-400 text-center lg:text-right">
              Revisión manual en 24 a 48 horas hábiles.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
