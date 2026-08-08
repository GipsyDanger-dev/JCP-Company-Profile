"use client";

import { SiteNav } from "@/components/site-nav";
import { useState } from "react";

const projects = [
  { number: "01", category: "Drone Training", client: "Universitas Gadjah Mada", title: "Pelatihan Drone bersama Civitas Akademika UGM", tone: "orange", image: "/portfolio/borobudur-drone-training.jpg" },
  { number: "02", category: "Drone Training", client: "Badan Otorita Borobudur", title: "Pelatihan Drone Badan Otorita Borobudur", tone: "sage", image: "/portfolio/sleman-jaring-pengaman-sosial.jpg" },
  { number: "03", category: "North Production", client: "Hotel Grand Serela", title: "Hospitality Visual Story", tone: "clay", image: "/portfolio/grand-serela-hospitality-visual-story.jpg" },
  { number: "04", category: "Drone Training", client: "BPBD Gunungkidul", title: "BPBD Gunungkidul", tone: "sun", image: "/portfolio/gunungkidul-drone-training.jpg" },
  { number: "05", category: "North Production", client: "Produk Olahan Susu", title: "Bimbingan Teknis Akselerasi Produk", tone: "blue", image: "/portfolio/akselerasi-produk-bimtek.jpg" },
  { number: "06", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone Mapping untuk Masyarakat Umum", tone: "orange", image: "/services/drone-training-gallery/drone-training-1.jpg" },
  { number: "07", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Berbagai Jenis Drone untuk Pelatihan", tone: "ink", image: "/services/drone-training-gallery/drone-training-2.jpg" },
  { number: "08", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone bersama Komunitas Mahasiswa", tone: "clay", image: "/services/drone-training-gallery/drone-training-3.jpg" },
  { number: "09", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone untuk Tanggap Bencana", tone: "sage", image: "/services/drone-training-gallery/drone-training-4.jpg" },
  { number: "10", category: "Drone Training", client: "Dinas Tenaga Kerja Kabupaten Sleman", title: "Pelatihan Drone Dinas Tenaga Kerja Kabupaten Sleman", tone: "sun", image: "/services/drone-training-gallery/drone-training-5.jpg" },
  { number: "11", category: "Drone Training", client: "Indonesia Drone Training Centre", title: "Pelatihan Drone Pertanian", tone: "paper", image: "/services/drone-training-gallery/drone-training-6.jpg" },
  { number: "12", category: "North Production", client: "North Production", title: "Brand Lifestyle Shoot", tone: "orange", image: "/services/north-production-gallery/north-production-1.jpg" },
  { number: "13", category: "North Production", client: "North Production", title: "Corporate Profile", tone: "ink", image: "/services/north-production-gallery/north-production-2.jpg" },
  { number: "14", category: "North Production", client: "North Production", title: "Event Documentation", tone: "clay", image: "/services/north-production-gallery/north-production-3.jpg" },
  { number: "15", category: "North Production", client: "North Production", title: "Product Visual Story", tone: "sage", image: "/services/north-production-gallery/north-production-4.jpg" },
  { number: "16", category: "North Production", client: "North Production", title: "Commercial Content", tone: "sun", image: "/services/north-production-gallery/north-production-5.jpg" },
  { number: "17", category: "North Creative", client: "North Creative", title: "Multi-Platform Presence", tone: "ink", image: "/services/north-creative-gallery/north-creative-1.jpg" },
  { number: "18", category: "North Creative", client: "North Creative", title: "Content Planning", tone: "sun", image: "/services/north-creative-gallery/north-creative-2.jpg" },
  { number: "19", category: "North Creative", client: "North Creative", title: "Campaign Performance", tone: "clay", image: "/services/north-creative-gallery/north-creative-3.jpg" },
  { number: "20", category: "North Creative", client: "North Creative", title: "Audience Engagement", tone: "sage", image: "/services/north-creative-gallery/north-creative-4.jpg" },
  { number: "21", category: "North Creative", client: "North Creative", title: "Brand Visual Identity", tone: "orange", image: "/services/north-creative-gallery/north-creative-5.jpg" },
  { number: "22", category: "North Photobooth", client: "North Photobooth", title: "360 Booth Activation", tone: "orange", image: "/services/north-booth-gallery/north-booth-1.jpg" },
  { number: "23", category: "North Photobooth", client: "North Photobooth", title: "Guest Moments", tone: "ink", image: "/services/north-booth-gallery/north-booth-2.jpg" },
  { number: "24", category: "North Photobooth", client: "North Photobooth", title: "Instant Capture", tone: "clay", image: "/services/north-booth-gallery/north-booth-4.jpg" },
  { number: "25", category: "North Photobooth", client: "North Photobooth", title: "Group Session", tone: "sage", image: "/services/north-booth-gallery/north-booth-3.jpg" },
  { number: "26", category: "North Photobooth", client: "North Photobooth", title: "Props & Play", tone: "sun", image: "/services/north-booth-gallery/north-booth-5.jpg" },
  { number: "27", category: "AI Kreasi Cerdas", client: "AI Kreasi Cerdas", title: "AI Automation", tone: "orange", image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-01.jpg" },
  { number: "28", category: "AI Kreasi Cerdas", client: "AI Kreasi Cerdas", title: "Chatbot", tone: "ink", image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-02.jpg" },
  { number: "29", category: "AI Kreasi Cerdas", client: "AI Kreasi Cerdas", title: "Content Generation", tone: "sage", image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-03.jpg" },
  { number: "30", category: "AI Kreasi Cerdas", client: "AI Kreasi Cerdas", title: "Modern Interior", tone: "sun", image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-04.jpg" },
  { number: "31", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "360 Experience", tone: "orange", image: "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg" },
  { number: "32", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Interactive Walkthrough", tone: "ink", image: "/services/virtual-tour-360-gallery/virtual-tour-360-2.jpg" },
  { number: "33", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Immersive Journey", tone: "clay", image: "/services/virtual-tour-360-gallery/virtual-tour-360-3.jpg" },
  { number: "34", category: "Virtual Tour 360", client: "Virtual Tour 360", title: "Discover Every Corner", tone: "sun", image: "/services/virtual-tour-360-gallery/virtual-tour-360-4.jpg" },
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
        <div><p>Berbagai cerita, medium, dan tantangan. Satu standar: karya yang terasa tepat untuk orang yang melihatnya.</p><span>34 projects / 6 disciplines</span></div>
      </section>

      <section className="portfolio-list shell">
        <div className="portfolio-filters"><span>Filter by</span><button className={filter === "Semua" ? "selected" : ""} onClick={() => setFilter("Semua")}>Semua <b>{projects.length}</b></button><button className={filter === "Drone Training" ? "selected" : ""} onClick={() => setFilter("Drone Training")}>Drone Training <b>{projects.filter(p => p.category === "Drone Training").length}</b></button><button className={filter === "North Production" ? "selected" : ""} onClick={() => setFilter("North Production")}>North Production <b>{projects.filter(p => p.category === "North Production").length}</b></button><button className={filter === "North Creative" ? "selected" : ""} onClick={() => setFilter("North Creative")}>North Creative <b>{projects.filter(p => p.category === "North Creative").length}</b></button><button className={filter === "North Photobooth" ? "selected" : ""} onClick={() => setFilter("North Photobooth")}>North Photobooth <b>{projects.filter(p => p.category === "North Photobooth").length}</b></button><button className={filter === "Virtual Tour 360" ? "selected" : ""} onClick={() => setFilter("Virtual Tour 360")}>Virtual Tour 360 <b>{projects.filter(p => p.category === "Virtual Tour 360").length}</b></button><button className={filter === "AI Kreasi Cerdas" ? "selected" : ""} onClick={() => setFilter("AI Kreasi Cerdas")}>AI Kreasi Cerdas <b>{projects.filter(p => p.category === "AI Kreasi Cerdas").length}</b></button></div>
        <div className="portfolio-grid">
          {visibleProjects.map((project) => (
            <article className={`portfolio-card ${project.tone}`} key={project.number}>
              <div className="portfolio-art" style={{ backgroundImage: `linear-gradient(135deg, rgba(23, 15, 9, .18), rgba(23, 15, 9, .64)), url(${project.image})` }}><span>{project.number}</span><em>JCP</em></div>
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
