import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import "./contact.css";
import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { pageMetadata, organizationLd, SITE_URL } from "@/lib/seo";
import { cmsFallbacks, getCms } from "@/lib/cms";

export const metadata: Metadata = pageMetadata("Hubungi Kami | Konsultasi Proyek Kreatif di Yogyakarta", "Ceritakan kebutuhan visual dan digital Anda. Hubungi Jogja Creative Production via WhatsApp, email, atau form inquiry.", "/hubungi");
const structuredData = { "@context": "https://schema.org", "@type": "ContactPage", name: "Hubungi Jogja Creative Production", url: `${SITE_URL}/hubungi`, mainEntity: organizationLd() };

export default async function ContactPage() {
  const content = await getCms("contact", cmsFallbacks.contact);
  return <main className="contact-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteNav active="hubungi" /><section className="contact-hero shell"><p className="section-label">(Let&apos;s talk)</p><h1>{content.title.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h1><p>{content.intro}</p></section><section className="contact-content shell"><ContactInquiryForm /><aside className="contact-info"><p className="section-label">(Find us)</p><div><span>Email</span><a href={`mailto:${content.email}`}>{content.email}</a></div><div><span>WhatsApp</span><a href={content.whatsappUrl}>{content.whatsapp} ↗</a></div><div><span>Studio</span><p>{content.address}</p></div><div className="contact-map"><b>YOGYAKARTA</b><i /><i /><span>JCP / 07°47&apos;S 110°22&apos;E</span></div></aside></section></main>;
}
