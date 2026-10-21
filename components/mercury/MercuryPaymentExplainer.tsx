import React from "react";

export function MercuryPaymentExplainer() {
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
    <section id="como-funciona-el-pago" className="py-20 lg:py-28 bg-[#171721] text-[#ededf3] border-b border-[#70707d]/20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered) */}
        <div className="max-w-[680px] mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#1e1e2a] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
            Modelo de Reserva
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-sans font-[480] tracking-[0.015em] leading-[1.15] text-[#ededf3] text-center">
            ¿Cómo funciona el pago de tu sesión?
          </h2>
          <p className="text-sm sm:text-base text-[#c3c3cc] leading-[1.5] text-center">
            Pagas únicamente una fracción del 20% para asegurar el horario y abonas el saldo del 80% conforme al protocolo establecido.
          </p>
        </div>

        {/* 3 Step Cards in Graphite (Centered Titles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 flex flex-col justify-between text-center"
            >
              <div>
                <span className="font-mono text-xl font-[480] text-[#5266eb] block mb-3 text-center">
                  {s.num}
                </span>
                <h3 className="font-sans font-[480] text-lg text-[#ededf3] mb-2 text-center tracking-[0.01em]">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] text-center">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Policy and Methods Container (Graphite Surface, Centered Content) */}
        <div className="p-8 rounded-[12px] bg-[#1e1e2a] border border-[#e2e3ed]/10 max-w-[840px] mx-auto space-y-4 text-xs sm:text-sm text-center">
          <h4 className="font-sans font-[480] text-sm text-[#ededf3] text-center uppercase tracking-[0.015em]">
            Política de cancelación y reprogramación
          </h4>
          <p className="text-[#c3c3cc] leading-[1.5] max-w-[680px] mx-auto text-center">
            Puedes reprogramar tu fecha y hora sin costo avisando con al menos{" "}
            <span className="text-[#ededf3] font-[480]">[X horas de anticipación - dato pendiente]</span>.{" "}
            En caso de cancelación fuera de plazo o inasistencia,{" "}
            <span className="text-[#ededf3] font-[480]">[detalle de qué ocurre con la reserva del 20% - política pendiente de confirmación]</span>.
          </p>

          <div className="pt-4 border-t border-[#70707d]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#c3c3cc]/70">
            <span>
              <strong>Medios de pago aceptados:</strong> [Webpay / Transferencia bancaria directa / Mercado Pago]
            </span>
            <span className="text-[#ededf3]">
              Valores en pesos chilenos (CLP)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
