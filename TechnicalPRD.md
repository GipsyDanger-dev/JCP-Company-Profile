# PT. Jogja Creative Production — Technical PRD (AI Agent)

> Dokumen hidup: menggambarkan **keadaan aktual** project (per Agustus 2026), bukan template generik.
> Bagian yang berlabel "Planned" adalah rencana yang **belum** diimplementasikan.

## Ringkasan Project

Company profile site untuk PT. Jogja Creative Production (JCP) — agency kreatif asal Yogyakarta.
Konten dominan statis (SSR/SSG dari source code); satu-satunya bagian dinamis adalah formulir
inquiry yang disimpan ke Supabase. Tidak ada admin dashboard, blog, career, auth, atau dashboard.

## Technology Stack (Aktual)

| Category | Technology | Catatan |
|---|---|---|
| Framework | Next.js 15.5.2 (App Router) | SSR + RSC; `outputFileTracingRoot` di next.config.ts |
| UI | React 19.1.1 | — |
| Language | TypeScript 5.9.2 | strict |
| Styling | **Custom CSS** (globals.css + contact.css) | CSS variables, **bukan** Tailwind |
| Fonts | `next/font/google`: Bebas Neue (display), Manrope (body), DM Mono (mono) | self-hosted, `--font-*` CSS variables |
| Animation | Framer Motion 12 (page transitions, scroll nav) + Three.js 0.185 (hero WebGL) | Three.js di-lazy-load via `next/dynamic` (hero-lines.tsx) |
| Icons | Karakter teks (mis. `↗︎` = U+2197 + U+FE0E) | tanpa icon library; VS15 mencegah emoji di Android |
| Forms | Komponen custom (contact-inquiry-form.tsx) | validasi server-side di API route; tanpa React Hook Form/Zod |
| Backend | Next.js API Route `/api/inquiries` | fetch langsung ke Supabase PostgREST + Resend |
| Database | PostgreSQL via Supabase (serverless) | akses via REST API; **tanpa** client lib maupun ORM |
| Email | Resend (API, opsional) | diaktifkan hanya jika env terisi |
| Image | `next/image` (WebP/AVIF, lazy, sizes) | sharp sebagai dev tool untuk script optimasi |
| Deployment | GitHub Actions → VPS (SSH) | bukan Vercel/Cloudflare |
| Package Manager | pnpm | — |

### Yang TIDAK digunakan (pernah ada di PRD lama — dihapus karena tidak sesuai)

Tailwind, shadcn/ui, Lucide, React Hook Form, Zod, Zustand, TanStack Query, GSAP,
Drizzle ORM, Supabase JS client, Supabase Auth, Supabase Storage, Sentry, Vercel, Cloudflare.

## Architecture

```text
Browser
   │
Next.js 15 (App Router) ── SSR/SSG: 5 halaman statis
   │
   ├── /api/inquiries (POST)
   │        ├── Supabase PostgREST  → table public.inquiries (RLS, server-only write)
   │        └── Resend API (opsional) → notifikasi email inquiry
   │
   └── Statis: layout, nav, footer, konten dari source
```

Tidak ada lapisan application/domain/infrastructure terpisah; struktur mengikuti
konvensi App Router (app/, components/, lib/).

## Content Management

- **Konten statis** (profil, layanan, portfolio, FAQ) dikelola langsung di source code
  (data array dalam file halaman). Perubahan = edit code + deploy.
- **Inquiry** tersimpan di tabel `public.inquiries` (Supabase). Tidak ada admin dashboard.
- Skema database: `supabase/inquiries.sql` (satu tabel; RLS aktif tanpa insert policy —
  hanya API route server yang bisa menulis via `SUPABASE_SERVICE_ROLE_KEY`).

## Project Structure (Aktual)

```text
src/
├── app/
│   ├── api/inquiries/route.ts     # satu-satunya API route
│   ├── globals.css                # seluruh styling global (CSS murni)
│   ├── layout.tsx                 # root layout: fonts, metadata, nav, footer
│   ├── page.tsx                   # home (hero, manifesto, showcase, selected work, CTA)
│   ├── tentang/page.tsx           # about
│   ├── layanan/page.tsx           # daftar layanan
│   ├── layanan/[slug]/page.tsx    # 6 halaman detail layanan (gallery, JSON-LD)
│   ├── portfolio/page.tsx         # 34 proyek (kartu + galeri)
│   ├── portfolio/layout.tsx       # metadata portfolio
│   ├── hubungi/page.tsx           # kontak + form inquiry (contact.css)
│   ├── robots.ts
│   └── sitemap.ts                 # 11 URL
├── components/
│   ├── site-nav.tsx               # navbar fixed + hide-on-scroll (framer-motion)
│   ├── footer.tsx / pre-footer.tsx
│   ├── hero-lines.tsx             # client wrapper: lazy-load Three.js hero
│   ├── floating-lines.tsx         # kanvas WebGL garis gelombang
│   ├── page-motion.tsx            # transisi halaman (AnimatePresence)
│   ├── glare-hover.tsx / magnet.tsx
│   └── contact-inquiry-form.tsx
└── lib/seo.ts                     # helper metadata/JSON-LD

scripts/           # tooling dev (bukan runtime)
├── create-icon.mjs / optimize-icon.mjs   # favicon 32px (653B) + apple-touch 180px (7KB)
├── optimize-ai.mjs / optimize-booth-gallery.mjs / measure-images.mjs  # optimasi gambar
└── parse-lighthouse.mjs                  # parser hasil audit Lighthouse

supabase/inquiries.sql
public/            # favicon, logo (svg/png), og-image.jpg, portfolio/, services/
```

