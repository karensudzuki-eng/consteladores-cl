"use client";

import React, { useState } from "react";
import Link from "next/link";
import { registerTherapistApplication } from "@/app/actions/therapists";
import { AmmoniteIcon } from "@/components/watercolor/WatercolorNavbar";

export default function RegistroTerapeutaPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    headline: "Facilitador",
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
      const selected = e.target.files[0];
      if (selected.size > 8 * 1024 * 1024) {
        setStatusMessage({
          type: "error",
          text: `El archivo "${selected.name}" supera los 8 MB (${(selected.size / (1024 * 1024)).toFixed(1)} MB). Por favor selecciona un documento más liviano o comprimido.`,
        });
        setFile(null);
        e.target.value = "";
        return;
      }
      setStatusMessage(null);
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("headline", formData.headline);
      data.append("bio", formData.bio);
      data.append("approach", formData.approach);
      data.append("experienceYears", String(formData.experienceYears));
      data.append("priceClp", String(formData.priceClp));
      if (file) {
        data.append("certificate", file);
      }

      let result: { success: boolean; error?: string } | null = null;

      // 1. Enviar prioritariamente vía endpoint API REST dedicado para máxima compatibilidad con archivos y Vercel
      try {
        const response = await fetch("/api/therapist/register", {
          method: "POST",
          body: data,
        });

        const json = await response.json().catch(() => null);
        if (json) {
          result = json;
        } else if (!response.ok) {
          result = {
            success: false,
            error: `Error en la subida al servidor (${response.status}). Por favor reintenta.`,
          };
        }
      } catch (fetchErr) {
        console.warn("Fallo en API REST, intentando Server Action de respaldo:", fetchErr);
      }

      // 2. Si la API REST no respondió, intentar vía Server Action directa
      if (!result) {
        try {
          result = await registerTherapistApplication(data);
        } catch (saErr: any) {
          result = {
            success: false,
            error: saErr?.message || "No se pudo conectar con el servidor.",
          };
        }
      }

      // 3. Validación totalmente segura contra undefined
      if (!result || !result.success) {
        throw new Error(result?.error || "No se pudo registrar la postulación en este momento. Por favor verifica tus datos e intenta nuevamente.");
      }

      setStatusMessage({
        type: "success",
        text: "¡Tu postulación ha sido enviada con éxito! Tu postulación será evaluada. En caso de necesitar mayor información nos contactaremos contigo.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Ocurrió un inconveniente al enviar tu postulación. Por favor verifica los datos e intenta nuevamente.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] py-12 sm:py-20 px-4 sm:px-6 flex flex-col items-center">
      <div className="w-full max-w-[680px]">
        
        {/* Link de Retorno */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#5C524A] hover:text-terracotta-600 transition-colors"
          >
            ← Volver a consteladores.cl
          </Link>
        </div>

        {/* Contenedor Principal en Pergamino Cálido */}
        <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-10 shadow-sm">
          
          <div className="text-center mb-8 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#27221F] tracking-tight">
              Postulación a la Red de Consteladores
            </h1>
            <p className="text-xs sm:text-sm text-[#5C524A] leading-relaxed max-w-[500px] mx-auto">
              Postula para formar parte de nuestro equipo de facilitadores y practicantes.
            </p>
          </div>

          {/* Mensaje de Éxito */}
          {statusMessage?.type === "success" ? (
            <div className="bg-[#FEF9EE] border border-ochre-300 rounded-3xl p-8 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#FCF2DA] border-2 border-ochre-500 text-ochre-700 text-3xl flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <h2 className="text-2xl font-serif font-semibold text-[#27221F] mb-3">
                ¡Tu postulación ha sido enviada con éxito!
              </h2>
              <p className="text-sm text-[#5C524A] leading-relaxed mb-6 max-w-md mx-auto">
                {statusMessage.text}
              </p>
              <div className="pt-4 border-t border-ochre-200">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-terracotta-500 hover:bg-terracotta-600 rounded-full shadow-sm hover:shadow transition-all"
                >
                  Volver al inicio de consteladores.cl
                </Link>
              </div>
            </div>
          ) : (
            <>
              {statusMessage?.type === "error" && (
                <div className="p-4 rounded-2xl text-xs leading-relaxed mb-6 text-center bg-red-50 border border-red-200 text-red-700 font-medium animate-fadeIn">
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Karen Suzuki"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="terapeuta@correo.cl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Rol o titular de perfil *
                    </label>
                    <select
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer font-medium"
                    >
                      <option value="Facilitador">Facilitador</option>
                      <option value="Practicante">Practicante</option>
                      <option value="Consultante">Consultante</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Biografía y presentación *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Explica tu forma de acompañar, los temas donde tienes mayor experiencia y qué puede esperar una persona en tu sesión..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Escuela o institución formativa
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Centro de Formación Sistémica / Instituto Bert Hellinger / etc."
                    value={formData.approach}
                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Años de práctica como constelador
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      required
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                      Tarifa por sesión individual online (CLP)
                    </label>
                    <input
                      type="number"
                      min="15000"
                      step="1000"
                      required
                      value={formData.priceClp}
                      onChange={(e) => setFormData({ ...formData, priceClp: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>
                </div>

                {/* Caja para subir certificado (Opcional) */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7DECE] space-y-2">
                  <label className="block text-xs font-semibold text-[#27221F]">
                    Certificado o Diploma de Constelador (Opcional) 📄
                  </label>
                  <p className="text-xs text-[#8A7E73] leading-relaxed mb-2">
                    Si dispones de tu diploma en formato PDF o imagen, puedes adjuntarlo. Documento confidencial para uso exclusivo del equipo moderador.
                  </p>
                  <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="text-xs text-[#5C524A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-[#F3ECE2] file:text-[#27221F] hover:file:bg-terracotta-100 hover:file:text-terracotta-700 cursor-pointer"
                  />
                </div>

                {/* Botón de Envío en Píldora Terracota */}
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 disabled:opacity-60 text-white font-medium text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                  >
                    {isUploading ? "Enviando postulación..." : "Enviar postulación"}
                  </button>
                </div>

                <p className="text-[11px] text-[#8A7E73] text-center leading-relaxed">
                  Tu postulación será evaluada. En caso de necesitar mayor información nos contactaremos contigo.
                </p>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
