import { SiteNav } from "@/components/site-nav";

const values = [
  ["01", "Creative Thinking", "Kami memulai setiap proyek dengan pemahaman menyeluruh terhadap kebutuhan dan tujuan klien. Setiap ide dikembangkan melalui proses berpikir kreatif, analisis visual, dan eksplorasi konsep, sehingga menghasilkan solusi yang relevan, segar, dan berbeda."],
  ["02", "Visual Strategy", "Kami tidak hanya membuat desain yang indah, tetapi juga strategi visual yang memiliki arah komunikasi yang jelas. Setiap elemen disusun untuk menyampaikan pesan, memperkuat identitas, dan mendukung tujuan bisnis melalui konten yang terencana dan terukur."],
  ["03", "Professional Execution", "Kualitas eksekusi adalah prioritas utama kami. Tim kami memastikan produksi dilakukan dengan detail, presisi, dan standar profesional, sehingga setiap hasil akhir memiliki nilai estetika, fungsional, dan berdampak bagi klien."],
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
      <SiteNav active="tentang" />

      <section className="about-hero shell">
        <p className="section-label">(About JCP)</p>
        <h1>Ideas become<br /><em>impact</em><br />here.</h1>
        <p>Kami adalah tim kreatif dari Yogyakarta yang membantu bisnis dan event berubah dari sekadar terlihat menjadi lebih terasa.</p>
      </section>

      <section className="about-story">
        <div className="shell about-story-grid"><p className="section-label">(Our story)</p><div><h2>More than a<br />production team.</h2><p>Jogja Creative Production lahir dari kebutuhan bisnis dan event akan konten visual yang profesional, tetapi sering terbentur waktu, sumber daya, dan kualitas produksi.</p><p>Kami hadir untuk menyederhanakan proses itu—menghubungkan strategi, kreativitas, dan eksekusi agar klien dapat fokus pada tujuan yang lebih besar.</p></div><div className="about-mark">JCP<br /><small>ESTD<br />2022</small></div></div>
      </section>

      <section className="company-profile shell"><p className="section-label">(Our business units)</p><div className="company-profile-intro"><h2>Creative, digital,<br /><em>integrated.</em></h2><div><p>Penjelasan produk ini kami susun untuk memberikan gambaran singkat tentang layanan digital kreatif yang kami tawarkan, mulai dari pelatihan drone, jasa foto video, photobooth–videobooth, Virtual Tour 360°, Social Media Management, hingga solusi berbasis AI.</p><p>Setiap produk dirancang dengan mengutamakan inovasi, profesionalisme, dan kualitas, sehingga mampu memberikan solusi terbaik bagi kebutuhan visual dan digital klien.</p></div></div><div className="company-units"><article><span>North Production</span><p>Layanan Foto &amp; Video kami menghadirkan hasil visual berkualitas tinggi dengan sentuhan kreativitas profesional, mulai dari dokumentasi acara, produk, profil perusahaan, personal branding hingga konten digital.</p><small>Event · Produk · Corporate · Personal brand · Digital content</small></article><article><span>North Photo &amp; Video Booth</span><p>Photobooth &amp; Videobooth untuk berbagai event, menghasilkan dokumentasi berkualitas dengan proses cepat dan praktis.</p><small>Custom booth · Instant sharing · Operator · Event activation</small></article><article><span>North Creative</span><p>Pengelolaan Media Sosial lengkap: perencanaan konten, desain, copywriting, dan posting rutin agar brand tampil profesional dan konsisten.</p><small>Content plan · Design · Copywriting · Routine posting</small></article><article><span>North Virtual Tour 360</span><p>Tour Virtual Interaktif 360° untuk menampilkan ruang dan fasilitas dengan detail visual tinggi, cocok untuk properti, hotel, sekolah, dan destinasi wisata.</p><small>360° capture · Interactive navigation · Custom interface</small></article><article><span>Indonesia Drone Training Centre</span><p>Pelatihan Drone profesional untuk pemula hingga mahir, dengan fokus pada keterampilan, keselamatan, dan praktik langsung.</p><small>Flight skill · Camera operation · Safety · Field practice</small></article><article><span>AI Kreasi Cerdas</span><p>Solusi berbasis AI tools yang dirancang dinamis sesuai kebutuhan pelanggan, untuk mendukung kebutuhan kreatif maupun alur kerja bisnis.</p><small>Needs mapping · AI tools · Dynamic solution · Implementation support</small></article></div></section>

      <section className="vision shell">
        <p className="section-label">(Our direction)</p>
        <div><span>Vision</span><h2>Menjadi Digital Creative Best Solution yang terpercaya, inovatif, dan berdampak, dengan layanan kreatif dan teknologi digital yang memberi nilai terbaik bagi setiap klien.</h2></div>
        <div className="mission"><span>Mission</span><ol><li>Menghadirkan layanan kreatif dan produksi visual dengan standar profesional, perencanaan matang, proses detail, serta eksekusi tepat waktu.</li><li>Membangun komunikasi visual yang efektif dan relevan untuk memperkuat identitas brand, menarik perhatian audiens, dan mendukung tujuan pemasaran klien.</li><li>Memberikan solusi terintegrasi untuk bisnis dan event—mulai desain, konten, hingga dokumentasi—agar klien dapat fokus mengembangkan usaha dengan percaya diri.</li></ol></div>
      </section>

      <section className="values"><div className="shell"><div className="values-heading"><div><p className="section-label">(What guides us)</p><p className="values-lede">Tiga prinsip yang membentuk cara kami bekerja — dari ide awal sampai eksekusi akhir yang siap dilihat klien.</p></div><h2>How we<br /><em>show up.</em></h2></div><div className="value-grid">{values.map(([number, title, description]) => <article key={number} data-number={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="team shell"><div className="team-heading"><p className="section-label">(The people)</p><h2>Small team.<br /><em>Big energy.</em></h2></div><div className="team-list">{teams.map(([group, names, role]) => <article key={group}><span>{group}</span><h3>{names}</h3><p>{role}</p></article>)}</div></section>

      <section className="company-assurance"><div className="shell"><p className="section-label">(How we deliver)</p><div className="assurance-grid"><h2>Clear process.<br /><em>Reliable output.</em></h2><div><p>Setiap proyek dimulai dari pemahaman kebutuhan, tujuan komunikasi, dan konteks audiens. Tim kami kemudian menyusun arah visual, memproduksi secara detail, serta menjaga proses kerja tetap komunikatif hingga hasil siap digunakan.</p><p>JCP bekerja untuk kebutuhan UMKM, brand, institusi, hotel, dan event korporat—dengan layanan yang dapat disesuaikan terhadap skala proyek, kebutuhan teknis, dan anggaran.</p></div></div><div className="legal-strip"><article><span>Legal entity</span><p>PT Jogja Creative Production</p></article><article><span>Administration</span><p>Akta pendirian, Kemenkumham, dan NPWP tersedia sebagai dokumen perusahaan.</p></article><article><span>Base</span><p>Yogyakarta, Indonesia</p></article></div></div></section>
    </main>
  );
}
