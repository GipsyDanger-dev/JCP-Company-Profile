import { unstable_noStore as noStore } from "next/cache";

export type CmsRecord<T = unknown> = { key: string; value: T; updated_at?: string };

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function ready() {
  return Boolean(url && key && !url.includes("your-project") && !key.includes("replace-with"));
}

function headers(extra: Record<string, string> = {}) {
  return { apikey: key!, Authorization: `Bearer ${key!}`, "Content-Type": "application/json", ...extra };
}

/** Public pages always read the latest saved CMS value. The fallback keeps the
 * existing site working before the one-time SQL migration is applied. */
export async function getCms<T>(contentKey: string, fallback: T): Promise<T> {
  noStore();
  if (!ready()) return fallback;
  try {
    const response = await fetch(`${url}/rest/v1/cms_content?key=eq.${encodeURIComponent(contentKey)}&select=value&limit=1`, { headers: headers(), cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) return fallback;
    const rows = await response.json() as Array<{ value: T }>;
    return rows[0]?.value ?? fallback;
  } catch { return fallback; }
}

export async function listCms(): Promise<CmsRecord[]> {
  if (!ready()) return [];
  const response = await fetch(`${url}/rest/v1/cms_content?select=key,value,updated_at&order=key.asc`, { headers: headers(), cache: "no-store" });
  if (!response.ok) throw new Error("CMS tidak dapat dibaca.");
  return response.json();
}

export async function saveCms(contentKey: string, value: unknown) {
  if (!ready()) throw new Error("Supabase belum dikonfigurasi.");
  const response = await fetch(`${url}/rest/v1/cms_content?on_conflict=key`, {
    method: "POST", headers: headers({ Prefer: "resolution=merge-duplicates,return=representation" }),
    body: JSON.stringify({ key: contentKey, value, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error("CMS gagal disimpan.");
  return response.json();
}

export async function removeCms(contentKey: string) {
  if (!ready()) throw new Error("Supabase belum dikonfigurasi.");
  const response = await fetch(`${url}/rest/v1/cms_content?key=eq.${encodeURIComponent(contentKey)}`, { method: "DELETE", headers: headers() });
  if (!response.ok) throw new Error("Konten gagal dihapus.");
}

export async function uploadMedia(file: File) {
  if (!ready()) throw new Error("Supabase belum dikonfigurasi.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  const response = await fetch(`${url}/storage/v1/object/jcp-media/${path}`, {
    method: "POST", headers: { apikey: key!, Authorization: `Bearer ${key!}`, "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }, body: file,
  });
  if (!response.ok) throw new Error("Unggah media gagal. Pastikan bucket jcp-media sudah dibuat.");
  return `${url}/storage/v1/object/public/jcp-media/${path}`;
}

export const cmsFallbacks = {
  navigation: {
    announcement: "Punya project yang ingin diwujudkan? Mari mulai percakapannya",
    links: [{ label: "Tentang", href: "/tentang" }, { label: "Layanan", href: "/layanan" }, { label: "Portofolio", href: "/portfolio" }],
    cta: "Let's talk",
  },
  home: {
    eyebrow: "PT. Jogja Creative Production", heroTitle: "Jogja Creative\nProduction.",
    heroIntro: "Digital creative company dari Yogyakarta untuk visual production, branding, konten digital, dan pengalaman event yang punya arah serta dampak.",
    heroCta: "Jelajahi layanan", manifestoTitle: "Creative work,\nmade useful.",
    manifestoCopy: "JCP adalah partner kreatif untuk bisnis dan event yang ingin tampil lebih jelas, lebih berani, dan lebih mudah diingat.",
    services: [["01", "North Production", "Foto, video, dan visual story yang membuat brand terasa hidup."], ["02", "North Creative", "Identitas dan konten yang memberi brand Anda tempat untuk tumbuh."], ["03", "North Photobooth", "Momen event yang dibuat seru, mudah dibagikan, dan sulit dilupakan."], ["04", "Virtual Tour 360", "Pengalaman ruang yang bisa dijelajahi dari mana saja."], ["05", "Drone Training", "Pelatihan terarah untuk terbang lebih aman dan lebih percaya diri."], ["06", "AI Kreasi Cerdas", "Solusi AI tools yang dirancang dinamis sesuai kebutuhan."]],
  },
  contact: { title: "Make your next\nmove count.", intro: "Ceritakan apa yang sedang ingin Anda buat. Kami akan bantu menemukan titik mulai yang tepat.", email: "jogjacreativeproduction@gmail.com", whatsapp: "+62 856-0060-4388", whatsappUrl: "https://wa.me/6285600604388", address: "Perum Griya Mlati Indah No. B4, Mulungan Kulon, Sendangadi, Mlati, Sleman, DIY 55285" },
  about: { heroLabel: "(About JCP)", heroTitle: "Ideas become\nimpact here.", heroIntro: "Kami adalah tim kreatif dari Yogyakarta yang membantu bisnis dan event berubah dari sekadar terlihat menjadi lebih terasa.", storyTitle: "More than a\nproduction team.", storyCopy: "Jogja Creative Production lahir dari kebutuhan bisnis dan event akan konten visual yang profesional, tetapi sering terbentur waktu, sumber daya, dan kualitas produksi." },
  services: { heroLabel: "(What we do)", heroTitle: "One team.\nMany ways\nto move.", heroIntro: "Kami menyatukan strategi, produksi, dan teknologi agar setiap kebutuhan kreatif terasa lebih sederhana." },
  portfolio: { heroLabel: "(Selected projects)", heroTitle: "Work that\nmoves.", heroIntro: "Berbagai cerita, medium, dan tantangan. Satu standar: karya yang terasa tepat untuk orang yang melihatnya." },
  footer: { company: "PT Jogja Creative Production", location: "Yogyakarta, Indonesia", instagram: "https://www.instagram.com/jogjacreativeproduction/" },
} as const;
