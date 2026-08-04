const services = [
  ["01", "North Production", "Foto, video, dan visual story yang membuat brand terasa hidup."],
  ["02", "North Creative", "Identitas dan konten yang memberi brand Anda tempat untuk tumbuh."],
  ["03", "North Booth", "Momen event yang dibuat seru, mudah dibagikan, dan sulit dilupakan."],
  ["04", "Virtual Tour 360", "Pengalaman ruang yang bisa dijelajahi dari mana saja."],
  ["05", "Drone Training", "Pelatihan terarah untuk terbang lebih aman dan lebih percaya diri."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="wordmark" href="#home" aria-label="Jogja Creative Production">
          <Image src="/jcp-logo.jpg" alt="JCP - Jogja Creative Production" width={120} height={76} priority />
        </a>
        <div className="nav-links" aria-label="Navigasi utama">
          <a href="#about">Tentang</a>
          <a href="#services">Layanan</a>
          <a href="#works">Portofolio</a>
        </div>
        <a className="nav-cta" href="mailto:jogjacreativeproduction@gmail.com">Let&apos;s talk <i>↗</i></a>
      </nav>

      <section className="hero shell" id="home">
        <div className="hero-meta"><span className="dot" /> Yogyakarta, Indonesia <span>Est. 2022</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Digital creative best solution</p>
            <h1>Make it<br /><em>matter.</em></h1>
            <p className="intro">Kami mengubah gagasan menjadi pengalaman visual yang punya arah, rasa, dan dampak.</p>
            <a className="primary-cta" href="#services">Jelajahi layanan <b>↓</b></a>
          </div>
          <div className="hero-art" aria-label="Komposisi grafis JCP">
            <span className="stamp">JCP<br /><small>creative<br />production</small></span>
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="art-word">CREATE</span>
            <span className="art-note">visual strategy<br />with a pulse</span>
          </div>
        </div>
        <div className="hero-footer">
          <p>From a single frame<br />to the whole story.</p>
          <p>Scroll to discover <span>↓</span></p>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="shell manifesto-grid">
          <p className="section-label">(01) Who we are</p>
          <div>
            <h2>Creative work,<br /><em>made useful.</em></h2>
            <p className="manifesto-copy">JCP adalah partner kreatif untuk bisnis dan event yang ingin tampil lebih jelas, lebih berani, dan lebih mudah diingat.</p>
          </div>
          <div className="roundel">IDEAS<br />INTO<br /><b>IMPACT</b></div>
        </div>
      </section>

      <section className="services shell" id="services">
        <div className="section-topline"><p className="section-label">(02) Our playground</p><p>Five ways we can move your story forward.</p></div>
        <div className="service-list">
          {services.map(([number, title, description]) => (
            <article className="service" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <b>↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="statement" id="works">
        <div className="shell">
          <p className="section-label">(03) Our point of view</p>
          <h2>Good visual doesn&apos;t<br />just <em>look</em> good.</h2>
          <div className="statement-bottom"><p>It helps people feel something, remember something, and choose something.</p><a href="mailto:jogjacreativeproduction@gmail.com">Mulai proyek Anda <span>↗</span></a></div>
        </div>
      </section>

      <footer className="footer shell">
        <p>© 2026 Jogja Creative Production</p>
        <a href="mailto:jogjacreativeproduction@gmail.com">jogjacreativeproduction@gmail.com</a>
        <a href="https://wa.me/628567874388">WhatsApp ↗</a>
      </footer>
    </main>
  );
}
import Image from "next/image";
