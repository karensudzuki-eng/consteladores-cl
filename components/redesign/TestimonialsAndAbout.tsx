import React from "react";

export function TestimonialsAndAbout() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Sección Quiénes Somos */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Sobre Nosotros
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Quiénes somos
          </h2>
          <div className="p-6 rounded-2xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-600 leading-relaxed text-left space-y-2">
            <p>
              <strong>[texto institucional a completar]:</strong> consteladores.cl es una plataforma chilena orientada a facilitar el encuentro entre consultantes y facilitadores con formación acreditada en constelaciones familiares sistémicas, bajo la modalidad exclusiva online por Google Meet.
            </p>
            <p className="text-charcoal-500 italic">
              Nuestra labor se fundamenta en la misma metodología desarrollada por Bert Hellinger, adaptada al formato online mediante recursos de sintonía interna y figuras sistémicas, resguardando la ética, el respeto y la confidencialidad de cada historia familiar.
            </p>
          </div>
        </div>

        {/* Bloque Testimonios (Sin inventar datos) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre-700 bg-ochre-50 px-3 py-1 rounded-full border border-ochre-200">
              Experiencias de Consultantes
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mt-2">
              Testimonios de procesos
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Testimonios verificados de personas que han realizado sesiones online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="p-6 rounded-2xl bg-cream-50 border border-dashed border-cream-300 flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="text-ochre-500 text-lg">“</div>
                  <p className="text-xs text-charcoal-500 italic leading-relaxed">
                    [testimonio real pendiente de consultante #{num} con consentimiento informado y anonimización de datos sensibles]
                  </p>
                </div>
                <div className="pt-4 border-t border-cream-200 mt-4 text-[11px] text-charcoal-400">
                  <span>[Iniciales consultante - Región de Chile]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
