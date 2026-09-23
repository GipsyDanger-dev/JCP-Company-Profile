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
    items: [{ label: "Tentang", href: "/tentang" }, { label: "Layanan", href: "/layanan", dropdown: true }, { label: "Portofolio", href: "/portfolio" }],
    cta: "Let's talk",
  },
  home: {
    eyebrow: "PT. Jogja Creative Production", heroTitle: "Jogja Creative\nProduction.",
    heroIntro: "Digital creative company dari Yogyakarta untuk visual production, branding, konten digital, dan pengalaman event yang punya arah serta dampak.",
    heroCta: "Jelajahi layanan", manifestoTitle: "Creative work,\nmade useful.",
    manifestoCopy: "JCP adalah partner kreatif untuk bisnis dan event yang ingin tampil lebih jelas, lebih berani, dan lebih mudah diingat.",
    manifestoLabel: "(01) Who we are", snapshotLabel: "(About the company)", snapshotTitle: "One stop creative\nsolution for real work.",
    snapshotParagraph1: "PT Jogja Creative Production adalah perusahaan digital kreatif di Yogyakarta. Kami membantu bisnis, institusi, dan penyelenggara event yang membutuhkan visual profesional, tetapi terkendala waktu, sumber daya, atau konsistensi kualitas produksi.",
    snapshotParagraph2: "Solusi kami terintegrasi: desain, branding, manajemen media sosial, dokumentasi foto-video, photobooth, virtual tour 360°, pelatihan drone, hingga solusi berbasis AI. Klien dapat fokus pada tujuan utamanya; kami mengelola proses kreatif dari perencanaan sampai hasil akhir.",
    stat1Number: "06", stat1Text: "Unit layanan terintegrasi", stat2Number: "2022", stat2Text: "Tahun JCP mulai berkarya", stat3Number: "DIY", stat3Text: "Berbasis di Yogyakarta, melayani lintas kota",
    servicesLabel: "(02) Our playground", servicesIntro: "Six ways we can move your story forward.", workLabel: "(03) Selected work", workLink: "See more projects", workTitle: "Made with\nintention.", workIntro: "Dari pelatihan yang lebih aman sampai event yang lebih hidup, setiap proyek dimulai dengan tujuan yang jelas.", contactLabel: "(04) Start something", contactTitle: "Got a good\nidea?", contactCta: "Tell us everything",
    services: [["01", "North Production", "Foto, video, dan visual story yang membuat brand terasa hidup."], ["02", "North Creative", "Identitas dan konten yang memberi brand Anda tempat untuk tumbuh."], ["03", "North Photobooth", "Momen event yang dibuat seru, mudah dibagikan, dan sulit dilupakan."], ["04", "Virtual Tour 360", "Pengalaman ruang yang bisa dijelajahi dari mana saja."], ["05", "Drone Training", "Pelatihan terarah untuk terbang lebih aman dan lebih percaya diri."], ["06", "AI Kreasi Cerdas", "Solusi AI tools yang dirancang dinamis sesuai kebutuhan."]],
  },
  contact: { title: "Make your next\nmove count.", intro: "Ceritakan apa yang sedang ingin Anda buat. Kami akan bantu menemukan titik mulai yang tepat.", email: "jogjacreativeproduction@gmail.com", whatsapp: "+62 856-0060-4388", whatsappUrl: "https://wa.me/6285600604388", address: "Perum Griya Mlati Indah No. B4, Mulungan Kulon, Sendangadi, Mlati, Sleman, DIY 55285" },
  about: { heroLabel: "(About JCP)", heroTitle: "Ideas become\nimpact here.", heroIntro: "Kami adalah tim kreatif dari Yogyakarta yang membantu bisnis dan event berubah dari sekadar terlihat menjadi lebih terasa.", storyLabel: "(Our story)", storyTitle: "More than a\nproduction team.", storyCopy: "Jogja Creative Production lahir dari kebutuhan bisnis dan event akan konten visual yang profesional, tetapi sering terbentur waktu, sumber daya, dan kualitas produksi.", storyCopy2: "Kami hadir untuk menyederhanakan proses itu—menghubungkan strategi, kreativitas, dan eksekusi agar klien dapat fokus pada tujuan yang lebih besar.", profileLabel: "(Our business units)", profileTitle: "Creative, digital,\nintegrated.", profileCopy1: "Penjelasan produk ini kami susun untuk memberikan gambaran singkat tentang layanan digital kreatif yang kami tawarkan.", profileCopy2: "Setiap produk dirancang dengan mengutamakan inovasi, profesionalisme, dan kualitas.", directionLabel: "(Our direction)", vision: "Menjadi Digital Creative Best Solution yang terpercaya, inovatif, dan berdampak, dengan layanan kreatif dan teknologi digital yang memberi nilai terbaik bagi setiap klien.", valuesLabel: "(What guides us)", valuesTitle: "How we\nshow up.", valuesIntro: "Tiga prinsip yang membentuk cara kami bekerja — dari ide awal sampai eksekusi akhir yang siap dilihat klien.", teamLabel: "(The people)", teamTitle: "Small team.\nBig energy.", assuranceLabel: "(How we deliver)", assuranceTitle: "Clear process.\nReliable output.", assuranceCopy1: "Setiap proyek dimulai dari pemahaman kebutuhan, tujuan komunikasi, dan konteks audiens.", assuranceCopy2: "JCP bekerja untuk kebutuhan UMKM, brand, institusi, hotel, dan event korporat.", units: [{ name: "North Production", description: "Layanan Foto & Video kami menghadirkan hasil visual berkualitas tinggi dengan sentuhan kreativitas profesional.", tags: "Event · Produk · Corporate · Personal brand · Digital content" }, { name: "North Photobooth", description: "Photobooth & Videobooth untuk berbagai event, menghasilkan dokumentasi berkualitas dengan proses cepat dan praktis.", tags: "Custom booth · Instant sharing · Operator · Event activation" }], mission: ["Menghadirkan layanan kreatif dan produksi visual dengan standar profesional.", "Membangun komunikasi visual yang efektif dan relevan.", "Memberikan solusi terintegrasi untuk bisnis dan event."], values: [{ number: "01", title: "Creative Thinking", description: "Setiap ide dikembangkan melalui proses berpikir kreatif, analisis visual, dan eksplorasi konsep." }, { number: "02", title: "Visual Strategy", description: "Strategi visual dengan arah komunikasi yang jelas untuk memperkuat identitas brand." }, { number: "03", title: "Professional Execution", description: "Produksi dengan detail, presisi, dan standar profesional." }], teams: [{ group: "Leadership", names: "Franko Nero", role: "CEO" }, { group: "Marketing", names: "Prayoga R. · Ghevira Zahira · Bernicka Dea · Robica Tatah", role: "Head of Marketing & Marketing" }], legal: [{ label: "Legal entity", text: "PT Jogja Creative Production" }, { label: "Administration", text: "Akta pendirian, Kemenkumham, dan NPWP tersedia sebagai dokumen perusahaan." }, { label: "Base", text: "Yogyakarta, Indonesia" }] },
  services: { heroLabel: "(What we do)", heroTitle: "One team.\nMany ways\nto move.", heroIntro: "Kami menyatukan strategi, produksi, dan teknologi agar setiap kebutuhan kreatif terasa lebih sederhana.", items: [{ number: "01", name: "North Production", description: "Foto, video, dan cerita visual untuk brand, bisnis, dan event.", label: "Photo & video production", slug: "north-production" }, { number: "02", name: "North Creative", description: "Identitas dan konten sosial yang membuat brand hadir dengan arah.", label: "Branding & social media", slug: "north-creative" }, { number: "03", name: "North Photobooth", description: "Pengalaman event yang langsung bisa dibagikan dan diingat.", label: "Event experience", slug: "north-booth" }, { number: "04", name: "North Virtual Tour 360", description: "Ruang yang bisa dikunjungi sebelum orang datang ke sana.", label: "Immersive spaces", slug: "virtual-tour-360" }, { number: "05", name: "Indonesia Drone Training Centre", description: "Keterampilan terbang, kamera, dan keselamatan untuk langkah berikutnya.", label: "Training & safety", slug: "drone-training" }, { number: "06", name: "AI Kreasi Cerdas", description: "Solusi berbasis AI tools yang dirancang dinamis sesuai kebutuhan pelanggan.", label: "AI creative solutions", slug: "ai-kreasi-cerdas" }] },
  "service-details": { "north-creative": { intro: "North Creative merupakan layanan desain dan branding yang membantu bisnis membangun identitas visual yang kuat dan konsisten.", audience: "Bisnis yang ingin membangun identitas visual yang kuat, konsisten, dan relevan di setiap platform komunikasi.", offers: ["Perancangan logo dan brand identity", "Desain materi grafis dan konten visual", "Perencanaan konten dan copywriting", "Social media management"], points: ["Desain dibuat untuk memperjelas pesan brand", "Riset, kreativitas, dan pendekatan strategis", "Visual yang memperkuat positioning di mata audiens"], faq: "Bringing ideas & innovation to life through technology.", instagram: "https://www.instagram.com/north.ive", ig: "@north.ive" } },
  portfolio: { heroLabel: "(Selected projects)", heroTitle: "Work that\nmoves.", heroIntro: "Berbagai cerita, medium, dan tantangan. Satu standar: karya yang terasa tepat untuk orang yang melihatnya." },
  footer: { company: "PT Jogja Creative Production", location: "Yogyakarta, Indonesia", instagram: "https://www.instagram.com/jogjacreativeproduction/" },
} as const;
