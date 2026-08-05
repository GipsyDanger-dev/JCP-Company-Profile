"use client";

import { SiteNav } from "@/components/site-nav";
import { useState } from "react";

const projects = [
  { number: "01", category: "Drone Training", client: "Badan Otorita Borobudur", title: "Pelatihan Drone Divisi Komunikasi Publik", year: "2025", tone: "orange", image: "/portfolio/borobudur-drone-training.jpg" },
  { number: "02", category: "Visual Production", client: "PT Tunas Tasik", title: "Annual Meeting", year: "2025", tone: "ink", image: "/portfolio/tunas-tasik-annual-meeting.jpg" },
  { number: "03", category: "Drone Training", client: "Kabupaten Sleman", title: "Program Jaring Pengaman Sosial", year: "2024", tone: "sage", image: "/portfolio/sleman-jaring-pengaman-sosial.jpg" },
  { number: "04", category: "Visual Production", client: "Hotel Grand Serela", title: "Hospitality Visual Story", year: "2024", tone: "clay", image: "/portfolio/grand-serela-hospitality-visual-story.jpg" },
  { number: "05", category: "Drone Training", client: "BPBD Gunungkidul", title: "Pelatihan Drone Mitigasi Bencana", year: "2024", tone: "sun", image: "/portfolio/gunungkidul-drone-training.jpg" },
  { number: "06", category: "Visual Production", client: "Produk Olahan Susu", title: "Bimbingan Teknis Akselerasi Produk", year: "2024", tone: "blue", image: "/portfolio/akselerasi-produk-bimtek.jpg" },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Semua");
  const visibleProjects = projects.filter((project) => filter === "Semua" || project.category === filter);

  return (
    <main className="portfolio-page">
      <SiteNav active="portfolio" />

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
              <div className="portfolio-art" style={{ backgroundImage: `linear-gradient(135deg, rgba(23, 15, 9, .18), rgba(23, 15, 9, .64)), url(${project.image})` }}><span>{project.number}</span><i /><i /><b>{project.year}</b><em>JCP</em></div>
              <div className="portfolio-card-copy"><p>{project.category}</p><h2>{project.title}</h2><span>{project.client}</span></div>
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
