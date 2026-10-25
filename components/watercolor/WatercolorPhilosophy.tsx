"use client";

import React from "react";

export function WatercolorPhilosophy() {
  const principles = [
    {
      number: "1",
      title: "El Derecho a la Pertenencia",
      subtitle: "Nadie puede ser excluido",
      bgClass: "bg-[#FEF9EE] border-[#F7E1B0]/80 text-[#9A6523]",
      tagBg: "bg-[#FCF2DA] text-[#9A6523]",
      text: "Todos los miembros de un sistema familiar tienen el mismo derecho inalienable a formar parte. Cuando alguien es olvidado, silenciado, juzgado o apartado (por dolor, vergüenza o tragedia), las generaciones posteriores suelen manifestar síntomas, bloqueos o repeticiones inconscientes en un intento ciego de incluirlo.",
    },
    {
      number: "2",
      title: "El Orden y la Jerarquía",
      subtitle: "Honrar a los que llegaron antes",
      bgClass: "bg-[#FDF7F4] border-[#F2D8CC]/80 text-[#A34327]",
      tagBg: "bg-[#F9ECE6] text-[#A34327]",
      text: "Quienes llegaron antes a la vida ocupan el primer lugar cronológico frente a los que llegaron después. Los padres son los grandes y dan la vida; los hijos son los pequeños y la reciben. Cuando un hijo intenta cargar con los pesares o destinos de sus padres por amor infantil, el sistema se desordena y genera fatiga o malestar.",
    },
    {
      number: "3",
      title: "El Equilibrio entre Dar y Recibir",
      subtitle: "La armonía entre pares",
      bgClass: "bg-[#F2F4F9] border-[#D5DEEB]/80 text-[#2E3A5A]",
      tagBg: "bg-[#E5E9F3] text-[#2E3A5A]",
      text: "En los vínculos entre iguales —como la pareja, los socios o los amigos— debe existir una compensación continua y justa. Quien solo da termina sintiéndose superior o agotado, y quien solo recibe termina sintiéndose empequeñecido o en deuda. La reciprocidad sana mantiene vivo el lazo afectivo.",
    },
  ];

  const stepsOfASession = [
    {
      step: "Fase 1",
      title: "Entrevista y Genograma",
      desc: "El facilitador te escucha con atención plena y sin juicios. Se trazan los hechos clave de tu árbol genealógico (duelos tempranos, migraciones, pérdidas o exclusiones) para delimitar el motivo de consulta.",
    },
    {
      step: "Fase 2",
      title: "El Despliegue en el Campo",
      desc: "Mediante figuras sistémicas (en sesión online) o representantes (en taller grupal), se posicionan los elementos. La disposición espacial revela inmediatamente dónde está detenido el flujo del amor o el desorden jerárquico.",
    },
    {
      step: "Fase 3",
      title: "Frases de Solución y Reconciliación",
      desc: "A través de miradas y frases sanadoras profundamente sentidas ('Te veo', 'Te devuelvo con amor lo que te pertenece', 'Tomo la vida que me diste'), el consultante experimenta un descanso corporal y un nuevo orden interno.",
    },
  ];

  return (
    <section id="filosofia" className="py-16 sm:py-24 bg-[#FBF7F2] relative border-t border-[#E7DECE]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-3 block">
            Pedagogía y Desmitificación Sistémica (MOFU)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-6">
            ¿Qué es una constelación familiar?
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Una constelación no es una predicción mágica ni una creencia esotérica. Es un abordaje fenomenológico y terapéutico desarrollado por Bert Hellinger que 
            permite hacer visible la imagen interna de tu sistema familiar. 
            Al ordenar los vínculos y mirar con compasión lo que no pudo ser visto en el pasado, 
            el consultante experimenta un alivio hondo y recupera su lugar en la vida.
          </p>
        </div>

        {/* Las 3 Leyes u Órdenes del Amor en Tarjetas Pasteles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {principles.map((p) => (
            <div
              key={p.number}
              className={`rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-300 hover:shadow-md flex flex-col items-center text-center ${p.bgClass}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold mb-4 ${p.tagBg}`}>
                {p.number}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#27221F] mb-1">
                {p.title}
              </h3>

              <p className="text-xs uppercase tracking-wider font-medium text-[#8A7E73] mb-4">
                {p.subtitle}
              </p>

              <p className="text-sm text-[#5C524A] leading-relaxed">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* ¿Qué esperar de una sesión? (Reducción de Miedos / CRO) */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-8 sm:p-12 mb-16 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-ochre-700 block mb-1">
              Paso a Paso
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F]">
              ¿Qué ocurre exactamente en una sesión?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C524A] mt-2">
              Muchas personas sienten nervios antes de constelarse por temor a revivir traumas. Aquí te explicamos el proceso con total claridad:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stepsOfASession.map((s, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E7DECE] relative">
                <span className="text-xs font-mono font-bold text-terracotta-600 block mb-2">
                  {s.step}
                </span>
                <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-[#5C524A] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparativa de Formatos: Online vs Presencial vs Taller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 text-center">
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7DECE]">
            <span className="text-2xl mb-2 block">💻</span>
            <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-1">
              Sesión Individual Online
            </h4>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              Vía Google Meet con figuras de madera o anclajes virtuales. Ideal para personas en cualquier ciudad de Chile o el extranjero que buscan máxima intimidad y horarios flexibles.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7DECE]">
            <span className="text-2xl mb-2 block">📍</span>
            <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-1">
              Sesión Individual Presencial
            </h4>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              En consulta terapéutica en Santiago, Viña del Mar o Concepción. Trabajo con anclajes en suelo y muñecos físicos en un espacio cálido y contenido.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7DECE]">
            <span className="text-2xl mb-2 block">👥</span>
            <h4 className="font-serif font-semibold text-lg text-[#27221F] mb-1">
              Taller Vivencial Grupal
            </h4>
            <p className="text-xs text-[#5C524A] leading-relaxed">
              Jornadas de fin de semana con representantes humanos. La resonancia del grupo aporta una fuerza de campo única para destrabar temas familiares profundos.
            </p>
          </div>
        </div>

        {/* Cita de Bert Hellinger */}
        <div className="max-w-2xl mx-auto text-center bg-[#F3ECE2]/60 border border-[#E7DECE] rounded-3xl p-6 sm:p-8">
          <p className="font-serif italic text-lg sm:text-xl text-[#38322E] mb-3">
            “El amor llena lo que el orden abarca. El orden precede al amor, y el amor sólo puede desarrollarse dentro del orden.”
          </p>
          <span className="text-xs uppercase tracking-widest text-[#8A7E73] font-medium">
            — Bert Hellinger, creador de las Constelaciones Familiares
          </span>
        </div>

      </div>
    </section>
  );
}
