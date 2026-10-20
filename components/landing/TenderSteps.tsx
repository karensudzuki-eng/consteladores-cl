import React from "react";

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  warmTip: string;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Elige tu espacio y terapeuta",
    subtitle: "Siente con quién resuena tu momento actual",
    description:
      "Tómate un minuto para leer las semblanzas de los facilitadores. Cada uno tiene un recorrido, una voz y una forma particular de sostener el campo. No elijas desde la prisa mental; confía en la intuición de quién te inspira paz.",
    warmTip: "Todos los facilitadores cuentan con certificación verificada manualmente.",
  },
  {
    number: "02",
    title: "Agenda tu hora sin complicaciones",
    subtitle: "Selecciona el día y horario que mejor se acoplen a tu tiempo",
    description:
      "Podrás ver la disponibilidad real en horario de Chile (y adaptable a tu país si estás fuera). Elige un momento en el que no tengas compromisos inmediatos después, para que puedas quedarte en reposo si lo necesitas.",
    warmTip: "El pago se realiza en línea mediante métodos seguros chilenos (Webpay / Débito / Crédito).",
  },
  {
    number: "03",
    title: "Recibe tu refugio",
    subtitle: "Te llegará un correo con los detalles y el enlace a Google Meet",
    description:
      "En cuanto reserves, recibirás la confirmación con tu enlace directo a la videollamada y recomendaciones sencillas para preparar tu espacio. Cuando llegue el día, solo tendrás que hacer clic y permitirte estar presente.",
    warmTip: "Sin descargas complejas: funciona directo en tu navegador o celular.",
  },
];

export function TenderSteps() {
  return (
    <section id="pasos" className="py-20 bg-earth-100/60 border-b border-earth-200/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabecera de la sección con calidez */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-terracotta-600 font-semibold">
            Un camino guiado con respeto
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 tracking-tight">
            Cómo dar tu primer paso
          </h2>
          <p className="text-earth-700 text-base leading-relaxed">
            Sabemos que abrir la propia historia requiere valentía. Por eso diseñamos un proceso transparente, amable y sin presiones.
          </p>
        </div>

        {/* Tarjetas de los 3 pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between p-8 rounded-organic bg-white/95 border border-earth-200/80 shadow-warm-subtle hover:shadow-warm-card transition-all duration-300"
            >
              <div>
                {/* Número orgánico */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl text-terracotta-500/80 font-semibold">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 ml-4 bg-earth-200" />
                </div>

                <h3 className="font-serif text-xl text-earth-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                
                <p className="text-sm font-medium text-terracotta-600 mb-4">
                  {step.subtitle}
                </p>

                <p className="text-sm text-earth-700 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Detalle tierno al pie */}
              <div className="pt-4 border-t border-earth-100 flex items-start gap-2.5">
                <span className="text-olive-500 text-base">✦</span>
                <p className="text-xs text-earth-500 italic leading-snug">
                  {step.warmTip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cita reflexiva inferior */}
        <div className="mt-14 p-6 rounded-2xl bg-earth-50 border border-earth-200/70 text-center max-w-3xl mx-auto">
          <p className="font-serif italic text-earth-700 text-base sm:text-lg">
            "Lo que se acepta, se transforma. Lo que se honra, deja de doler como carga y se convierte en bendición."
          </p>
        </div>

      </div>
    </section>
  );
}
