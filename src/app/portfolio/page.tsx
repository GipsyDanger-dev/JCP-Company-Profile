"use client";

import { SiteNav } from "@/components/site-nav";
import { useState } from "react";

const projects = [
  { number: "01", category: "Drone Training", client: "Badan Otorita Borobudur", title: "Pelatihan Drone Divisi Komunikasi Publik", year: "2025", tone: "orange", image: "https://images.unsplash.com/photo-1722922262588-27e059c95b73?auto=format&fit=crop&w=1600&q=80" },
  { number: "02", category: "Visual Production", client: "PT Tunas Tasik", title: "Annual Meeting", year: "2025", tone: "ink", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80" },
  { number: "03", category: "Drone Training", client: "Kabupaten Sleman", title: "Program Jaring Pengaman Sosial", year: "2024", tone: "sage", image: "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1600&q=80" },
  { number: "04", category: "Visual Production", client: "Hotel Grand Serela", title: "Hospitality Visual Story", year: "2024", tone: "clay", image: "https://images.unsplash.com/photo-1695093360120-490f21ca62a7?auto=format&fit=crop&w=1600&q=80" },
  { number: "05", category: "Drone Training", client: "BPBD Gunungkidul", title: "Pelatihan Drone Mitigasi Bencana", year: "2024", tone: "sun", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80" },
  { number: "06", category: "Visual Production", client: "Produk Olahan Susu", title: "Bimbingan Teknis Akselerasi Produk", year: "2024", tone: "blue", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80" },
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
