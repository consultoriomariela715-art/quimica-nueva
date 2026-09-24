import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { panelUsers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const [user] = await db.select().from(panelUsers).where(eq(panelUsers.email, email.trim().toLowerCase()));
    if (!user || user.password !== password) {
      return NextResponse.json({ ok: false, error: "Credenciales incorrectas" }, { status: 401 });
    }
    const token = createSessionToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    const res = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
