"use client";


import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const services = [
  ["01", "North Production", "Foto, video & dokumentasi", "north-production"],
  ["02", "North Creative", "Branding & social media", "north-creative"],
  ["03", "North Photobooth", "Photobooth untuk event", "north-booth"],
  ["04", "Virtual Tour 360", "Ruang yang bisa dijelajahi", "virtual-tour-360"],
  ["05", "Drone Training", "Pelatihan drone profesional", "drone-training"],
  ["06", "AI Kreasi Cerdas", "Solusi AI sesuai kebutuhan", "ai-kreasi-cerdas"],
] as const;

type SiteNavProps = { active?: "tentang" | "layanan" | "portfolio" | "hubungi" };

export function SiteNav({ active }: SiteNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [landingPastHero, setLandingPastHero] = useState(false);
  const previousScroll = useRef(0);
  const { scrollY } = useScroll();

  useLayoutEffect(() => {
    setAnnouncementOpen(localStorage.getItem("jcp-announcement-dismissed") !== "true");
    const hero = document.querySelector(".hero-lines-hero");
    setLandingPastHero(Boolean(hero && hero.getBoundingClientRect().bottom <= 110));
  }, []);

  useMotionValueEvent(scrollY, "change", (currentScroll) => {
    const hero = document.querySelector(".hero-lines-hero");
    setLandingPastHero(Boolean(hero && hero.getBoundingClientRect().bottom <= 110));
    if (Math.abs(currentScroll - previousScroll.current) < 8) return;
    setNavVisible(currentScroll < 72 || currentScroll < previousScroll.current);
    previousScroll.current = currentScroll;
  });

  return <header className={`site-header${navVisible ? "" : " is-nav-hidden"}${landingPastHero ? " is-landing-scrolled" : ""}`}>
    {announcementOpen === true && <div className="nav-announcement"><a href="/hubungi">Punya project yang ingin diwujudkan? Mari mulai percakapannya <b>→</b></a><button type="button" aria-label="Tutup pengumuman" onClick={() => { setAnnouncementOpen(false); localStorage.setItem("jcp-announcement-dismissed", "true"); }}>×</button></div>}
    <nav className="nav shell" aria-label="Navigasi utama">
    <a className="wordmark" href="/" aria-label="Jogja Creative Production"><img src="/jcp-logo-nav.png" alt="JCP - Jogja Creative Production" width="288" height="288" loading="eager" /></a>
    <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} aria-controls="mobile-main-menu" onClick={() => setMenuOpen((open) => !open)}><span className="t-icon-swap" data-state={menuOpen ? "b" : "a"}><span className="t-icon" data-icon="a">Menu</span><span className="t-icon" data-icon="b">×</span></span></button>
    <div className={`nav-links${menuOpen ? " mobile-open" : ""}`} id="mobile-main-menu">
      <a className={active === "tentang" ? "active" : ""} href="/tentang" onClick={() => setMenuOpen(false)}>Tentang</a>
      <div className="nav-dropdown" onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setServicesOpen(true); }} onMouseLeave={() => { if (window.matchMedia("(hover: hover)").matches) setServicesOpen(false); }}>
        <button className={active === "layanan" ? "active" : ""} type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={() => setServicesOpen((open) => !open)}>Layanan <span>↓</span></button>
        {servicesOpen && <div className="services-menu" id="services-menu">
          <div className="services-menu-intro"><span>(JCP SERVICES)</span><strong>Choose your<br />creative lane.</strong><a href="/layanan" onClick={() => setServicesOpen(false)}>Lihat semua layanan <b>↗</b></a></div>
          <div className="services-menu-grid">{services.map(([number, title, description, slug]) => <a href={`/layanan/${slug}`} key={title} onClick={() => setServicesOpen(false)}><span>{number}</span><strong>{title}</strong><small>{description}</small><b>↗</b></a>)}</div>
        </div>}
      </div>
      <a className={active === "portfolio" ? "active" : ""} href="/portfolio" onClick={() => setMenuOpen(false)}>Portofolio</a>
      <a className="nav-mobile-cta" href="/hubungi" onClick={() => setMenuOpen(false)}>Let&apos;s talk <i>↗</i></a>
    </div>
    <a className={`nav-cta${active === "hubungi" ? " active-cta" : ""}`} href="/hubungi" onClick={() => setMenuOpen(false)}>Let&apos;s talk <i>↗</i></a>
    </nav>
  </header>;
}
