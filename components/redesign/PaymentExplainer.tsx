import React from "react";

export function PaymentExplainer() {
  const steps = [
    {
      num: "01",
      title: "Eliges facilitador y horario",
      desc: "Revisas la formación del facilitador, su especialidad y seleccionas el día y hora que mejor se acoplen a tu disponibilidad en horario de Chile.",
    },
    {
      num: "02",
      title: "Pagas solo la reserva del 20%",
      desc: "Aseguras tu cupo en la agenda pagando únicamente el 20% del valor de la sesión. Medios de pago aceptados: [Webpay / transferencia bancaria / Mercado Pago / tarjetas].",
    },
    {
      num: "03",
      title: "Recibes tu enlace y abonas el 80% restante",
      desc: "Llega a tu correo la confirmación con tu enlace personal a Google Meet. El saldo restante (80%) se paga [antes de ingresar a la sesión / al finalizar la sesión, según política a confirmar].",
    },
  ];

  return (
    <section id="como-funciona-el-pago" className="py-16 bg-cream-50 border-b border-cream-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Transparencia y Facilidad
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mt-2">
            ¿Cómo funciona el pago de tu sesión?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Solo comprometes una fracción inicial para reservar y abonas el saldo al momento de la atención.
          </p>
        </div>

        {/* 3 Pasos del modelo 20% */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-2xl bg-white border border-cream-200 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-ochre-600 block mb-3">
                  {s.num}
                </span>
                <h3 className="font-sans font-bold text-base text-charcoal-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Política de cancelación y medios de pago */}
        <div className="p-6 rounded-2xl bg-white border border-cream-300 max-w-4xl mx-auto space-y-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <span className="text-forest-700 font-bold text-base">ℹ️</span>
            <div>
              <strong className="block text-charcoal-900 font-bold mb-0.5">
                Política de cancelación y reprogramación:
              </strong>
              <p className="text-charcoal-500 leading-relaxed">
                Puedes reprogramar tu fecha y hora sin costo avisando con al menos{" "}
                <span className="font-semibold text-charcoal-900">[X horas de anticipación - dato pendiente]</span>.{" "}
                En caso de cancelación fuera de plazo o inasistencia,{" "}
                <span className="font-semibold text-charcoal-900">[detalle de qué ocurre con la reserva del 20% - política pendiente de confirmación]</span>.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-500">
            <span>
              <strong>Medios de pago aceptados:</strong> [Webpay / Transferencia bancaria directa / Mercado Pago]
            </span>
            <span className="text-forest-700 font-medium">
              Valores en pesos chilenos (CLP) sin costos ocultos
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
