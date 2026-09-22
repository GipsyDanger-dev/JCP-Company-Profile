"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { cmsFallbacks } from "@/lib/cms";

type Data = Record<string, string>;
type Item = { key: string; value: Data };
const pages = [
  ["home", "Beranda", "Hero, pengenalan, dan layanan pilihan"],
  ["about", "Tentang", "Profil dan cerita perusahaan"],
  ["services", "Layanan", "Judul dan pengantar layanan"],
  ["portfolio", "Portofolio", "Judul dan pengantar karya"],
  ["contact", "Let's talk", "Kontak dan formulir inquiry"],
] as const;
const fieldNames: Record<string, Record<string, string>> = {
  home: { eyebrow: "Nama perusahaan", heroTitle: "Judul utama", heroIntro: "Keterangan hero", heroCta: "Teks tombol", manifestoTitle: "Judul pengenalan", manifestoCopy: "Keterangan pengenalan" },
  about: { heroLabel: "Label hero", heroTitle: "Judul utama", heroIntro: "Keterangan hero", storyTitle: "Judul cerita", storyCopy: "Isi cerita" },
  services: { heroLabel: "Label hero", heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
  portfolio: { heroLabel: "Label hero", heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
  contact: { title: "Judul utama", intro: "Keterangan", email: "Email", whatsapp: "Nomor WhatsApp", whatsappUrl: "Link WhatsApp", address: "Alamat studio" },
};

export function AdminConsole() {
  const [items, setItems] = useState<Item[]>(Object.entries(cmsFallbacks).map(([key, value]) => ({ key, value: value as unknown as Data })));
  const [selected, setSelected] = useState("home"); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  const current = items.find((item) => item.key === selected)?.value ?? {};
  useEffect(() => { fetch("/api/admin/content").then((r) => r.ok ? r.json() : []).then((saved: Item[]) => setItems((old) => old.map((item) => saved.find((x) => x.key === item.key) ?? item))).catch(() => setMessage("Database CMS belum siap.")); }, []);
  function setField(field: string, value: string) { setItems((old) => old.map((item) => item.key === selected ? { ...item, value: { ...item.value, [field]: value } } : item)); }
  async function save() { setBusy(true); setMessage(""); const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: selected, value: current }) }); const result = await response.json(); setBusy(false); setMessage(response.ok ? "Tersimpan. Perubahan langsung diterapkan di halaman publik." : result.error ?? "Gagal menyimpan."); }
  async function upload(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; setBusy(true); const form = new FormData(); form.set("file", file); const response = await fetch("/api/admin/media", { method: "POST", body: form }); const result = await response.json(); setBusy(false); setMessage(response.ok ? `Foto berhasil diunggah. URL: ${result.url}` : result.error ?? "Unggah gagal."); event.target.value = ""; }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); location.href = "/admin/login"; }
  return <main className="admin-shell"><aside><a className="admin-brand" href="/">JCP<span>ADMINISTRATOR</span></a><p>Pilih halaman yang ingin dikelola. Perubahan tidak memengaruhi halaman lain.</p><nav>{pages.map(([key, label]) => <button key={key} className={selected === key ? "active" : ""} onClick={() => { setSelected(key); setMessage(""); }}>{label}</button>)}</nav><label className="upload">Unggah foto / video<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4" onChange={upload} /></label><button className="logout" onClick={logout}>Keluar</button></aside><section className="admin-editor"><header><div><p>KELOLA HALAMAN</p><h1>{pages.find(([key]) => key === selected)?.[1]}</h1><span>{pages.find(([key]) => key === selected)?.[2]}</span></div><a href={selected === "home" ? "/" : `/${selected === "about" ? "tentang" : selected === "contact" ? "hubungi" : selected}`} target="_blank">Lihat halaman ↗</a></header><div className="admin-help"><strong>Isi konten</strong><span>Gunakan Enter pada judul untuk membuat baris baru. Simpan setelah selesai mengubah.</span></div><div className="admin-fields">{Object.entries(fieldNames[selected]).map(([field, label]) => <label key={field}>{label}{field.includes("Intro") || field.includes("Copy") || field === "address" || field === "intro" ? <textarea value={current[field] ?? ""} onChange={(e) => setField(field, e.target.value)} /> : <input value={current[field] ?? ""} onChange={(e) => setField(field, e.target.value)} />}</label>)}</div><div className="admin-actions"><button onClick={save} disabled={busy}>{busy ? "Menyimpan…" : "Simpan perubahan"}</button>{message && <p>{message}</p>}</div></section></main>;
}
