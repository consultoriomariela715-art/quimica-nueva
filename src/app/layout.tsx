import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aula de Química · Prof. Wilmer",
  description: "Aula docente de química: cursos, materiales, avisos y agenda académica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#04060d] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
