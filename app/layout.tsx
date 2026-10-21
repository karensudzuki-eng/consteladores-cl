import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "consteladores.cl • Constelaciones Familiares Online con Terapeutas Certificados en Chile",
  description:
    "Encuentra consteladores familiares certificados en Chile. Sesiones individuales online y presenciales con Google Meet. Agenda tu hora de forma simple y segura.",
  keywords: [
    "constelaciones familiares chile",
    "consteladores certificados santiago",
    "terapia sistemica chile",
    "constelacion familiar online",
    "bert hellinger chile terapeutas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
