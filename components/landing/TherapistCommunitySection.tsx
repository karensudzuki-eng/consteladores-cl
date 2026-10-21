import React from "react";
import Link from "next/link";

export function TherapistCommunitySection() {
  return (
    <section id="soy-constelador" className="py-20 bg-earth-100/70 border-b border-earth-200/80">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabecera institucional sobria y respetuosa */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-olive-100 border border-olive-200 text-olive-800 text-xs tracking-wider uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-olive-600" />
            Red de Facilitadores Certificados
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 tracking-tight leading-tight">
            Un hogar cuidado para tu práctica sistémica
          </h2>

          <p className="text-earth-700 text-base sm:text-lg leading-relaxed">
            Consteladores.cl no es un directorio masivo ni un marketplace transaccional. Es una red profesional que cuida el linaje del trabajo sistémico, valorando el tiempo, la formación y el respeto sagrado con el que cada facilitador acompaña a otro ser humano.
          </p>
        </div>

        {/* Pilares de la red para consteladores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          <div className="p-8 rounded-organic-lg bg-white border border-earth-200/80 shadow-warm-subtle">
            <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-serif text-lg font-bold mb-5">
              1
            </div>
            <h3 className="font-serif text-xl text-earth-900 mb-2">
              Validación humana rigurosa
            </h3>
            <p className="text-earth-700 text-sm leading-relaxed">
              Revisamos personalmente el diploma y la escuela formativa de cada postulante. Quien llega a consteladores.cl sabe que está frente a un facilitador debidamente preparado.
            </p>
          </div>

          <div className="p-8 rounded-organic-lg bg-white border border-earth-200/80 shadow-warm-subtle">
            <div className="w-10 h-10 rounded-full bg-olive-100 text-olive-700 flex items-center justify-center font-serif text-lg font-bold mb-5">
              2
            </div>
            <h3 className="font-serif text-xl text-earth-900 mb-2">
              Sin algoritmos ni calificaciones frías
            </h3>
            <p className="text-earth-700 text-sm leading-relaxed">
              No creemos en sistemas de 5 estrellas para la labor terapéutica. Mostramos tu semblanza, tu linaje y tu voz en primera persona para que el consultante sintonice con quien realmente resuena.
            </p>
          </div>

          <div className="p-8 rounded-organic-lg bg-white border border-earth-200/80 shadow-warm-subtle">
            <div className="w-10 h-10 rounded-full bg-earth-200 text-earth-800 flex items-center justify-center font-serif text-lg font-bold mb-5">
              3
            </div>
            <h3 className="font-serif text-xl text-earth-900 mb-2">
              Gestión simple y segura en Chile
            </h3>
            <p className="text-earth-700 text-sm leading-relaxed">
              Agendamiento automático en hora de Chile, generación de salas únicas en Google Meet y transferencias transparentes a tu cuenta bancaria nacional en pesos chilenos (CLP).
            </p>
          </div>
        </div>

        {/* Recuadro de requisitos y postulación */}
        <div className="p-8 sm:p-10 rounded-organic-lg bg-earth-900 text-white shadow-warm-card max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-terracotta-300 font-semibold">
                Proceso de acreditación
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                ¿Te formaste en una escuela de constelaciones sistémicas?
              </h3>
              <p className="text-earth-200 text-sm leading-relaxed">
                Para sumarte solo necesitas completar tu semblanza y adjuntar tu certificado o diploma emitido por una institución formativa reconocida. Nuestro equipo evaluará tu solicitud en un plazo de 24 a 48 horas hábiles.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/registro-terapeuta"
                className="w-full text-center px-6 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-400 text-white font-medium text-sm transition-all shadow-md"
              >
                Postular como facilitador
              </Link>
              <p className="text-[11px] text-earth-400 text-center">
                Registro transparente y sin permanencia forzada.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
