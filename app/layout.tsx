import type { Metadata } from "next";
import "./globals.css";
import { CMSProvider } from "@/lib/cms/CMSContext";

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
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased bg-cream-100 text-[#27221F] selection:bg-terracotta-100 selection:text-terracotta-800">
        <CMSProvider>
          {children}
        </CMSProvider>
      </body>
    </html>
  );
}
