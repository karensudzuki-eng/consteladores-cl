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

  // Estados de datos del Flyer (Estilo Imagen 1: información superpuesta directamente en la imagen)
  const [subtitle, setSubtitle] = useState("TALLER PRESENCIAL\nCONSTELACIONES FAMILIARES");
  const [title, setTitle] = useState("Sana tu historia y conecta con nuevas posibilidades. ✨");
  const [quote, setQuote] = useState('"Cuando tú constelas, todos constelamos"');
  const [dateAndHour, setDateAndHour] = useState("Sábado 16 de enero de 2026 / 10:00 a 14:00 hrs");
  const [facilitators, setFacilitators] = useState("Erika Alert y Karen Sudzuki");
  const [price, setPrice] = useState("$40.000");
  const [address, setAddress] = useState("Edmundo Eluchans 3047, of. 22, Concón");
  const [city, setCity] = useState("Concón / Viña del Mar");
  const [bookingPhone, setBookingPhone] = useState("+56 9 6373 0998");

  // Tamaños de fuente ajustables para destacar
  const [subtitleFontSize, setSubtitleFontSize] = useState<number>(54);
  const [titleFontSize, setTitleFontSize] = useState<number>(44);
  const [quoteFontSize, setQuoteFontSize] = useState<number>(30);

  // Logotipo transparente
  const [logoType, setLogoType] = useState<"consteladores" | "icalma" | "custom" | "none">("consteladores");
  const [customLogoUrl, setCustomLogoUrl] = useState<string>("");

  // Imagen de Fondo y Encuadre
  const [bgImagePreset, setBgImagePreset] = useState<string>("/images/arbol-generaciones.png");
  const [customBgUrl, setCustomBgUrl] = useState<string>("");
  const [bgZoom, setBgZoom] = useState<number>(1.0);
  const [bgPositionY, setBgPositionY] = useState<number>(50); // 0 a 100%
  const [bgFit, setBgFit] = useState<"cover" | "contain">("cover");
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.5);

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string>("");

  // Imágenes cargadas en memoria
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

  // Función principal de renderizado en Canvas (Estilo Imagen 1: información superpuesta sin caja blanca)
  const drawFlyer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Limpiar canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 2. Fondo base
    ctx.fillStyle = "#181412";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 3. Dibujar imagen de fondo ocupando TODO el lienzo (Full Bleed)
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

      ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, drawWidth, drawHeight);
    }

    // 4. Capas cinematográficas de degradado transparente (permiten ver casi toda la imagen sin recuadros)
    // 4.1 Velo general suave
    ctx.fillStyle = `rgba(16, 12, 10, ${overlayOpacity * 0.45})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 4.2 Degradado superior suave para logo y píldora de fecha
    const topGrad = ctx.createLinearGradient(0, 0, 0, 360);
    topGrad.addColorStop(0, "rgba(12, 9, 7, 0.75)");
    topGrad.addColorStop(0.5, "rgba(12, 9, 7, 0.4)");
    topGrad.addColorStop(1, "rgba(12, 9, 7, 0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, CANVAS_WIDTH, 360);

    // 4.3 Degradado inferior para textos y datos sin tapar con caja
    const botGrad = ctx.createLinearGradient(0, CANVAS_HEIGHT * 0.35, 0, CANVAS_HEIGHT);
    botGrad.addColorStop(0, "rgba(12, 9, 7, 0)");
    botGrad.addColorStop(0.5, "rgba(12, 9, 7, 0.5)");
    botGrad.addColorStop(0.85, "rgba(10, 8, 6, 0.85)");
    botGrad.addColorStop(1, "rgba(8, 6, 5, 0.96)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, CANVAS_HEIGHT * 0.35, CANVAS_WIDTH, CANVAS_HEIGHT * 0.65);

    // 5. Marco fino decorativo exterior
    ctx.strokeStyle = "rgba(231, 222, 206, 0.35)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(36, 36, CANVAS_WIDTH - 72, CANVAS_HEIGHT - 72);

    // Helper para dibujar píldoras redondeadas con fondo translúcido y borde dorado/ocre
    const drawPill = (
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number,
      bgColor: string,
      borderColor: string,
      borderWidth: number = 2
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
      ctx.restore();
    };

    // 6. LOGOTIPO SUPERIOR TRANSPARENTE (Esquina superior derecha)
    const logoY = 65;
    if (logoType === "custom" && customLogoImgRef.current) {
      const logo = customLogoImgRef.current;
      const logoH = 80;
      const logoW = (logo.width / logo.height) * logoH;
      ctx.drawImage(logo, CANVAS_WIDTH - logoW - 70, logoY, logoW, logoH);
    } else if (logoType === "consteladores") {
      // Isotipo Consteladores a la derecha
      const logoX = CANVAS_WIDTH - 290;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(logoX + 22, logoY + 30, 13, 0, Math.PI * 2);
      ctx.arc(logoX + 46, logoY + 30, 13, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 28px Georgia, serif";
      ctx.fillText("Consteladores", logoX + 72, logoY + 39);
    } else if (logoType === "icalma") {
      // Isotipo Icalma
      const logoX = CANVAS_WIDTH - 230;
      ctx.fillStyle = "#F5D79E";
      ctx.font = "bold 34px Georgia, serif";
      ctx.fillText("Icalma", logoX, logoY + 35);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "14px sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("CONSTELACIONES", logoX, logoY + 55);
      ctx.letterSpacing = "0px";
    }

    // 7. PÍLDORA DE FECHA Y HORARIO (Estilo Imagen 1: borde dorado y fondo translúcido)
    const pillY = 190;
    ctx.font = "bold 24px sans-serif";
    const dateMetrics = ctx.measureText(dateAndHour);
    const datePillW = Math.min(CANVAS_WIDTH - 140, dateMetrics.width + 56);
    const datePillH = 54;
    const datePillX = 70;

    drawPill(
      datePillX,
      pillY,
      datePillW,
      datePillH,
      27,
      "rgba(28, 20, 15, 0.72)",
      "#D4A359",
      2.5
    );

    ctx.fillStyle = "#F8ECD2";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(dateAndHour, datePillX + 28, pillY + 35);

    // 8. TIPO DE TALLER ("TALLER PRESENCIAL CONSTELACIONES FAMILIARES")
    // Letras GRANDES, en mayúsculas serif con sombra para alto impacto visual
    let currentY = pillY + 110;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${subtitleFontSize}px Georgia, serif`;
    ctx.letterSpacing = "1.5px";

    const subtitleLines = subtitle.split("\n");
    for (const subLine of subtitleLines) {
      ctx.fillText(subLine.toUpperCase(), 70, currentY);
      currentY += subtitleFontSize + 14;
    }
    ctx.restore();

    // 9. TÍTULO DEL TALLER (con salto de línea inteligente y sombra)
    currentY += 10;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = "#FAF7F2";
    ctx.font = `bold ${titleFontSize}px Georgia, serif`;
    ctx.letterSpacing = "0px";

    const titleWords = title.split(" ");
    let line = "";
    const maxTitleWidth = CANVAS_WIDTH - 140;

    for (let n = 0; n < titleWords.length; n++) {
      const testLine = line + titleWords[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && n > 0) {
        ctx.fillText(line, 70, currentY);
        line = titleWords[n] + " ";
        currentY += titleFontSize + 16;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, currentY);
    ctx.restore();

    // 10. LEMA O FRASE DE RESONANCIA (Agrandada, itálica en ocre suave con comillas)
    if (quote) {
      currentY += 45;
      ctx.save();
      ctx.fillStyle = "#E8C58A"; // Ocre dorado suave
      ctx.font = `italic 500 ${quoteFontSize}px Georgia, serif`;
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.fillText(quote, 70, currentY);
      ctx.restore();
    }

    // 11. VALOR DESTACADO CON LÍNEA DORADA INFERIOR (Estilo Imagen 1)
    currentY += 60;
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const valueText = `VALOR: ${price}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 40px Georgia, serif";
    ctx.fillText(valueText, 70, currentY);

    // Línea dorada de acento bajo el valor
    const valMetrics = ctx.measureText(valueText);
    ctx.strokeStyle = "#D4A359";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(70, currentY + 12);
    ctx.lineTo(70 + valMetrics.width, currentY + 12);
    ctx.stroke();
    ctx.restore();

    // 12. PÍLDORA DE FACILITADORAS (En la zona inferior izquierda, estilo Imagen 1)
    const facPillY = CANVAS_HEIGHT - 170;
    const facText = `Facilitadoras: ${facilitators}`;
    ctx.font = "bold 24px sans-serif";
    const facMetrics = ctx.measureText(facText);
    const facPillW = Math.min(CANVAS_WIDTH - 140, facMetrics.width + 56);
    const facPillH = 52;

    drawPill(
      70,
      facPillY,
      facPillW,
      facPillH,
      26,
      "rgba(28, 20, 15, 0.72)",
      "#D4A359",
      2.5
    );

    ctx.fillStyle = "#F8ECD2";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(facText, 70 + 28, facPillY + 34);

    // 13. FRANJA INFERIOR: UBICACIÓN Y RESERVAS (Sin botón de reservar, con teléfono directo)
    const dividerY = CANVAS_HEIGHT - 90;
    ctx.strokeStyle = "rgba(231, 222, 206, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, dividerY);
    ctx.lineTo(CANVAS_WIDTH - 70, dividerY);
    ctx.stroke();

    const bottomY = CANVAS_HEIGHT - 48;

    // Lado izquierdo: Dirección y Ciudad
    ctx.fillStyle = "#FAF7F2";
    ctx.font = "600 22px Georgia, serif";
    ctx.fillText(`📍 ${address} (${city})`, 70, bottomY);

    // Lado derecho: Reservas con número de teléfono
    const cleanBookingPhone = bookingPhone.trim().startsWith("Reservas")
      ? bookingPhone.trim()
      : `Reservas: ${bookingPhone.trim()}`;

    ctx.font = "bold 24px sans-serif";
    const bookingMetrics = ctx.measureText(`💬 ${cleanBookingPhone}`);
    ctx.fillStyle = "#55E89B"; // Verde WhatsApp luminoso y visible
    ctx.fillText(`💬 ${cleanBookingPhone}`, CANVAS_WIDTH - 70 - bookingMetrics.width, bottomY);
  }, [
    title,
    subtitle,
    quote,
    dateAndHour,
    facilitators,
    price,
    address,
    city,
    bookingPhone,
    subtitleFontSize,
    titleFontSize,
    quoteFontSize,
    logoType,
    bgZoom,
    bgPositionY,
    bgFit,
    overlayOpacity,
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
          phoneContact: bookingPhone.replace(/[^0-9+ ]/g, "").trim() || "+56 9 6373 0998",
          isActive: true,
          flyerUrl: dataUrl,
          importantNote: quote,
        },
        dataUrl
      );
      setExportNotice("✓ ¡Flyer asignado y guardado como Taller!");
      setTimeout(() => setExportNotice(""), 4000);
    }
  };

  return (
    <div className="bg-[#FCFAF7] border border-[#E7DECE] rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* Cabecera del Módulo */}
      <div className="border-b border-[#E7DECE] pb-5 mb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta-600 block mb-1">
          Herramienta de Estudio
        </span>
        <h2 className="text-2xl font-serif font-bold text-[#27221F]">
          Diseñador de Flyers en Alta Resolución (1080 × 1350 px)
        </h2>
        <p className="text-xs text-[#5C524A] mt-1 max-w-2xl leading-relaxed">
          Diseño con fotografía de fondo a pantalla completa y datos superpuestos con tipografía elegante. Sin recuadros blancos que tapen la imagen y con reservas directas por WhatsApp.
        </p>
      </div>

      {/* Grid de 2 Columnas: Controles a la izquierda, Canvas a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* COLUMNA DE CONTROLES                                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. SELECCIÓN Y ENCUADRE DE LA IMAGEN DE FONDO */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              1. Fotografía de Fondo (Ocupa casi todo el flyer)
            </span>

            {/* Presets rápidos */}
            <div>
              <label className="block text-xs font-semibold text-[#5C524A] mb-2">
                Seleccionar ilustración del sistema o subir foto propia:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCustomBgUrl("");
                    setBgImagePreset("/images/arbol-generaciones.png");
                  }}
                  className={`p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    !customBgUrl && bgImagePreset === "/images/arbol-generaciones.png"
                      ? "bg-terracotta-100 border-terracotta-500 text-terracotta-800"
                      : "bg-white border-[#E7DECE] text-[#5C524A] hover:bg-cream-100"
                  }`}
                >
                  🌳 Árbol Genealógico
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomBgUrl("");
                    setBgImagePreset("/images/mirar-historia-sanar.png");
                  }}
                  className={`p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    !customBgUrl && bgImagePreset === "/images/mirar-historia-sanar.png"
                      ? "bg-terracotta-100 border-terracotta-500 text-terracotta-800"
                      : "bg-white border-[#E7DECE] text-[#5C524A] hover:bg-cream-100"
                  }`}
                >
                  🕊️ Vínculo Afectivo
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomBgUrl("");
                    setBgImagePreset("/images/comunidad-encuentro.png");
                  }}
                  className={`p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    !customBgUrl && bgImagePreset === "/images/comunidad-encuentro.png"
                      ? "bg-terracotta-100 border-terracotta-500 text-terracotta-800"
                      : "bg-white border-[#E7DECE] text-[#5C524A] hover:bg-cream-100"
                  }`}
                >
                  🤝 Encuentro Grupal
                </button>
              </div>
            </div>

            {/* Subir foto propia */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                Subir foto local desde tu computador:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadBg}
                className="w-full text-xs text-[#5C524A] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-terracotta-500 file:text-white hover:file:bg-terracotta-600 cursor-pointer"
              />
            </div>

            {/* Ajustes de encuadre */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E7DECE]">
              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Zoom ({Math.round(bgZoom * 100)}%)
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.05"
                  value={bgZoom}
                  onChange={(e) => setBgZoom(parseFloat(e.target.value))}
                  className="w-full accent-terracotta-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Posición Vertical ({bgPositionY}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={bgPositionY}
                  onChange={(e) => setBgPositionY(parseInt(e.target.value, 10))}
                  className="w-full accent-terracotta-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C524A] mb-1">
                  Velo de Fondo ({Math.round(overlayOpacity * 100)}%)
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="0.85"
                  step="0.05"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                  className="w-full accent-terracotta-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 2. SELECCIÓN DE LOGOTIPO TRANSPARENTE */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              2. Logotipo Superior
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setLogoType("consteladores")}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  logoType === "consteladores"
                    ? "bg-purple-100 border-purple-500 text-purple-900"
                    : "bg-white border-[#E7DECE] text-[#5C524A]"
                }`}
              >
                Consteladores
              </button>

              <button
                type="button"
                onClick={() => setLogoType("icalma")}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  logoType === "icalma"
                    ? "bg-ochre-100 border-ochre-500 text-ochre-900"
                    : "bg-white border-[#E7DECE] text-[#5C524A]"
                }`}
              >
                Icalma
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
                Subir Logo PNG
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

          {/* 3. CAMPOS DE TEXTO EDITABLES Y TAMAÑOS DE LETRA */}
          <div className="bg-[#FAF8F5] border border-[#E7DECE] rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block">
              3. Textos y Tamaños (Información Superpuesta sobre la Foto)
            </span>

            {/* Tipo de Taller */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#5C524A]">
                  Tipo de Taller (Letras Grandes) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8A7E73]">Tamaño:</span>
                  <input
                    type="range"
                    min="36"
                    max="68"
                    value={subtitleFontSize}
                    onChange={(e) => setSubtitleFontSize(Number(e.target.value))}
                    className="w-24 accent-terracotta-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#27221F] w-6 text-right">
                    {subtitleFontSize}
                  </span>
                </div>
              </div>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej. TALLER PRESENCIAL&#10;CONSTELACIONES FAMILIARES"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-serif font-bold text-[#27221F] focus:ring-2 focus:ring-terracotta-500 uppercase"
              />
            </div>

            {/* Título Principal */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#5C524A]">
                  Título del Taller *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8A7E73]">Tamaño:</span>
                  <input
                    type="range"
                    min="32"
                    max="60"
                    value={titleFontSize}
                    onChange={(e) => setTitleFontSize(Number(e.target.value))}
                    className="w-24 accent-terracotta-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#27221F] w-6 text-right">
                    {titleFontSize}
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-semibold text-[#27221F] focus:ring-2 focus:ring-terracotta-500"
              />
            </div>

            {/* Lema o Frase */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#5C524A]">
                  Lema o Frase de Resonancia
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#8A7E73]">Tamaño:</span>
                  <input
                    type="range"
                    min="22"
                    max="44"
                    value={quoteFontSize}
                    onChange={(e) => setQuoteFontSize(Number(e.target.value))}
                    className="w-24 accent-terracotta-500 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#27221F] w-6 text-right">
                    {quoteFontSize}
                  </span>
                </div>
              </div>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder='"Cuando tú constelas, todos constelamos"'
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs italic text-[#5C524A]"
              />
            </div>

            {/* Fecha y Horario en Píldora */}
            <div>
              <label className="block text-xs font-bold text-[#5C524A] mb-1">
                Fecha y Horario (Aparece en la píldora superior) *
              </label>
              <input
                type="text"
                value={dateAndHour}
                onChange={(e) => setDateAndHour(e.target.value)}
                placeholder="Ej. Sábado 16 de enero de 2026 / 10:00 a 14:00 hrs"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
              />
            </div>

            {/* Facilitadoras y Valor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Facilitadoras (Píldora inferior) *
                </label>
                <input
                  type="text"
                  value={facilitators}
                  onChange={(e) => setFacilitators(e.target.value)}
                  placeholder="Ej. Erika Alert y Karen Sudzuki"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Valor con línea de acento *
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ej. $40.000"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-bold text-terracotta-700"
                />
              </div>
            </div>

            {/* Dirección y Ciudad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej. Edmundo Eluchans 3047, of. 22, Concón"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C524A] mb-1">
                  Ciudad / Región
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej. Concón / Viña del Mar"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-xs sm:text-sm text-[#27221F]"
                />
              </div>
            </div>

            {/* Reservas: Teléfono editable */}
            <div>
              <label className="block text-xs font-bold text-[#5C524A] mb-1">
                Texto / Teléfono de Reservas (Franja inferior) *
              </label>
              <input
                type="text"
                value={bookingPhone}
                onChange={(e) => setBookingPhone(e.target.value)}
                placeholder="Ej. +56 9 6373 0998 o Reservas: +56 9 6373 0998"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7DECE] text-sm font-bold text-emerald-700"
              />
              <p className="text-[11px] text-[#8A7E73] mt-1">
                Aparece directamente en la barra inferior del flyer (ej: <em>💬 Reservas: {bookingPhone}</em>), reemplazando al botón.
              </p>
            </div>
          </div>

          {/* 4. ACCIONES DE DESCARGA Y GUARDADO */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleDownloadPNG}
              disabled={isExporting}
              className="flex-1 py-3 px-5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <span>📥 Descargar Flyer (PNG 1080×1350)</span>
            </button>

            {onSaveToWorkshops && (
              <button
                type="button"
                onClick={handleDirectAddToCarousel}
                className="py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>➕ Guardar como Taller en la Web</span>
              </button>
            )}
          </div>

          {exportNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 text-center animate-fadeIn">
              {exportNotice}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DE VISTA PREVIA INTERACTIVA (CANVAS EN ALTA DEFINICIÓN)           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C524A]">
              Vista Previa en Vivo (Estilo Imagen 1)
            </span>
            <span className="text-[11px] text-[#8A7E73]">
              1080 × 1350 px
            </span>
          </div>

          {/* Contenedor del Canvas con sombra */}
          <div className="w-full bg-[#181412] rounded-2xl p-2 sm:p-3 border border-[#E7DECE] shadow-2xl flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="w-full h-auto max-h-[700px] object-contain rounded-xl"
            />
          </div>

          <p className="text-[11px] text-center text-[#8A7E73]">
            La imagen ocupa casi todo el flyer. Los textos y píldoras flotan directamente sobre la fotografía.
          </p>
        </div>

      </div>
    </div>
  );
}