"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CMSHeroSlide } from "@/lib/cms/types";

interface HeroRotatingCarouselProps {
  slides: CMSHeroSlide[];
  musicUrl?: string;
  onBookClick: () => void;
}

export function HeroRotatingCarousel({
  slides,
  musicUrl,
  onBookClick,
}: HeroRotatingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeSlides = slides && slides.length > 0 ? slides : [];

  // Autoplay lento cada 8 segundos
  useEffect(() => {
    if (activeSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  // Manejo de la música ambiental
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.volume = 0.35; // Volumen suave y relajante
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => {
          console.warn("Autoplay bloqueado por navegador, requiere interacción:", err);
          setIsPlayingMusic(false);
        });
    }
  };

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      {/* Elemento de Audio Oculto */}
      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          preload="none"
          onEnded={() => setIsPlayingMusic(false)}
        />
      )}

      {/* Barra de Control de Música Ambiental */}
      <div className="flex items-center justify-between mb-3 px-2">
        <button
          type="button"
          onClick={toggleMusic}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer ${
            isPlayingMusic
              ? "bg-sage-600 text-white shadow-sage-200"
              : "bg-white/80 hover:bg-white text-[#5C524A] border border-[#E7DECE]"
          }`}
          title="Música ambiental para mirar y conectar con el espacio"
        >
          <span className="text-sm">{isPlayingMusic ? "🔊" : "🎵"}</span>
          <span>{isPlayingMusic ? "Pausar música ambiental" : "Activar música ambiental"}</span>
          {isPlayingMusic && (
            <span className="flex gap-0.5 items-end h-3 ml-1">
              <span className="w-0.5 h-3 bg-white animate-pulse" />
              <span className="w-0.5 h-2 bg-white animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-white animate-pulse delay-150" />
            </span>
          )}
        </button>

        {/* Indicador de posición / Contador */}
        <div className="flex items-center gap-1.5">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentIndex
                  ? "w-6 bg-terracotta-500"
                  : "w-2 bg-[#D5C8B4] hover:bg-[#8A7E73]"
              }`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tarjeta del Carrusel Giratorio */}
      <div className="relative bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-5 sm:p-7 shadow-lg overflow-hidden transition-all duration-700">
        
        {/* Imagen del Slide con Transición Suave */}
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-5 bg-[#EFE8DE] shadow-inner group">
          <img
            key={currentSlide.id || currentSlide.imageUrl}
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center animate-fadeIn duration-700 group-hover:scale-102 transition-transform"
          />

          {/* Botones de navegación sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-between p-3 pointer-events-none">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))
              }
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#27221F] flex items-center justify-center shadow-md transition-all active:scale-90 pointer-events-auto cursor-pointer"
              aria-label="Diapositiva anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % activeSlides.length)}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#27221F] flex items-center justify-center shadow-md transition-all active:scale-90 pointer-events-auto cursor-pointer"
              aria-label="Siguiente diapositiva"
            >
              →
            </button>
          </div>
        </div>

        {/* Textos Explicativos bajo la Imagen */}
        <div className="text-center sm:text-left space-y-2 mb-5 animate-fadeIn">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#27221F]">
            {currentSlide.title}
          </h3>
          <p className="text-sm sm:text-base text-[#5C524A] leading-relaxed font-normal">
            {currentSlide.description}
          </p>
        </div>

        {/* Botón de Acción Final: Reservar Cupo */}
        <div className="pt-4 border-t border-[#E7DECE]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#8A7E73]">
            Paso {currentIndex + 1} de {activeSlides.length} · Comprensión sistémica
          </span>

          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Reservar cupo</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}
