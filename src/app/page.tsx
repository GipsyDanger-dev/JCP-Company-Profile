import { SiteNav } from "@/components/site-nav";
import { FloatingLines } from "@/components/floating-lines";
import { Magnet } from "@/components/magnet";
import { GlareHover } from "@/components/glare-hover";

const services = [
  ["01", "North Production", "Foto, video, dan visual story yang membuat brand terasa hidup."],
  ["02", "North Creative", "Identitas dan konten yang memberi brand Anda tempat untuk tumbuh."],
  ["03", "North Photobooth", "Momen event yang dibuat seru, mudah dibagikan, dan sulit dilupakan."],
  ["04", "Virtual Tour 360", "Pengalaman ruang yang bisa dijelajahi dari mana saja."],
  ["05", "Drone Training", "Pelatihan terarah untuk terbang lebih aman dan lebih percaya diri."],
  ["06", "AI Kreasi Cerdas", "Solusi AI tools yang dirancang dinamis sesuai kebutuhan."],
];

const projects = [
  { number: "01", category: "Drone Training", title: "Badan Otorita Borobudur", tone: "sun", image: "/portfolio/sleman-jaring-pengaman-sosial.jpg" },
  { number: "02", category: "North Photobooth", title: "360 Booth Activation", tone: "ink", image: "/services/north-booth-gallery/north-booth-1.jpg" },
  { number: "03", category: "Drone Training", title: "BPBD Kabupaten Gunungkidul", tone: "clay", image: "/portfolio/gunungkidul-drone-training.jpg" },
];

export default function Home() {
  return (
    <main className="landing-page">
      <SiteNav />

      <section className="hero hero-lines-hero hero-wide" id="home">
        <FloatingLines linesGradient={["#8f3f24", "#ff6826", "#ffbd34"]} lineCount={[7, 11, 15]} lineDistance={[0.18, 0.12, 0.085]} animationSpeed={0.42} parallax parallaxStrength={0.055} />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">PT. Jogja Creative Production</p>
            <h1>Jogja Creative<br /><em>Production.</em></h1>
            <p className="intro">Digital creative company dari Yogyakarta untuk visual production, branding, konten digital, dan pengalaman event yang punya arah serta dampak.</p>
            <a className="primary-cta" href="#services">Jelajahi layanan <b>↓</b></a>
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
          <div className="manifesto-mark"><Magnet><GlareHover glareOpacity={0.28} glareSize={45}><img className="manifesto-mark-logo" src="/jcp-logo-nobg.png" alt="JCP - Jogja Creative Production" /></GlareHover></Magnet></div>
        </div>
      </section>

      <section className="company-snapshot shell">
        <p className="section-label">(About the company)</p>
        <div className="snapshot-copy"><h2>One stop creative<br />solution for <em>real work.</em></h2><div><p>PT Jogja Creative Production adalah perusahaan digital kreatif di Yogyakarta. Kami membantu bisnis, institusi, dan penyelenggara event yang membutuhkan visual profesional, tetapi terkendala waktu, sumber daya, atau konsistensi kualitas produksi.</p><p>Solusi kami terintegrasi: desain, branding, manajemen media sosial, dokumentasi foto-video, photobooth, virtual tour 360°, pelatihan drone, hingga solusi berbasis AI. Klien dapat fokus pada tujuan utamanya; kami mengelola proses kreatif dari perencanaan sampai hasil akhir.</p></div></div>
        <div className="snapshot-grid"><article><span>06</span><p>Unit layanan terintegrasi</p></article><article><span>2022</span><p>Tahun JCP mulai berkarya</p></article><article><span>DIY</span><p>Berbasis di Yogyakarta, melayani lintas kota</p></article></div>
      </section>

      <section className="services shell" id="services">
        <div className="section-topline"><p className="section-label">(02) Our playground</p><p>Six ways we can move your story forward.</p></div>
        <div className="service-list">
          {services.map(([number, title, description]) => (
            <article className="service" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work shell" id="works">
        <div className="section-topline"><p className="section-label">(03) Selected work</p><a href="/portfolio">See more projects ↗</a></div>
        <div className="work-intro">
          <h2>Made with<br /><em>intention.</em></h2>
          <p>Dari pelatihan yang lebih aman sampai event yang lebih hidup, setiap proyek dimulai dengan tujuan yang jelas.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.number}>
              <div className="project-art" style={{ backgroundImage: `url(${project.image})` }} />
              <div className="project-copy"><p>{project.category}</p><h3>{project.title}</h3></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-cta shell" id="contact">
        <p className="section-label">(04) Start something</p>
        <div><h2>Got a good<br /><em>idea?</em></h2><a href="/hubungi">Tell us everything <span>↗</span></a></div>
      </section>
    </main>
  );
}
