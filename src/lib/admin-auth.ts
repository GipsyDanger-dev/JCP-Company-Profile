import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "jcp_admin_session";
const secret = () => process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "change-this-before-production";
const sign = () => crypto.createHmac("sha256", secret()).update("jcp-admin-v1").digest("base64url");

export async function isAdmin() { return (await cookies()).get(COOKIE)?.value === sign(); }
export async function setAdminSession() { (await cookies()).set(COOKIE, sign(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 }); }
export async function clearAdminSession() { (await cookies()).delete(COOKIE); }
export function passwordIsValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const received = Buffer.from(password);
  const saved = Buffer.from(expected);
  return received.length === saved.length && crypto.timingSafeEqual(received, saved);
}