## Design System (Aktual)

### Color Tokens (CSS variables di globals.css)

| Token | Nilai | Penggunaan |
|---|---|---|
| `--paper` | `#f4f0e9` | latar terang, teks pada hero gelap |
| `--ink` | `#181714` | teks utama pada latar terang |
| `--orange` | `#ff5a1f` | aksen utama (CTA hover, highlight) |
| `--line` | `#d6d0c7` | border/dividers |
| `--muted` | `#777168` | teks sekunder |

Palet tambahan: hero gelap `#271817`, aksen garis WebGL `#8f3f24 / #ff6826 / #ffbd34`.

### Typography

- **Display:** Bebas Neue (judul hero besar, `clamp()` responsive)
- **Body:** Manrope
- **Mono/Caption:** DM Mono (label, meta)

### Motion

- **Framer Motion** — transisi antar halaman, perilaku scroll navbar (hide/show), hover states
- **Three.js (WebGL)** — hero "floating lines" interaktif + parallax; **lazy-loaded**
  (chunk terpisah, `ssr:false`) sehingga tidak memblokir LCP
- Utilitas: `glare-hover` (efek glare CSS), `magnet` (tarikan pointer)

## SEO (Aktual)

- `metadataBase` + metadata per halaman via `generateMetadata` (lib/seo.ts)
- `sitemap.ts` (11 URL) + `robots.ts`
- JSON-LD: Organization, WebSite (home); Service + BreadcrumbList (6 halaman layanan)
- Open Graph + Twitter Card, `og-image.jpg` 1200×630
- Font self-hosted (`next/font`) — tanpa render-blocking eksternal

## Performance (Kondisi Terukur)

| Metrik | Mobile (Lighthouse) |
|---|---|
| Skor performa | 79/100 |
| LCP | 2.6s (target ≤ 2.5s) |
| TBT | 690ms |
| Bobot halaman | 415 KB |

Praktik: semua gambar via `next/image` (WebP/AVIF + lazy), hero Three.js di luar bundle awal
(main page chunk ±9.4KB), favicon 653B. Pengukuran: `scripts/parse-lighthouse.mjs`.

## Analytics

**Belum terpasang.** Rencana (kandidat, semua punya free tier): Google Analytics 4,
Microsoft Clarity, Meta Pixel. Menunggu keputusan klien; integrasi dicatat sebagai TODO
di root layout (`<head>`) + custom conversion events untuk inquiry.

## Page Specifications (Aktual)

### Home (`/`)
- Hero: WebGL floating lines + headline besar "Jogja Creative Production." + CTA "Jelajahi layanan"
- Manifesto "Who we are" (logo JCP + teks)
- Showcase layanan (termasuk "AI Kreasi Cerdas")
- Selected work (3 kartu proyek)
- CTA akhir + pre-footer banner "Make the next move matter."

### Tentang (`/tentang`)
- Profil perusahaan, nilai, dsb. (konten statis)

### Layanan (`/layanan` + `/layanan/[slug]`)
- Listing layanan + **6 halaman detail** (gallery foto, workflow, benefit, CTA, JSON-LD)

### Portfolio (`/portfolio`)
- Grid 34 proyek (kartu + galeri), nested layout untuk metadata

### Hubungi (`/hubungi`)
- Informasi kontak (WhatsApp, Instagram, email, alamat)
- Form inquiry → POST `/api/inquiries` → Supabase + email Resend

## Inquiry Flow

```text
Form (hubungi) → POST /api/inquiries
  → validasi: field lengkap, format email, pesan ≥ 10 karakter
  → simpan ke Supabase PostgREST (service role key, RLS server-only)
  → [opsional] kirim notifikasi via Resend jika env RESEND_* terisi
  → response { ok: true } / error ber-Bahasa Indonesia
```

## Environment Variables

| Env | Wajib | Fungsi |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Ya (untuk inquiry) | tulis ke tabel inquiries |
| `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` | Opsional | notifikasi email inquiry |
| `DEPLOY_KEY`, `DEPLOY_HOST` | Ya (CI/CD) | secret GitHub Actions untuk deploy VPS |

## Deployment (Aktual)

- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) — trigger push ke `main`
- **Cara kerja:** cek secret → SSH `root@DEPLOY_HOST` → jalankan script server
  `/usr/local/sbin/deploy-jcp-web` (build & restart di VPS)
- **Domain:** jogjacreativepro.com
- Commit kecil per batch (maks. 3 file) sesuai AGENTS.md; deploy otomatis per push.

## Roadmap / Planned (belum diimplementasikan)

- [ ] Analytics (GA4 / Clarity / Meta Pixel) — menunggu keputusan klien
- [ ] Supabase Storage untuk portfolio dinamis (jika konten mulai sering berubah)
- [ ] LCP mobile turun ke ≤ 2.5s (item tersisa: optimasi CSS render-blocking, evaluasi chunk)
