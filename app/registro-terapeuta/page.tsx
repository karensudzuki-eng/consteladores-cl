"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { registerTherapistApplication } from "@/app/actions/therapists";

export default function RegistroTerapeutaPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    headline: "Facilitador en Constelaciones Familiares Online",
    bio: "",
    approach: "",
    experienceYears: 2,
    priceClp: 45000,
  });

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatusMessage({
        type: "error",
        text: "Por favor adjunta tu diploma o certificado de constelador (PDF o imagen).",
      });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `postulaciones/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("certifications")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Error al subir archivo:", uploadError);
        throw new Error("No se pudo subir el certificado. Por favor verifica el formato del archivo.");
      }

      const certificationUrl = filePath;

      const result = await registerTherapistApplication({
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone,
        headline: formData.headline,
        bio: formData.bio,
        approach: formData.approach,
        experienceYears: Number(formData.experienceYears),
        priceClp: Number(formData.priceClp),
        certificationUrl,
      });

      if (!result.success) {
        throw new Error(result.error || "No se pudo registrar la postulación.");
      }

      setStatusMessage({
        type: "success",
        text: "¡Tu postulación ha sido enviada con éxito! Nuestro equipo revisará tus antecedentes y certificado en un plazo de 24 a 48 horas hábiles. Te notificaremos a tu correo en cuanto tu perfil esté activo.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Ocurrió un inconveniente al enviar tu postulación.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#171721] text-[#ededf3] py-14 sm:py-20 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-[680px]">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-[400] text-[#c3c3cc] hover:text-[#ededf3] transition-colors"
          >
            ← Volver a consteladores.cl
          </Link>
        </div>

        {/* Form Container: Graphite Card #1e1e2a, 12px radius, 32px padding, centered header */}
        <div className="bg-[#1e1e2a] border border-[#e2e3ed]/10 rounded-[12px] p-8 sm:p-12 shadow-none">
          
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center px-4 py-1.5 rounded-[40px] bg-[#272735] border border-[#e2e3ed]/15 text-[#c3c3cc] text-xs font-[480] tracking-[0.015em] uppercase">
              Acreditación de Facilitadores · Chile
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-[480] text-[#ededf3] tracking-[0.015em] text-center">
              Postulación a la Red de Consteladores
            </h1>
            <p className="text-xs sm:text-sm text-[#c3c3cc] leading-[1.5] max-w-[520px] mx-auto text-center font-[400]">
              Validamos manualmente cada certificado y escuela formativa antes de activar un perfil para resguardar el rigor del servicio.
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-[8px] text-xs leading-[1.5] mb-6 text-center font-[480] ${
                statusMessage.type === "success"
                  ? "bg-[#272735] border border-[#5266eb]/40 text-[#ededf3]"
                  : "bg-[#272735] border border-red-500/40 text-red-300"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {statusMessage?.type !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Francisca Moreno"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="terapeuta@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                  Titular de tu perfil
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Facilitador Sistémico • Acompañamiento en Familia y Vínculos"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                />
              </div>

              <div>
                <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                  Biografía y presentación para consultantes
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explica tu forma de acompañar, los temas donde tienes mayor experiencia y qué puede esperar una persona en tu sesión..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-5 py-3 rounded-[12px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                  Escuela, linaje formativo o institución certificadora
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instituto Bert Hellinger de Chile / Centro Latinoamericano / etc."
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                    Años de práctica como constelador
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-[480] text-[#c3c3cc] mb-1.5">
                    Tarifa por sesión individual online (CLP)
                  </label>
                  <input
                    type="number"
                    min="15000"
                    step="1000"
                    required
                    value={formData.priceClp}
                    onChange={(e) => setFormData({ ...formData, priceClp: Number(e.target.value) })}
                    className="w-full px-5 py-3 rounded-[32px] bg-[#171721] border border-[#e2e3ed]/15 text-sm text-[#ededf3] placeholder-[#c3c3cc]/40 focus:outline-none focus:border-[#5266eb]"
                  />
                </div>
              </div>

              {/* Upload Certificate Box (Graphite/Obsidian with Mist Hairline) */}
              <div className="p-6 rounded-[12px] bg-[#171721] border border-[#e2e3ed]/15 space-y-2">
                <label className="block text-xs font-[480] text-[#ededf3]">
                  Certificado de Acreditación (Obligatorio) 📄
                </label>
                <p className="text-xs text-[#c3c3cc]/70 mb-3 leading-[1.4]">
                  Sube tu diploma en formato PDF, JPG o PNG (máx. 10MB). Documento confidencial para uso exclusivo del equipo moderador de consteladores.cl.
                </p>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  required
                  onChange={handleFileChange}
                  className="text-xs text-[#c3c3cc] file:mr-4 file:py-2 file:px-4 file:rounded-[32px] file:border-0 file:text-xs file:font-[480] file:bg-[#272735] file:text-[#ededf3] hover:file:bg-[#272735]/80 cursor-pointer"
                />
              </div>

              {/* Cobalt Primary Pill Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] disabled:opacity-60 text-[#ffffff] font-[400] text-sm shadow-none transition-all flex items-center justify-center gap-2"
                >
                  {isUploading ? "Subiendo certificado..." : "Enviar postulación para validación"}
                </button>
              </div>

              <p className="text-[11px] text-[#c3c3cc]/60 text-center leading-[1.3]">
                Al enviar aceptas el protocolo ético y de confidencialidad de la red.
              </p>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
