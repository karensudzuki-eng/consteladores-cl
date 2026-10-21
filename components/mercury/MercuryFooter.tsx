import React from "react";
import Link from "next/link";

export function MercuryFooter() {
  return (
    <footer className="bg-[#171721] text-[#c3c3cc] py-16 border-t border-[#70707d]/20 text-xs sm:text-sm">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Identification */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-sans text-xl font-[480] text-[#ededf3] block tracking-[0.015em]">
              consteladores<span className="text-[#5266eb]">.cl</span>
            </span>
            <p className="text-xs text-[#c3c3cc]/80 leading-[1.5] max-w-sm">
              Plataforma chilena dedicada a conectar consultantes con facilitadores acreditados en constelaciones familiares sistémicas, bajo modalidad 100% online por Google Meet.
            </p>

            <div className="pt-3 border-t border-[#70707d]/20 text-[11px] text-[#c3c3cc]/70 space-y-1">
              <p>
                <strong className="text-[#ededf3]">Razón social:</strong> [Razón social del prestador - dato pendiente]
              </p>
              <p>
                <strong className="text-[#ededf3]">RUT:</strong> [RUT del prestador - dato pendiente]
              </p>
              <p>
                <strong className="text-[#ededf3]">Domicilio legal:</strong> [Domicilio legal en Chile - dato pendiente]
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-[480] text-[#ededf3] text-xs uppercase tracking-[0.015em] mb-3">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#c3c3cc]/80">
              <li>
                <a href="#servicios-online" className="hover:text-[#ededf3] transition-colors">
                  Servicios y tarifas (Reserva 20%)
                </a>
              </li>
              <li>
                <a href="#como-funciona-el-pago" className="hover:text-[#ededf3] transition-colors">
                  ¿Cómo funciona el pago?
                </a>
              </li>
              <li>
                <a href="#facilitadores" className="hover:text-[#ededf3] transition-colors">
                  Facilitadores validados
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#ededf3] transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <Link href="/registro-terapeuta" className="text-[#5266eb] hover:underline font-[480] block pt-1">
                  Postular mi acreditación →
                </Link>
              </li>
            </ul>
          </div>

          {/* Schedule & Contact */}
          <div>
            <h4 className="font-sans font-[480] text-[#ededf3] text-xs uppercase tracking-[0.015em] mb-3">
              Atención y Horario
            </h4>
            <div className="space-y-2 text-xs text-[#c3c3cc]/80">
              <p>
                <strong className="text-[#ededf3]">Horario:</strong> Lunes a sábado, 09:00–20:30 (hora de Chile continental).
              </p>
              <p>
                <strong className="text-[#ededf3]">Modalidad:</strong> 100% Online vía Google Meet.
              </p>
              <p>
                <strong className="text-[#ededf3]">Contacto:</strong> contacto@consteladores.cl
              </p>
              <p>
                <strong className="text-[#ededf3]">WhatsApp:</strong> +56 9 8452 1190
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Banner: 12px arcadia weight 480 with 0.01em letter-spacing */}
        <div className="py-6 border-t border-[#70707d]/20 text-[12px] font-[480] tracking-[0.01em] text-[#c3c3cc]/60 leading-[1.5] text-center">
          Aviso ético: Las constelaciones familiares sistémicas constituyen un enfoque fenomenológico y complementario de autoconocimiento y orden en las relaciones. No constituyen psicoterapia clínica ni reemplazan diagnósticos médicos, psiquiátricos o farmacológicos prescritos por profesionales de la salud.
        </div>

        {/* Footnote Strip: Centered */}
        <div className="pt-4 border-t border-[#70707d]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#c3c3cc]/50">
          <p>© {new Date().getFullYear()} consteladores.cl • Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#ededf3] cursor-pointer">[Política de privacidad]</span>
            <span className="hover:text-[#ededf3] cursor-pointer">[Términos del servicio]</span>
            <span className="hover:text-[#ededf3] cursor-pointer">[Política de cancelación]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
