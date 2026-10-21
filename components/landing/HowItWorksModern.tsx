import React from "react";

export function HowItWorksModern() {
  const steps = [
    {
      step: "01",
      title: "Explora facilitadores certificados",
      description:
        "Revisa la semblanza, linaje formativo y enfoque de cada constelador. Todos nuestros terapeutas cuentan con acreditación profesional validada.",
      icon: (
        <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Selecciona tu día y hora",
      description:
        "Elige la fecha que mejor se ajuste a tu tiempo en horario de Chile (CLT / GMT-3). Reserva sin trámites largos ni esperas innecesarias.",
      icon: (
        <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Conéctate por Google Meet",
      description:
        "Recibe de inmediato el enlace directo a tu videollamada y consejos para preparar tu espacio en casa. Sin instalar programas complejos.",
      icon: (
        <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Paso a Paso
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Cómo agendar tu constelación
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Un proceso simple, seguro y con confirmación inmediata en tu correo electrónico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-8 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-brand-300 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono font-bold text-2xl text-slate-300">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-brand-700 flex items-center gap-1">
                Garantía consteladores.cl →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
