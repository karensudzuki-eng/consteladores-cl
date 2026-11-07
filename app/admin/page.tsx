"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CMSContent, CMSWorkshop, DEFAULT_CMS_CONTENT } from "@/lib/cms/content";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [content, setContent] = useState<CMSContent>(DEFAULT_CMS_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"talleres" | "textos" | "contacto">("talleres");

  // Estado para taller seleccionado en edición
  const [selectedWorkshopIndex, setSelectedWorkshopIndex] = useState<number>(0);
  const [uploadingFlyerIndex, setUploadingFlyerIndex] = useState<number | null>(null);

  // Comprobar sesión de admin guardada
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem("cst_admin_auth");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Cargar datos actuales del servidor
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/cms", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (err) {
        console.error("Error cargando CMS:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Clave de acceso administrativa sencilla y segura
    if (passwordInput === "consteladores2026" || passwordInput === "2026") {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("cst_admin_auth", "true");
    } else {
      setAuthError("Clave incorrecta. Por favor intenta nuevamente.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("cst_admin_auth");
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert("Ocurrió un error al guardar los cambios en el servidor.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al guardar.");
    } finally {
      setIsSaving(false);
    }
  };

  // Manejador para subir flyer
  const handleUploadFlyer = async (e: React.ChangeEvent<HTMLInputElement>, workshopIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingFlyerIndex(workshopIndex);
      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const updatedWorkshops = [...content.workshops];
        updatedWorkshops[workshopIndex] = {
          ...updatedWorkshops[workshopIndex],
          flyerUrl: data.url,
        };
        setContent({ ...content, workshops: updatedWorkshops });
      } else {
        alert("Error al subir el archivo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al subir flyer.");
    } finally {
      setUploadingFlyerIndex(null);
    }
  };

  // Agregar nuevo taller
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

  // Eliminar taller
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
            Gestión de talleres, flyers, textos y WhatsApp para consteladores.cl
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
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
          >
            <span>{isSaving ? "Guardando..." : "💾 Guardar Todos los Cambios"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-cream-200 hover:bg-cream-300 text-[#27221F] text-xs font-medium border border-[#E7DECE] transition-all"
          >
            Ver web en vivo ↗
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="text-xs text-[#8A7E73] hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Banner de Éxito al Guardar */}
      {saveSuccess && (
        <div className="bg-emerald-500 text-white text-xs font-semibold py-2.5 px-4 text-center animate-fadeIn shadow-inner">
          ✓ ¡Cambios guardados con éxito en consteladores.cl! Ya están visibles en la página web.
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Pestañas de Navegación del CMS */}
        <div className="flex items-center gap-2 border-b border-[#E7DECE] pb-3 mb-8 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("talleres")}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "talleres"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            🎪 Carrusel y Talleres ({content.workshops.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("textos")}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "textos"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            ✍️ Textos y Contenidos Clave
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contacto")}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "contacto"
                ? "bg-terracotta-500 text-white shadow-sm"
                : "bg-white text-[#5C524A] hover:bg-cream-100 border border-[#E7DECE]"
            }`}
          >
            💬 WhatsApp y Transferencias
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECCIÓN 1: GESTOR DEL CARRUSEL DE TALLERES                               */}
        {/* ========================================================================= */}
        {activeTab === "talleres" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Lista lateral de talleres */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#5C524A]">
                  Tus Talleres
                </h2>
                <button
                  type="button"
                  onClick={handleAddWorkshop}
                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  + Nuevo Taller
                </button>
              </div>

              {content.workshops.map((w, index) => (
                <div
                  key={w.id || index}
                  onClick={() => setSelectedWorkshopIndex(index)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedWorkshopIndex === index
                      ? "bg-cream-200 border-terracotta-400 shadow-sm"
                      : "bg-[#FCFAF7] border-[#E7DECE] hover:bg-cream-100"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={w.flyerUrl || "/images/arbol-generaciones.png"}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E7DECE]"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-[#27221F] truncate">
                        {w.title}
                      </h4>
                      <p className="text-[11px] text-[#8A7E73] truncate">
                        {w.date} · {w.city}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      w.isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {w.isActive ? "Activo" : "Pausado"}
                  </span>
                </div>
              ))}
            </div>

            {/* Formulario de edición del taller seleccionado */}
            <div className="lg:col-span-8 bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              {currentWorkshop ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#E7DECE] pb-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta-600 block">
                        Editando Taller #{selectedWorkshopIndex + 1}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-[#27221F]">
                        {currentWorkshop.title}
                      </h3>
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

                  {/* FLYER Y LOGOTIPO DINÁMICO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECE]">
                    
                    {/* Gestor de Imagen del Flyer */}
                    <div>
                      <label className="block text-xs font-bold text-[#5C524A] mb-2">
                        Flyer del Taller (Imagen)
                      </label>
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-[#E7DECE] bg-white mb-2">
                        {currentWorkshop.flyerUrl ? (
                          <img
                            src={currentWorkshop.flyerUrl}
                            alt="Flyer"
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#8A7E73]">
                            Sin imagen
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="inline-flex items-center justify-center w-full px-4 py-2 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer">
                          <span>
                            {uploadingFlyerIndex === selectedWorkshopIndex
                              ? "Subiendo imagen..."
                              : "Subir nueva imagen de Flyer"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadFlyer(e, selectedWorkshopIndex)}
                            className="hidden"
                          />
                        </label>

                        <input
                          type="text"
                          placeholder="O escribe la URL de la imagen..."
                          value={currentWorkshop.flyerUrl}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].flyerUrl = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F]"
                        />
                      </div>
                    </div>

                    {/* Selector Dinámico de Logotipo */}
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
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F] font-medium focus:ring-2 focus:ring-terracotta-500"
                        >
                          <option value="icalma">Logo Oficial Icalma (Formación Sistémica)</option>
                          <option value="vortice">Logo Vórtice Integración</option>
                          <option value="custom">Logo Personalizado (URL o imagen)</option>
                        </select>
                      </div>

                      {currentWorkshop.logoType === "custom" && (
                        <div>
                          <label className="block text-[11px] font-semibold text-[#5C524A] mb-1">
                            URL del Logotipo Personalizado
                          </label>
                          <input
                            type="text"
                            placeholder="https://.../logo.png"
                            value={currentWorkshop.logoUrl || ""}
                            onChange={(e) => {
                              const updated = [...content.workshops];
                              updated[selectedWorkshopIndex].logoUrl = e.target.value;
                              setContent({ ...content, workshops: updated });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs text-[#27221F]"
                          />
                        </div>
                      )}

                      <div className="p-3 bg-white rounded-xl border border-[#E7DECE] text-[11px] text-[#5C524A]">
                        Este logo aparecerá destacado como insignia en el flyer del carrusel y en el modal de detalles.
                      </div>
                    </div>
                  </div>

                  {/* CAMPOS DE TEXTO EN TIEMPO REAL */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#5C524A] mb-1">
                        Título Principal del Taller *
                      </label>
                      <input
                        type="text"
                        value={currentWorkshop.title}
                        onChange={(e) => {
                          const updated = [...content.workshops];
                          updated[selectedWorkshopIndex].title = e.target.value;
                          setContent({ ...content, workshops: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] font-semibold focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Fecha *
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 16 de enero de 2026"
                          value={currentWorkshop.date}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].date = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Horario
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 10:00 a 14:00 hrs"
                          value={currentWorkshop.time}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].time = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Facilitadoras *
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Erika Alert y Karen Sudzuki"
                          value={currentWorkshop.facilitators}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].facilitators = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Valor *
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. $35.000"
                          value={currentWorkshop.price}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].price = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Dirección / Lugar *
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Edmundo Eluchans 3047, ofic. 22, Concón"
                          value={currentWorkshop.address}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].address = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5C524A] mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Concón, Valparaíso"
                          value={currentWorkshop.city}
                          onChange={(e) => {
                            const updated = [...content.workshops];
                            updated[selectedWorkshopIndex].city = e.target.value;
                            setContent({ ...content, workshops: updated });
                          }}
                          className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5C524A] mb-1">
                        Descripción del Taller
                      </label>
                      <textarea
                        rows={3}
                        value={currentWorkshop.description}
                        onChange={(e) => {
                          const updated = [...content.workshops];
                          updated[selectedWorkshopIndex].description = e.target.value;
                          setContent({ ...content, workshops: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5C524A] mb-1">
                        Nota Importante (Casos a constelar y Resonancia)
                      </label>
                      <textarea
                        rows={4}
                        value={currentWorkshop.importantNote}
                        onChange={(e) => {
                          const updated = [...content.workshops];
                          updated[selectedWorkshopIndex].importantNote = e.target.value;
                          setContent({ ...content, workshops: updated });
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5C524A] mb-1">
                        Teléfono de Contacto para este Taller
                      </label>
                      <input
                        type="text"
                        placeholder="+56 9 4193 9363"
                        value={currentWorkshop.phoneContact}
                        onChange={(e) => {
                          const updated = [...content.workshops];
                          updated[selectedWorkshopIndex].phoneContact = e.target.value;
                          setContent({ ...content, workshops: updated });
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                      />
                    </div>
                  </div>

                  {/* Botón Guardar Inferior */}
                  <div className="pt-4 border-t border-[#E7DECE] flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow transition-all cursor-pointer"
                    >
                      {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-[#8A7E73]">
                  Selecciona un taller de la lista o crea uno nuevo.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SECCIÓN 2: EDITOR DE TEXTOS Y CONTENIDOS CLAVE                           */}
        {/* ========================================================================= */}
        {activeTab === "textos" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#27221F] mb-1">
                Textos Principales del Sitio Web
              </h2>
              <p className="text-xs text-[#5C524A]">
                Modifica los titulares, descripciones y elementos visuales sin tocar código.
              </p>
            </div>

            {/* SECCIÓN HERO */}
            <div className="space-y-4 pt-4 border-t border-[#E7DECE]">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                Sección Superior (Hero)
              </span>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Titular Principal del Hero
                </label>
                <input
                  type="text"
                  value={content.settings.heroTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, heroTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Subtítulo del Hero
                </label>
                <textarea
                  rows={2}
                  value={content.settings.heroSubtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, heroSubtitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Imagen de Fondo del Hero
                </label>
                <input
                  type="text"
                  value={content.settings.heroBgImage}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, heroBgImage: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                />
              </div>
            </div>

            {/* COMUNIDAD TELEGRAM */}
            <div className="space-y-4 pt-6 border-t border-[#E7DECE]">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
                Comunidad en Telegram (Acceso Directo)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Enlace Directo al Grupo de Telegram
                  </label>
                  <input
                    type="text"
                    value={content.settings.telegramUrl}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, telegramUrl: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Ruta o URL de Imagen Destacada de Comunidad
                  </label>
                  <input
                    type="text"
                    value={content.settings.telegramImage}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, telegramImage: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Descripción de la Invitación a Telegram
                </label>
                <input
                  type="text"
                  value={content.settings.telegramDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, telegramDescription: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>
            </div>

            {/* SERVICIO: SESIÓN INDIVIDUAL ONLINE */}
            <div className="space-y-4 pt-6 border-t border-[#E7DECE]">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 block">
                Servicio: Sesión Individual Online
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Título del Servicio
                  </label>
                  <input
                    type="text"
                    value={content.settings.serviceTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, serviceTitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C524A] mb-1">
                    Valor de la Sesión
                  </label>
                  <input
                    type="text"
                    value={content.settings.servicePrice}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: { ...content.settings, servicePrice: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm font-bold text-[#27221F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Descripción Exacta de la Sesión Individual
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
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs sm:text-sm text-[#27221F] resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DECE] flex justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow transition-all cursor-pointer"
              >
                {isSaving ? "Guardando..." : "Guardar Cambios de Texto"}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECCIÓN 3: CANAL DE CONTACTO, WHATSAPP Y TRANSFERENCIAS                   */}
        {/* ========================================================================= */}
        {activeTab === "contacto" && (
          <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#27221F] mb-1">
                WhatsApp, Soporte y Datos de Cuenta Bancaria
              </h2>
              <p className="text-xs text-[#5C524A]">
                Configura el número oficial donde los consultantes envían comprobantes (vouchers) y coordinan citas de último minuto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Número de WhatsApp Principal *
                </label>
                <input
                  type="text"
                  placeholder="+56 9 4193 9363"
                  value={content.settings.whatsappNumber}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: { ...content.settings, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-sm text-[#27221F] font-bold"
                />
                <p className="text-[11px] text-[#8A7E73] mt-1">
                  Se conecta automáticamente al botón flotante y al botón de envío de vouchers en las reservas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Correo Electrónico de Soporte
                </label>
                <input
                  type="email"
                  placeholder="contacto@consteladores.cl"
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

            {/* DATOS DE TRANSFERENCIA BANCARIA */}
            <div className="pt-6 border-t border-[#E7DECE] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C524A] block">
                Datos Bancarios para Recepción de Pagos y Abonos
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Titular de la Cuenta
                  </label>
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
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    RUT del Titular
                  </label>
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
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Banco / Institución
                  </label>
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
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Tipo de Cuenta
                  </label>
                  <input
                    type="text"
                    value={content.settings.bankDetails.accountType}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        settings: {
                          ...content.settings,
                          bankDetails: {
                            ...content.settings.bankDetails,
                            accountType: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                    Número de Cuenta
                  </label>
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
                    className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Email para envío de comprobantes bancarios
                </label>
                <input
                  type="email"
                  value={content.settings.bankDetails.email}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      settings: {
                        ...content.settings,
                        bankDetails: {
                          ...content.settings.bankDetails,
                          email: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7DECE] text-xs text-[#27221F]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7DECE] flex justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow transition-all cursor-pointer"
              >
                {isSaving ? "Guardando..." : "Guardar Datos de Contacto"}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
