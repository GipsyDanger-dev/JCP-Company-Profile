"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  ["01", "North Production", "Foto, video & dokumentasi", "north-production"],
  ["02", "North Creative", "Branding & social media", "north-creative"],
  ["03", "North Booth", "Photobooth untuk event", "north-booth"],
  ["04", "Virtual Tour 360", "Ruang yang bisa dijelajahi", "virtual-tour-360"],
  ["05", "Drone Training", "Pelatihan drone profesional", "drone-training"],
] as const;

type SiteNavProps = { active?: "tentang" | "layanan" | "portfolio" | "hubungi" };

export function SiteNav({ active }: SiteNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return <header className="site-header">
    {announcementOpen && <div className="nav-announcement"><a href="/hubungi">Punya project yang ingin diwujudkan? Mari mulai percakapannya <b>→</b></a><button type="button" aria-label="Tutup pengumuman" onClick={() => setAnnouncementOpen(false)}>×</button></div>}
    <nav className="nav shell" aria-label="Navigasi utama">
    <a className="wordmark" href="/" aria-label="Jogja Creative Production"><Image src="/jcp-logo-nobg.png" alt="JCP - Jogja Creative Production" width={120} height={76} priority /></a>
    <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-main-menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Tutup" : "Menu"}</button>
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
    </div>
    <a className={`nav-cta${active === "hubungi" ? " active-cta" : ""}`} href="/hubungi" onClick={() => setMenuOpen(false)}>Let&apos;s talk <i>↗</i></a>
    </nav>
  </header>;
}
