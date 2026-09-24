import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { agendaEvents } from "@/lib/schema";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await db.select().from(agendaEvents);
  return NextResponse.json({ agenda: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(agendaEvents).values(body).returning();
  return NextResponse.json({ event: created });
}
