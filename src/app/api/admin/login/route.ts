import { NextResponse } from "next/server";
import { passwordIsValid, setAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.password !== "string" || !passwordIsValid(body.password)) return NextResponse.json({ error: "Password admin tidak valid." }, { status: 401 });
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
