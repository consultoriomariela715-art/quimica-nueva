import { db } from "./db";
import { courses, materials, notices, agendaEvents } from "./schema";
import { desc, asc } from "drizzle-orm";

export async function getPublicData() {
  try {
    const [allCourses, allMaterials, allNotices, allAgenda] = await Promise.all([
      db.select().from(courses).orderBy(asc(courses.id)),
      db.select().from(materials).orderBy(desc(materials.id)),
      db.select().from(notices).orderBy(desc(notices.pinned), desc(notices.id)),
      db.select().from(agendaEvents).orderBy(asc(agendaEvents.year), asc(agendaEvents.month), asc(agendaEvents.day)),
    ]);
    return { courses: allCourses, materials: allMaterials, notices: allNotices, agenda: allAgenda };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { courses: [], materials: [], notices: [], agenda: [] };
  }
}
