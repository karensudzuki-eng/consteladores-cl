import React from "react";

export function TopicsGridModern() {
  const topics = [
    {
      title: "Relación con Madre y Padre",
      tagline: "El origen de la propia fuerza",
      description:
        "Sanar la relación con los progenitores permite liberar resentimientos, tomar la fuerza vital y superar sensaciones profundas de carencia o desvalorización.",
      badge: "Vínculos tempranos",
    },
    {
      title: "Pareja y Vínculos Afectivos",
      tagline: "Equilibrio entre dar y recibir",
      description:
        "Identificar por qué se repiten dinámicas dolorosas, rupturas constantes, soledad no deseada o dificultades para establecer vínculos íntimos y sanos.",
      badge: "Relaciones",
    },
    {
      title: "Dinero, Éxito y Vocación",
      tagline: "Permiso interno para prosperar",
      description:
        "Mirar lealtades inconscientes a ancestros que vivieron quiebras, estafas o carencias, permitiéndote reconciliarte con el dinero y el desarrollo profesional.",
      badge: "Prosperidad",
    },
    {
      title: "Duelos y Miembros Excluidos",
      tagline: "El derecho sagrado a pertenecer",
      description:
        "Dar un lugar digno a pérdidas tempranas, hermanos no nacidos o personas silenciadas en el árbol genealógico, devolviendo la paz al sistema.",
      badge: "Duelo y Memoria",
    },
    {
      title: "Síntomas y Malestares Físicos",
      tagline: "El cuerpo como mensajero sistémico",
      description:
        "Explorar qué historia familiar o asunto pendiente intenta visibilizar un síntoma o enfermedad persistente, siempre de forma complementaria a la medicina.",
      badge: "Salud complementaria",
    },
    {
      title: "Hijos y Crianza Consciente",
      tagline: "Liberar a los más pequeños",
      description:
        "Comprender si los hijos están cargando preocupaciones o lealtades que corresponden a los adultos, ayudándoles a recuperar su lugar de niños.",
      badge: "Familia",
    },
  ];

  return (
    <section id="temas" className="py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Campos de Consulta
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            ¿Qué asuntos puedes trabajar en una constelación?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            La mirada sistémica desarrollada por Bert Hellinger permite visibilizar el origen oculto de dificultades que no ceden con la lógica racional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-3">
                  {t.badge}
                </span>

                <h3 className="font-sans font-bold text-lg text-slate-900 mb-1">
                  {t.title}
                </h3>

                <p className="text-xs font-semibold text-brand-700 mb-3">
                  {t.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="#terapeutas"
                  className="text-xs font-bold text-slate-900 hover:text-brand-700 inline-flex items-center gap-1 transition-colors"
                >
                  Ver especialistas en este tema →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
