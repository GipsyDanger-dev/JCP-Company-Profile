import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { HeroLines } from "@/components/hero-lines";
import { Magnet } from "@/components/magnet";
import { GlareHover } from "@/components/glare-hover";
import { cmsFallbacks, getCms } from "@/lib/cms";
import { pageMetadata, organizationLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Jogja Creative Production | Jasa Foto Video & Drone di Yogyakarta", "JCP adalah perusahaan kreatif digital Yogyakarta untuk visual production, branding, konten digital, dan pengalaman event.", "/");
const projects = [{ number: "01", category: "Drone Training", title: "Badan Otorita Borobudur", tone: "sun", image: "/portfolio/sleman-jaring-pengaman-sosial.jpg" }, { number: "02", category: "North Photobooth", title: "360 Booth Activation", tone: "ink", image: "/services/north-booth-gallery/north-booth-1.jpg" }, { number: "03", category: "Drone Training", title: "BPBD Kabupaten Gunungkidul", tone: "clay", image: "/portfolio/gunungkidul-drone-training.jpg" }];

export default async function Home() {
  const content = await getCms("home", cmsFallbacks.home);
  const lines = (value: string) => value.split("\n").map((line, i) => <span key={`${line}-${i}`}>{i > 0 && <br />}{line}</span>);
  return <main className="landing-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [organizationLd(), { "@type": "WebSite", name: SITE_NAME, url: SITE_URL }] }) }} /><SiteNav />
    <section className="hero hero-lines-hero hero-wide" id="home"><HeroLines linesGradient={["#8f3f24", "#ff6826", "#ffbd34"]} lineCount={[7, 11, 15]} lineDistance={[0.18, 0.12, 0.085]} animationSpeed={0.42} parallax parallaxStrength={0.055} /><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{content.eyebrow}</p><h1>{lines(content.heroTitle)}</h1><p className="intro">{content.heroIntro}</p><a className="primary-cta" href="#services">{content.heroCta} <b>↓</b></a></div></div><div className="hero-footer"><p>From a single frame<br />to the whole story.</p><p>Scroll to discover <span>↓</span></p></div></section>
    <section className="manifesto" id="about"><div className="shell manifesto-grid"><p className="section-label">{content.manifestoLabel}</p><div><h2>{lines(content.manifestoTitle)}</h2><p className="manifesto-copy">{content.manifestoCopy}</p></div><div className="manifesto-mark"><Magnet><GlareHover glareOpacity={0.28} glareSize={45}><Image className="manifesto-mark-logo" src="/jcp-logo-nav.png" alt="JCP" width={288} height={288} /></GlareHover></Magnet></div></div></section>
    <section className="company-snapshot shell"><p className="section-label">{content.snapshotLabel}</p><div className="snapshot-copy"><h2>{lines(content.snapshotTitle)}</h2><div><p>{content.snapshotParagraph1}</p><p>{content.snapshotParagraph2}</p></div></div><div className="snapshot-grid"><article><span>{content.stat1Number}</span><p>{content.stat1Text}</p></article><article><span>{content.stat2Number}</span><p>{content.stat2Text}</p></article><article><span>{content.stat3Number}</span><p>{content.stat3Text}</p></article></div></section>
    <section className="services shell" id="services"><div className="section-topline"><p className="section-label">{content.servicesLabel}</p><p>{content.servicesIntro}</p></div><div className="service-list">{content.services.map(([number, title, description]) => <article className="service" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="work shell" id="works"><div className="section-topline"><p className="section-label">{content.workLabel}</p><a href="/portfolio">{content.workLink} ↗</a></div><div className="work-intro"><h2>{lines(content.workTitle)}</h2><p>{content.workIntro}</p></div><div className="project-grid">{projects.map((project) => <article className={`project-card ${project.tone}`} key={project.number}><div className="project-art"><Image src={project.image} alt={project.title} fill sizes="(min-width: 720px) 33vw, 100vw" /></div><div className="project-copy"><p>{project.category}</p><h3>{project.title}</h3></div></article>)}</div></section>
    <section className="contact-cta shell" id="contact"><p className="section-label">{content.contactLabel}</p><div><h2>{lines(content.contactTitle)}</h2><a href="/hubungi">{content.contactCta} <span>↗</span></a></div></section>
  </main>;
}
