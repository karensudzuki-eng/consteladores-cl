import React from "react";

export function MercuryPhilosophy() {
  const principles = [
    {
      title: "1. El Derecho a la Pertenencia",
      subtitle: "Nadie puede ser excluido del sistema",
      description:
        "Todo aquel que formó parte de la red familiar conserva su lugar legítimo. Cuando alguien es olvidado, silenciado o juzgado, un descendiente suele manifestar esa exclusión en su vida cotidiana.",
    },
    {
      title: "2. El Orden en el Tiempo",
      subtitle: "Respeto a la jerarquía de origen",
      description:
        "Quienes llegaron antes son los grandes; quienes vinieron después son los pequeños. Cuando un hijo intenta asumir el peso de sus padres o abuelos, pierde la fuerza para desarrollar su propio camino.",
    },
    {
      title: "3. El Equilibrio entre Dar y Tomar",
      subtitle: "Reciprocidad en los vínculos adultos",
      description:
        "En las relaciones de pareja y proyectos profesionales debe existir un intercambio balanceado. Solo entre padres e hijos el dar es mayor, pues los padres transmiten la vida y los hijos la toman.",
    },
  ];

  return (
    <section id="que-es" className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <div className="max-w-[680px] mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Fundamentos Sistémicos
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            Los Órdenes del Amor en la práctica online
          </h2>
          <p className="text-sm sm:text-base text-[#c3c3cc] leading-[1.5] text-center">
            La mirada sistémica desarrollada por Bert Hellinger visibiliza las dinámicas familiares inconscientes que influyen en nuestras dificultades, permitiendo que el orden interno y la reconciliación se manifiesten.
          </p>
        </div>

        {/* 3 Principles Cards (Graphite Cards #1e1e2a, 12px radius, 32px padding, centered titles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {principles.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/5 flex flex-col justify-between text-center"
            >
              <div>
                <h3 className="text-lg font-sans font-[480] text-[#ededf3] text-center mb-2 tracking-[0.01em]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#5266eb] font-[480] text-center mb-4">
                  {p.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] text-center">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hellinger Quote Banner: Flat Graphite Surface, Centered */}
        <div className="p-8 sm:p-10 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 text-center max-w-[780px] mx-auto">
          <p className="text-base sm:text-lg text-[#ededf3] font-[480] leading-[1.4] mb-3 text-center tracking-[0.01em]">
            "El amor llena lo que el orden abarca. El orden precede al amor, y el amor sólo puede desarrollarse dentro del orden."
          </p>
          <span className="text-xs text-[#c3c3cc] font-[400] uppercase tracking-[0.015em]">
            — Bert Hellinger, creador de las Constelaciones Familiares
          </span>
        </div>

      </div>
    </section>
  );
}
