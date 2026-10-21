"use client";

import React from "react";
import Image from "next/image";

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
      title: "El Equilibrio entre Dar y Tomar",
      subtitle: "La armonía entre pares",
      bgClass: "bg-[#F2F4F9] border-[#D5DEEB]/80 text-[#2E3A5A]",
      tagBg: "bg-[#E5E9F3] text-[#2E3A5A]",
      text: "En los vínculos entre iguales —como la pareja, los socios o los amigos— debe existir una compensación continua y justa. Quien solo da termina sintiéndose superior o agotado, y quien solo recibe termina sintiéndose empequeñecido o en deuda. La reciprocidad sana mantiene vivo el lazo afectivo.",
    },
  ];

  return (
    <section id="filosofia" className="py-16 sm:py-24 bg-[#FAF8F5] relative border-t border-[#E7DECE]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección Estrictamente Centrada */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-500 mb-3 block">
            Fundamentos y Sabiduría Sistémica
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#27221F] mb-6">
            ¿Qué es una constelación familiar?
          </h2>
          <p className="text-base sm:text-lg text-[#5C524A] leading-relaxed">
            Una constelación no es una predicción ni un acto mágico. Es un método fenomenológico y terapéutico que 
            permite representar espacialmente la imagen interna de tu sistema familiar. 
            Al ordenar los vínculos y mirar con compasión lo que no pudo ser visto en el pasado, 
            el consultante encuentra paz, alivio y fuerza para seguir adelante.
          </p>
        </div>

        {/* Las 3 Leyes u Órdenes del Amor en Tarjetas Pasteles con Títulos Centrados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {principles.map((p) => (
            <div
              key={p.number}
              className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-all duration-300 hover:shadow-md flex flex-col items-center text-center ${p.bgClass}`}
            >
              {/* Número / Emblema centrado */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold mb-4 ${p.tagBg}`}>
                {p.number}
              </div>

              {/* Título de Tarjeta Estrictamente Centrado */}
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#27221F] mb-1">
                {p.title}
              </h3>

              <p className="text-xs uppercase tracking-wider font-medium text-[#8A7E73] mb-4">
                {p.subtitle}
              </p>

              {/* Texto explicativo */}
              <p className="text-sm text-[#5C524A] leading-relaxed">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Cita de Bert Hellinger en bloque sutil */}
        <div className="mt-14 max-w-2xl mx-auto text-center bg-[#F3ECE2]/50 border border-[#E7DECE] rounded-2xl p-6 sm:p-8">
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
