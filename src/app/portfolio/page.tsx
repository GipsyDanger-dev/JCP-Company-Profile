"use client";

import Image from "next/image";
import { useState } from "react";

const projects = [
  { number: "01", category: "Drone Training", client: "Badan Otorita Borobudur", title: "Pelatihan Drone Divisi Komunikasi Publik", year: "2025", tone: "orange" },
  { number: "02", category: "Visual Production", client: "PT Tunas Tasik", title: "Annual Meeting", year: "2025", tone: "ink" },
  { number: "03", category: "Drone Training", client: "Kabupaten Sleman", title: "Program Jaring Pengaman Sosial", year: "2024", tone: "sage" },
  { number: "04", category: "Visual Production", client: "Hotel Grand Serela", title: "Hospitality Visual Story", year: "2024", tone: "clay" },
  { number: "05", category: "Drone Training", client: "BPBD Gunungkidul", title: "Pelatihan Drone Mitigasi Bencana", year: "2024", tone: "sun" },
  { number: "06", category: "Visual Production", client: "Produk Olahan Susu", title: "Bimbingan Teknis Akselerasi Produk", year: "2024", tone: "blue" },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Semua");
  const visibleProjects = projects.filter((project) => filter === "Semua" || project.category === filter);

  return (
    <main className="portfolio-page">
      <nav className="nav shell">
        <a className="wordmark" href="/"><Image src="/jcp-logo.svg" alt="JCP - Jogja Creative Production" width={120} height={76} priority /></a>
        <div className="nav-links"><a href="/">Beranda</a><a href="/tentang">Tentang</a><a className="active" href="/portfolio">Portofolio</a></div>
        <a className="nav-cta" href="/hubungi">Let&apos;s talk <i>↗</i></a>
      </nav>

      <section className="portfolio-hero shell">
        <p className="section-label">(Selected projects)</p>
        <h1>Work that<br /><em>moves.</em></h1>
        <div><p>Berbagai cerita, medium, dan tantangan. Satu standar: karya yang terasa tepat untuk orang yang melihatnya.</p><span>06 projects / 02 disciplines</span></div>
      </section>

      <section className="portfolio-list shell">
        <div className="portfolio-filters"><span>Filter by</span><button className={filter === "Semua" ? "selected" : ""} onClick={() => setFilter("Semua")}>Semua <b>06</b></button><button className={filter === "Visual Production" ? "selected" : ""} onClick={() => setFilter("Visual Production")}>North Production <b>03</b></button><button className={filter === "Drone Training" ? "selected" : ""} onClick={() => setFilter("Drone Training")}>Drone Training <b>03</b></button></div>
        <div className="portfolio-grid">
          {visibleProjects.map((project) => (
            <article className={`portfolio-card ${project.tone}`} key={project.number}>
              <div className="portfolio-art"><span>{project.number}</span><i /><i /><b>{project.year}</b><em>JCP</em></div>
              <div className="portfolio-card-copy"><p>{project.category}</p><h2>{project.title}</h2><span>{project.client}</span><a href="/hubungi" aria-label={`Tanyakan proyek ${project.title}`}>View project <b>↗</b></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-outro">
        <div className="shell"><p className="section-label">Have a project in mind?</p><h2>Let&apos;s make<br /><em>something real.</em></h2><a href="/hubungi">Start a conversation <span>↗</span></a></div>
      </section>
    </main>
  );
}
