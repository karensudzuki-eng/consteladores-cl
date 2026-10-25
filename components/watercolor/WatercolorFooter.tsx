"use client";

import React from "react";
import Link from "next/link";
import { AmmoniteIcon } from "./WatercolorNavbar";

export function WatercolorFooter() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E7DECE] text-[#5C524A] pt-16 pb-20 sm:pb-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera del Footer */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2.5 text-terracotta-500 mb-3">
            <AmmoniteIcon className="w-8 h-8" />
            <span className="text-2xl font-serif font-semibold text-[#27221F] tracking-tight">
              consteladores<span className="text-terracotta-500 italic font-serif">.cl</span>
            </span>
          </div>
          <p className="text-sm text-[#5C524A] max-w-md mx-auto leading-relaxed">
            Plataforma ética de constelaciones familiares online en Chile. Conectamos consultantes con facilitadores certificados bajo el cuidado de los órdenes sistémicos.
          </p>
        </div>

        {/* Enlaces de Navegación Centrados */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-12 text-sm font-medium">
          <a href="#quienes-somos" className="hover:text-[#27221F] transition-colors">
            Quiénes somos
          </a>
          <a href="#servicios" className="hover:text-[#27221F] transition-colors">
            Servicios
          </a>
          <a href="#directorio" className="hover:text-[#27221F] transition-colors">
            Facilitadores
          </a>
          <a href="#comunidad" className="hover:text-[#27221F] transition-colors flex items-center gap-1">
            <span>Comunidad</span>
          </a>
          <a href="#faq" className="hover:text-[#27221F] transition-colors">
            Preguntas frecuentes
          </a>
          <Link href="/registro-terapeuta" className="text-terracotta-600 hover:text-terracotta-700 transition-colors">
            Soy Constelador (Postulaciones)
          </Link>
        </div>

        {/* Disclaimer Ético y de Salud Mental */}
        <div className="border-t border-[#E7DECE]/80 pt-8 mb-8 text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs text-[#8A7E73] leading-relaxed">
            <strong className="text-[#5C524A] font-medium">Aviso de responsabilidad y ética:</strong> Las constelaciones familiares sistémicas constituyen un abordaje fenomenológico y complementario para mirar dinámicas relacionales y familiares. No constituyen un diagnóstico clínico ni reemplazan la atención médica, psiquiátrica o psicoterapéutica formal.
          </p>
          <p className="text-xs text-[#8A7E73] leading-relaxed">
            Si te encuentras en situación de angustia aguda o crisis de salud mental, acude al servicio de urgencia más cercano o comunícate con la línea telefónica gratuita <strong className="text-terracotta-700 font-medium">*4141</strong> (No estás solo/a, Ministerio de Salud de Chile).
          </p>
        </div>

        {/* Copyright y Ubicación */}
        <div className="border-t border-[#E7DECE]/60 pt-6 text-center text-xs text-[#8A7E73] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} consteladores.cl · Todos los derechos reservados.
          </span>
          <span>
            Servicios 100% online en horario oficial de Santiago de Chile (CLT / GMT-3).
          </span>
        </div>

      </div>
    </footer>
  );
}
