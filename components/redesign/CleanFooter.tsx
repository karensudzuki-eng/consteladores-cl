import React from "react";
import Link from "next/link";

export function CleanFooter() {
  return (
    <footer className="bg-charcoal-900 text-cream-200 py-14 border-t border-charcoal-700 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Identificación del Prestador */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-serif text-xl font-bold text-white block">
              consteladores<span className="text-ochre-500">.cl</span>
            </span>
            <p className="text-xs text-cream-200/80 leading-relaxed max-w-sm">
              Plataforma chilena dedicada a conectar consultantes con facilitadores acreditados en constelaciones familiares sistémicas, bajo modalidad 100% online por Google Meet.
            </p>

            {/* Datos Legales del Prestador con placeholders transparentes */}
            <div className="pt-2 border-t border-charcoal-700/80 text-[11px] text-cream-200/70 space-y-0.5">
              <p>
                <strong>Razón social:</strong> [Razón social del prestador - dato pendiente]
              </p>
              <p>
                <strong>RUT:</strong> [RUT del prestador - dato pendiente]
              </p>
              <p>
                <strong>Domicilio legal:</strong> [Domicilio legal en Chile - dato pendiente]
              </p>
            </div>
          </div>

          {/* Enlaces de navegación rápida */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Información del servicio
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li>
                <a href="#servicios-online" className="hover:text-ochre-400 transition-colors">
                  Servicios y tarifas (Reserva 20%)
                </a>
              </li>
              <li>
                <a href="#como-funciona-el-pago" className="hover:text-ochre-400 transition-colors">
                  ¿Cómo funciona el pago?
                </a>
              </li>
              <li>
                <a href="#facilitadores" className="hover:text-ochre-400 transition-colors">
                  Facilitadores validados
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-ochre-400 transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <Link href="/registro-terapeuta" className="text-ochre-400 hover:underline font-semibold block pt-1">
                  Postular mi acreditación →
                </Link>
              </li>
            </ul>
          </div>

          {/* Horario de Atención y Contacto */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Horario y Contacto
            </h4>
            <div className="space-y-2 text-xs text-cream-200/80">
              <p>
                <strong>Atención:</strong> Lunes a sábado, 09:00–20:30 (hora de Chile continental).
              </p>
              <p>
                <strong>Modalidad:</strong> 100% Online vía Google Meet en todo Chile y el extranjero.
              </p>
              <p>
                <strong>Contacto secretaría:</strong> contacto@consteladores.cl
              </p>
              <p>
                <strong>WhatsApp:</strong> +56 9 8452 1190
              </p>
            </div>
          </div>

        </div>

        {/* Aviso ético y legal */}
        <div className="py-4 border-t border-charcoal-700/60 text-[11px] text-cream-200/60 leading-relaxed">
          Aviso ético: Las constelaciones familiares sistémicas constituyen un enfoque fenomenológico y complementario de autoconocimiento y orden en las relaciones. No reemplazan la psicoterapia clínica ni los tratamientos psiquiátricos o farmacológicos prescritos por profesionales de la salud mental.
        </div>

        {/* Barra de copyright y políticas */}
        <div className="pt-4 border-t border-charcoal-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-cream-200/60">
          <p>© {new Date().getFullYear()} consteladores.cl • Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">[Política de privacidad]</span>
            <span className="hover:text-white cursor-pointer">[Términos del servicio]</span>
            <span className="hover:text-white cursor-pointer">[Política de cancelación]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
