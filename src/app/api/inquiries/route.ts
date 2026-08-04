import { NextResponse } from "next/server";

const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || ![body.name, body.email, body.service, body.message].every((value) => typeof value === "string" && value.trim())) return NextResponse.json({ error: "Data inquiry belum lengkap." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
  if (required.some((key) => !process.env[key])) return NextResponse.json({ error: "Layanan inquiry belum dikonfigurasi." }, { status: 503 });
  const inquiry = { name: body.name.trim(), email: body.email.trim(), service: body.service.trim(), message: body.message.trim() };
  const stored = await fetch(`${process.env.SUPABASE_URL}/rest/v1/inquiries`, { method: "POST", headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(inquiry) });
  if (!stored.ok) return NextResponse.json({ error: "Gagal menyimpan inquiry." }, { status: 502 });
  if (process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL && process.env.INQUIRY_TO_EMAIL) {
    const notified = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.INQUIRY_FROM_EMAIL, to: [process.env.INQUIRY_TO_EMAIL], reply_to: inquiry.email, subject: `[JCP Inquiry] ${inquiry.service} - ${inquiry.name}`, text: `Nama: ${inquiry.name}\nEmail: ${inquiry.email}\nLayanan: ${inquiry.service}\n\nPesan:\n${inquiry.message}` }) });
    if (!notified.ok) return NextResponse.json({ error: "Inquiry tersimpan, tetapi notifikasi email gagal." }, { status: 502 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
