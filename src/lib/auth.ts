import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "aula_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 días

function getSecret() {
  return process.env.AUTH_SECRET || "aula-quimica-secret-key-2026";
}

export function createSessionToken(user: { id: number; name: string; email: string; role: string }) {
  const payload = { ...user, exp: Math.floor(Date.now() / 1000) + SESSION_TTL };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
