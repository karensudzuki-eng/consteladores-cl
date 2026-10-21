import React from "react";
import Link from "next/link";

export function ModernFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-sans font-bold text-xl text-white">
                consteladores<span className="text-brand-500">.cl</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Plataforma chilena dedicada a conectar consultantes con facilitadores certificados en constelaciones familiares sistémicas, integrando agendamiento transparente y videollamadas seguras.
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-900 max-w-md">
              Aviso ético: Las constelaciones familiares son una disciplina fenomenológica de autoconocimiento y desarrollo personal. No constituyen psicoterapia clínica ni reemplazan diagnósticos o tratamientos médicos o psiquiátricos.
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#terapeutas" className="hover:text-white transition-colors">
                  Encontrar constelador
                </a>
              </li>
              <li>
                <a href="#temas" className="hover:text-white transition-colors">
                  Temas de consulta
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-white transition-colors">
                  Cómo funciona la sesión online
                </a>
              </li>
              <li>
                <a href="#preguntas-frecuentes" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-4">
              Para Facilitadores
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/registro-terapeuta" className="hover:text-white text-brand-400 font-semibold transition-colors">
                  Postular mi certificación →
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Validación de acreditaciones</span>
              </li>
              <li className="pt-2">
                <span className="text-slate-400 block text-[11px]">Contacto de soporte:</span>
                <span className="text-white font-medium">contacto@consteladores.cl</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} consteladores.cl • Hecho en Chile. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidad y Confidencialidad</span>
            <span>Términos del Servicio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
