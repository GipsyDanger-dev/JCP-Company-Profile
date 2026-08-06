"use client";

import { FormEvent, useState } from "react";

const initialState = { name: "", email: "", service: "", message: "" };

export function ContactInquiryForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Request failed");
      setForm(initialState);
      setStatus("success");
    } catch { setStatus("error"); }
  }

  return <form className="inquiry-form" onSubmit={submit}>
    <p className="section-label">(Project inquiry)</p>
    <label>Nama<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Siapa nama Anda?" /></label>
    <label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="nama@perusahaan.com" /></label>
    <label>Kebutuhan<select required value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })}><option value="" disabled>Pilih layanan yang Anda butuhkan</option><option>North Production</option><option>North Creative</option><option>North Photobooth</option><option>North Virtual Tour 360</option><option>Indonesia Drone Training Centre</option><option>AI Kreasi Cerdas</option></select></label>
    <label>Ceritakan singkat<textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tujuan, timeline, atau hal lain yang perlu kami tahu." rows={4} /></label>
    <button className="form-cta" disabled={status === "sending"}>{status === "sending" ? "Mengirim..." : "Kirim inquiry"}<span>↗</span></button>
    {status === "success" && <p className="form-feedback success">Inquiry terkirim. Tim JCP akan segera menghubungi Anda.</p>}
    {status === "error" && <p className="form-feedback error">Maaf, inquiry belum terkirim. Silakan coba lagi atau hubungi WhatsApp kami.</p>}
  </form>;
}
