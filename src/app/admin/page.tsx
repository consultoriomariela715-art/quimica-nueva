"use client";

import { useEffect, useState } from "react";
import { FlaskConical, LogOut, Plus, BookOpen, FileText, Bell, Calendar, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"cursos" | "materiales" | "avisos" | "agenda">("cursos");

  // Estados de Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // Estados de Formularios
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [courseForm, setCourseForm] = useState({ code: "", title: "", level: "Grado", credits: 6, schedule: "", room: "", formula: "", description: "" });
  const [matForm, setMatForm] = useState({ title: "", courseCode: "QUI-101", category: "Apuntes", format: "PDF", size: "1,5 MB" });
  const [noticeForm, setNoticeForm] = useState({ title: "", courseCode: "QUI-101", type: "general", body: "", dateLabel: "24 feb 2026", pinned: false });
  const [agendaForm, setAgendaForm] = useState({ title: "", courseCode: "QUI-101", type: "examen", day: 24, month: 1, year: 2026, time: "09:00" });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setUser(d.user))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPass }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setUser(data.user);
    } else {
      setLoginError(data.error || "Credenciales incorrectas");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  const showMsg = (text: string, ok = true) => {
    setMessage({ text, ok });
    setTimeout(() => setMessage(null), 4000);
  };

  // Handlers para agregar datos
  const addCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/courses", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(courseForm) });
    if (res.ok) {
      showMsg("Curso creado exitosamente");
      setCourseForm({ code: "", title: "", level: "Grado", credits: 6, schedule: "", room: "", formula: "", description: "" });
    } else {
      showMsg("Error al crear curso", false);
    }
  };

  const addMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/materials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(matForm) });
    if (res.ok) {
      showMsg("Material publicado");
      setMatForm({ title: "", courseCode: "QUI-101", category: "Apuntes", format: "PDF", size: "1,5 MB" });
    } else {
      showMsg("Error al publicar material", false);
    }
  };

  const addNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/notices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(noticeForm) });
    if (res.ok) {
      showMsg("Aviso fijado en el tablón");
      setNoticeForm({ title: "", courseCode: "QUI-101", type: "general", body: "", dateLabel: "24 feb 2026", pinned: false });
    } else {
      showMsg("Error al crear aviso", false);
    }
  };

  const addAgenda = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/agenda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(agendaForm) });
    if (res.ok) {
      showMsg("Fecha agregada a la agenda");
      setAgendaForm({ title: "", courseCode: "QUI-101", type: "examen", day: 24, month: 1, year: 2026, time: "09:00" });
    } else {
      showMsg("Error al agregar fecha", false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04060d] flex items-center justify-center text-cyan-400 font-mono text-sm">
        Cargando acceso al laboratorio...
      </div>
    );
  }

  // PANTALLA DE LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-[#04060d] flex items-center justify-center p-6">
        <div className="glass max-w-md w-full p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Panel Docente</h1>
            <p className="text-xs text-slate-400 mt-1">Ingresa tus credenciales para administrar el aula</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Correo electrónico</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="wilmer@aula.edu"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4" /> {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-cyan-400">
              ← Volver al portal público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PANEL PRINCIPAL AUTENTICADO
  return (
    <div className="min-h-screen bg-[#04060d] text-slate-200">
      {/* Topbar */}
      <header className="glass border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <FlaskConical className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="font-bold text-white text-sm">Aula Docente · Panel de Control</h2>
            <p className="text-[11px] text-slate-400 font-mono">{user.name} ({user.role})</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-slate-400 hover:text-white">
            Ver sitio público
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg"
          >
            <LogOut className="h-3.5 w-3.5" /> Salir
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Notificación Toast */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm ${message.ok ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border border-rose-500/30 text-rose-300"}`}>
            {message.ok ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        {/* Pestañas */}
        <div className="flex gap-2 border-b border-slate-800 pb-4 mb-8">
          {[
            { id: "cursos", label: "Cursos", icon: BookOpen },
            { id: "materiales", label: "Materiales", icon: FileText },
            { id: "avisos", label: "Avisos", icon: Bell },
            { id: "agenda", label: "Agenda", icon: Calendar },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === t.id ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-white"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: CURSOS */}
        {tab === "cursos" && (
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-cyan-400" /> Crear Nueva Asignatura
            </h3>
            <form onSubmit={addCourse} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Código</label>
                <input required value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} placeholder="QUI-301" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Título</label>
                <input required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} placeholder="Química Cuántica" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Nivel</label>
                <select value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                  <option>Grado</option>
                  <option>Máster</option>
                  <option>Doctorado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Créditos ECTS</label>
                <input type="number" value={courseForm.credits} onChange={(e) => setCourseForm({ ...courseForm, credits: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Horario</label>
                <input value={courseForm.schedule} onChange={(e) => setCourseForm({ ...courseForm, schedule: e.target.value })} placeholder="Lun y Mié · 10:00 - 12:00" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Aula</label>
                <input value={courseForm.room} onChange={(e) => setCourseForm({ ...courseForm, room: e.target.value })} placeholder="Aula B-105" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Fórmula Distintiva</label>
                <input value={courseForm.formula} onChange={(e) => setCourseForm({ ...courseForm, formula: e.target.value })} placeholder="ĤΨ = EΨ" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm font-mono text-cyan-300" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Descripción</label>
                <textarea rows={3} value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} placeholder="Resumen del contenido temático..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl transition-all">Guardar Asignatura</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MATERIALES */}
        {tab === "materiales" && (
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-violet-400" /> Publicar Material de Estudio
            </h3>
            <form onSubmit={addMaterial} className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Título del Documento</label>
                <input required value={matForm.title} onChange={(e) => setMatForm({ ...matForm, title: e.target.value })} placeholder="Guía de Problemas Tema 2" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Código de Curso</label>
                <input required value={matForm.courseCode} onChange={(e) => setMatForm({ ...matForm, courseCode: e.target.value })} placeholder="QUI-101" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Categoría</label>
                <select value={matForm.category} onChange={(e) => setMatForm({ ...matForm, category: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                  <option>Apuntes</option>
                  <option>Guías de laboratorio</option>
                  <option>Ejercicios resueltos</option>
                  <option>Presentaciones</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Formato</label>
                <select value={matForm.format} onChange={(e) => setMatForm({ ...matForm, format: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                  <option>PDF</option>
                  <option>PPTX</option>
                  <option>DOCX</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Tamaño estimado</label>
                <input value={matForm.size} onChange={(e) => setMatForm({ ...matForm, size: e.target.value })} placeholder="2,4 MB" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full py-3 bg-violet-400 hover:bg-violet-300 text-slate-950 font-bold text-sm rounded-xl transition-all">Publicar en Biblioteca</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: AVISOS */}
        {tab === "avisos" && (
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" /> Publicar Aviso en Tablón
            </h3>
            <form onSubmit={addNotice} className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Título del Aviso</label>
                <input required value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} placeholder="Cambio de horario de tutorías" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Tipo</label>
                <select value={noticeForm.type} onChange={(e) => setNoticeForm({ ...noticeForm, type: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                  <option value="general">General</option>
                  <option value="examen">Examen</option>
                  <option value="entrega">Entrega</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Asignatura</label>
                <input value={noticeForm.courseCode} onChange={(e) => setNoticeForm({ ...noticeForm, courseCode: e.target.value })} placeholder="QUI-101 o General" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Contenido del Comunicado</label>
                <textarea rows={3} required value={noticeForm.body} onChange={(e) => setNoticeForm({ ...noticeForm, body: e.target.value })} placeholder="Instrucciones para los alumnos..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={noticeForm.pinned} onChange={(e) => setNoticeForm({ ...noticeForm, pinned: e.target.checked })} className="rounded bg-slate-900 border-slate-800 text-cyan-400" />
                  <span className="text-xs text-slate-300">Fijar al inicio del tablón</span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition-all">Fijar Aviso</button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: AGENDA */}
        {tab === "agenda" && (
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-emerald-400" /> Agregar Evento al Cronograma
            </h3>
            <form onSubmit={addAgenda} className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Título del Evento</label>
                <input required value={agendaForm.title} onChange={(e) => setAgendaForm({ ...agendaForm, title: e.target.value })} placeholder="Examen Parcial Tema 1-3" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Día</label>
                <input type="number" min={1} max={31} value={agendaForm.day} onChange={(e) => setAgendaForm({ ...agendaForm, day: Number(e.target.value) })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Hora</label>
                <input value={agendaForm.time} onChange={(e) => setAgendaForm({ ...agendaForm, time: e.target.value })} placeholder="09:00" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Curso</label>
                <input value={agendaForm.courseCode} onChange={(e) => setAgendaForm({ ...agendaForm, courseCode: e.target.value })} placeholder="QUI-101" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Tipo</label>
                <select value={agendaForm.type} onChange={(e) => setAgendaForm({ ...agendaForm, type: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                  <option value="examen">Examen</option>
                  <option value="entrega">Entrega</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm rounded-xl transition-all">Agregar a la Agenda</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
