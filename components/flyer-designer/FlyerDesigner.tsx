"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CMSWorkshop } from "@/lib/cms/types";

interface FlyerDesignerProps {
  onSaveToWorkshops?: (newWorkshop: Partial<CMSWorkshop>, flyerDataUrl: string) => void;
}

export function FlyerDesigner({ onSaveToWorkshops }: FlyerDesignerProps) {
  // Dimensiones profesionales para redes y web (ratio 4:5 - 1080x1350 px)
  const CANVAS_WIDTH = 1080;
  const CANVAS_HEIGHT = 1350;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Estados de datos del Flyer
  const [title, setTitle] = useState("Sana tu historia y conecta con nuevas posibilidades. ✨");
  const [subtitle, setSubtitle] = useState("Taller Vivencial de Constelaciones Familiares");
  const [dateAndHour, setDateAndHour] = useState("Sábado 16 de enero de 2026 · 10:00 a 14:00 hrs");
  const [facilitators, setFacilitators] = useState("Erika Alert y Karen Sudzuki");
  const [address, setAddress] = useState("Edmundo Eluchans 3047, of. 22, Concón");
  const [city, setCity] = useState("Concón / Viña del Mar");
  const [price, setPrice] = useState("$40.000");
  const [phone, setPhone] = useState("+56 9 4193 9363");
  const [quote, setQuote] = useState('"Cuando tú constelas, todos constelamos"');

  // Logotipo transparente único
  const [logoType, setLogoType] = useState<"consteladores" | "custom" | "vortice" | "none">("consteladores");
  const [customLogoUrl, setCustomLogoUrl] = useState<string>("");

  // Imagen de Fondo y Encuadre
  const [bgImagePreset, setBgImagePreset] = useState<string>("/images/arbol-generaciones.png");
  const [customBgUrl, setCustomBgUrl] = useState<string>("");
  const [bgZoom, setBgZoom] = useState<number>(1.0);
  const [bgPositionY, setBgPositionY] = useState<number>(50); // 0 a 100%
  const [bgFit, setBgFit] = useState<"cover" | "contain">("cover");
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.65);
  const [accentColor, setAccentColor] = useState<string>("#D9664A"); // Terracota cálido

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string>("");

  // Imagen cargada en memoria
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const customLogoImgRef = useRef<HTMLImageElement | null>(null);

  // Cargar imagen de fondo
  useEffect(() => {
    const activeUrl = customBgUrl || bgImagePreset;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = activeUrl;
    img.onload = () => {
      bgImgRef.current = img;
      drawFlyer();
    };
  }, [bgImagePreset, customBgUrl]);

  // Cargar logo personalizado si aplica
  useEffect(() => {
    if (logoType === "custom" && customLogoUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = customLogoUrl;
      img.onload = () => {
        customLogoImgRef.current = img;
        drawFlyer();
      };
    } else {
      customLogoImgRef.current = null;
      drawFlyer();
    }
  }, [logoType, customLogoUrl]);

  // Función principal de renderizado en Canvas
  const drawFlyer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Limpiar canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Fondo base crema suave
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 3. Dibujar imagen de fondo si está cargada con controles de encuadre y zoom
    if (bgImgRef.current) {
      const img = bgImgRef.current;
      const baseRatio =
        bgFit === "contain"
          ? Math.min(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height)
          : Math.max(CANVAS_WIDTH / img.width, CANVAS_HEIGHT / img.height);
      const ratio = baseRatio * bgZoom;
      const drawWidth = img.width * ratio;
      const drawHeight = img.height * ratio;
      const shiftX = (CANVAS_WIDTH - drawWidth) / 2;
      const shiftY = (CANVAS_HEIGHT - drawHeight) * (bgPositionY / 100);

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        shiftX,
        shiftY,
        drawWidth,
        drawHeight
      );
    }

    // 4. Capa de velo / gradiente oscuro con opacidad regulable para garantizar contraste de texto
    ctx.fillStyle = `rgba(39, 34, 31, ${overlayOpacity})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Gradiente extra en la parte inferior para la caja de datos
    const grad = ctx.createLinearGradient(0, CANVAS_HEIGHT * 0.4, 0, CANVAS_HEIGHT);
    grad.addColorStop(0, "rgba(25, 20, 18, 0)");
    grad.addColorStop(0.7, "rgba(25, 20, 18, 0.85)");
    grad.addColorStop(1, "rgba(25, 20, 18, 0.96)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, CANVAS_HEIGHT * 0.4, CANVAS_WIDTH, CANVAS_HEIGHT * 0.6);

    // 5. Marco decorativo fino exterior
    ctx.strokeStyle = "rgba(231, 222, 206, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, CANVAS_WIDTH - 80, CANVAS_HEIGHT - 80);

    // 6. ENCABEZADO Y LOGOTIPO TRANSPARENTE ÚNICO (Sin bordes ni píldoras redondeadas)
    const headerY = 85;

    if (logoType === "custom" && customLogoImgRef.current) {
      const logo = customLogoImgRef.current;
      const logoH = 75;
      const logoW = (logo.width / logo.height) * logoH;
      ctx.drawImage(logo, 70, headerY, logoW, logoH);
    } else if (logoType === "vortice") {
      ctx.fillStyle = "#385E48";
      ctx.beginPath();
      ctx.arc(85, headerY + 25, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("Vórtice Integración", 105, headerY + 33);
    } else if (logoType === "consteladores") {
      // Isotipo infinito transparente de Consteladores (sin fondo blanco ni píldoras)
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(92, headerY + 22, 12, 0, Math.PI * 2);
      ctx.arc(114, headerY + 22, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 28px Georgia, serif";
      ctx.fillText("Consteladores", 142, headerY + 31);
    }

    // 7. SUBTÍTULO / INSIGNIA DEL TALLER
    ctx.fillStyle = accentColor;
    ctx.font = "600 24px sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText(subtitle.toUpperCase(), 70, 260);

    // 8. TÍTULO PRINCIPAL (con salto de línea inteligente)
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 60px Georgia, serif";
    ctx.letterSpacing = "0px";

    const titleWords = title.split(" ");
    let line = "";
    let lineY = 340;
    const maxTitleWidth = CANVAS_WIDTH - 140;

    for (let n = 0; n < titleWords.length; n++) {
      const testLine = line + titleWords[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && n > 0) {
        ctx.fillText(line, 70, lineY);
        line = titleWords[n] + " ";
        lineY += 76;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, lineY);

    // 9. FRASE / LEMA DE RESONANCIA
    if (quote) {
      ctx.fillStyle = "rgba(232, 197, 138, 0.95)"; // Ocre suave
      ctx.font = "italic 500 26px Georgia, serif";
      ctx.fillText(quote, 70, lineY + 60);
    }

    // 10. TARJETA INFERIOR CONTENEDORA DE INFORMACIÓN PRÁCTICA
    const cardY = CANVAS_HEIGHT - 490;
    const cardH = 420;

    ctx.fillStyle = "rgba(252, 250, 247, 0.96)";
    ctx.beginPath();
    ctx.roundRect(70, cardY, CANVAS_WIDTH - 140, cardH, 32);
    ctx.fill();

    ctx.strokeStyle = "rgba(217, 102, 74, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Contenido dentro de la tarjeta
    // FILA 1: FECHA Y HORARIO
    ctx.fillStyle = "#D9664A";
    ctx.font = "bold 16px sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("📅 FECHA Y HORARIO", 110, cardY + 50);

    ctx.fillStyle = "#27221F";
    ctx.font = "bold 30px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText(dateAndHour, 110, cardY + 90);

    // Línea separadora
    ctx.strokeStyle = "rgba(231, 222, 206, 0.8)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(110, cardY + 115);
    ctx.lineTo(CANVAS_WIDTH - 110, cardY + 115);
    ctx.stroke();

    // FILA 2: FACILITADORAS Y VALOR (dos columnas)
    // Columna izquierda: Facilitadoras
    ctx.fillStyle = "#5C524A";
    ctx.font = "600 16px sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("🌿 FACILITADORAS", 110, cardY + 150);

    ctx.fillStyle = "#27221F";
    ctx.font = "bold 26px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText(facilitators, 110, cardY + 185);

    // Columna derecha: Valor
    ctx.fillStyle = "#5C524A";
    ctx.font = "600 16px sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("VALOR DE PARTICIPACIÓN", CANVAS_WIDTH - 420, cardY + 150);

    ctx.fillStyle = "#D9664A";
    ctx.font = "bold 34px Georgia, serif";
    ctx.fillText(price, CANVAS_WIDTH - 420, cardY + 188);

    // Línea separadora
    ctx.beginPath();
    ctx.moveTo(110, cardY + 215);
    ctx.lineTo(CANVAS_WIDTH - 110, cardY + 215);
    ctx.stroke();

    // FILA 3: DIRECCIÓN Y CIUDAD
    ctx.fillStyle = "#5C524A";
    ctx.font = "600 16px sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("📍 LUGAR Y DIRECCIÓN", 110, cardY + 250);

    ctx.fillStyle = "#27221F";
    ctx.font = "600 24px Georgia, serif";
    ctx.letterSpacing = "0px";
    ctx.fillText(`${address} (${city})`, 110, cardY + 285);

    // FILA 4: BOTÓN DE RESERVA REDUCIDO (CON ÍCONO, SIN NÚMERO DE TELÉFONO)
    const ctaY = cardY + 332;
    const btnW = 280;
    const btnH = 52;
    const btnX = (CANVAS_WIDTH - btnW) / 2;

    ctx.fillStyle = "#128C7E"; // Verde oficial de WhatsApp
    ctx.beginPath();
    ctx.roundRect(btnX, ctaY, btnW, btnH, 26);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("💬 Reservar", CANVAS_WIDTH / 2, ctaY + 33);
    ctx.textAlign = "left"; // Restablecer alineación
  }, [
    title,
    subtitle,
    dateAndHour,
    facilitators,
    address,
    city,
    price,
    phone,
    quote,
    logoType,
    bgZoom,
    bgPositionY,
    bgFit,
    overlayOpacity,
    accentColor,
  ]);

  // Redibujar ante cualquier cambio de estado
  useEffect(() => {
    drawFlyer();
  }, [drawFlyer]);

  // Manejar subida de imagen de fondo personalizada
  const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomBgUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Manejar subida de logo personalizado
  const handleUploadCustomLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomLogoUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Exportar y Descargar en Alta Calidad (PNG 1080x1350)
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setExportNotice("Generando imagen en alta resolución...");

    try {
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const cleanFileName = `flyer-${title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30)}.png`;
      link.download = cleanFileName;
      link.href = dataUrl;
      link.click();

      setExportNotice("✓ Flyer descargado con éxito en alta resolución.");
      setTimeout(() => setExportNotice(""), 4000);
    } catch (err) {
      console.error(err);
      alert("Error al exportar la imagen.");
    } finally {
      setIsExporting(false);
    }
  };

  // Asignar y guardar directamente como nuevo taller en el Carrusel
  const handleDirectAddToCarousel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png", 0.95);

    if (onSaveToWorkshops) {
      onSaveToWorkshops(
        {
          title,
          date: dateAndHour,
          time: "",
          facilitators,
          address,
          city,
          price,
          phoneContact: phone,
          logoType,
          isActive: true,
        },
        dataUrl
      );
      setExportNotice("✓ ¡Flyer asignado con éxito a la lista de talleres del CMS!");
      setTimeout(() => setExportNotice(""), 4000);
    }
  };

  return (
    <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-9 shadow-sm">
      
      {/* Cabecera del Diseñador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7DECE] pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🎨 Mini-App Web</span>
            <span>•</span>
            <span>Estilo Editorial consteladores.cl</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#27221F]">
            Diseñador Rápido de Flyers
          </h2>
          <p className="text-xs sm:text-sm text-[#5C524A] mt-1">
            Crea flyers estandarizados y elegantes en alta calidad (1080 × 1350 px), listos para redes sociales y el carrusel web.
          </p>
        </div>

        {/* Botones de Acción Superior */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="px-6 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span>⬇️ Descargar Flyer (PNG)</span>
          </button>

          {onSaveToWorkshops && (
            <button
              type="button"
              onClick={handleDirectAddToCarousel}
              className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>+ Usar en Carrusel Web</span>
            </button>
          )}
        </div>
      </div>

      {exportNotice && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold text-center animate-fadeIn">
          {exportNotice}
        </div>
      )}

      {/* Grid: Controles a la Izquierda, Canvas en Vivo a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* COLUMNA DE CONTROLES EDITABLES EN TIEMPO REAL                             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. SELECCIÓN Y CARGA DE FONDO */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              1. Carga de Fondo y Estilo
            </span>

            {/* Presets sistémicos disponibles */}
            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-2">
                Fondos Sistémicos Predefinidos:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Árbol y Raíces", url: "/images/arbol-generaciones.png" },
                  { label: "Encuentro y Comunidad", url: "/images/comunidad-encuentro.png" },
                  { label: "Mirar la Historia", url: "/images/mirar-historia-sanar.png" },
                ].map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setBgImagePreset(preset.url);
                      setCustomBgUrl("");
                    }}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      bgImagePreset === preset.url && !customBgUrl
                        ? "bg-terracotta-100 border-terracotta-500 font-bold text-terracotta-800 shadow-sm"
                        : "bg-white border-[#E7DECE] text-[#5C524A] hover:bg-cream-100"
                    }`}
                  >
                    <span className="block text-[11px] truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de subida de imagen propia */}
            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                O sube tu propia imagen de fondo ilustrada o fotográfica:
              </label>
              <label className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white border-2 border-dashed border-[#E7DECE] hover:border-terracotta-400 text-xs font-medium text-[#27221F] hover:bg-cream-50 transition-all cursor-pointer">
                <span>📁 Subir imagen desde tu dispositivo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadBg}
                  className="hidden"
                />
              </label>
              {customBgUrl && (
                <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  ✓ Imagen propia cargada y activa en el diseño.
                </p>
              )}
            </div>

            {/* Ajustes de Encuadre para evitar cortes de imagen */}
            <div className="bg-white/80 p-3.5 rounded-xl border border-[#E7DECE] space-y-3">
              <span className="text-[11px] font-bold text-[#27221F] block">
                📐 Ajuste y Encuadre de Imagen (Evitar cortes):
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBgFit("cover")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    bgFit === "cover"
                      ? "bg-terracotta-500 text-white"
                      : "bg-[#FAF8F5] border border-[#E7DECE] text-[#5C524A]"
                  }`}
                >
                  Llenar fondo (Cover)
                </button>
                <button
                  type="button"
                  onClick={() => setBgFit("contain")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    bgFit === "contain"
                      ? "bg-terracotta-500 text-white"
                      : "bg-[#FAF8F5] border border-[#E7DECE] text-[#5C524A]"
                  }`}
                >
                  Imagen completa (Contain)
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#5C524A] mb-1">
                  <span>Zoom / Escala de imagen:</span>
                  <span>{Math.round(bgZoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={bgZoom}
                  onChange={(e) => setBgZoom(parseFloat(e.target.value))}
                  className="w-full accent-terracotta-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#5C524A] mb-1">
                  <span>Posición vertical (subir / bajar):</span>
                  <span>{bgPositionY}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={bgPositionY}
                  onChange={(e) => setBgPositionY(parseInt(e.target.value))}
                  className="w-full accent-terracotta-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Regulador de Velo / Opacidad para legibilidad */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C524A] mb-1">
                <span>Intensidad del velo de lectura (contraste WCAG):</span>
                <span>{Math.round(overlayOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.30"
                max="0.85"
                step="0.05"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                className="w-full accent-terracotta-500 cursor-pointer"
              />
            </div>
          </div>

          {/* 2. LOGOTIPO DINÁMICO TRANSPARENTE (Sin bordes ni píldoras redondeadas) */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              2. Logotipo Transparente Único (Sin bordes redondeados)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLogoType("consteladores")}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  logoType === "consteladores"
                    ? "bg-purple-100 border-purple-500 text-purple-900"
                    : "bg-white border-[#E7DECE] text-[#5C524A]"
                }`}
              >
                Logo Consteladores
              </button>

              <button
                type="button"
                onClick={() => setLogoType("custom")}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  logoType === "custom"
                    ? "bg-terracotta-100 border-terracotta-500 text-terracotta-800"
                    : "bg-white border-[#E7DECE] text-[#5C524A]"
                }`}
              >
                Subir Logo Propio (PNG)
              </button>

              <button
                type="button"
                onClick={() => setLogoType("none")}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  logoType === "none"
                    ? "bg-zinc-200 border-zinc-500 text-zinc-900"
                    : "bg-white border-[#E7DECE] text-[#5C524A]"
                }`}
              >
                Sin Logo
              </button>
            </div>

            {logoType === "custom" && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Subir logo en formato transparente (PNG sin fondo):
                </label>
                <input
                  type="file"
                  accept="image/png,image/svg+xml"
                  onChange={handleUploadCustomLogo}
                  className="w-full text-xs text-[#5C524A]"
                />
              </div>
            )}
          </div>

          {/* 3. CAMPOS DE TEXTO EDITABLES EN TIEMPO REAL */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              3. Textos del Taller (Edición en Tiempo Real)
            </span>

            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                Título del Taller *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-semibold text-[#27221F] focus:ring-2 focus:ring-terracotta-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Franja de Fecha y Horario *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Sábado 16 de enero · 10:00 a 14:00 hrs"
                  value={dateAndHour}
                  onChange={(e) => setDateAndHour(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Facilitadoras *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Erika Alert y Karen Sudzuki"
                  value={facilitators}
                  onChange={(e) => setFacilitators(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Dirección *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Edmundo Eluchans 3047, of. 22, Concón"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Ciudad / Región
                </label>
                <input
                  type="text"
                  placeholder="Ej. Concón / Viña del Mar"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Valor del Taller *
                </label>
                <input
                  type="text"
                  placeholder="Ej. $40.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-bold text-terracotta-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  WhatsApp de Contacto *
                </label>
                <input
                  type="text"
                  placeholder="+56 9 4193 9363"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                Lema o Frase de Resonancia (Opcional)
              </label>
              <input
                type="text"
                placeholder='"Cuando tú constelas, todos constelamos"'
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs italic text-[#5C524A]"
              />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DE VISTA PREVIA INTERACTIVA (CANVAS EN ALTA DEFINICIÓN)           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C524A]">
              Vista Previa Interactiva (En Vivo)
            </span>
            <span className="text-[11px] text-[#8A7E73]">
              1080 × 1350 px · Alta Definición
            </span>
          </div>

          {/* Contenedor del Canvas con sombra y marco elegante */}
          <div className="w-full bg-[#EAE0D0] rounded-2xl p-2 sm:p-3 border border-[#E7DECE] shadow-xl flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="w-full h-auto rounded-xl shadow-md max-h-[580px] object-contain"
            />
          </div>

          {/* Botones de Exportación Rápidos */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleDownloadPNG}
              className="w-full py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>⬇️ Descargar Flyer Listo (PNG)</span>
            </button>

            {onSaveToWorkshops && (
              <button
                type="button"
                onClick={handleDirectAddToCarousel}
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>🚀 Asignar y Publicar en Carrusel de la Web</span>
              </button>
            )}

            <p className="text-[11px] text-center text-[#8A7E73]">
              * La imagen se genera instantáneamente en tu navegador sin consumir créditos ni servidores externos.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
