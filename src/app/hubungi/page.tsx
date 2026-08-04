import Image from "next/image";
import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <nav className="nav shell">
        <a className="wordmark" href="/"><Image src="/jcp-logo.jpg" alt="JCP - Jogja Creative Production" width={120} height={76} priority /></a>
        <div className="nav-links"><a href="/">Beranda</a><a href="/layanan">Layanan</a><a href="/portfolio">Portofolio</a></div>
        <a className="nav-cta active-cta" href="/hubungi">Let&apos;s talk <i>↗</i></a>
      </nav>

      <section className="contact-hero shell"><p className="section-label">(Let&apos;s talk)</p><h1>Make your next<br /><em>move</em> count.</h1><p>Ceritakan apa yang sedang ingin Anda buat. Kami akan bantu menemukan titik mulai yang tepat.</p></section>
      <section className="contact-content shell">
        <form className="inquiry-form"><p className="section-label">(Project inquiry)</p><label>Nama<input name="name" placeholder="Siapa nama Anda?" /></label><label>Email<input name="email" type="email" placeholder="nama@perusahaan.com" /></label><label>Kebutuhan<select name="service" defaultValue=""><option value="" disabled>Pilih layanan yang Anda butuhkan</option><option>North Production</option><option>North Creative</option><option>North Photo & Video Booth</option><option>North Virtual Tour 360</option><option>Indonesia Drone Training Centre</option></select></label><label>Ceritakan singkat<textarea name="message" placeholder="Tujuan, timeline, atau hal lain yang perlu kami tahu." rows={4} /></label><a className="form-cta" href="mailto:jogjacreativeproduction@gmail.com?subject=Project%20Inquiry%20JCP">Kirim inquiry <span>↗</span></a></form>
        <aside className="contact-info"><p className="section-label">(Find us)</p><div><span>Email</span><a href="mailto:jogjacreativeproduction@gmail.com">jogjacreativeproduction@gmail.com</a></div><div><span>WhatsApp</span><a href="https://wa.me/628567874388">+62 856-787-4388 ↗</a></div><div><span>Studio</span><p>Perum Griya Mlati Indah No. B4, Mulungan Kulon, Sendangadi, Mlati, Sleman, DIY 55285</p></div><div className="contact-map"><b>YOGYAKARTA</b><i /><i /><span>JCP / 07°47&apos;S 110°22&apos;E</span></div></aside>
      </section>
    </main>
  );
}
