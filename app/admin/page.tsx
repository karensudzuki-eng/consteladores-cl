"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cms/CMSContext";
import { CMSWorkshop, CMSHeroSlide, CMSTestimonial, CMSFacilitator, INITIAL_FACILITATORS } from "@/lib/cms/types";
import { FlyerDesigner } from "@/components/flyer-designer/FlyerDesigner";
import {
  saveAudioToIndexedDB,
  getAudioFromIndexedDB,
  removeAudioFromIndexedDB,
} from "@/lib/cms/audio-storage";

export default function AdminPage() {
  const { content, setContent, updateContent, isLoading } = useCMS();
  const [isSaving, setIsSaving] = useState(false);
  const [adminAudioPreview, setAdminAudioPreview] = useState<string>("");

  // Cargar preview de audio si está en IndexedDB o es URL
  useEffect(() => {
    if (content.settings?.heroMusicUrl === "indexeddb://hero_ambient_audio") {
      getAudioFromIndexedDB().then((src) => {
        if (src) setAdminAudioPreview(src);
      });
    } else if (content.settings?.heroMusicUrl) {
      setAdminAudioPreview(content.settings.heroMusicUrl);
    } else {
      setAdminAudioPreview("");
    }
  }, [content.settings?.heroMusicUrl]);

  // Autenticación simple mediante clave
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Pestañas del Panel
  const [activeTab, setActiveTab] = useState<
    | "talleres"
    | "disenador"
    | "carrusel-explicativo"
    | "sesion"
    | "facilitadores"
    | "quienes-somos"
    | "experiencias"
    | "contacto"
  >("talleres");

  // Estado para módulo Facilitadores
  const [facilitatorSearch, setFacilitatorSearch] = useState("");
  const [facilitatorRoleFilter, setFacilitatorRoleFilter] = useState<"todos" | "Facilitador" | "Practicante">("todos");
  const [selectedFacilitatorId, setSelectedFacilitatorId] = useState<string>("");

  // Taller seleccionado actualmente para editar
  const [selectedWorkshopIndex, setSelectedWorkshopIndex] = useState(0);

  // Estados de feedback
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Verificar si ya inició sesión en esta sesión de navegador
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("cst_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Claves de acceso válidas
    if (passwordInput === "consteladores2026" || passwordInput === "2026" || passwordInput === "icalma2026") {
      setIsAuthenticated(true);
      setAuthError("");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cst_admin_auth", "true");
      }
    } else {
      setAuthError("Clave incorrecta. Por favor intenta nuevamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cst_admin_auth");
    }
  };

  // Función utilitaria robusta para optimizar imágenes (reducción 95% para evitar fallos de cuota o 413)
  const optimizeImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const rawResult = (reader.result as string) || "";
        if (file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")) {
          return resolve(rawResult);
        }
        const img = new Image();
        img.onload = () => {
          try {
            const maxDim = 960;
            let width = img.width;
            let height = img.height;
            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(rawResult);

            // 1. Probar compresión moderna WebP (reduce 90% preservando transparencias)
            let dataUrl = "";
            try {
              ctx.drawImage(img, 0, 0, width, height);
              const testWebp = canvas.toDataURL("image/webp", 0.8);
              if (testWebp && testWebp.startsWith("data:image/webp")) {
                dataUrl = testWebp;
              }
            } catch (e) {}

            // 2. Si el navegador no soporta WebP, usar JPEG optimizado (0.78)
            if (!dataUrl) {
              const bgCanvas = document.createElement("canvas");
              bgCanvas.width = width;
              bgCanvas.height = height;
              const bgCtx = bgCanvas.getContext("2d");
              if (bgCtx) {
                bgCtx.fillStyle = "#FAF8F5";
                bgCtx.fillRect(0, 0, width, height);
                bgCtx.drawImage(img, 0, 0, width, height);
                dataUrl = bgCanvas.toDataURL("image/jpeg", 0.78);
              } else {
                dataUrl = canvas.toDataURL("image/jpeg", 0.78);
              }
            }
            resolve(dataUrl || rawResult);
          } catch {
            resolve(rawResult);
          }
        };
        img.onerror = () => resolve(rawResult);
        img.src = rawResult;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  // Guardar todos los cambios
  const handleSaveAll = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsSaving(true);
    try {
      const ok = await updateContent(content);
      if (ok) {
        setSuccessMessage("✓ ¡Cambios guardados exitosamente y aplicados a la web!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage("Error al guardar en el servidor. Los datos quedaron respaldados localmente.");
      }
    } catch (err: any) {
      setErrorMessage("Aviso: Guardado localmente con éxito.");
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Gestión de Talleres
  const handleAddWorkshop = () => {
    const newWorkshop: CMSWorkshop = {
      id: `taller-${Date.now()}`,
      title: "Nuevo Taller Vivencial de Constelaciones",
      description:
        "Te invitamos a un taller vivencial donde, a través de la escenificación de dinámicas personales, podrás mirar tu vida desde una perspectiva más profunda y liberadora.",
      importantNote:
        '⚠️ Los casos a constelar se seleccionarán durante el encuentro. Aunque no todos los asistentes constelarán de forma individual, la experiencia demuestra que el trabajo de cada compañero resuena con nuestras propias vivencias, permitiendo que todos los presentes vivan un proceso de aprendizaje y transformación compartida. "Cuando tú constelas, todos constelamos".',
      date: "Próxima fecha",
      time: "10:00 a 14:00 hrs",
      facilitators: "Facilitadoras Acreditadas",
      address: "Edmundo Eluchans 3047, of. 22, Concón",
      city: "Concón / Valparaíso",
      price: "$35.000",
      modality: "presencial",
      logoType: "icalma",
      logoUrl: "",
      flyerUrl: "/images/arbol-generaciones.png",
      phoneContact: "+56 9 6373 0998",
      isActive: true,
    };

    const updated = [...content.workshops, newWorkshop];
    setContent({ ...content, workshops: updated });
    setSelectedWorkshopIndex(updated.length - 1);
  };

  const handleDeleteWorkshop = (index: number) => {
    if (content.workshops.length <= 1) {
      alert("Debe haber al menos un taller registrado. Puedes marcarlo como inactivo si no deseas mostrarlo.");
      return;
    }
    if (confirm("¿Estás segura de eliminar este taller?")) {
      const updated = content.workshops.filter((_, i) => i !== index);
      setContent({ ...content, workshops: updated });
      setSelectedWorkshopIndex(0);
    }
  };

  // Gestión de Diapositivas del Carrusel Giratorio
  const handleAddSlide = () => {
    const newSlide: CMSHeroSlide = {
      id: `slide-${Date.now()}`,
      imageUrl: "/images/mirar-historia-sanar.png",
      title: "Nuevo aspecto sistémico",
      description: "Explicación breve de lo que es una constelación familiar y cómo aporta paz y comprensión al sistema.",
    };
    setContent({
      ...content,
      heroSlides: [...(content.heroSlides || []), newSlide],
    });
  };

  const handleDeleteSlide = (index: number) => {
    if ((content.heroSlides || []).length <= 1) {
      alert("Debe haber al menos una diapositiva en el carrusel.");
      return;
    }
    if (confirm("¿Eliminar esta diapositiva?")) {
      const updated = (content.heroSlides || []).filter((_, i) => i !== index);
      setContent({ ...content, heroSlides: updated });
    }
  };

  // Gestión de Experiencias / Testimonios
  const handleAddTestimonial = () => {
    const newTest: CMSTestimonial = {
      id: `test-${Date.now()}`,
      quote: "Describe aquí la experiencia de la consultante con sus palabras de alivio y comprensión...",
      attribution: "Consultante, Región Metropolitana · fecha",
    };
    setContent({
      ...content,
      testimonials: [...(content.testimonials || []), newTest],
    });
  };

  const handleDeleteTestimonial = (index: number) => {
    if (confirm("¿Eliminar este testimonio?")) {
      const updated = (content.testimonials || []).filter((_, i) => i !== index);
      setContent({ ...content, testimonials: updated });
    }
  };

  // Gestión de Facilitadores y Practicantes
  const handleAddFacilitator = () => {
    const newId = `facilitador-${Date.now()}`;
    const newFacilitator: CMSFacilitator = {
      id: newId,
      name: "Nuevo Facilitador(a)",
      headline: "Facilitador(a) en Constelaciones Familiares",
      role: "Facilitador",
      schoolAndYear: "Formación en Constelaciones Sistémicas",
      city: "Santiago / Online Chile",
      modality: "Online (Google Meet)",
      price: "$40.000",
      experienceYears: 2,
      bio: "Espacio de acompañamiento y escucha para mirar las dinámicas del sistema familiar.",
      imageUrl: "",
      specialties: ["Familia y Origen", "Pareja y Vínculos"],
      email: "",
      phone: content.settings?.whatsappNumber || "+56 9 4193 9363",
      certificationUrl: "",
      isActive: true,
    };

    const updated = [newFacilitator, ...(content.facilitators || [])];
    setContent({
      ...content,
      facilitators: updated,
    });
    setSelectedFacilitatorId(newId);
  };

  const handleDeleteFacilitator = (id: string) => {
    if (confirm("¿Estás segura de eliminar a este facilitador(a) del directorio?")) {
      const updated = (content.facilitators || []).filter((f) => f.id !== id);
      setContent({
        ...content,
        facilitators: updated,
      });
      if (selectedFacilitatorId === id) {
        setSelectedFacilitatorId(updated[0]?.id || "");
      }
    }
  };

  // Si no está autenticado, mostrar formulario de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-8 shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-cream-200 border border-[#E7DECE] text-terracotta-700 text-2xl flex items-center justify-center mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#27221F] mb-2">
            Panel de Administración
          </h1>
          <p className="text-xs text-[#5C524A] mb-6">
            Gestión completa de talleres, carrusel explicativo, sesión individual, quiénes somos y testimonios para consteladores.cl
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Ingresa la clave de acceso"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-center"
              />
              {authError && (
                <p className="text-xs text-red-600 mt-2 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm shadow transition-all cursor-pointer"
            >
              Entrar al Panel →
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E7DECE]">
            <Link
              href="/"
              className="text-xs text-[#8A7E73] hover:text-[#27221F] transition-colors"
            >
              ← Volver al sitio web
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentWorkshop = content.workshops[selectedWorkshopIndex] || content.workshops[0];

  const currentFacilitator =
    (content.facilitators || []).find((f) => f.id === selectedFacilitatorId) ||
    (content.facilitators || [])[0];

  const handleUpdateCurrentFacilitator = (field: keyof CMSFacilitator, value: any) => {
    if (!currentFacilitator) return;
    const updated = (content.facilitators || []).map((f) => {
      if (f.id === currentFacilitator.id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    setContent({ ...content, facilitators: updated });
  };

  // Restaurar perfiles iniciales recomendados (Erika Alert y Karen Sudzuki)
  const handleRestoreDefaultFacilitators = () => {
    const existing = content.facilitators || [];
    const missing = INITIAL_FACILITATORS.filter(
      (init) => !existing.some((f) => f.name.toLowerCase() === init.name.toLowerCase())
    );

    if (missing.length === 0) {
      if (
        confirm(
          "Erika Alert y Karen Sudzuki ya están en la lista. ¿Deseas restablecer sus perfiles a la información inicial original?"
        )
      ) {
        const others = existing.filter(
          (f) =>
            !INITIAL_FACILITATORS.some(
              (init) =>
                init.id === f.id ||
                init.name.toLowerCase() === f.name.toLowerCase()
            )
        );
        const updated = [...INITIAL_FACILITATORS, ...others];
        setContent({ ...content, facilitators: updated });
        setSelectedFacilitatorId(INITIAL_FACILITATORS[0].id);
        setSuccessMessage("✓ Perfiles de Erika Alert y Karen Sudzuki restablecidos exitosamente.");
        setTimeout(() => setSuccessMessage(""), 4000);
      }
    } else {
      const updated = [...missing, ...existing];
      setContent({ ...content, facilitators: updated });
      setSelectedFacilitatorId(missing[0].id);
      setSuccessMessage(`✓ Se agregaron ${missing.map((m) => m.name).join(" y ")} al directorio.`);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  };

  const filteredFacilitators = (content.facilitators || []).filter((f) => {
    if (facilitatorRoleFilter !== "todos") {
      const roleStr = f.role || "Facilitador";
      if (roleStr.toLowerCase() !== facilitatorRoleFilter.toLowerCase()) {
        return false;
      }
    }
    const searchClean = facilitatorSearch.trim().toLowerCase();
    if (searchClean.length >= 2) {
      const matchName = f.name?.toLowerCase().includes(searchClean);
      const matchCity = f.city?.toLowerCase().includes(searchClean);
      const matchHeadline = f.headline?.toLowerCase().includes(searchClean);
      const matchBio = f.bio?.toLowerCase().includes(searchClean);
      const matchSpecialties = f.specialties?.some((s) =>
        s.toLowerCase().includes(searchClean)
      );
      if (!matchName && !matchCity && !matchHeadline && !matchBio && !matchSpecialties) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased pb-20">
      {/* Barra Superior del Admin */}
      <header className="sticky top-0 z-30 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#E7DECE] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif font-bold text-xl text-[#27221F] hover:text-terracotta-600">
            consteladores<span className="text-terracotta-500 italic">.cl</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-[11px] font-semibold px-3 py-1 rounded-full bg-cream-100 hover:bg-cream-200 text-[#5C524A] hover:text-[#27221F] border border-[#E7DECE] transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Ver sitio en vivo</span>
            <span>↗</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón Descargar Respaldo JSON */}
          <button
            type="button"
            onClick={() => {
              const dataStr =
                "data:text/json;charset=utf-8," +
                encodeURIComponent(JSON.stringify(content, null, 2));
              const downloadAnchor = document.createElement("a");
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute(
                "download",
                `consteladores-cms-backup-${new Date().toISOString().split("T")[0]}.json`
              );
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="text-xs text-[#5C524A] hover:text-[#27221F] px-3 py-1.5 rounded-lg border border-[#E7DECE] bg-white transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1 shadow-xs"
            title="Descargar copia de respaldo JSON con todo el contenido actual"
          >
            <span>📥 Respaldo JSON</span>
          </button>

          {/* Botón Restaurar Respaldo JSON */}
          <label
            className="text-xs text-[#5C524A] hover:text-[#27221F] px-3 py-1.5 rounded-lg border border-[#E7DECE] bg-white transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1 shadow-xs"
            title="Restaurar una copia de respaldo JSON guardada previamente"
          >
            <span>📤 Restaurar JSON</span>
            <input
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = async () => {
                  try {
                    const parsed = JSON.parse(reader.result as string);
                    if (parsed?.settings && Array.isArray(parsed?.workshops)) {
                      setContent(parsed);
                      await updateContent(parsed);
                      setSuccessMessage("✓ ¡Copia de respaldo restaurada exitosamente!");
                      setTimeout(() => setSuccessMessage(""), 5000);
                    } else {
                      alert("El archivo no tiene el formato de contenido válido de consteladores.cl");
                    }
                  } catch {
                    alert("Error al procesar el archivo JSON.");
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSaving ? "Guardando..." : "💾 Guardar Cambios"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-[#8A7E73] hover:text-[#27221F] px-3 py-1.5 rounded-lg border border-[#E7DECE] transition-colors"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Alertas de Notificación */}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-800 animate-fadeIn">
            {successMessage}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-xs sm:text-sm font-semibold text-amber-800 animate-fadeIn">
            {errorMessage}
          </div>
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pestañas de Navegación del CMS */}
        <div className="flex items-center gap-2 border-b border-[#E7DECE] pb-3 mb-8 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("talleres")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "talleres"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            🎪 Talleres ({content.workshops.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("disenador")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "disenador"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            <span>🎨 Diseñador Flyers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("carrusel-explicativo")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "carrusel-explicativo"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            🎠 Carrusel & Música ({(content.heroSlides || []).length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sesion")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "sesion"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            🌿 Sesión Individual
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("facilitadores")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "facilitadores"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            <span>👥 Facilitadores ({(content.facilitators || []).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quienes-somos")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "quienes-somos"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            👥 Quiénes Somos
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("experiencias")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "experiencias"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            💬 Experiencias ({(content.testimonials || []).length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contacto")}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "contacto"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            💳 WhatsApp & Pagos
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PESTAÑA 1: GESTOR DE TALLERES                                            */}
        {/* ========================================================================= */}
        {activeTab === "talleres" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#5C524A]">
                  Tus Talleres
                </h2>
                <button
                  type="button"
                  onClick={handleAddWorkshop}
                  className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  + Nuevo Taller
                </button>
              </div>

              <div className="space-y-2">
                {content.workshops.map((w, index) => (
                  <div
                    key={w.id || index}
                    onClick={() => setSelectedWorkshopIndex(index)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      selectedWorkshopIndex === index
                        ? "bg-[#FCFAF7] border-terracotta-500 shadow-md ring-1 ring-terracotta-400"
                        : "bg-white border-[#E7DECE] hover:border-[#D5C8B4]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] overflow-hidden border border-[#E7DECE] shrink-0">
                        {w.flyerUrl ? (
                          <img src={w.flyerUrl} alt={w.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">🖼️</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${w.modality === "online" ? "bg-sky-100 text-sky-800" : "bg-emerald-100 text-emerald-800"}`}>
                            {w.modality === "online" ? "Online" : "Presencial"}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-[#27221F] truncate">{w.title}</h3>
                        <p className="text-[11px] text-[#8A7E73] truncate">{w.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor de Taller Seleccionado */}
            <div className="lg:col-span-8 bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7DECE]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-600 block">
                    Editando Taller #{selectedWorkshopIndex + 1}
                  </span>
                  <h2 className="text-lg font-serif font-bold text-[#27221F]">
                    {currentWorkshop.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#5C524A] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentWorkshop.isActive}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].isActive = e.target.checked;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="h-4 w-4 rounded text-terracotta-600 cursor-pointer"
                    />
                    <span>Visible en carrusel</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDeleteWorkshop(selectedWorkshopIndex)}
                    className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Flyer y Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE]">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-2">
                    Flyer del Taller (Imagen)
                  </label>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#E7DECE] bg-white mb-2">
                    {currentWorkshop.flyerUrl ? (
                      <img src={currentWorkshop.flyerUrl} alt="Flyer" className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#8A7E73]">Sin imagen</div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const dataUrl = await optimizeImageFile(file);
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].flyerUrl = dataUrl;
                        setContent({ ...content, workshops: updated });
                      } catch (err) {
                        alert("Error al cargar la imagen");
                      }
                    }}
                    className="block w-full text-xs text-[#5C524A] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-2">
                      Logotipo de la Actividad
                    </label>
                    <select
                      value={currentWorkshop.logoType}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].logoType = e.target.value as any;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] font-medium"
                    >
                      <option value="icalma">Logo Oficial Icalma</option>
                      <option value="vortice">Logo Vórtice Integración</option>
                      <option value="custom">Logo Personalizado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">
                      Modalidad del Taller
                    </label>
                    <select
                      value={currentWorkshop.modality || "presencial"}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].modality = e.target.value as any;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] font-semibold"
                    >
                      <option value="presencial">Presencial (Sala)</option>
                      <option value="online">Online (Google Meet)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Textos del Taller */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Título *</label>
                  <input
                    type="text"
                    value={currentWorkshop.title}
                    onChange={(e) => {
                      const updated = [...content.workshops];
                      updated[selectedWorkshopIndex].title = e.target.value;
                      setContent({ ...content, workshops: updated });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Fecha</label>
                    <input
                      type="text"
                      value={currentWorkshop.date}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].date = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Horario</label>
                    <input
                      type="text"
                      value={currentWorkshop.time}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].time = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Valor</label>
                    <input
                      type="text"
                      value={currentWorkshop.price}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].price = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Dirección / Lugar</label>
                    <input
                      type="text"
                      value={currentWorkshop.address}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].address = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Facilitadoras</label>
                    <input
                      type="text"
                      value={currentWorkshop.facilitators}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].facilitators = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Descripción del Taller</label>
                  <textarea
                    rows={3}
                    value={currentWorkshop.description}
                    onChange={(e) => {
                      const updated = [...content.workshops];
                      updated[selectedWorkshopIndex].description = e.target.value;
                      setContent({ ...content, workshops: updated });
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">
                      Teléfono / WhatsApp de Reservas *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. +56 9 6373 0998"
                      value={currentWorkshop.phoneContact || "+56 9 6373 0998"}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].phoneContact = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs font-bold text-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">
                      Ciudad / Región
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Concón / Valparaíso"
                      value={currentWorkshop.city || ""}
                      onChange={(e) => {
                        const updated = [...content.workshops];
                        updated[selectedWorkshopIndex].city = e.target.value;
                        setContent({ ...content, workshops: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TEXTOS DE LA SECCIÓN TALLERES (Un solo bloque editable sin bordes) */}
            <div className="lg:col-span-12 bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-3">
              <div className="border-b border-[#E7DECE] pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                  Texto de la Sección Talleres (Un solo bloque editable)
                </span>
                <p className="text-[11px] text-[#5C524A]">
                  Este texto aparece directamente bajo el título &quot;Talleres de Constelaciones&quot; en la página principal, sin cajas ni bordes duros.
                </p>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={content.settings.workshopAboutDescription || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, workshopAboutDescription: e.target.value },
                    })
                  }
                  placeholder="Te invitamos a un taller de constelaciones donde..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm leading-relaxed text-[#27221F]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 2: DISEÑADOR RÁPIDO DE FLYERS                                    */}
        {/* ========================================================================= */}
        {activeTab === "disenador" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm">
            <FlyerDesigner
              onSaveToWorkshops={(workshopData, flyerDataUrl) => {
                const newWorkshop: CMSWorkshop = {
                  id: `taller-disenado-${Date.now()}`,
                  title: workshopData.title || "Taller Vivencial de Constelaciones",
                  description:
                    workshopData.description ||
                    "Te invitamos a un taller vivencial donde, a través de la escenificación de dinámicas personales, podrás mirar tu vida desde una perspectiva más profunda y liberadora.",
                  importantNote:
                    '⚠️ Los casos a constelar se seleccionarán durante el encuentro. Aunque no todos los asistentes constelarán de forma individual, la experiencia demuestra que el trabajo de cada compañero resuena con nuestras propias vivencias, permitiendo que todos los presentes vivan un proceso de aprendizaje y transformación compartida.',
                  date: workshopData.date || "Próxima fecha",
                  time: workshopData.time || "10:00 a 14:00 hrs",
                  facilitators: workshopData.facilitators || "Erika Alert y Karen Sudzuki",
                  address: workshopData.address || "Edmundo Eluchans 3047, of. 22, Concón",
                  city: workshopData.city || "Concón / Valparaíso",
                  price: workshopData.price || "$40.000",
                  modality: "presencial",
                  logoType: "icalma",
                  logoUrl: "",
                  flyerUrl: flyerDataUrl,
                  phoneContact: workshopData.phoneContact || "+56 9 6373 0998",
                  isActive: true,
                };
                const updated = [...content.workshops, newWorkshop];
                setContent({ ...content, workshops: updated });
                setActiveTab("talleres");
                setSelectedWorkshopIndex(updated.length - 1);
                setSuccessMessage("✓ ¡Flyer exportado y agregado exitosamente al carrusel!");
              }}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 3: CARRUSEL GIRATORIO CON MÚSICA AMBIENTAL                       */}
        {/* ========================================================================= */}
        {activeTab === "carrusel-explicativo" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DECE]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#27221F]">
                  Carrusel Giratorio Explicativo (Bajo el Título Principal)
                </h2>
                <p className="text-xs text-[#5C524A]">
                  Configura las imágenes y los textos explicativos que rotan lentamente para explicar qué es una constelación familiar, junto a la música ambiental.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSlide}
                className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                + Nueva Diapositiva
              </button>
            </div>

            {/* Música Ambiental (Subida de MP3 Local o Enlace) */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE] space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  🎵 Música Ambiental para el Carrusel (MP3 / Audio Local)
                </label>
                <p className="text-[11px] text-[#8A7E73]">
                  Puedes subir tu propio archivo de música relajante (.mp3, .wav) o pegar una URL. Los consultantes podrán activar o pausar este sonido mientras rotan las imágenes explicativas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                    Opción A: Subir archivo MP3 local desde tu computador
                  </label>
                  <input
                    type="file"
                    accept="audio/*,.mp3,.wav,.ogg,.m4a"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const dataUrl = reader.result as string;
                        await saveAudioToIndexedDB(dataUrl);
                        setContent({
                          ...content,
                          settings: { ...content.settings, heroMusicUrl: "indexeddb://hero_ambient_audio" },
                        });
                        setAdminAudioPreview(dataUrl);
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="block w-full text-xs text-[#5C524A] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                    Opción B: URL o enlace web al archivo de audio
                  </label>
                  <input
                    type="text"
                    value={content.settings.heroMusicUrl?.startsWith("indexeddb://") ? "" : (content.settings.heroMusicUrl || "")}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent({
                        ...content,
                        settings: { ...content.settings, heroMusicUrl: val },
                      });
                      setAdminAudioPreview(val);
                    }}
                    placeholder="https://.../musica-relajante.mp3 o /audio/..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>
              </div>

              {/* Vista previa y reproductor interactivo */}
              {adminAudioPreview && (
                <div className="pt-2 border-t border-[#E7DECE]/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E7DECE]">
                  <div className="w-full sm:flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      ✓ Audio actual configurado (Prueba reproduciendo aquí):
                    </span>
                    <audio
                      controls
                      src={adminAudioPreview}
                      className="w-full h-8"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      await removeAudioFromIndexedDB();
                      setContent({
                        ...content,
                        settings: { ...content.settings, heroMusicUrl: "" },
                      });
                      setAdminAudioPreview("");
                    }}
                    className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer shrink-0"
                  >
                    Quitar audio
                  </button>
                </div>
              )}
            </div>

            {/* Lista de Diapositivas */}
            <div className="space-y-4">
              {(content.heroSlides || []).map((slide, sIdx) => (
                <div
                  key={slide.id || sIdx}
                  className="bg-white p-5 rounded-2xl border border-[#E7DECE] space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
                      Diapositiva #{sIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(sIdx)}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    <div className="sm:col-span-5 space-y-2">
                      <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-[#E7DECE] bg-[#2A221E] flex items-center justify-center shadow-inner group">
                        {slide.imageUrl ? (
                          <>
                            {/* Fondo ambiental difuminado de la misma imagen */}
                            <img
                              src={slide.imageUrl}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 pointer-events-none"
                            />
                            {/* Fotografía principal completa sin cortes */}
                            <img
                              src={slide.imageUrl}
                              alt={slide.title}
                              className={`relative z-10 max-h-full max-w-full ${
                                slide.fit === "cover"
                                  ? `w-full h-full object-cover ${
                                      slide.position === "top"
                                        ? "object-top"
                                        : slide.position === "bottom"
                                        ? "object-bottom"
                                        : "object-center"
                                    }`
                                  : "w-auto h-auto object-contain drop-shadow-md"
                              }`}
                            />
                          </>
                        ) : (
                          <div className="text-center p-4 text-[#8A7E73] text-xs">
                            Sin imagen cargada
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const dataUrl = await optimizeImageFile(file);
                            const updated = [...(content.heroSlides || [])];
                            updated[sIdx].imageUrl = dataUrl;
                            setContent({ ...content, heroSlides: updated });
                          } catch (err) {
                            alert("Error al cargar la imagen");
                          }
                        }}
                        className="block w-full text-[11px] text-[#5C524A] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                          Título de la Diapositiva
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...(content.heroSlides || [])];
                            updated[sIdx].title = e.target.value;
                            setContent({ ...content, heroSlides: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-bold text-[#27221F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                          Texto Explicativo de la Constelación
                        </label>
                        <textarea
                          rows={3}
                          value={slide.description}
                          onChange={(e) => {
                            const updated = [...(content.heroSlides || [])];
                            updated[sIdx].description = e.target.value;
                            setContent({ ...content, heroSlides: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] resize-none"
                        />
                      </div>

                      {/* Ajuste de foto: Foto completa vs Llenar contenedor */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#E7DECE]/60">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7E73] mb-1">
                            Ajuste de fotografía
                          </label>
                          <select
                            value={slide.fit || "contain"}
                            onChange={(e) => {
                              const updated = [...(content.heroSlides || [])];
                              updated[sIdx].fit = e.target.value as any;
                              setContent({ ...content, heroSlides: updated });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] cursor-pointer"
                          >
                            <option value="contain">Foto completa (sin cortar rostros)</option>
                            <option value="cover">Llenar contenedor (recortado)</option>
                          </select>
                        </div>
                        {slide.fit === "cover" && (
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A7E73] mb-1">
                              Enfoque del recorte
                            </label>
                            <select
                              value={slide.position || "top"}
                              onChange={(e) => {
                                const updated = [...(content.heroSlides || [])];
                                updated[sIdx].position = e.target.value as any;
                                setContent({ ...content, heroSlides: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] cursor-pointer"
                            >
                              <option value="top">Arriba (priorizar rostros/cabezas)</option>
                              <option value="center">Centrado</option>
                              <option value="bottom">Abajo</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 4: SESIÓN INDIVIDUAL                                             */}
        {/* ========================================================================= */}
        {activeTab === "sesion" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-[#E7DECE]">
              <h2 className="text-lg font-serif font-bold text-[#27221F]">
                Sesión Individual (Online, Presencial o Videollamada)
              </h2>
              <p className="text-xs text-[#5C524A]">
                Configura la imagen lateral, textos explicativos, duración, materiales y requisitos para tus consultantes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Imagen Lateral de la Sesión */}
              <div className="sm:col-span-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE] space-y-3">
                <label className="block text-xs font-bold text-[#5C524A]">
                  Imagen Lateral de la Sesión
                </label>
                <div className="w-full h-48 rounded-xl overflow-hidden border border-[#E7DECE] bg-white">
                  <img
                    src={content.settings.serviceImage || "/images/mirar-historia-sanar.png"}
                    alt="Sesión Individual"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const dataUrl = await optimizeImageFile(file);
                      setContent({
                        ...content,
                        settings: { ...content.settings, serviceImage: dataUrl },
                      });
                    } catch (err) {
                      alert("Error al cargar la imagen");
                    }
                  }}
                  className="block w-full text-[11px] text-[#5C524A] file:mr-2 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                />
              </div>

              {/* Textos y Parámetros de la Sesión */}
              <div className="sm:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Título</label>
                    <input
                      type="text"
                      value={content.settings.serviceTitle}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          settings: { ...content.settings, serviceTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Duración</label>
                    <input
                      type="text"
                      value={content.settings.serviceDuration || "1 hora aprox."}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          settings: { ...content.settings, serviceDuration: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1">Valor Sesión</label>
                    <input
                      type="text"
                      value={content.settings.servicePrice}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          settings: { ...content.settings, servicePrice: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-bold text-terracotta-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Explicación de la Sesión Individual
                  </label>
                  <textarea
                    rows={4}
                    value={content.settings.serviceDescription}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, serviceDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Requisitos Online
                  </label>
                  <input
                    type="text"
                    value={content.settings.serviceOnlineRequirements || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, serviceOnlineRequirements: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA: FACILITADORES Y PRACTICANTES                                     */}
        {/* ========================================================================= */}
        {activeTab === "facilitadores" && (
          <div className="space-y-8">
            {/* 1. SECCIÓN: TEXTOS DEL FORMULARIO DE POSTULACIÓN */}
            <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="pb-3 border-b border-[#E7DECE] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#27221F]">
                    Textos del Formulario de Postulación (/registro-terapeuta)
                  </h2>
                  <p className="text-xs text-[#5C524A]">
                    Personaliza los títulos, descripciones y notas de revisión que ven los postulantes al postular.
                  </p>
                </div>
                <Link
                  href="/registro-terapeuta"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-terracotta-600 hover:text-terracotta-700 font-semibold"
                >
                  <span>Ver formulario público</span>
                  <span>↗</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Título principal de la página
                  </label>
                  <input
                    type="text"
                    value={content.settings?.postulationTitle || "Postulación a la Red de Consteladores"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, postulationTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Subtítulo / Bajada descriptiva
                  </label>
                  <input
                    type="text"
                    value={
                      content.settings?.postulationDescription ||
                      "Postula para formar parte de nuestro equipo de facilitadores y practicantes."
                    }
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, postulationDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Mensaje de confirmación y revisión (Nota final)
                  </label>
                  <input
                    type="text"
                    value={
                      content.settings?.postulationSuccessNote ||
                      "Tu postulación será evaluada. En caso de necesitar mayor información nos contactaremos contigo."
                    }
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, postulationSuccessNote: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. GESTIÓN DEL DIRECTORIO DE FACILITADORES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* COLUMNA IZQUIERDA: BUSCADOR, FILTRO Y LISTA */}
              <div className="lg:col-span-5 bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E7DECE] gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#27221F]">
                      Directorio de Facilitadores
                    </h3>
                    <p className="text-[11px] text-[#8A7E73]">
                      {filteredFacilitators.length} de {(content.facilitators || []).length} registrados
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRestoreDefaultFacilitators}
                      title="Restaurar o recuperar los perfiles iniciales de Erika Alert y Karen Sudzuki"
                      className="px-2.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>🔄 Restaurar fundadoras</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFacilitator}
                      className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>+ Agregar</span>
                    </button>
                  </div>
                </div>

                {/* Buscador en vivo por nombre o ubicación (mínimo 2 caracteres) */}
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Buscador en tiempo real
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej. Karen, Erika, Santiago, Valparaíso..."
                      value={facilitatorSearch}
                      onChange={(e) => setFacilitatorSearch(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                    <span className="absolute left-2.5 top-2.5 text-xs text-[#8A7E73]">🔍</span>
                    {facilitatorSearch && (
                      <button
                        type="button"
                        onClick={() => setFacilitatorSearch("")}
                        className="absolute right-2.5 top-2 text-xs text-[#8A7E73] hover:text-[#27221F]"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  {facilitatorSearch.trim().length > 0 && facilitatorSearch.trim().length < 2 && (
                    <p className="text-[11px] text-amber-700 mt-1">
                      ℹ️ Escribe al menos 2 letras para filtrar...
                    </p>
                  )}
                </div>

                {/* Filtro desplegable por rol */}
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Filtrar por categoría / rol
                  </label>
                  <select
                    value={facilitatorRoleFilter}
                    onChange={(e) => setFacilitatorRoleFilter(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer"
                  >
                    <option value="todos">Todos los roles ({(content.facilitators || []).length})</option>
                    <option value="Facilitador">Facilitador / Constelador</option>
                    <option value="Practicante">Practicante</option>
                  </select>
                </div>

                {/* Lista de Facilitadores */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {filteredFacilitators.length === 0 ? (
                    <div className="p-6 text-center bg-cream-50 rounded-2xl border border-dashed border-[#E7DECE] space-y-3">
                      <p className="text-xs text-[#8A7E73]">
                        No se encontraron facilitadores con ese criterio.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFacilitatorSearch("");
                            setFacilitatorRoleFilter("todos");
                          }}
                          className="px-3 py-1.5 rounded-full bg-white border border-[#E7DECE] text-xs font-semibold text-[#5C524A] hover:bg-cream-100 cursor-pointer"
                        >
                          Limpiar filtros
                        </button>
                        <button
                          type="button"
                          onClick={handleRestoreDefaultFacilitators}
                          className="px-3 py-1.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold cursor-pointer"
                        >
                          Restaurar Erika Alert y Karen Sudzuki
                        </button>
                      </div>
                    </div>
                  ) : (
                    filteredFacilitators.map((f) => {
                      const isSelected = currentFacilitator?.id === f.id;
                      const isPracticante = f.role?.toLowerCase() === "practicante";
                      const initials = f.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2);

                      return (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFacilitatorId(f.id)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? "bg-terracotta-50/70 border-terracotta-400 ring-2 ring-terracotta-200"
                              : "bg-white border-[#E7DECE] hover:border-terracotta-200 hover:bg-cream-50/50"
                          }`}
                        >
                          {/* Mini avatar */}
                          {f.imageUrl ? (
                            <img
                              src={f.imageUrl}
                              alt={f.name}
                              className="w-11 h-11 rounded-full object-cover border border-[#E7DECE] shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-[#F3ECE2] border border-terracotta-200 text-terracotta-700 font-serif font-bold text-xs flex items-center justify-center shrink-0">
                              {initials}
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#27221F] truncate">
                                {f.name}
                              </h4>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  isPracticante
                                    ? "bg-sky-100 text-sky-800 border border-sky-200"
                                    : "bg-terracotta-100 text-terracotta-800 border border-terracotta-200"
                                }`}
                              >
                                {f.role || "Facilitador"}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#8A7E73] truncate">
                              📍 {f.city || "Sin ubicación"} · {f.modality || "Online"}
                            </p>
                            <div className="flex items-center justify-between text-[10px] mt-0.5">
                              <span className="font-bold text-[#27221F]">{f.price || "$40.000"}</span>
                              <span
                                className={
                                  f.isActive !== false
                                    ? "text-emerald-700 font-semibold"
                                    : "text-amber-700 font-semibold"
                                }
                              >
                                {f.isActive !== false ? "🟢 Visible" : "⚪ Oculto"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="pt-2 border-t border-[#E7DECE]">
                  <button
                    type="button"
                    onClick={handleAddFacilitator}
                    className="w-full py-2.5 rounded-xl border border-dashed border-terracotta-300 hover:bg-terracotta-50/50 text-terracotta-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>+ Agregar nuevo facilitador / practicante</span>
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA: FORMULARIO DE EDICIÓN COMPLETA */}
              <div className="lg:col-span-7 bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                {!currentFacilitator ? (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#8A7E73] mb-4">No hay ningún facilitador seleccionado.</p>
                    <button
                      type="button"
                      onClick={handleAddFacilitator}
                      className="px-6 py-2.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold"
                    >
                      + Crear primer perfil
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header del Editor */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7DECE]">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-terracotta-600 font-bold">
                          Editando perfil de facilitador
                        </span>
                        <h3 className="font-serif font-bold text-xl text-[#27221F]">
                          {currentFacilitator.name || "Nuevo Perfil"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-[#E7DECE] text-xs font-semibold text-[#27221F]">
                          <input
                            type="checkbox"
                            checked={currentFacilitator.isActive !== false}
                            onChange={(e) => handleUpdateCurrentFacilitator("isActive", e.target.checked)}
                            className="rounded text-terracotta-500 focus:ring-terracotta-400"
                          />
                          <span>Visible en la web pública</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleDeleteFacilitator(currentFacilitator.id)}
                          className="text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Formulario Completo de Campos */}
                    <div className="space-y-4">
                      {/* Fila 1: Nombre y Rol */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            value={currentFacilitator.name}
                            onChange={(e) => handleUpdateCurrentFacilitator("name", e.target.value)}
                            placeholder="Ej. Karen Suzuki"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Rol o categoría *
                          </label>
                          <select
                            value={currentFacilitator.role || "Facilitador"}
                            onChange={(e) => handleUpdateCurrentFacilitator("role", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-medium cursor-pointer"
                          >
                            <option value="Facilitador">Facilitador / Constelador</option>
                            <option value="Practicante">Practicante</option>
                            <option value="Consultante">Consultante</option>
                          </select>
                        </div>
                      </div>

                      {/* Fila 2: Titular / Especialidad */}
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Titular de perfil (headline)
                        </label>
                        <input
                          type="text"
                          value={currentFacilitator.headline}
                          onChange={(e) => handleUpdateCurrentFacilitator("headline", e.target.value)}
                          placeholder="Ej. Facilitadora Acreditada en Constelaciones Familiares..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                        />
                      </div>

                      {/* Fila 3: Correo y Teléfono/WhatsApp */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            value={currentFacilitator.email || ""}
                            onChange={(e) => handleUpdateCurrentFacilitator("email", e.target.value)}
                            placeholder="terapeuta@correo.cl"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Teléfono / WhatsApp de contacto
                          </label>
                          <input
                            type="text"
                            value={currentFacilitator.phone || ""}
                            onChange={(e) => handleUpdateCurrentFacilitator("phone", e.target.value)}
                            placeholder="+56 9 1234 5678"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>
                      </div>

                      {/* Fila 4: Ubicación y Modalidad */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Ubicación (Ciudad / Región) *
                          </label>
                          <input
                            type="text"
                            value={currentFacilitator.city}
                            onChange={(e) => handleUpdateCurrentFacilitator("city", e.target.value)}
                            placeholder="Ej. Santiago / Online Chile o Concón, Valparaíso"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Modalidad de atención *
                          </label>
                          <select
                            value={currentFacilitator.modality || "Online (Google Meet)"}
                            onChange={(e) => handleUpdateCurrentFacilitator("modality", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 cursor-pointer font-medium"
                          >
                            <option value="Online (Google Meet)">Online (Google Meet)</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Online y Presencial">Online y Presencial</option>
                          </select>
                        </div>
                      </div>

                      {/* Fila 5: Biografía y Presentación */}
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Biografía y presentación *
                        </label>
                        <textarea
                          rows={4}
                          value={currentFacilitator.bio}
                          onChange={(e) => handleUpdateCurrentFacilitator("bio", e.target.value)}
                          placeholder="Explica la forma de acompañar, los temas donde tiene mayor experiencia..."
                          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500 leading-relaxed"
                        />
                      </div>

                      {/* Fila 6: Escuela o linaje, Años y Tarifa */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Escuela o institución formativa
                          </label>
                          <input
                            type="text"
                            value={currentFacilitator.schoolAndYear || ""}
                            onChange={(e) => handleUpdateCurrentFacilitator("schoolAndYear", e.target.value)}
                            placeholder="Ej. Centro de Formación Icalma"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Años de práctica
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="50"
                            value={currentFacilitator.experienceYears || 0}
                            onChange={(e) => handleUpdateCurrentFacilitator("experienceYears", Number(e.target.value))}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#5C524A] mb-1">
                            Tarifa sesión (CLP)
                          </label>
                          <input
                            type="text"
                            value={currentFacilitator.price}
                            onChange={(e) => handleUpdateCurrentFacilitator("price", e.target.value)}
                            placeholder="$40.000"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                          />
                        </div>
                      </div>

                      {/* Fila 7: Foto de Perfil / Avatar */}
                      <div className="p-4 rounded-2xl bg-white border border-[#E7DECE] space-y-3">
                        <label className="block text-xs font-bold text-[#5C524A]">
                          Foto de perfil o avatar del facilitador
                        </label>
                        <div className="flex items-center gap-4">
                          {currentFacilitator.imageUrl ? (
                            <img
                              src={currentFacilitator.imageUrl}
                              alt="Avatar"
                              className="w-16 h-16 rounded-full object-cover border-2 border-terracotta-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-[#F3ECE2] border-2 border-terracotta-200 text-terracotta-700 font-serif font-bold text-lg flex items-center justify-center">
                              {currentFacilitator.name
                                ? currentFacilitator.name.substring(0, 2).toUpperCase()
                                : "CF"}
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const dataUrl = await optimizeImageFile(file);
                                handleUpdateCurrentFacilitator("imageUrl", dataUrl);
                              }}
                              className="block text-xs text-[#5C524A] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                            />
                            {currentFacilitator.imageUrl && (
                              <button
                                type="button"
                                onClick={() => handleUpdateCurrentFacilitator("imageUrl", "")}
                                className="text-[11px] text-red-600 hover:underline block"
                              >
                                Quitar foto (usar iniciales)
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Fila 8: Certificado o Diploma (Enlace / Referencia) */}
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Certificado o Diploma de Constelador (Referencia / Archivo)
                        </label>
                        <input
                          type="text"
                          value={currentFacilitator.certificationUrl || ""}
                          onChange={(e) => handleUpdateCurrentFacilitator("certificationUrl", e.target.value)}
                          placeholder="Ruta o enlace del documento de acreditación..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 5: QUIÉNES SOMOS                                                 */}
        {/* ========================================================================= */}
        {activeTab === "quienes-somos" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-[#E7DECE]">
              <h2 className="text-lg font-serif font-bold text-[#27221F]">
                Quiénes Somos (Historia y Misión)
              </h2>
              <p className="text-xs text-[#5C524A]">
                Modifica el titular, la reseña y la imagen que representa a la institución.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE] space-y-3">
                <label className="block text-xs font-bold text-[#5C524A]">
                  Imagen Circular
                </label>
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-terracotta-200 bg-white shadow-sm">
                  <img
                    src={content.settings.about?.imageUrl || "/images/arbol-generaciones.png"}
                    alt="Quiénes Somos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const dataUrl = await optimizeImageFile(file);
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          about: { ...(content.settings.about || {}), imageUrl: dataUrl } as any,
                        },
                      });
                    } catch (err) {
                      alert("Error al cargar la imagen");
                    }
                  }}
                  className="block w-full text-[11px] text-[#5C524A] file:mr-2 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                />
              </div>

              <div className="sm:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Título</label>
                  <input
                    type="text"
                    value={content.settings.about?.title || "Quiénes somos"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          about: { ...(content.settings.about || {}), title: e.target.value } as any,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Descripción</label>
                  <textarea
                    rows={5}
                    value={content.settings.about?.description || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          about: { ...(content.settings.about || {}), description: e.target.value } as any,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* PILARES / VALORES EDITABLES (Respeto, Mirada, Comunidad) */}
            <div className="pt-6 border-t border-[#E7DECE] space-y-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-terracotta-700">
                  Pilares de Valor (3 Tarjetas con Imagen Pequeña y Redirección)
                </h3>
                <p className="text-xs text-[#5C524A]">
                  Configura el título, la descripción, la imagen pequeña y el enlace de redirección para cada uno de los 3 valores de Quiénes Somos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {(content.settings.about?.pillars || [
                  {
                    id: "respeto",
                    title: "Respeto y Confidencialidad",
                    description: "Cada historia y motivo de consulta es tratado como un espacio sagrado, bajo el más riguroso resguardo ético y privacidad.",
                    imageUrl: "/images/mirar-historia-sanar.png",
                    linkUrl: "/#servicios",
                  },
                  {
                    id: "mirada",
                    title: "Mirada Fenomenológica",
                    description: "No imponemos interpretaciones ni juicios morales; observamos lo que se muestra y acogemos lo que emerge con compasión.",
                    imageUrl: "/images/arbol-generaciones.png",
                    linkUrl: "/#talleres",
                  },
                  {
                    id: "comunidad",
                    title: "Comunidad Viva",
                    description: "Fomentamos el encuentro continuo de facilitadores, practicantes y consultantes para aprender juntos y apoyarnos mutuamente.",
                    imageUrl: "/images/comunidad-encuentro.png",
                    linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx",
                  },
                ]).map((pillar, pIdx) => (
                  <div key={pillar.id || pIdx} className="bg-white p-4 rounded-2xl border border-[#E7DECE] space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E7DECE] bg-[#FAF8F5] shrink-0">
                        <img src={pillar.imageUrl || "/images/arbol-generaciones.png"} alt={pillar.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                          Subir Imagen Pequeña
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            try {
                              const dataUrl = await optimizeImageFile(file);
                              const currentPillars = [...(content.settings.about?.pillars || [
                                { id: "respeto", title: "Respeto y Confidencialidad", description: "", imageUrl: "", linkUrl: "/#servicios" },
                                { id: "mirada", title: "Mirada Fenomenológica", description: "", imageUrl: "", linkUrl: "/#talleres" },
                                { id: "comunidad", title: "Comunidad Viva", description: "", imageUrl: "", linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx" },
                              ])];
                              currentPillars[pIdx] = { ...currentPillars[pIdx], imageUrl: dataUrl };
                              setContent({
                                ...content,
                                settings: {
                                  ...content.settings,
                                  about: { ...(content.settings.about || {}), pillars: currentPillars } as any,
                                },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          className="block w-full text-[10px] text-[#5C524A] file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-[9px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#5C524A] mb-1">Título</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => {
                          const currentPillars = [...(content.settings.about?.pillars || [
                            { id: "respeto", title: "Respeto y Confidencialidad", description: "", imageUrl: "", linkUrl: "/#servicios" },
                            { id: "mirada", title: "Mirada Fenomenológica", description: "", imageUrl: "", linkUrl: "/#talleres" },
                            { id: "comunidad", title: "Comunidad Viva", description: "", imageUrl: "", linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx" },
                          ])];
                          currentPillars[pIdx] = { ...currentPillars[pIdx], title: e.target.value };
                          setContent({
                            ...content,
                            settings: {
                              ...content.settings,
                              about: { ...(content.settings.about || {}), pillars: currentPillars } as any,
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-semibold text-[#27221F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#5C524A] mb-1">Descripción</label>
                      <textarea
                        rows={3}
                        value={pillar.description}
                        onChange={(e) => {
                          const currentPillars = [...(content.settings.about?.pillars || [
                            { id: "respeto", title: "Respeto y Confidencialidad", description: "", imageUrl: "", linkUrl: "/#servicios" },
                            { id: "mirada", title: "Mirada Fenomenológica", description: "", imageUrl: "", linkUrl: "/#talleres" },
                            { id: "comunidad", title: "Comunidad Viva", description: "", imageUrl: "", linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx" },
                          ])];
                          currentPillars[pIdx] = { ...currentPillars[pIdx], description: e.target.value };
                          setContent({
                            ...content,
                            settings: {
                              ...content.settings,
                              about: { ...(content.settings.about || {}), pillars: currentPillars } as any,
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#5C524A] mb-1">Enlace de Redirección (URL o Sección)</label>
                      <input
                        type="text"
                        value={pillar.linkUrl}
                        placeholder="/#servicios, /#talleres o enlace de Telegram"
                        onChange={(e) => {
                          const currentPillars = [...(content.settings.about?.pillars || [
                            { id: "respeto", title: "Respeto y Confidencialidad", description: "", imageUrl: "", linkUrl: "/#servicios" },
                            { id: "mirada", title: "Mirada Fenomenológica", description: "", imageUrl: "", linkUrl: "/#talleres" },
                            { id: "comunidad", title: "Comunidad Viva", description: "", imageUrl: "", linkUrl: "https://t.me/+PjKqj5M9k_wyYjEx" },
                          ])];
                          currentPillars[pIdx] = { ...currentPillars[pIdx], linkUrl: e.target.value };
                          setContent({
                            ...content,
                            settings: {
                              ...content.settings,
                              about: { ...(content.settings.about || {}), pillars: currentPillars } as any,
                            },
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs font-mono text-[#5C524A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 6: EXPERIENCIAS (TESTIMONIOS)                                    */}
        {/* ========================================================================= */}
        {activeTab === "experiencias" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DECE]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#27221F]">
                  Experiencias de Consultantes (Testimonios)
                </h2>
                <p className="text-xs text-[#5C524A]">
                  Gestiona las reseñas y testimonios reales compartidos por los consultantes.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddTestimonial}
                className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                + Nuevo Testimonio
              </button>
            </div>

            <div className="space-y-4">
              {(content.testimonials || []).map((test, tIdx) => (
                <div
                  key={test.id || tIdx}
                  className="bg-white p-5 rounded-2xl border border-[#E7DECE] space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sage-800">
                      Testimonio #{tIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(tIdx)}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                      Cita o Relato de la Experiencia
                    </label>
                    <textarea
                      rows={2}
                      value={test.quote}
                      onChange={(e) => {
                        const updated = [...(content.testimonials || [])];
                        updated[tIdx].quote = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F] italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5C524A] mb-1">
                      Atribución / Consultante
                    </label>
                    <input
                      type="text"
                      value={test.attribution}
                      onChange={(e) => {
                        const updated = [...(content.testimonials || [])];
                        updated[tIdx].attribution = e.target.value;
                        setContent({ ...content, testimonials: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#5C524A]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 7: WHATSAPP Y TRANSFERENCIAS                                     */}
        {/* ========================================================================= */}
        {activeTab === "contacto" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* 1. LOGOTIPO OFICIAL DE LA WEB */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE] space-y-4">
              <div className="border-b border-[#E7DECE] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                  Logotipo Oficial de la Plataforma
                </span>
                <p className="text-xs text-[#5C524A] mt-0.5">
                  Este es el logo que se muestra en la cabecera (navbar), menús y comunicaciones de la plataforma.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-4 bg-white p-4 rounded-xl border border-[#E7DECE] flex flex-col items-center justify-center">
                  <img
                    src={content.settings.siteLogoUrl || "/images/logo-consteladores.jpg"}
                    alt="Logo oficial"
                    className="h-16 w-auto object-contain mb-3"
                  />
                  <span className="text-[10px] text-[#8A7E73]">Vista previa del logo</span>
                </div>

                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#5C524A] mb-1.5">
                      Cargar nuevo logo desde tu computador:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await optimizeImageFile(file);
                        setContent({
                          ...content,
                          settings: { ...content.settings, siteLogoUrl: dataUrl },
                        });
                      }}
                      className="block w-full text-xs text-[#5C524A] file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#8A7E73] mb-1">
                      O ruta/URL del logo:
                    </label>
                    <input
                      type="text"
                      value={content.settings.siteLogoUrl || "/images/logo-consteladores.jpg"}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          settings: { ...content.settings, siteLogoUrl: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CANAL DE WHATSAPP Y NOTIFICACIONES */}
            <div className="pb-4 border-b border-[#E7DECE]">
              <h2 className="text-lg font-serif font-bold text-[#27221F]">
                Canal de WhatsApp y Datos Bancarios para Pagos
              </h2>
              <p className="text-xs text-[#5C524A]">
                Configura el número oficial para recepción de vouchers y los datos de transferencia para tus reservas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Número de Teléfono / WhatsApp Principal *
                </label>
                <input
                  type="text"
                  value={content.settings.whatsappNumber}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm font-bold text-[#128C7E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Correo Electrónico de Notificaciones *
                </label>
                <input
                  type="email"
                  value={content.settings.supportEmail}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, supportEmail: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F]"
                />
              </div>
            </div>

            {/* Datos Bancarios */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                Datos de Transferencia Bancaria (Aparecen al Reservar)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Titular de la Cuenta</label>
                  <input
                    type="text"
                    value={content.settings.bankDetails.beneficiaryName}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          bankDetails: {
                            ...content.settings.bankDetails,
                            beneficiaryName: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">RUT</label>
                  <input
                    type="text"
                    value={content.settings.bankDetails.rut}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          bankDetails: {
                            ...content.settings.bankDetails,
                            rut: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Banco / Institución</label>
                  <input
                    type="text"
                    value={content.settings.bankDetails.bank}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          bankDetails: {
                            ...content.settings.bankDetails,
                            bank: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Número de Cuenta</label>
                  <input
                    type="text"
                    value={content.settings.bankDetails.accountNumber}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          bankDetails: {
                            ...content.settings.bankDetails,
                            accountNumber: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Pasarela de Pago Online: Link de Mercado Pago / Webpay */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#009EE3]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#007EB5] block">
                    💳 Pasarela de Pago Online (Mercado Pago / Webpay)
                  </span>
                  <p className="text-xs text-[#5C524A] mt-0.5">
                    Pega aquí tu Link de Cobro de Mercado Pago (ej. <code className="bg-white px-1.5 py-0.5 rounded text-[11px] text-[#007EB5]">https://mpago.la/...</code> o <code className="bg-white px-1.5 py-0.5 rounded text-[11px] text-[#007EB5]">https://link.mercadopago.cl/...</code>).
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#009EE3]/10 text-[#007EB5] font-semibold text-[11px]">
                  100% Pago Directo
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Link de Cobro Oficial de Mercado Pago
                </label>
                <input
                  type="url"
                  placeholder="https://mpago.la/xxxxxx o https://link.mercadopago.cl/..."
                  value={content.settings.mercadopagoPaymentLink || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: {
                        ...content.settings,
                        mercadopagoPaymentLink: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#009EE3]/40 text-xs sm:text-sm font-mono text-[#007EB5] placeholder:text-[#8A7E73] focus:outline-none focus:ring-2 focus:ring-[#009EE3]"
                />
                <p className="text-[11px] text-[#8A7E73] mt-1.5">
                  Al configurar este link, el botón azul &ldquo;Pagar con Mercado Pago / Webpay&rdquo; enviará al consultante directamente a pagar los $40.000 de forma segura. Si se deja vacío, la pasarela sugerirá transferencia bancaria.
                </p>
              </div>
            </div>

            {/* 3. MÓDULO DE CONVOCATORIA A FACILITADORES ("Si eres facilitador y quieres pertenecer al equipo") */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE] space-y-4">
              <div className="border-b border-[#E7DECE] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                  Módulo de Convocatoria a Facilitadores (Página /facilitadores)
                </span>
                <p className="text-xs text-[#5C524A] mt-0.5">
                  Personaliza los textos, imagen y botones del marco "Si eres facilitador y quieres pertenecer al equipo".
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Título del Marco</label>
                  <input
                    type="text"
                    value={content.settings.joinTeamTitle || "Si eres facilitador y quieres pertenecer al equipo"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, joinTeamTitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Descripción</label>
                  <textarea
                    rows={3}
                    value={content.settings.joinTeamDescription || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, joinTeamDescription: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Texto del Botón de Postulación</label>
                  <input
                    type="text"
                    value={content.settings.joinTeamPostulateLabel || "Postular como facilitador"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, joinTeamPostulateLabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Enlace del Botón de Postulación</label>
                  <input
                    type="text"
                    value={content.settings.joinTeamPostulateUrl || "/registro-terapeuta"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, joinTeamPostulateUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">Enlace de la Comunidad de Telegram</label>
                  <input
                    type="text"
                    value={content.settings.telegramUrl || "https://t.me/+PjKqj5M9k_wyYjEx"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, telegramUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#5C524A] mb-1.5">Imagen Destacada del Marco</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={content.settings.joinTeamImageUrl || "/images/comunidad-encuentro.png"}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-[#E7DECE]"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const dataUrl = await optimizeImageFile(file);
                        setContent({
                          ...content,
                          settings: { ...content.settings, joinTeamImageUrl: dataUrl },
                        });
                      }}
                      className="block text-xs text-[#5C524A] file:mr-2 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
