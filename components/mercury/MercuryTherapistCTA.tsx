import React from "react";
import Link from "next/link";

export function MercuryTherapistCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Graphite Card Surface #1e1e2a, 12px radius, 32px padding, centered */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 text-center max-w-[920px] mx-auto">
          
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#272735] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase mb-6">
            Red de Facilitadores · Chile
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-[480] tracking-[0.015em] text-[#ededf3] text-center mb-4 leading-[1.15]">
            ¿Eres constelador familiar certificado?
          </h2>

          <p className="text-sm sm:text-base text-[#c3c3cc] max-w-[620px] mx-auto mb-8 leading-[1.5] text-center font-[400]">
            Te invitamos a formar parte de consteladores.cl. Validamos manualmente cada certificado de formación sistémica para brindar un espacio de confianza a consultantes en todo Chile y el extranjero.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[700px] mx-auto mb-10 text-xs text-[#c3c3cc]">
            <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/5 text-center">
              <span className="block text-[#ededf3] font-[480] mb-1">Validación manual</span>
              <span>Revisión de diploma y escuela formativa</span>
            </div>
            <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/5 text-center">
              <span className="block text-[#ededf3] font-[480] mb-1">Horario Chile</span>
              <span>Agenda automatizada vía Google Meet</span>
            </div>
            <div className="p-4 rounded-[8px] bg-[#171721] border border-[#e2e3ed]/5 text-center">
              <span className="block text-[#ededf3] font-[480] mb-1">Autonomía</span>
              <span>Sin contratos forzados de permanencia</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Link
              href="/registro-terapeuta"
              className="px-8 py-3.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-[400] text-sm shadow-none transition-all"
            >
              Postular mi acreditación como facilitador
            </Link>
            <p className="text-[11px] text-[#c3c3cc]/60 mt-3 text-center">
              Evaluación de antecedentes en 24 a 48 horas hábiles.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
