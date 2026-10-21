import React from "react";

export function MercuryTestimonialsAndAbout() {
  return (
    <section className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quiénes Somos (Graphite Surface #1e1e2a, Centered) */}
        <div className="max-w-[780px] mx-auto text-center mb-20 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Sobre Nosotros
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            Quiénes somos
          </h2>
          <div className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] text-center space-y-3">
            <p>
              <strong className="text-[#ededf3]">[texto institucional a completar]:</strong> consteladores.cl es una plataforma chilena orientada a facilitar el encuentro transparente entre consultantes y facilitadores con formación acreditada en constelaciones familiares sistémicas, bajo la modalidad exclusiva online por Google Meet.
            </p>
            <p className="text-[#c3c3cc]/80 italic">
              Nuestra labor se fundamenta en la misma metodología desarrollada por Bert Hellinger, adaptada al formato online mediante recursos de sintonía interna y figuras sistémicas, resguardando la ética, el respeto y la confidencialidad de cada historia familiar.
            </p>
          </div>
        </div>

        {/* Testimonios (3 Cards in Graphite, Centered Titles & Content) */}
        <div>
          <div className="text-center max-w-[620px] mx-auto mb-12 space-y-2">
            <h3 className="text-xl sm:text-2xl font-sans font-[480] tracking-[0.015em] text-[#ededf3] text-center">
              Experiencias de consultantes
            </h3>
            <p className="text-xs sm:text-sm text-[#c3c3cc] text-center">
              Testimonios de procesos realizados bajo la modalidad online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 flex flex-col justify-between text-center"
              >
                <div className="space-y-3">
                  <div className="text-[#5266eb] text-xl font-serif text-center">“</div>
                  <p className="text-xs text-[#c3c3cc] italic leading-[1.5] text-center">
                    [testimonio real pendiente de consultante #{num} con consentimiento informado y anonimización de datos sensibles]
                  </p>
                </div>
                <div className="pt-4 border-t border-[#70707d]/20 mt-6 text-[11px] text-[#c3c3cc]/60 text-center">
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
