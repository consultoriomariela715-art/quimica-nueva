import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courses } from "@/lib/schema";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await db.select().from(courses);
  return NextResponse.json({ courses: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(courses).values(body).returning();
  return NextResponse.json({ course: created });
}
