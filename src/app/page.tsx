const services = [
  ["01", "North Production", "Foto, video, dan visual story yang membuat brand terasa hidup."],
  ["02", "North Creative", "Identitas dan konten yang memberi brand Anda tempat untuk tumbuh."],
  ["03", "North Booth", "Momen event yang dibuat seru, mudah dibagikan, dan sulit dilupakan."],
  ["04", "Virtual Tour 360", "Pengalaman ruang yang bisa dijelajahi dari mana saja."],
  ["05", "Drone Training", "Pelatihan terarah untuk terbang lebih aman dan lebih percaya diri."],
];

const projects = [
  { number: "01", category: "Drone Training", title: "Badan Otorita Borobudur", tone: "sun" },
  { number: "02", category: "Visual Production", title: "Annual Meeting PT Tunas Tasik", tone: "ink" },
  { number: "03", category: "Drone Training", title: "BPBD Kabupaten Gunungkidul", tone: "clay" },
];

const process = [
  ["01", "Listen", "Menyamakan tujuan, audiens, dan definisi hasil yang baik."],
  ["02", "Shape", "Menerjemahkan insight menjadi arah kreatif yang terasa tepat."],
  ["03", "Make", "Memproduksi dengan detail, ritme, dan standar profesional."],
  ["04", "Move", "Mengirim karya yang siap dipakai untuk langkah berikutnya."],
];

export default function Home() {
  return (
    <main>
      <SiteNav />

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

      <section className="company-snapshot shell">
        <p className="section-label">(About the company)</p>
        <div className="snapshot-copy"><h2>One stop creative<br />solution for <em>real work.</em></h2><div><p>PT Jogja Creative Production adalah perusahaan digital kreatif di Yogyakarta. Kami membantu bisnis, institusi, dan penyelenggara event yang membutuhkan visual profesional, tetapi terkendala waktu, sumber daya, atau konsistensi kualitas produksi.</p><p>Solusi kami terintegrasi: desain, branding, manajemen media sosial, dokumentasi foto-video, photobooth, virtual tour 360°, hingga pelatihan drone. Klien dapat fokus pada tujuan utamanya; kami mengelola proses kreatif dari perencanaan sampai hasil akhir.</p></div></div>
        <div className="snapshot-grid"><article><span>05</span><p>Unit layanan terintegrasi</p></article><article><span>2022</span><p>Tahun JCP mulai berkarya</p></article><article><span>DIY</span><p>Berbasis di Yogyakarta, melayani lintas kota</p></article></div>
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

      <section className="work shell" id="works">
        <div className="section-topline"><p className="section-label">(03) Selected work</p><a href="/hubungi">See more projects ↗</a></div>
        <div className="work-intro">
          <h2>Made with<br /><em>intention.</em></h2>
          <p>Dari pelatihan yang lebih aman sampai event yang lebih hidup, setiap proyek dimulai dengan tujuan yang jelas.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.number}>
              <div className="project-art"><span>{project.number}</span><i /><i /><b>JCP</b></div>
              <p>{project.category}</p>
              <h3>{project.title}</h3>
              <a href="/hubungi" aria-label={`Tanyakan proyek ${project.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <div className="shell">
          <div className="process-heading"><p className="section-label">(04) How we work</p><h2>Less noise.<br /><em>More meaning.</em></h2></div>
          <div className="process-grid">
            {process.map(([number, title, description]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="shell">
          <p className="section-label">(05) Our point of view</p>
          <h2>Good visual doesn&apos;t<br />just <em>look</em> good.</h2>
          <div className="statement-bottom"><p>It helps people feel something, remember something, and choose something.</p><a href="/hubungi">Mulai proyek Anda <span>↗</span></a></div>
        </div>
      </section>

      <section className="contact-cta shell" id="contact">
        <p className="section-label">(06) Start something</p>
        <div><h2>Got a good<br /><em>idea?</em></h2><a href="/hubungi">Tell us everything <span>↗</span></a></div>
        <p className="contact-detail">jogjacreativeproduction@gmail.com<br />+62 856-787-4388</p>
      </section>

      <footer className="footer shell">
        <p>© 2026 Jogja Creative Production</p>
        <a href="mailto:jogjacreativeproduction@gmail.com">jogjacreativeproduction@gmail.com</a>
        <a href="https://wa.me/628567874388">WhatsApp ↗</a>
      </footer>
    </main>
  );
}
import { SiteNav } from "@/components/site-nav";
