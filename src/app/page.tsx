import Navbar from "@/components/Navbar";
import MoleculeCanvas from "@/components/MoleculeCanvas";
import { getPublicData } from "@/lib/queries";
import { 
  BookOpen, Download, Calendar, Bell, Mail, Clock, MapPin, 
  GraduationCap, Beaker, ArrowRight, Pin, FileText, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { courses, materials, notices, agenda } = await getPublicData();
  const totalDownloads = materials.reduce((acc, m) => acc + (m.downloads || 0), 0);

  return (
    <main className="relative min-h-screen pt-16 pb-20 overflow-x-hidden">
      <MoleculeCanvas />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-8">
          <Beaker className="h-3.5 w-3.5" />
          Facultad de Ciencias · Curso 2025–2026
        </div>

        <h1 className="text-5xl sm:text-7xl font-extralight tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          La química se entiende{" "}
          <span className="font-serif italic font-normal bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            preguntando
          </span>{" "}
          el porqué
        </h1>

        <p className="mt-8 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Portal docente del <strong className="text-slate-200">Prof. Wilmer</strong>. Apuntes actualizados, guías de laboratorio, problemas resueltos y avisos oficiales.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#cursos"
            className="px-8 py-3.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] flex items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Explorar asignaturas
          </a>
          <a
            href="#materiales"
            className="px-8 py-3.5 rounded-full glass text-slate-200 font-semibold text-sm hover:bg-slate-800/80 transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4 text-violet-400" />
            Descargar apuntes
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 max-w-2xl mx-auto grid grid-cols-3 divide-x divide-slate-800 glass rounded-2xl p-6">
          <div>
            <p className="text-3xl font-bold text-white font-mono">{courses.length}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Cursos Activos</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400 font-mono">{materials.length}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Materiales</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-400 font-mono">{totalDownloads}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Descargas</p>
          </div>
        </div>
      </section>

      {/* CURSOS SECTION */}
      <section id="cursos" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="mb-14">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">01 · Docencia</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white">Asignaturas impartidas</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="glass p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {course.code}
                </span>
                <span className="text-xs text-slate-400">{course.level} · {course.credits} ECTS</span>
              </div>

              <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs font-mono text-violet-400 mt-1">{course.formula}</p>
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">{course.description}</p>

              <div className="mt-6 pt-6 border-t border-slate-800/80 grid sm:grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{course.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MATERIALES SECTION */}
      <section id="materiales" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="mb-14">
          <p className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-2">02 · Biblioteca</p>
          <h2 className="text-3xl sm:text-4xl font-light text-white">Materiales de estudio</h2>
        </div>

        <div className="glass rounded-3xl overflow-hidden divide-y divide-slate-800/60 border border-slate-800">
          {materials.map((mat) => (
            <div key={mat.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">{mat.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-cyan-400">{mat.courseCode}</span> · {mat.category} · {mat.format} · {mat.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="hidden sm:block text-xs text-slate-500 font-mono">
                  {mat.downloads} descargas
                </span>
                <button
                  type="button"
                  className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 transition-all"
                  title="Descargar archivo"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AVISOS Y AGENDA */}
      <section id="avisos" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-2">03 · Tablón</p>
          <h2 className="text-3xl font-light text-white mb-8">Avisos urgentes</h2>

          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className={`glass p-6 rounded-2xl border ${notice.pinned ? "border-amber-500/40 bg-amber-500/5" : "border-slate-800"}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    {notice.pinned && <Pin className="h-3.5 w-3.5" />}
                    {notice.type} · {notice.courseCode}
                  </span>
                  <span className="text-xs text-slate-500">{notice.dateLabel}</span>
                </div>
                <h4 className="font-semibold text-white text-base">{notice.title}</h4>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{notice.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="agenda">
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">04 · Cronograma</p>
          <h2 className="text-3xl font-light text-white mb-8">Próximas fechas</h2>

          <div className="glass p-6 rounded-2xl border border-slate-800 space-y-4">
            {agenda.map((ev) => (
              <div key={ev.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400 shrink-0 font-mono">
                  <span className="text-base font-bold leading-none">{ev.day}</span>
                  <span className="text-[9px] uppercase">Feb</span>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-white">{ev.title}</h5>
                  <p className="text-xs text-slate-400 mt-1">
                    {ev.courseCode} {ev.time && `· ${ev.time}`} · <span className="capitalize text-emerald-400">{ev.type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESOR SECTION */}
      <section id="profesor" className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="glass p-10 sm:p-14 rounded-3xl border border-slate-800 grid md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-3xl mx-auto md:mx-0 mb-4 shadow-lg">
              W
            </div>
            <h3 className="text-2xl font-bold text-white">Prof. Wilmer</h3>
            <p className="text-sm text-cyan-400">Profesor Titular de Química</p>
            <p className="text-xs text-slate-400 mt-1">Dpto. Química Física y Analítica</p>
          </div>

          <div className="md:col-span-2 space-y-4 text-sm text-slate-300">
            <p className="italic text-base text-slate-200">
              “Veintidós años frente a la pizarra y el matraz. Investigador en electrocatálisis y docente convencido de que la química se comprende preguntando el porqué.”
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block uppercase">Despacho</span>
                <span className="text-slate-200 font-medium">Edificio de Ciencias · Despacho 3.12</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase">Tutorías</span>
                <span className="text-slate-200 font-medium">Mar y Jue · 15:00 – 17:00</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block uppercase">Contacto Oficial</span>
                <a href="mailto:wilmer@aula.edu" className="text-cyan-400 hover:underline">
                  wilmer@aula.edu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 pt-12 text-center text-xs text-slate-500 border-t border-slate-900">
        <p>© 2026 Aula Docente de Química · Prof. Wilmer. Desarrollado con Next.js y Supabase.</p>
        <p className="mt-2 font-mono text-[10px] text-slate-600">ΔG = ΔH − TΔS · Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
