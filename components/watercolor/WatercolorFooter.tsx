"use client";

import React from "react";
import Link from "next/link";
import { AmmoniteIcon } from "./WatercolorNavbar";
import { CONFIG } from "@/lib/config";

export function WatercolorFooter() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#D9664A]/30 text-[#5C524A] pt-16 pb-20 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Footer e Impulso de Icalma */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2.5 text-terracotta-500 mb-3">
            <AmmoniteIcon className="w-8 h-8" />
            <span className="text-2xl font-serif font-semibold text-[#27221F] tracking-tight">
              consteladores<span className="text-terracotta-500 italic font-serif">.cl</span>
            </span>
          </div>
          
          <p className="text-sm text-[#5C524A] max-w-lg mx-auto leading-relaxed mb-2 font-normal">
            Plataforma ética de constelaciones familiares online y presencial en Chile. Conectamos consultantes con facilitadores acreditados y practicantes bajo supervisión docente.
          </p>

          <p className="text-xs text-sage-800 font-medium">
            {CONFIG.ICALMA_BACKING_NOTICE}{" "}
            <a
              href={CONFIG.ICALMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-600 hover:text-terracotta-700 underline underline-offset-4"
            >
              constelacionesfamiliares.cl
            </a>
          </p>
        </div>

        {/* Enlaces Requeridos de Navegación y Legales */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 text-xs sm:text-sm font-medium">
          <a href="#quienes-somos" className="hover:text-[#27221F] transition-colors">
            Quiénes somos
          </a>
          <a href="#como-funciona" className="hover:text-[#27221F] transition-colors">
            Cómo funciona
          </a>
          <a href="#servicios" className="hover:text-[#27221F] transition-colors">
            Servicios
          </a>
          <Link href="/criterios" className="hover:text-[#27221F] transition-colors">
            Criterios de acreditación
          </Link>
          <Link href="/practica" className="hover:text-[#27221F] transition-colors">
            Practicantes
          </Link>
          <Link href="/nivelacion" className="hover:text-[#27221F] transition-colors">
            Nivelación y reintegro
          </Link>
          <Link href="/cancelacion" className="hover:text-[#27221F] transition-colors">
            Política de cancelación
          </Link>
          <Link href="/privacidad" className="hover:text-[#27221F] transition-colors">
            Política de privacidad
          </Link>
          <Link href="/terminos" className="hover:text-[#27221F] transition-colors">
            Términos y condiciones
          </Link>
          <Link href="/registro-terapeuta" className="text-terracotta-600 hover:text-terracotta-700 transition-colors">
            Soy facilitador
          </Link>
        </div>

        {/* Disclaimer Ético y Línea de Crisis Obligatorios */}
        <div className="border-t border-[#E7DECE]/80 pt-8 mb-8 text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs text-[#8A7E73] leading-relaxed">
            <strong className="text-[#5C524A] font-medium">Aviso de responsabilidad:</strong> {CONFIG.DISCLAIMER_NOTICE}
          </p>
          <p className="text-xs text-[#8A7E73] leading-relaxed">
            <strong className="text-terracotta-700 font-semibold">Línea de crisis:</strong> {CONFIG.CRISIS_LINE_NOTICE}
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E7DECE]/60 pt-6 text-center text-xs text-[#8A7E73] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} consteladores.cl · Todos los derechos reservados.
          </span>
          <span>
            Atención en horario oficial de Chile (CLT / GMT-3).
          </span>
        </div>

      </div>
    </footer>
  );
}
