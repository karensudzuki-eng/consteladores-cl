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
  title: "Constelaciones Familiares Online en Chile | Facilitadores Acreditados",
  description:
    "Espacio sistémico complementario en Chile. Facilitadores acreditados y supervisados, atención online vía Google Meet y presencial.",
  keywords: [
    "constelaciones familiares online chile",
    "consteladores acreditados chile",
    "mirada sistemica online google meet",
    "constelaciones familiares santiago vina del mar concepcion",
    "bert hellinger chile",
    "espacio sistemico chile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-cream-100 text-[#27221F] selection:bg-terracotta-100 selection:text-terracotta-800">
        {children}
      </body>
    </html>
  );
}
