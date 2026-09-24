import Link from "next/link";
import { FlaskConical, KeyRound } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-white block leading-none">Aula·Q</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Química Docente</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#cursos" className="hover:text-cyan-400 transition-colors">Cursos</a>
          <a href="#materiales" className="hover:text-cyan-400 transition-colors">Materiales</a>
          <a href="#avisos" className="hover:text-cyan-400 transition-colors">Avisos</a>
          <a href="#agenda" className="hover:text-cyan-400 transition-colors">Agenda</a>
          <a href="#profesor" className="hover:text-cyan-400 transition-colors">Profesor</a>
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/30 hover:bg-violet-500/20 transition-all"
        >
          <KeyRound className="h-3.5 w-3.5" />
          Acceso Docente
        </Link>
      </div>
    </nav>
  );
}
