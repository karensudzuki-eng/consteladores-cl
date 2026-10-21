"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SlideData {
  tagline: string;
  question: string;
  reflection: string;
  detail: string;
  imageUrl: string;
  imageAlt: string;
}

const slides: SlideData[] = [
  {
    tagline: "El punto de partida",
    question: "¿Qué es una constelación familiar?",
    reflection:
      "Un espacio amoroso y sin juicio para mirar el origen de nudos, repeticiones y dolores que a veces llevamos sin saber que pertenecen a quienes vinieron antes.",
    detail:
      "A través de una mirada sistémica profunda, le devolvemos a cada miembro de tu historia su lugar digno, permitiendo que la fuerza de la vida vuelva a fluir en ti.",
    // Fotografía con tonos cálidos de atardecer y serenidad
    imageUrl:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Luz cálida de sol filtrándose entre árboles serenos",
  },
  {
    tagline: "Los asuntos del alma",
    question: "¿Qué temas se miran?",
    reflection:
      "La relación con la madre y el padre, los vínculos de pareja, los hijos, las dificultades con el dinero, la vocación o simplemente esa sensación honda de no pertenecer.",
    detail:
      "Cualquier dolor que se repita como un eco en tu vida cotidiana puede ser puesto al centro con respeto y honestidad.",
    // Tonos terracota y contacto humano gentil
    imageUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Encuentro tranquilo y cálido en una sala hogareña",
  },
  {
    tagline: "El encuentro",
    question: "¿Cómo se vive?",
    reflection:
      "Una conversación íntima y guiada, a tu propio ritmo, desde la comodidad y el abrigo de tu hogar.",
    detail:
      "Mediante figuras, anclajes visuales o una sintonía interna profunda por videollamada, el facilitador te acompaña a mirar lo que estaba oculto, paso a paso.",
    // Hogar, taza tibia, madera y calma
    imageUrl:
      "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Taza de té tibia en una mesa de madera con luz natural suave",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotación suave automática cada 7 segundos, salvo cuando el usuario interactúa
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      className="relative overflow-hidden bg-earth-50 border-b border-earth-200/70 pt-8 pb-16 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Columna de Texto reflexivo y humano */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100/80 border border-terracotta-200 text-terracotta-700 text-xs tracking-wider uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse" />
              {activeSlide.tagline}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-900 tracking-tight leading-[1.18] transition-all duration-700">
              {activeSlide.question}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-terracotta-600 leading-relaxed transition-all duration-500">
              "{activeSlide.reflection}"
            </p>

            <p className="text-earth-700 text-base sm:text-lg leading-relaxed max-w-xl transition-all duration-500">
              {activeSlide.detail}
            </p>

            {/* Acciones principales de la Landing */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#terapeutas"
                className="inline-flex justify-center items-center px-7 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-sm transition-all duration-300 shadow-warm-subtle hover:shadow-warm-card"
              >
                Conocer facilitadores certificados
              </a>
              <a
                href="#pasos"
                className="inline-flex justify-center items-center px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-earth-700 border border-earth-200 text-sm font-medium transition-all duration-300 hover:border-earth-300"
              >
                Cómo es el proceso
              </a>
            </div>

            {/* Selector manual de láminas (carrusel de calma) */}
            <div className="pt-6 flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-10 bg-terracotta-500"
                      : "w-2.5 bg-earth-300 hover:bg-earth-400"
                  }`}
                  aria-label={`Ir a la reflexión ${idx + 1}`}
                />
              ))}
              <span className="text-xs text-earth-500 pl-2">
                0{currentIndex + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Columna de Imagen enmarcada con sutileza orgánica */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Marco sutil decorativo en tono arcilla */}
              <div className="absolute -inset-3 rounded-organic-lg bg-earth-100/90 -rotate-1 border border-earth-200/60" />
              
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-organic bg-earth-200 shadow-warm-card border border-white">
                <Image
                  src={activeSlide.imageUrl}
                  alt={activeSlide.imageAlt}
                  fill
                  priority
                  className="object-cover transition-opacity duration-700 ease-in-out"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
                
                {/* Gradiente sutil inferior para calidez visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/35 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-earth-100 font-medium">
                    Constelaciones Familiares Online en Chile
                  </p>
                  <p className="font-serif text-sm text-white/95 mt-0.5">
                    Encuentros individuales desde el silencio de tu espacio.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
