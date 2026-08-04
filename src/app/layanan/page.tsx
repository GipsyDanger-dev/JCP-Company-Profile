import Image from "next/image";

const services = [
  ["01", "North Production", "Foto, video, dan cerita visual untuk brand, bisnis, dan event.", "Photo & video production", "orange", "north-production"],
  ["02", "North Creative", "Identitas dan konten sosial yang membuat brand hadir dengan arah.", "Branding & social media", "paper", "north-creative"],
  ["03", "North Photo & Video Booth", "Pengalaman event yang langsung bisa dibagikan dan diingat.", "Event experience", "ink", "north-booth"],
  ["04", "North Virtual Tour 360", "Ruang yang bisa dikunjungi sebelum orang datang ke sana.", "Immersive spaces", "sage", "virtual-tour-360"],
  ["05", "Indonesia Drone Training Centre", "Keterampilan terbang, kamera, dan keselamatan untuk langkah berikutnya.", "Training & safety", "sun", "drone-training"],
];

export default function ServicesPage() {
  return (
    <main className="services-page">
      <nav className="nav shell">
        <a className="wordmark" href="/"><Image src="/jcp-logo.jpg" alt="JCP - Jogja Creative Production" width={120} height={76} priority /></a>
        <div className="nav-links"><a href="/">Beranda</a><a className="active" href="/layanan">Layanan</a><a href="/portfolio">Portofolio</a></div>
        <a className="nav-cta" href="/hubungi">Let&apos;s talk <i>↗</i></a>
      </nav>

      <section className="services-hero shell">
        <p className="section-label">(What we do)</p>
        <h1>One team.<br /><em>Many ways</em><br />to move.</h1>
        <div><p>Kami menyatukan strategi, produksi, dan teknologi agar setiap kebutuhan kreatif terasa lebih sederhana.</p><span>Scroll to explore <b>↓</b></span></div>
      </section>

      <section className="service-showcase">
        <div className="shell">
          {services.map(([number, title, description, label, tone, slug]) => (
            <article className={`service-showcase-item ${tone}`} key={number}>
              <div className="service-index"><span>{number}</span><p>{label}</p></div>
              <div className="service-graphic"><i /><i /><b>JCP</b></div>
              <div className="service-description"><h2>{title}</h2><p>{description}</p><a href={`/layanan/${slug}`}>Lihat detail <span>↗</span></a></div>
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
