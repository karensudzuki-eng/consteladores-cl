"use client";

import React from "react";

export function WatercolorFloatingWhatsApp() {
  const whatsappNumber = "56987654321"; // Reemplazable por el número oficial
  const message = encodeURIComponent(
    "Hola, estoy en consteladores.cl y me gustaría hacer una consulta sobre las sesiones online y la reserva del 20%."
  );

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      {/* Tooltip / Píldora de ayuda visible en escritorio */}
      <div className="hidden sm:block bg-[#FAF8F5] text-[#27221F] border border-[#E7DECE] shadow-md px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
        ¿Dudas con tu sesión? Escríbenos
      </div>

      {/* Botón Flotante en Terracota Cálido (Cero verde chillón) */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a consteladores.cl"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.241-.244-.589-.493-.509-.678-.518-.176-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.378.197 1.9.12.58-.088 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.023 6.486 2.023 12.016c0 1.954.561 3.864 1.624 5.518L2 22l4.636-1.614c1.584.974 3.42 1.493 5.404 1.493 5.53 0 10.017-4.486 10.017-10.016 0-5.53-4.487-10.016-10.017-10.016z" />
        </svg>
      </a>
    </aside>
  );
}
