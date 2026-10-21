import React from "react";

export function SystemicPhilosophy() {
  const principles = [
    {
      title: "1. El Derecho a la Pertenencia",
      subtitle: "Nadie puede ser excluido",
      description:
        "Todo aquel que formó parte de nuestro sistema familiar (incluso quienes sufrieron destinos difíciles, fallecieron tempranamente o fueron juzgados) conserva su lugar legítimo. Cuando alguien es olvidado, un descendiente suele repetir su destino.",
    },
    {
      title: "2. El Orden en el Tiempo",
      subtitle: "Cada uno en su lugar",
      description:
        "Quienes llegaron antes (abuelos, padres) son los grandes; quienes vinieron después (hijos, nietos) son los pequeños. Cuando un hijo intenta cargar los dolores o juicios de sus padres, pierde la fuerza para vivir su propia vida.",
    },
    {
      title: "3. El Equilibrio entre Dar y Tomar",
      subtitle: "La reciprocidad en las relaciones",
      description:
        "En los vínculos entre iguales (como la pareja, las amistades o los socios comerciales), debe existir una reciprocidad balanceada. Solo entre padres e hijos el dar es mayor, ya que los padres dan la vida y los hijos la toman.",
    },
  ];

  return (
    <section id="filosofia" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Encabezado con rigor sistémico estilo Icalma */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Fundamentos de la Terapia Sistémica
          </span>
          <h2 className="text-2xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Los Órdenes del Amor según Bert Hellinger
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Una constelación no es un acto esotérico ni una predicción. Es un método fenomenológico que permite visibilizar el origen profundo de los nudos que frenan tu bienestar, permitiendo que la reconciliación y el orden interno vuelvan a operar.
          </p>
        </div>

        {/* 3 Principios fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {principles.map((p, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-sans font-bold text-lg text-slate-900 mb-1">
                  {p.title}
                </h3>
                <p className="text-xs font-semibold text-teal-700 mb-3">
                  {p.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cita de Bert Hellinger estilo institucional */}
        <div className="p-8 rounded-2xl bg-teal-900 text-white text-center max-w-3xl mx-auto shadow-md">
          <p className="font-serif italic text-lg sm:text-xl text-teal-100 mb-3">
            "El amor llena lo que el orden abarca. El orden precede al amor, y el amor sólo puede desarrollarse dentro del orden."
          </p>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
            — Bert Hellinger, creador de las Constelaciones Familiares
          </span>
        </div>

      </div>
    </section>
  );
}
