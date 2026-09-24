import "dotenv/config";
import { db } from "./db";
import { courses, materials, notices, agendaEvents, panelUsers } from "./schema";

async function main() {
  console.log("🌱 Insertando datos iniciales...");

  await db.insert(panelUsers).values([
    {
      name: "Prof. Wilmer",
      email: "wilmer@aula.edu",
      password: "Aula#2026",
      role: "administrador",
    },
  ]).onConflictDoNothing();

  await db.insert(courses).values([
    {
      code: "QUI-101",
      title: "Química General I",
      level: "Grado",
      semester: "1.º semestre",
      credits: 6,
      room: "Aula B-204",
      schedule: "Lun y Mié · 09:00 – 11:00",
      description: "Estequiometría, estructura atómica y enlace químico. La base sobre la que se construye todo lo demás.",
      formula: "n = m / M",
      accent: "cyan",
    },
    {
      code: "QUI-205",
      title: "Química Orgánica",
      level: "Grado",
      semester: "3.º semestre",
      credits: 5,
      room: "Aula C-112",
      schedule: "Mar y Jue · 11:00 – 13:00",
      description: "Grupos funcionales, mecanismos de reacción y síntesis orgánica con prácticas de laboratorio.",
      formula: "SN2 · E1 · E2",
      accent: "violet",
    },
    {
      code: "QUI-510",
      title: "Fisicoquímica Avanzada",
      level: "Máster",
      semester: "1.º semestre",
      credits: 4,
      room: "Lab. F-301",
      schedule: "Mié · 16:00 – 19:00",
      description: "Termodinámica estadística, cinética de estado de transición y electrocatálisis.",
      formula: "ΔG = ΔH − TΔS",
      accent: "emerald",
    },
    {
      code: "QUI-720",
      title: "Métodos Espectroscópicos",
      level: "Doctorado",
      semester: "Curso anual",
      credits: 3,
      room: "Sala NMR-1",
      schedule: "Vie · 10:00 – 13:00",
      description: "RMN multinuclear, IR-Raman y espectrometría de masas de alta resolución.",
      formula: "δ (ppm) · m/z",
      accent: "amber",
    },
  ]).onConflictDoNothing();

  await db.insert(materials).values([
    { title: "Tema 3 · Enlace químico y teoría de orbitales", courseCode: "QUI-101", category: "Apuntes", format: "PDF", size: "4,2 MB", downloads: 342 },
    { title: "Práctica 5 · Valoración ácido-base", courseCode: "QUI-101", category: "Guías de laboratorio", format: "PDF", size: "1,8 MB", downloads: 214 },
    { title: "Colección de estequiometría · 40 problemas", courseCode: "QUI-101", category: "Ejercicios resueltos", format: "PDF", size: "6,1 MB", downloads: 508 },
    { title: "Mecanismos SN1 / SN2 paso a paso", courseCode: "QUI-205", category: "Apuntes", format: "PDF", size: "3,4 MB", downloads: 289 },
  ]);

  await db.insert(notices).values([
    {
      type: "examen",
      courseCode: "QUI-101",
      title: "Primer parcial · Temas 1 a 4",
      body: "El examen se realizará en el aula B-204. Permitido el uso de tabla periódica.",
      dateLabel: "24 feb 2026",
      pinned: true,
    },
    {
      type: "entrega",
      courseCode: "QUI-205",
      title: "Entrega del informe de Práctica 2",
      body: "Subir el informe de síntesis de aspirina en PDF antes de las 23:59.",
      dateLabel: "20 feb 2026",
      pinned: true,
    },
  ]);

  await db.insert(agendaEvents).values([
    { day: 20, month: 1, year: 2026, type: "entrega", title: "Informe Práctica 2", courseCode: "QUI-205", time: "23:59" },
    { day: 24, month: 1, year: 2026, type: "examen", title: "Primer parcial", courseCode: "QUI-101", time: "09:00" },
    { day: 27, month: 1, year: 2026, type: "general", title: "Puertas abiertas", courseCode: "Laboratorio", time: "10:00" },
  ]);

  console.log("✅ Datos sembrados con éxito en Supabase.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error en seed:", err);
  process.exit(1);
});
