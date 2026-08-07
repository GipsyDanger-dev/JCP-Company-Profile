"use client";

import { SiteNav } from "@/components/site-nav";
import { useState } from "react";

const projects = [
  { number: "01", category: "Drone Training", client: "Universitas Gadjah Mada", title: "Pelatihan Drone bersama Civitas Akademika UGM", year: "2025", tone: "orange", image: "/portfolio/borobudur-drone-training.jpg" },
  { number: "02", category: "North Production", client: "PT Tunas Tasik", title: "Annual Meeting", year: "2025", tone: "ink", image: "/portfolio/tunas-tasik-annual-meeting.jpg" },
  { number: "03", category: "Drone Training", client: "Badan Otorita Borobudur", title: "Pelatihan Drone Badan Otorita Borobudur", year: "2024", tone: "sage", image: "/portfolio/sleman-jaring-pengaman-sosial.jpg" },
  { number: "04", category: "North Production", client: "Hotel Grand Serela", title: "Hospitality Visual Story", year: "2024", tone: "clay", image: "/portfolio/grand-serela-hospitality-visual-story.jpg" },
  { number: "05", category: "Drone Training", client: "BPBD Gunungkidul", title: "BPBD Gunungkidul", year: "2024", tone: "sun", image: "/portfolio/gunungkidul-drone-training.jpg" },
  { number: "06", category: "North Production", client: "Produk Olahan Susu", title: "Bimbingan Teknis Akselerasi Produk", year: "2024", tone: "blue", image: "/portfolio/akselerasi-produk-bimtek.jpg" },
  { number: "07", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone Mapping untuk Masyarakat Umum", year: "2025", tone: "orange", image: "/services/drone-training-gallery/drone-training-1.jpg" },
  { number: "08", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Berbagai Jenis Drone untuk Pelatihan", year: "2025", tone: "ink", image: "/services/drone-training-gallery/drone-training-2.jpg" },
  { number: "09", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone bersama Komunitas Mahasiswa", year: "2025", tone: "clay", image: "/services/drone-training-gallery/drone-training-3.jpg" },
  { number: "10", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone untuk Tanggap Bencana", year: "2025", tone: "sage", image: "/services/drone-training-gallery/drone-training-4.jpg" },
  { number: "11", category: "Drone Training", client: "Dinas Tenaga Kerja Kabupaten Sleman", title: "Pelatihan Drone Dinas Tenaga Kerja Kabupaten Sleman", year: "2025", tone: "sun", image: "/services/drone-training-gallery/drone-training-5.jpg" },
  { number: "12", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone Pertanian", year: "2025", tone: "paper", image: "/services/drone-training-gallery/drone-training-6.jpg" },
  { number: "13", category: "North Production", client: "North Production", title: "Brand Lifestyle Shoot", year: "2025", tone: "orange", image: "/services/north-production-gallery/north-production-1.jpg" },
  { number: "14", category: "North Production", client: "North Production", title: "Corporate Profile", year: "2025", tone: "ink", image: "/services/north-production-gallery/north-production-2.jpg" },
  { number: "15", category: "North Production", client: "North Production", title: "Event Documentation", year: "2025", tone: "clay", image: "/services/north-production-gallery/north-production-3.jpg" },
  { number: "16", category: "North Production", client: "North Production", title: "Product Visual Story", year: "2025", tone: "sage", image: "/services/north-production-gallery/north-production-4.jpg" },
  { number: "17", category: "North Production", client: "North Production", title: "Commercial Content", year: "2025", tone: "sun", image: "/services/north-production-gallery/north-production-5.jpg" },
  { number: "18", category: "North Creative", client: "North Creative", title: "Multi-Platform Presence", year: "2025", tone: "ink", image: "/services/north-creative-gallery/north-creative-1.jpg" },
  { number: "19", category: "North Creative", client: "North Creative", title: "Content Planning", year: "2025", tone: "sun", image: "/services/north-creative-gallery/north-creative-2.jpg" },
  { number: "20", category: "North Creative", client: "North Creative", title: "Campaign Performance", year: "2025", tone: "clay", image: "/services/north-creative-gallery/north-creative-3.jpg" },
  { number: "21", category: "North Creative", client: "North Creative", title: "Audience Engagement", year: "2025", tone: "sage", image: "/services/north-creative-gallery/north-creative-4.jpg" },
  { number: "22", category: "North Creative", client: "North Creative", title: "Brand Visual Identity", year: "2025", tone: "orange", image: "/services/north-creative-gallery/north-creative-5.jpg" },
  { number: "23", category: "North Photobooth", client: "North Photobooth", title: "360 Booth Activation", year: "2025", tone: "orange", image: "/services/north-booth-gallery/north-booth-1.jpg" },
  { number: "24", category: "North Photobooth", client: "North Photobooth", title: "Guest Moments", year: "2025", tone: "ink", image: "/services/north-booth-gallery/north-booth-2.jpg" },
  { number: "25", category: "North Photobooth", client: "North Photobooth", title: "Instant Capture", year: "2025", tone: "clay", image: "/services/north-booth-gallery/north-booth-4.jpg" },
  { number: "26", category: "North Photobooth", client: "North Photobooth", title: "Group Session", year: "2025", tone: "sage", image: "/services/north-booth-gallery/north-booth-3.jpg" },
  { number: "27", category: "North Photobooth", client: "North Photobooth", title: "Props & Play", year: "2025", tone: "sun", image: "/services/north-booth-gallery/north-booth-5.jpg" },
  { number: "29", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "360 Experience", year: "2025", tone: "orange", image: "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg" },
  { number: "30", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Interactive Walkthrough", year: "2025", tone: "ink", image: "/services/virtual-tour-360-gallery/virtual-tour-360-2.jpg" },
  { number: "31", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Immersive Journey", year: "2025", tone: "clay", image: "/services/virtual-tour-360-gallery/virtual-tour-360-3.jpg" },
  { number: "32", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Discover Every Corner", year: "2025", tone: "sun", image: "/services/virtual-tour-360-gallery/virtual-tour-360-4.jpg" },
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
        <div><p>Berbagai cerita, medium, dan tantangan. Satu standar: karya yang terasa tepat untuk orang yang melihatnya.</p><span>31 projects / 5 disciplines</span></div>
      </section>

      <section className="portfolio-list shell">
        <div className="portfolio-filters"><span>Filter by</span><button className={filter === "Semua" ? "selected" : ""} onClick={() => setFilter("Semua")}>Semua <b>{projects.length}</b></button><button className={filter === "Drone Training" ? "selected" : ""} onClick={() => setFilter("Drone Training")}>Drone Training <b>{projects.filter(p => p.category === "Drone Training").length}</b></button><button className={filter === "North Production" ? "selected" : ""} onClick={() => setFilter("North Production")}>North Production <b>{projects.filter(p => p.category === "North Production").length}</b></button><button className={filter === "North Creative" ? "selected" : ""} onClick={() => setFilter("North Creative")}>North Creative <b>{projects.filter(p => p.category === "North Creative").length}</b></button><button className={filter === "North Photobooth" ? "selected" : ""} onClick={() => setFilter("North Photobooth")}>North Photobooth <b>{projects.filter(p => p.category === "North Photobooth").length}</b></button><button className={filter === "Virtual Tour 360" ? "selected" : ""} onClick={() => setFilter("Virtual Tour 360")}>Virtual Tour 360 <b>{projects.filter(p => p.category === "Virtual Tour 360").length}</b></button></div>
        <div className="portfolio-grid">
          {visibleProjects.map((project) => (
            <article className={`portfolio-card ${project.tone}`} key={project.number}>
              <div className="portfolio-art" style={{ backgroundImage: `linear-gradient(135deg, rgba(23, 15, 9, .18), rgba(23, 15, 9, .64)), url(${project.image})` }}><span>{project.number}</span><b>{project.year}</b><em>JCP</em></div>
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
