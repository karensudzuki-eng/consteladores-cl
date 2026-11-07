"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCMS } from "@/lib/cms/CMSContext";
import { CMSWorkshop, CMSHeroSlide, CMSTestimonial } from "@/lib/cms/types";
import { FlyerDesigner } from "@/components/flyer-designer/FlyerDesigner";

export default function AdminPage() {
  const { content, setContent, updateContent, isLoading } = useCMS();
  const [isSaving, setIsSaving] = useState(false);

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
    | "quienes-somos"
    | "experiencias"
    | "contacto"
  >("talleres");

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

  // Función utilitaria robusta para optimizar imágenes y convertir a Data URL sin fallos
  const optimizeImageFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const rawResult = (reader.result as string) || "";
        const img = new Image();
        img.onload = () => {
          try {
            const maxDim = 1200;
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
            ctx?.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
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
      phoneContact: content.settings.whatsappNumber || "+56 9 4193 9363",
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#27221F] font-sans antialiased pb-20">
      {/* Barra Superior del Admin */}
      <header className="sticky top-0 z-30 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#E7DECE] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif font-bold text-xl text-[#27221F] hover:text-terracotta-600">
            consteladores<span className="text-terracotta-500 italic">.cl</span>
          </Link>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 border border-terracotta-200">
            Panel de Control
          </span>
        </div>

        <div className="flex items-center gap-3">
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
                  phoneContact: content.settings.whatsappNumber || "+56 9 4193 9363",
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

            {/* Música Ambiental */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DECE] space-y-2">
              <label className="block text-xs font-bold text-[#5C524A]">
                🎵 URL del Audio o Música Ambiental (MP3)
              </label>
              <input
                type="text"
                value={content.settings.heroMusicUrl || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    settings: { ...content.settings, heroMusicUrl: e.target.value },
                  })
                }
                placeholder="https://.../musica-relajante.mp3"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
              />
              <p className="text-[11px] text-[#8A7E73]">
                Los consultantes podrán activar o pausar este sonido relajante mientras miran las imágenes explicativas en el carrusel.
              </p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    <div className="sm:col-span-4 space-y-2">
                      <div className="w-full h-32 rounded-xl overflow-hidden border border-[#E7DECE] bg-[#FAF8F5]">
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
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
                        className="block w-full text-[11px] text-[#5C524A] file:mr-2 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-terracotta-50 file:text-terracotta-700 hover:file:bg-terracotta-100 cursor-pointer"
                      />
                    </div>

                    <div className="sm:col-span-8 space-y-3">
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
