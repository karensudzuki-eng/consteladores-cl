import React from "react";

interface TopicItem {
  icon: string;
  title: string;
  description: string;
  echo: string;
}

const topics: TopicItem[] = [
  {
    icon: "🌱",
    title: "El vínculo con la madre y el padre",
    description:
      "Tomar la vida tal como nos fue dada, con sus luces y sus límites. Sanar el juicio hacia los padres permite abrirse a la propia fuerza, al bienestar corporal y a la serenidad cotidiana.",
    echo: "Cuando dejamos de exigir a los padres lo que no pudieron dar, nuestra propia vida florece.",
  },
  {
    icon: "🕊️",
    title: "Repeticiones y lealtades invisibles",
    description:
      "Patrones de quiebra financiera, soledad reiterada o bloqueos profesionales que se repiten generación tras generación como una forma inconsciente de solidaridad familiar.",
    echo: "Cargar el destino de un ancestro no lo alivia; mirarlo con honra y dejarlo con él nos libera a ambos.",
  },
  {
    icon: "🕯️",
    title: "Duelos no llorados y miembros excluidos",
    description:
      "Hermanos no nacidos, pérdidas tempranas o antepasados juzgados y olvidados. En el sistema familiar nadie puede ser borrado sin que otro intente ocupar su lugar.",
    echo: "La paz llega al sistema cuando todos, sin excepción, recuperan su lugar de pertenencia.",
  },
  {
    icon: "🌿",
    title: "La pareja, los hijos y el orden de los afectos",
    description:
      "Desarmar dinámicas donde los hijos cargan pesos de los adultos o donde las parejas se relacionan desde carencias infantiles en lugar de dos adultos en equilibrio.",
    echo: "El amor sólo fluye libremente cuando se respetan los órdenes del sistema.",
  },
];

export function ConsultantSection() {
  return (
    <section id="consultantes" className="py-20 bg-earth-50 border-b border-earth-200/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Cabecera íntima y contenedora */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/70 border border-terracotta-200 text-terracotta-700 text-xs tracking-wider uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
            Espacio para Consultantes
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-900 tracking-tight leading-tight">
            Los asuntos que el alma necesita mirar
          </h2>
          
          <p className="text-earth-700 text-base sm:text-lg leading-relaxed">
            Una constelación no es un acto mágico ni un pronóstico del futuro. Es una pausa respetuosa para reconocer lo que es, poner orden en el corazón y reconciliarse con el propio origen.
          </p>
        </div>

        {/* Rejilla de temas tratados con delicadeza */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="p-8 rounded-organic-lg bg-white border border-earth-200/80 shadow-warm-subtle hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl p-2.5 rounded-2xl bg-earth-50 border border-earth-200/60">
                    {topic.icon}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-earth-900">
                    {topic.title}
                  </h3>
                </div>
                
                <p className="text-earth-700 text-sm sm:text-base leading-relaxed mb-6">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 border-t border-earth-100">
                <p className="font-serif italic text-xs sm:text-sm text-terracotta-600">
                  "{topic.echo}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cuadro de seguridad y contención en Chile */}
        <div className="p-8 sm:p-10 rounded-organic-lg bg-olive-50/80 border border-olive-200/80 max-w-4xl mx-auto space-y-6 text-earth-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-olive-700 font-semibold">
                Cuidado ético y agendamiento transparente
              </span>
              <h3 className="font-serif text-2xl text-earth-900 mt-1">
                ¿Cómo es una sesión individual online?
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-olive-200 text-xs text-olive-700 font-medium whitespace-nowrap">
              Horario de Chile (CLT / GMT-3)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-earth-700 leading-relaxed pt-2">
            <div className="space-y-1.5">
              <strong className="block text-earth-900 font-serif text-base">
                1. Intimidad y resguardo
              </strong>
              <p>
                La sesión ocurre uno a uno a través de Google Meet. No necesitas exponer tu intimidad ante grupos si prefieres un espacio íntimo y confidencial.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="block text-earth-900 font-serif text-base">
                2. Herramientas sistémicas
              </strong>
              <p>
                El facilitador utiliza figuras, anclajes espaciales y una profunda escucha corporal para representar los elementos de tu sistema.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="block text-earth-900 font-serif text-base">
                3. Integración en calma
              </strong>
              <p>
                Dura habitualmente 75 minutos. Te recomendamos agendar en un momento donde puedas descansar después para asimilar el movimiento interno.
              </p>
            </div>
          </div>

          <div className="pt-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-olive-200/60">
            <p className="text-xs text-earth-600 italic">
              Tarifas claras en pesos chilenos (CLP) sin costos ocultos.
            </p>
            <a
              href="#terapeutas"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              Ver facilitadores disponibles hoy
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
