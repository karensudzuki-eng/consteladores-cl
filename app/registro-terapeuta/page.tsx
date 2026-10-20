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
    priceClp: 40000,
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
        throw new Error("No se pudo subir el certificado. Por favor verifica el tamaño y formato del archivo.");
      }

      // Obtener URL del archivo (o su ruta interna)
      const certificationUrl = filePath;

      // 2. Invocar Server Action para registrar la postulación con status 'pending_approval'
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
        text: "¡Tu postulación ha sido recibida con cariño! Nuestro equipo revisará tu certificado en un plazo de 24 a 48 horas hábiles y te notificaremos por correo para activar tu perfil en el directorio.",
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
    <div className="min-h-screen bg-earth-50 text-earth-900 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Enlace de regreso */}
        <Link
          href="/"
          className="inline-flex items-center text-xs text-earth-600 hover:text-terracotta-600 mb-8 transition-colors font-medium"
        >
          ← Volver a consteladores.cl
        </Link>

        <div className="bg-white border border-earth-200/80 rounded-organic-lg p-8 sm:p-10 shadow-warm-subtle">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider text-terracotta-600 font-semibold">
              Convocatoria de Facilitadores
            </span>
            <h1 className="font-serif text-3xl text-earth-900 mt-1">
              Suma tu presencia como constelador certificado
            </h1>
            <p className="text-sm text-earth-700 mt-2 leading-relaxed">
              Cuidamos con mucha rigurosidad a los consultantes que llegan a nuestra plataforma. Por esta razón, validamos personalmente cada certificado y escuela formativa antes de activar un perfil.
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-sm mb-6 ${
                statusMessage.type === "success"
                  ? "bg-olive-50 border border-olive-200 text-olive-800"
                  : "bg-terracotta-50 border border-terracotta-200 text-terracotta-800"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {statusMessage?.type !== "success" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-earth-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Francisca Moreno"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-earth-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="terapeuta@correo.cl"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth-700 mb-1">
                  Titular de tu perfil (breve descripción)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Facilitador Sistémico • Acompañamiento en Familia y Vínculos"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth-700 mb-1">
                  Tu biografía o mensaje para el consultante (humano, cálido y sin tecnicismos)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Cuéntale a quien te lea cómo es tu forma de acompañar, desde qué lugar miras los procesos y qué puede esperar al encontrarse contigo..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-earth-700 mb-1">
                  Escuela, linaje formativo o institución certificadora
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Instituto Bert Hellinger de Chile / Hellinger Sciencia / etc."
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-earth-700 mb-1">
                    Años de experiencia como constelador
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-earth-700 mb-1">
                    Tarifa por sesión individual (CLP)
                  </label>
                  <input
                    type="number"
                    min="15000"
                    step="1000"
                    required
                    value={formData.priceClp}
                    onChange={(e) => setFormData({ ...formData, priceClp: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-earth-200 bg-earth-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                  />
                </div>
              </div>

              {/* Subida obligatoria de certificado */}
              <div className="p-4 rounded-xl bg-earth-50 border-2 border-dashed border-earth-300">
                <label className="block text-xs font-semibold text-earth-800 mb-1">
                  Certificado de Acreditación (Obligatorio) 📄
                </label>
                <p className="text-xs text-earth-600 mb-3">
                  Sube tu diploma o constancia en formato PDF, JPG o PNG (máx. 10MB). Este documento no será público; solo será revisado por el equipo de moderación.
                </p>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  required
                  onChange={handleFileChange}
                  className="text-xs text-earth-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-500 file:text-white hover:file:bg-terracotta-600 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-60 text-white font-medium text-sm transition-all shadow-sm"
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
