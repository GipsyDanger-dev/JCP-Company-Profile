import Image from "next/image";

const values = [
  ["01", "Creative Thinking", "Kami memulai dari pemahaman menyeluruh terhadap kebutuhan dan tujuan setiap proyek."],
  ["02", "Visual Strategy", "Setiap elemen dirancang untuk memperjelas pesan dan memperkuat identitas brand."],
  ["03", "Professional Execution", "Detail, presisi, dan kualitas menjadi standar dalam setiap eksekusi."],
];

const teams = [
  ["Leadership", "Franko Nero", "CEO"],
  ["Marketing", "Prayoga R. · Ghevira Zahira · Bernicka Dea · Robica Tatah", "Head of Marketing & Marketing"],
  ["Creative", "Rifqi Rahman · Susiana Irma · Desta Ratu · Widji Dwi", "Head of Creative & Creative"],
  ["Visual Communication", "Rizki Hidayat · Arsyillah Majid · Framanahadi · Muhammad Ghazi · Fajarudin N.", "Editor, Videographer & Graphic Designer"],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="nav shell">
        <a className="wordmark" href="/"><Image src="/jcp-logo.svg" alt="JCP - Jogja Creative Production" width={120} height={76} priority /></a>
        <div className="nav-links"><a href="/">Beranda</a><a href="/layanan">Layanan</a><a href="/portfolio">Portofolio</a></div>
        <a className="nav-cta" href="/hubungi">Let&apos;s talk <i>↗</i></a>
      </nav>

      <section className="about-hero shell">
        <p className="section-label">(About JCP)</p>
        <h1>Ideas become<br /><em>impact</em><br />here.</h1>
        <p>Kami adalah tim kreatif dari Yogyakarta yang membantu bisnis dan event berubah dari sekadar terlihat menjadi lebih terasa.</p>
      </section>

      <section className="about-story">
        <div className="shell about-story-grid"><p className="section-label">(Our story)</p><div><h2>More than a<br />production team.</h2><p>Jogja Creative Production lahir dari kebutuhan bisnis dan event akan konten visual yang profesional, tetapi sering terbentur waktu, sumber daya, dan kualitas produksi.</p><p>Kami hadir untuk menyederhanakan proses itu—menghubungkan strategi, kreativitas, dan eksekusi agar klien dapat fokus pada tujuan yang lebih besar.</p></div><div className="about-mark">JCP<br /><small>ESTD<br />2022</small></div></div>
      </section>

      <section className="company-profile shell"><p className="section-label">(Our business units)</p><div className="company-profile-intro"><h2>Creative, digital,<br /><em>integrated.</em></h2><div><p>PT Jogja Creative Production menyediakan solusi kreatif dan teknologi digital untuk kebutuhan komunikasi visual bisnis dan event. Kami tidak berhenti pada desain yang indah; setiap layanan dibangun agar pesannya jelas, identitas brand semakin kuat, dan tujuan klien lebih mudah dicapai.</p><p>Mulai dari satu kebutuhan dokumentasi hingga ekosistem konten yang lebih lengkap, tim kami menggabungkan perencanaan, kreativitas, teknologi, dan eksekusi lapangan dalam satu alur kerja.</p></div></div><div className="company-units"><article><span>North Production</span><p>Produksi foto-video profesional untuk brand, perusahaan, hotel, dan event. Mulai dokumentasi acara, produk, company profile, personal branding, campaign, sampai konten digital.</p><small>Event · Produk · Corporate · Campaign · Aftermovie</small></article><article><span>North Photo & Video Booth</span><p>Photo dan videobooth untuk gathering, festival, event perusahaan, dan promosi. Menggunakan kamera profesional, operator, beragam efek, serta instant sharing.</p><small>Custom booth · Instant sharing · Operator · Event activation</small></article><article><span>North Creative</span><p>Layanan desain, branding, dan manajemen media sosial agar brand hadir konsisten. Mencakup perencanaan konten, desain, copywriting, dan posting rutin.</p><small>Brand identity · Content plan · Design · Copywriting</small></article><article><span>North Virtual Tour 360</span><p>Tur virtual interaktif dengan visual 360° berkualitas tinggi untuk properti, hotel, sekolah, pabrik, showroom, dan destinasi wisata.</p><small>360° capture · Interactive navigation · Custom interface</small></article><article><span>Indonesia Drone Training Centre</span><p>Pelatihan drone pemula hingga mahir yang memadukan teori, praktik lapangan, pengoperasian kamera, serta keselamatan penerbangan.</p><small>Flight skill · Camera operation · Safety · Field practice</small></article></div></section>

      <section className="vision shell">
        <p className="section-label">(Our direction)</p>
        <div><span>Vision</span><h2>Menjadi Digital Creative Best Solution yang terpercaya, inovatif, dan berdampak, dengan layanan kreatif dan teknologi digital yang memberi nilai terbaik bagi setiap klien.</h2></div>
        <div className="mission"><span>Mission</span><ol><li>Menghadirkan layanan kreatif dan produksi visual dengan standar profesional, perencanaan matang, proses detail, serta eksekusi tepat waktu.</li><li>Membangun komunikasi visual yang efektif dan relevan untuk memperkuat identitas brand, menarik perhatian audiens, dan mendukung tujuan pemasaran klien.</li><li>Memberikan solusi terintegrasi untuk bisnis dan event—mulai desain, konten, hingga dokumentasi—agar klien dapat fokus mengembangkan usaha dengan percaya diri.</li></ol></div>
      </section>

      <section className="values"><div className="shell"><div className="values-heading"><p className="section-label">(What guides us)</p><h2>How we<br /><em>show up.</em></h2></div><div className="value-grid">{values.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="team shell"><div className="team-heading"><p className="section-label">(The people)</p><h2>Small team.<br /><em>Big energy.</em></h2></div><div className="team-list">{teams.map(([group, names, role]) => <article key={group}><span>{group}</span><h3>{names}</h3><p>{role}</p></article>)}</div></section>

      <section className="company-assurance"><div className="shell"><p className="section-label">(How we deliver)</p><div className="assurance-grid"><h2>Clear process.<br /><em>Reliable output.</em></h2><div><p>Setiap proyek dimulai dari pemahaman kebutuhan, tujuan komunikasi, dan konteks audiens. Tim kami kemudian menyusun arah visual, memproduksi secara detail, serta menjaga proses kerja tetap komunikatif hingga hasil siap digunakan.</p><p>JCP bekerja untuk kebutuhan UMKM, brand, institusi, hotel, dan event korporat—dengan layanan yang dapat disesuaikan terhadap skala proyek, kebutuhan teknis, dan anggaran.</p></div></div><div className="legal-strip"><article><span>Legal entity</span><p>PT Jogja Creative Production</p></article><article><span>Administration</span><p>Akta pendirian, Kemenkumham, dan NPWP tersedia sebagai dokumen perusahaan.</p></article><article><span>Base</span><p>Yogyakarta, Indonesia</p></article></div></div></section>
    </main>
  );
}
