import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Layanan Jasa Kreatif | Foto Video, Photobooth, Virtual Tour, Drone & AI",
  "6 unit layanan JCP Yogyakarta: North Production (foto video), North Creative (branding & social media), North Photobooth, North Virtual Tour 360°, Indonesia Drone Training Centre, dan AI Kreasi Cerdas.",
  "/layanan"
);

const services = [
  ["01", "North Production", "Foto, video, dan cerita visual untuk brand, bisnis, dan event.", "Photo & video production", "orange", "north-production", "/services/north-production-logo.jpg"],
  ["02", "North Creative", "Identitas dan konten sosial yang membuat brand hadir dengan arah.", "Branding & social media", "paper", "north-creative", "/services/north-creative-logo.jpg"],
  ["03", "North Photobooth", "Pengalaman event yang langsung bisa dibagikan dan diingat.", "Event experience", "ink", "north-booth", "/services/north-booth-logo.jpg"],
  ["04", "North Virtual Tour 360", "Ruang yang bisa dikunjungi sebelum orang datang ke sana.", "Immersive spaces", "sage", "virtual-tour-360", "/services/virtual-tour-360-logo.jpg"],
  ["05", "Indonesia Drone Training Centre", "Keterampilan terbang, kamera, dan keselamatan untuk langkah berikutnya.", "Training & safety", "sun", "drone-training", "/services/drone-training-logo.jpg"],
  ["06", "AI Kreasi Cerdas", "Solusi berbasis AI tools yang dirancang dinamis sesuai kebutuhan pelanggan.", "AI creative solutions", "paper", "ai-kreasi-cerdas", "/services/ai-kreasi-cerdas-logo.jpg"],
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <SiteNav active="layanan" />

      <section className="services-hero shell">
        <p className="section-label">(What we do)</p>
        <h1>One team.<br /><em>Many ways</em><br />to move.</h1>
        <div><p>Kami menyatukan strategi, produksi, dan teknologi agar setiap kebutuhan kreatif terasa lebih sederhana.</p><span>Scroll to explore <b>↓</b></span></div>
      </section>

      <section className="service-showcase">
        <div className="shell">
          {services.map(([number, title, description, label, tone, slug, logo]) => (
            <article className={`service-showcase-item ${tone}`} key={number}>
              <div className="service-index"><span>{number}</span><p>{label}</p></div>
              <div className="service-description"><h2>{title}</h2><p>{description}</p><a href={`/layanan/${slug}`}>Lihat detail</a></div>
              <div className="service-graphic"><img className="service-logo" src={logo} alt={`Logo ${title}`} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-close shell">
        <p className="section-label">Not sure where to start?</p>
        <h2>We&apos;ll figure it<br />out <em>together.</em></h2>
        <a href="/hubungi">Start with a conversation <span>↗</span></a>
      </section>
    </main>
  );
}
