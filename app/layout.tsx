import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "consteladores.cl • Constelaciones Familiares Online en Chile",
  description:
    "Un espacio cuidado para conectar con facilitadores certificados en constelaciones familiares. Agendamiento simple, videollamadas y acompañamiento honesto.",
  keywords: [
    "constelaciones familiares chile",
    "consteladores certificados chile",
    "terapia sistemica online",
    "bert hellinger chile",
    "agendamiento constelaciones",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${geist.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-earth-50 text-earth-900 selection:bg-terracotta-100 selection:text-terracotta-700">
        {children}
      </body>
    </html>
  );
}
