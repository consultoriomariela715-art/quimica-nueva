import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { materials } from "@/lib/schema";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await db.select().from(materials);
  return NextResponse.json({ materials: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const body = await req.json();
  const [created] = await db.insert(materials).values(body).returning();
  return NextResponse.json({ material: created });
}
