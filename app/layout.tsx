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
  title: "Constelaciones Familiares Online en Chile | Facilitadores Certificados",
  description:
    "Sesiones de constelación familiar online por Google Meet. Facilitadores validados, precios claros y reserva con 20%.",
  keywords: [
    "constelaciones familiares online chile",
    "consteladores certificados chile",
    "terapia sistemica online google meet",
    "constelaciones familiares santiago valparaiso concepcion",
    "bert hellinger chile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-cream-100 text-charcoal-900 selection:bg-ochre-100 selection:text-ochre-800">
        {children}
      </body>
    </html>
  );
}
