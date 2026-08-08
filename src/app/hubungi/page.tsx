import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import "./contact.css";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Hubungi Kami | Konsultasi Proyek Kreatif di Yogyakarta",
  "Ceritakan kebutuhan visual dan digital Anda. Hubungi Jogja Creative Production via WhatsApp +62 856-0060-4388, email, atau form inquiry — konsultasi awal gratis.",
  "/hubungi"
);

export default function ContactPage() {
  return <main className="contact-page"><SiteNav active="hubungi" /><section className="contact-hero shell"><p className="section-label">(Let&apos;s talk)</p><h1>Make your next<br /><em>move</em> count.</h1><p>Ceritakan apa yang sedang ingin Anda buat. Kami akan bantu menemukan titik mulai yang tepat.</p></section><section className="contact-content shell"><ContactInquiryForm /><aside className="contact-info"><p className="section-label">(Find us)</p><div><span>Email</span><a href="mailto:jogjacreativeproduction@gmail.com">jogjacreativeproduction@gmail.com</a></div><div><span>WhatsApp</span><a href="https://wa.me/6285600604388">+62 856-0060-4388 ↗</a></div><div><span>Studio</span><p>Perum Griya Mlati Indah No. B4, Mulungan Kulon, Sendangadi, Mlati, Sleman, DIY 55285</p></div><div className="contact-map"><b>YOGYAKARTA</b><i /><i /><span>JCP / 07°47&apos;S 110°22&apos;E</span></div></aside></section></main>;
}
