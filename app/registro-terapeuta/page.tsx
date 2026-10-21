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
    headline: "Facilitador en Constelaciones Familiares",
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

      // 1. Subir archivo a Supabase Storage (Bucket: certifications)
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `postulaciones/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
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

      // 2. Invocar Server Action para registrar la postulación
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Enlace de regreso */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-brand-700 mb-6 transition-colors"
        >
          ← Volver a consteladores.cl
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-2">
              Acreditación de Facilitadores
            </span>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">
              Súmate a la red de consteladores certificados
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Resguardamos la confianza de los consultantes validando manualmente cada diploma y escuela formativa antes de activar un perfil.
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-sm mb-6 ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium"
                  : "bg-red-50 border border-red-200 text-red-800 font-medium"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {statusMessage?.type !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Francisca Moreno"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="terapeuta@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Titular de tu perfil
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Facilitador Sistémico • Acompañamiento en Familia y Vínculos"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Biografía o presentación para consultantes
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explica tu forma de acompañar, los temas donde tienes mayor experiencia y qué puede esperar una persona en tu sesión..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Escuela, linaje formativo o institución certificadora
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instituto Bert Hellinger de Chile / Hellinger Sciencia / etc."
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Años de experiencia como constelador
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tarifa por sesión individual (CLP)
                  </label>
                  <input
                    type="number"
                    min="15000"
                    step="1000"
                    required
                    value={formData.priceClp}
                    onChange={(e) => setFormData({ ...formData, priceClp: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* Subida de certificado */}
              <div className="p-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Certificado de Acreditación (Obligatorio) 📄
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Sube tu diploma en formato PDF, JPG o PNG (máx. 10MB). Documento confidencial para uso exclusivo del equipo moderador.
                </p>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  required
                  onChange={handleFileChange}
                  className="text-xs text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-700 file:text-white hover:file:bg-brand-800 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isUploading ? "Subiendo certificado y enviando..." : "Enviar postulación para validación"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
