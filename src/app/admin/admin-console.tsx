"use client";

import { useEffect, useState } from "react";
import { cmsFallbacks } from "@/lib/cms";
import { projects as defaultPortfolioProjects } from "@/app/portfolio/page";

type Content = Record<string, unknown>;
type Service = {
  number: string;
  name: string;
  description: string;
  label: string;
  slug: string;
};
type Photo = {
  image?: string;
  video?: string;
  poster?: string;
  wide?: boolean;
  title: string;
  category: string;
  tone?: string;
};
type Detail = {
  intro?: string;
  audience?: string;
  faq?: string;
  offers?: string[];
  points?: string[];
  gallery?: Photo[];
  mediaVersion?: number;
};

const pages = [
  ["home", "Beranda"],
  ["about", "Tentang"],
  ["services", "Layanan"],
  ["portfolio", "Portofolio"],
  ["contact", "Let's talk"],
] as const;
const labels: Record<string, Record<string, string>> = {
  home: {
    eyebrow: "Nama perusahaan",
    heroTitle: "Judul hero",
    heroIntro: "Keterangan hero",
    heroCta: "Tombol hero",
    manifestoTitle: "Judul pengenalan",
    manifestoCopy: "Keterangan pengenalan",
    snapshotTitle: "Judul profil",
    snapshotParagraph1: "Profil paragraf 1",
    snapshotParagraph2: "Profil paragraf 2",
    workTitle: "Judul portofolio",
    workIntro: "Keterangan portofolio",
    contactTitle: "Judul kontak",
    contactCta: "Tombol kontak",
  },
  about: {
    heroLabel: "Label hero",
    heroTitle: "Judul hero",
    heroIntro: "Keterangan hero",
    storyLabel: "Label cerita",
    storyTitle: "Judul cerita",
    storyCopy: "Cerita paragraf 1",
    storyCopy2: "Cerita paragraf 2",
    profileTitle: "Judul profil",
    profileLabel: "Label profil",
    profileCopy1: "Profil paragraf 1",
    profileCopy2: "Profil paragraf 2",
    directionLabel: "Label arah",
    vision: "Visi",
    valuesLabel: "Label nilai",
    valuesTitle: "Judul nilai",
    valuesIntro: "Pengantar nilai",
    teamLabel: "Label tim",
    teamTitle: "Judul tim",
    assuranceLabel: "Label jaminan",
    assuranceTitle: "Judul jaminan",
    assuranceCopy1: "Jaminan paragraf 1",
    assuranceCopy2: "Jaminan paragraf 2",
  },
  services: { heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
  portfolio: { heroLabel: "Label hero", heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
  contact: {
    title: "Judul utama",
    intro: "Keterangan",
    email: "Email",
    whatsapp: "Nomor WhatsApp",
    whatsappUrl: "Link WhatsApp",
    address: "Alamat studio",
  },
};
const productionPhotos: Photo[] = [1, 2, 3, 4, 5].map((number, index) => ({
  image: `/services/north-production-gallery/north-production-${number}.jpg`,
  title: [
    "Brand Lifestyle Shoot",
    "Corporate Profile",
    "Event Documentation",
    "Product Visual Story",
    "Commercial Content",
  ][index],
  category:
    index === 1 || index === 4 ? "Video Production" : "Photo Production",
  tone: ["orange", "ink", "clay", "sage", "sun"][index],
}));
const creativePhotos: Photo[] = [1, 2, 3, 4, 5].map((number, index) => ({
  image: `/services/north-creative-gallery/north-creative-${number}.jpg`,
  title: [
    "Multi-Platform Presence",
    "Content Planning",
    "Campaign Performance",
    "Audience Engagement",
    "Brand Visual Identity",
  ][index],
  category: [
    "Social Media",
    "Social Media",
    "Content Strategy",
    "Social Media",
    "Branding",
  ][index],
  tone: ["ink", "sun", "clay", "sage", "orange"][index],
}));
const boothDetail: Detail = {
  intro:
    "Layanan dokumentasi event yang dirancang untuk menangkap momen secara profesional dan menyenangkan. Dengan kamera serta pencahayaan berkualitas, kami menyediakan booth yang mudah digunakan, cepat, dan menghasilkan foto maupun video siap dibagikan secara instan.",
  audience:
    "Event perusahaan, gathering, festival, hingga event promosi yang membutuhkan dokumentasi berkualitas sekaligus pengalaman interaktif bagi pengunjung.",
  offers: [
    "Photo booth & video booth untuk dokumentasi event",
    "Desain booth modern yang dapat disesuaikan dengan tema dan identitas acara",
    "Hasil foto dan video berkualitas tinggi",
    "Instant sharing ke media sosial",
  ],
  points: [
    "Kualitas kamera profesional",
    "Desain booth modern & customizable",
    "Instant sharing",
    "Beragam mode dan efek kreatif",
    "Tim operator profesional",
  ],
  faq: "Konfigurasi booth disesuaikan dengan venue, tema acara, kebutuhan branding, dan durasi event.",
  gallery: [
    {
      video: "/services/north-booth-gallery/north-booth-360.mp4",
      poster: "/services/north-booth-gallery/north-booth-1.jpg",
      image: "/services/north-booth-gallery/north-booth-1.jpg",
      title: "360 Video Booth",
      category: "Motion / 360 Capture",
      tone: "orange",
      wide: true,
    },
    ...[1, 2, 3, 4, 5].map((number, index) => ({
      image: `/services/north-booth-gallery/north-booth-${number}.jpg`,
      title: [
        "360 Booth Activation",
        "Guest Moments",
        "Instant Capture",
        "Group Session",
        "Props & Play",
      ][index],
      category: [
        "Event Experience",
        "Event Documentation",
        "Photo Booth",
        "Event Experience",
        "Photo Booth",
      ][index],
      tone: ["orange", "ink", "clay", "sage", "sun"][index],
    })),
  ],
};
const virtualTourDetail: Detail = {
  intro:
    "Layanan tour virtual interaktif yang memungkinkan pengguna menjelajahi ruang atau fasilitas secara 360°. Dengan kualitas visual tinggi dan navigasi yang mudah, klien dapat menampilkan lokasi mereka secara menarik dan informatif, kapan saja dan dari mana saja.",
  audience:
    "Properti, hotel, sekolah, pabrik, showroom, dan destinasi wisata yang ingin memberikan pengalaman kunjungan virtual dengan detail yang realistis dan profesional.",
  offers: [
    "Pemotretan 360° berkualitas tinggi",
    "Navigasi interaktif",
    "Custom branding interface",
    "Cross-platform ready",
  ],
  points: [
    "Menyajikan ruang dan fasilitas secara menarik serta informatif",
    "Memudahkan calon pengunjung menjelajah dari mana saja",
    "Memberikan pengalaman kunjungan virtual yang realistis dan profesional",
  ],
  faq: "Cakupan titik panorama dan elemen interaktif ditentukan melalui survei lokasi dan tujuan pengalaman.",
  gallery: [
    {
      video: "/services/virtual-tour-360-gallery/virtual-tour-360-1.mp4",
      poster: "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg",
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg",
      title: "360 Experience",
      category: "360 Capture",
      tone: "orange",
    },
    {
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg",
      title: "Interactive Walkthrough",
      category: "360 Tour",
      tone: "ink",
    },
    {
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-2.jpg",
      title: "Immersive Journey",
      category: "Virtual Experience",
      tone: "clay",
    },
    {
      video: "/services/virtual-tour-360-gallery/virtual-tour-360-2.mp4",
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-2.jpg",
      title: "Guided Experience",
      category: "360 Tour",
      tone: "sage",
    },
    {
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-3.jpg",
      title: "Discover Every Corner",
      category: "Virtual Tour",
      tone: "sun",
    },
    {
      video: "/services/virtual-tour-360-gallery/virtual-tour-360-3.mp4",
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-3.jpg",
      title: "Smooth Navigation",
      category: "360 Experience",
      tone: "ink",
    },
    {
      image: "/services/virtual-tour-360-gallery/virtual-tour-360-4.jpg",
      title: "Seamless Story",
      category: "Virtual Tour",
      tone: "clay",
    },
  ],
};
const droneTrainingDetail: Detail = {
  intro:
    "Layanan pelatihan drone yang berfokus pada keterampilan terbang, pengoperasian kamera, dan keselamatan penerbangan. Peserta belajar langsung melalui praktik di lapangan dengan panduan instruktur berpengalaman, mulai dari tingkat dasar hingga mahir. Pelatihan ini dirancang agar setiap peserta mampu menguasai teknik penerbangan dengan aman, menghasilkan footage yang stabil, serta memahami prosedur operasional sesuai standar.",
  audience:
    "Hobi, dokumentasi profesional, hingga kebutuhan industri yang ingin meningkatkan keterampilan pengoperasian drone secara terarah.",
  offers: [
    "Pelatihan dari tingkat dasar hingga mahir",
    "Keterampilan terbang",
    "Pengoperasian kamera",
    "Keselamatan penerbangan",
    "Praktik langsung di lapangan",
    "Prosedur operasional sesuai standar",
  ],
  points: [
    "Instruktur berpengalaman",
    "Fokus pada teknik penerbangan yang aman",
    "Membantu peserta menghasilkan footage yang stabil",
  ],
  faq: "Materi dan durasi pelatihan menyesuaikan kemampuan awal peserta serta kebutuhan organisasi.",
  gallery: [1, 2, 3, 4, 5, 6].map((number, index) => ({
    image: `/services/drone-training-gallery/drone-training-${number}.jpg`,
    title: [
      "Pelatihan Drone Mapping untuk Masyarakat Umum",
      "Berbagai Jenis Drone untuk Pelatihan",
      "Pelatihan Drone bersama Komunitas Mahasiswa",
      "Pelatihan Drone untuk Tanggap Bencana",
      "Pelatihan Drone Dinas Tenaga Kerja Kabupaten Sleman",
      "Pelatihan Drone Pertanian",
    ][index],
    category: "Drone Training",
    tone: ["orange", "ink", "clay", "sage", "sun", "paper"][index],
  })),
};
const aiDetail: Detail = {
  intro:
    "Solusi menggunakan AI tools yang dirancang dinamis sesuai kebutuhan setiap pelanggan.",
  audience:
    "Bisnis dan organisasi yang ingin mengeksplorasi pemanfaatan AI untuk kebutuhan kreatif maupun alur kerja yang lebih sesuai dengan tujuan mereka.",
  offers: [
    "Pemetaan kebutuhan pelanggan",
    "Rancangan solusi berbasis AI tools",
    "Konfigurasi yang disesuaikan dengan kebutuhan",
    "Pendampingan penerapan solusi",
  ],
  points: [
    "Pendekatan dinamis sesuai kebutuhan",
    "Berangkat dari tujuan dan konteks pelanggan",
    "Solusi yang dapat disesuaikan seiring kebutuhan berkembang",
  ],
  faq: "Setiap solusi dirancang melalui diskusi kebutuhan agar AI tools yang digunakan relevan dengan tujuan pelanggan.",
  gallery: [
    {
      image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-01.jpg",
      title: "AI Automation",
      category: "AI Automation",
      tone: "orange",
    },
    {
      image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-02.jpg",
      title: "Chatbot",
      category: "AI Design",
      tone: "ink",
    },
    {
      video: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-01.mp4",
      poster: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-01.jpg",
      title: "AI Workflow",
      category: "AI Process",
      tone: "clay",
    },
    {
      image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-03.jpg",
      title: "Content Generation",
      category: "AI Content",
      tone: "sage",
    },
    {
      image: "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-04.jpg",
      title: "Modern Interior",
      category: "AI Styling",
      tone: "sun",
    },
  ],
};
const serviceDefaults: Record<string, Detail> = {
  "north-booth": boothDetail,
  "virtual-tour-360": virtualTourDetail,
  "drone-training": droneTrainingDetail,
  "ai-kreasi-cerdas": aiDetail,
};

function ArrayEditor({ title, items, fields, onChange, onRemove, onAdd }: { title: string; items: unknown; fields: (string | null)[]; onChange: (index: number, field: string | null, value: string) => void; onRemove: (index: number) => void; onAdd: () => void }) {
  const rows = Array.isArray(items) ? items : [];
  return <section className="admin-array-editor"><div className="admin-array-heading"><h3>{title}</h3><button type="button" className="add-row" onClick={onAdd}>+ Tambah</button></div>{rows.map((item, index) => <article key={index}>{fields.map((field) => { const value = field ? String((item as Record<string, unknown>)?.[field] ?? "") : String(item ?? ""); return <label key={field ?? "value"}>{field ? field : title}<textarea value={value} onChange={(event) => onChange(index, field, event.target.value)} /></label>; })}<button type="button" className="danger-button" onClick={() => onRemove(index)}>Hapus</button></article>)}</section>;
}

export function AdminConsole() {
  const [data, setData] = useState<Record<string, Content>>(
    cmsFallbacks as Record<string, Content>,
  );
  const [page, setPage] = useState("home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [portfolioCategory, setPortfolioCategory] = useState("Semua");
  const [selected, setSelected] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const content = data[page] ?? {};
  const services = (data.services?.items as Service[]) ?? [];
  const service =
    page === "services" && selected !== null ? services[selected] : undefined;
  const details = (data["service-details"] ?? {}) as Record<string, Detail>;
  const detail = service
    ? {
        ...(serviceDefaults[service.slug] ?? {}),
        ...(details[service.slug] ?? {}),
      }
    : {};
  const rawGallery = detail.gallery ?? [];
  const defaultGallery =
    service?.slug === "north-production"
      ? productionPhotos
      : service?.slug === "north-creative"
        ? creativePhotos
        : service
          ? serviceDefaults[service.slug]?.gallery ?? []
          : [];
  const gallery = detail.mediaVersion === 1
    ? rawGallery
    : [...rawGallery, ...defaultGallery.filter((defaultItem) => !rawGallery.some((item) =>
      defaultItem.video ? item.video === defaultItem.video : item.image === defaultItem.image
    ))];
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: { key: string; value: Content }[]) => {
        if (rows.length)
          setData((old) => ({
            ...old,
            ...Object.fromEntries(rows.map((row) => [row.key, row.value])),
          }));
      });
  }, []);
  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>(".admin-shell aside");
    if (!sidebar) return;
    const scrollSidebar = (event: WheelEvent) => {
      if (!event.deltaY) return;
      sidebar.scrollTop += event.deltaY;
      event.preventDefault();
    };
    sidebar.addEventListener("wheel", scrollSidebar, { passive: false });
    return () => sidebar.removeEventListener("wheel", scrollSidebar);
  }, []);
  const update = (key: string, value: Content) =>
    setData((old) => ({ ...old, [key]: value }));
  const updateDetail = (next: Detail) => {
    if (service)
      update("service-details", { ...details, [service.slug]: next });
  };
  const updatePhoto = (index: number, key: keyof Photo, value: string) =>
    updateDetail({
      ...detail,
      gallery: gallery.map((photo, i) =>
        i === index ? { ...photo, [key]: value } : photo,
      ),
    });
  const updateList = (key: "offers" | "points", index: number, value: string) =>
    updateDetail({
      ...detail,
      [key]: (detail[key] ?? []).map((item, i) => (i === index ? value : item)),
    });
  const updateAboutArray = (key: string, index: number, field: string | null, value: string, pageKey = "about") => {
    const list = Array.isArray(content[key]) ? [...(content[key] as unknown[])] : [];
    list[index] = field ? { ...(list[index] as Record<string, unknown>), [field]: value } : value;
    update(pageKey, { ...content, [key]: list });
  };
  const addAboutArray = (key: string, value: unknown, pageKey = "about") =>
    update(pageKey, { ...content, [key]: [...(Array.isArray(content[key]) ? (content[key] as unknown[]) : []), value] });
  const removeAboutArray = (key: string, index: number, pageKey = "about") =>
    update(pageKey, { ...content, [key]: (Array.isArray(content[key]) ? (content[key] as unknown[]) : []).filter((_, i) => i !== index) });
  async function addVideo(file: File | null) {
    if (!file || !service) return;
    setBusy(true);
    setNotice("");
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error ?? "Upload video gagal.");
      updateDetail({
        ...detail,
        gallery: [...gallery, { video: result.url, title: file.name.replace(/\.[^.]+$/, ""), category: "Video", tone: "ink" }],
      });
      setNotice("Video ditambahkan. Klik Simpan perubahan untuk menayangkannya.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Upload video gagal.");
    }
    setBusy(false);
  }
  async function save() {
    setBusy(true);
    setNotice("");
    try {
      for (const key of service ? ["services", "service-details"] : [page]) {
        const value =
          key === "service-details" && service
            ? { ...details, [service.slug]: { ...detail, gallery, mediaVersion: 1 } }
            : data[key];
        const response = await fetch("/api/admin/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });
        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody.error ?? `Gagal menyimpan ${key} (${response.status}).`);
        }
      }
      setNotice("Tersimpan. Perubahan langsung tampil di website.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Gagal menyimpan perubahan.");
    }
    setBusy(false);
  }
  return (
    <main className="admin-shell">
      <aside
        tabIndex={0}
        aria-label="Navigasi admin"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            event.currentTarget.scrollBy({
              top: event.key === "ArrowDown" ? 72 : -72,
              behavior: "smooth",
            });
          }
        }}
      >
        <a className="admin-brand" href="/">
          JCP<span>ADMINISTRATOR</span>
        </a>
        <p>
          Kelola seluruh konten halaman situs. Klik menu lalu gunakan ↑ atau ↓
          untuk menggulir daftar menu.
        </p>
        <nav>
          {pages.map(([key, label]) =>
            key !== "services" && key !== "portfolio" ? (
              <button
                key={key}
                className={page === key ? "active" : ""}
                onClick={() => {
                  setPage(key);
                  setSelected(null);
                }}
              >
                {label}
              </button>
            ) : key === "services" ? (
              <div className="admin-subnav" key={key}>
                <button
                  className={page === key ? "active" : ""}
                  onClick={() => {
                    setPage(key);
                    setSelected(null);
                    setServicesOpen((open) => !open);
                  }}
                >
                  Layanan <span>{servicesOpen ? "−" : "+"}</span>
                </button>
                {servicesOpen && (
                  <div>
                    {services.map((item, index) => (
                      <div className="admin-service-nav-row" key={item.slug}>
                      <button
                        className={selected === index ? "active-sub" : ""}
                        onClick={() => {
                          setPage("services");
                          setSelected(index);
                        }}
                      >
                        {item.number} · {item.name}
                      </button></div>
                    ))}
                    <button
                      className="add-sub"
                      onClick={() => {
                        update("services", {
                          ...data.services,
                          items: [
                            ...services,
                            {
                              number: String(services.length + 1).padStart(
                                2,
                                "0",
                              ),
                              name: "Layanan baru",
                              description: "Keterangan layanan",
                              label: "Kategori",
                              slug: `layanan-${services.length + 1}`,
                            },
                          ],
                        });
                        setPage("services");
                        setSelected(services.length);
                      }}
                    >
                      + Tambah layanan
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="admin-subnav" key={key}><button className={page === "portfolio" ? "active" : ""} onClick={() => { setPage("portfolio"); setSelected(null); setPortfolioOpen((open) => !open); }}>Portofolio <span>{portfolioOpen ? "−" : "+"}</span></button>{portfolioOpen && <div><button className={portfolioCategory === "Semua" ? "active-sub" : ""} onClick={() => { setPage("portfolio"); setPortfolioCategory("Semua"); }}>Semua (34 proyek)</button>{["Drone Training", "North Production", "North Creative", "North Photobooth", "Virtual Tour 360", "AI Kreasi Cerdas"].map((category) => <button key={category} className={portfolioCategory === category ? "active-sub" : ""} onClick={() => { setPage("portfolio"); setPortfolioCategory(category); }}>{category}</button>)}<button className="add-sub" onClick={() => { setPage("portfolio"); setPortfolioCategory("Semua"); }}>+ Tambah proyek</button></div>}</div>
            ),
          )}
        </nav>
      </aside>
      <section className="admin-editor">
        <header>
          <div>
            <p>KELOLA HALAMAN</p>
            <h1>{service?.name ?? pages.find(([key]) => key === page)?.[1]}</h1>
            <span>
              {service
                ? "Detail layanan & folder Selected Work"
                : "Ubah konten halaman"}
            </span>
          </div>
          <a
            target="_blank"
            href={
              service
                ? `/layanan/${service.slug}`
                : page === "home"
                  ? "/"
                  : `/${page === "about" ? "tentang" : page === "contact" ? "hubungi" : page}`
            }
          >
            Lihat halaman ↗
          </a>
        </header>
        {service ? (
          <>
            <div className="admin-help">
              <strong>Folder foto & video Selected Work</strong>
              <span>
                Media dari halaman website sudah tersedia. Ubah nama/kategori
                atau hapus satu media, lalu simpan.
              </span>
            </div>
            <div className="admin-fields">
              <label>
                Nama layanan
                <input
                  value={service.name}
                  onChange={(event) =>
                    update("services", {
                      ...data.services,
                      items: services.map((item, index) =>
                        index === selected
                          ? { ...item, name: event.target.value }
                          : item,
                      ),
                    })
                  }
                />
              </label>
              <label>
                Slug / URL detail
                <input value={service.slug} readOnly />
              </label>
              <label>
                Deskripsi halaman
                <textarea
                  value={detail.intro ?? ""}
                  onChange={(event) =>
                    updateDetail({ ...detail, intro: event.target.value })
                  }
                />
              </label>
              <label>
                Target klien
                <textarea
                  value={detail.audience ?? ""}
                  onChange={(event) =>
                    updateDetail({ ...detail, audience: event.target.value })
                  }
                />
              </label>
              <label>
                FAQ
                <textarea
                  value={detail.faq ?? ""}
                  onChange={(event) =>
                    updateDetail({ ...detail, faq: event.target.value })
                  }
                />
              </label>
            </div>
            <section className="admin-repeaters">
              <h2>Yang kami kerjakan</h2>
              {(detail.offers ?? []).map((item, index) => (
                <div key={index}>
                  <input
                    value={item}
                    onChange={(event) =>
                      updateList("offers", index, event.target.value)
                    }
                  />
                  <button
                    onClick={() =>
                      updateDetail({
                        ...detail,
                        offers: (detail.offers ?? []).filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                className="add-row"
                onClick={() =>
                  updateDetail({
                    ...detail,
                    offers: [...(detail.offers ?? []), ""],
                  })
                }
              >
                + Tambah penawaran
              </button>
              <h2>Kenapa JCP</h2>
              {(detail.points ?? []).map((item, index) => (
                <div key={index}>
                  <input
                    value={item}
                    onChange={(event) =>
                      updateList("points", index, event.target.value)
                    }
                  />
                  <button
                    onClick={() =>
                      updateDetail({
                        ...detail,
                        points: (detail.points ?? []).filter(
                          (_, i) => i !== index,
                        ),
                      })
                    }
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                className="add-row"
                onClick={() =>
                  updateDetail({
                    ...detail,
                    points: [...(detail.points ?? []), ""],
                  })
                }
              >
                + Tambah keunggulan
              </button>
              <h2>Folder foto & video Selected Work</h2>
              {gallery.map((photo, index) => (
                <article
                  className="admin-photo-card"
                  key={`${photo.image}-${index}`}
                >
                  {photo.video ? (
                    <video
                      src={photo.video}
                      poster={photo.poster ?? photo.image}
                      controls
                      muted
                      playsInline
                    />
                  ) : photo.image && (
                    <img
                      src={photo.image}
                      alt={photo.title || "Preview foto"}
                    />
                  )}
                  <label>
                    Nama foto
                    <input
                      value={photo.title}
                      onChange={(event) =>
                        updatePhoto(index, "title", event.target.value)
                      }
                    />
                  </label>
                  <label>
                    Kategori
                    <input
                      value={photo.category}
                      onChange={(event) =>
                        updatePhoto(index, "category", event.target.value)
                      }
                    />
                  </label>
                  <label>
                    URL foto
                    <input
                      value={photo.image ?? ""}
                      onChange={(event) =>
                        updatePhoto(index, "image", event.target.value)
                      }
                    />
                  </label>
                  <label>
                    URL video (opsional)
                    <input
                      value={photo.video ?? ""}
                      placeholder="/services/.../video.mp4"
                      onChange={(event) =>
                        updatePhoto(index, "video", event.target.value)
                      }
                    />
                  </label>
                  {photo.video && (
                    <label>
                      URL poster video (opsional)
                      <input
                        value={photo.poster ?? ""}
                        placeholder="/services/.../thumbnail.jpg"
                        onChange={(event) =>
                          updatePhoto(index, "poster", event.target.value)
                        }
                      />
                    </label>
                  )}
                  <button
                    onClick={() =>
                      updateDetail({
                        ...detail,
                        gallery: gallery.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Hapus foto
                  </button>
                </article>
              ))}
              <div className="admin-media-actions">
                <button
                  type="button"
                  className="add-row"
                  onClick={() =>
                    updateDetail({
                      ...detail,
                      gallery: [
                        ...gallery,
                        {
                          image: "",
                          title: "Foto baru",
                          category: "Kategori",
                          tone: "orange",
                        },
                      ],
                    })
                  }
                >
                  + Tambah foto
                </button>
                <label className="admin-video-upload">
                  <b>+ Tambah video</b>
                  <input type="file" accept="video/mp4,video/webm,video/quicktime" disabled={busy} onChange={(event) => { void addVideo(event.target.files?.[0] ?? null); event.currentTarget.value = ""; }} />
                </label>
              </div>
            </section>
          </>
        ) : (
          <>
          <div className="admin-fields">
            {Object.entries(labels[page] ?? {}).map(([key, label]) => (
              <label key={key}>
                {label}
                {/(intro|copy|paragraph|vision)/i.test(key) ? (
                  <textarea
                    value={String(content[key] ?? "")}
                    onChange={(event) =>
                      update(page, { ...content, [key]: event.target.value })
                    }
                  />
                ) : (
                  <input
                    value={String(content[key] ?? "")}
                    onChange={(event) =>
                      update(page, { ...content, [key]: event.target.value })
                    }
                  />
                )}
              </label>
            ))}
          </div>
          {page === "about" && <div className="admin-about-arrays">
            <h2>Konten berulang halaman Tentang</h2>
            <ArrayEditor title="Unit bisnis" items={content.units} fields={["name", "description", "tags"]} onChange={(i, f, v) => updateAboutArray("units", i, f, v)} onRemove={(i) => removeAboutArray("units", i)} onAdd={() => addAboutArray("units", { name: "Unit baru", description: "Deskripsi unit", tags: "Tag" })} />
            <ArrayEditor title="Misi" items={content.mission} fields={[null]} onChange={(i, f, v) => updateAboutArray("mission", i, null, v)} onRemove={(i) => removeAboutArray("mission", i)} onAdd={() => addAboutArray("mission", "Misi baru")} />
            <ArrayEditor title="Nilai" items={content.values} fields={["number", "title", "description"]} onChange={(i, f, v) => updateAboutArray("values", i, f, v)} onRemove={(i) => removeAboutArray("values", i)} onAdd={() => addAboutArray("values", { number: "01", title: "Nilai baru", description: "Deskripsi nilai" })} />
            <ArrayEditor title="Tim" items={content.teams} fields={["group", "names", "role"]} onChange={(i, f, v) => updateAboutArray("teams", i, f, v)} onRemove={(i) => removeAboutArray("teams", i)} onAdd={() => addAboutArray("teams", { group: "Tim baru", names: "Nama", role: "Peran" })} />
            <ArrayEditor title="Legal" items={content.legal} fields={["label", "text"]} onChange={(i, f, v) => updateAboutArray("legal", i, f, v)} onRemove={(i) => removeAboutArray("legal", i)} onAdd={() => addAboutArray("legal", { label: "Legal", text: "Keterangan" })} />
          </div>}
          {page === "portfolio" && <div className="admin-about-arrays"><h2>Filter dan proyek portofolio</h2><ArrayEditor title="Kategori filter" items={content.categories ?? ["Drone Training", "North Production", "North Creative", "North Photobooth", "Virtual Tour 360", "AI Kreasi Cerdas"]} fields={[null]} onChange={(i, f, v) => updateAboutArray("categories", i, null, v, "portfolio")} onRemove={(i) => removeAboutArray("categories", i, "portfolio")} onAdd={() => addAboutArray("categories", "Kategori baru", "portfolio")} /><ArrayEditor title="Proyek (34)" items={content.projects ?? defaultPortfolioProjects} fields={["number", "category", "client", "title", "image", "tone"]} onChange={(i, f, v) => updateAboutArray("projects", i, f, v, "portfolio")} onRemove={(i) => removeAboutArray("projects", i, "portfolio")} onAdd={() => addAboutArray("projects", { number: "01", category: "Kategori", client: "Klien", title: "Proyek baru", image: "/portfolio/", tone: "orange" }, "portfolio")} /></div>}
          </>
        )}
        <div className="admin-actions">
          <button onClick={save} disabled={busy}>
            {busy ? "Menyimpan…" : "Simpan perubahan"}
          </button>
          {service && <button className="danger-button admin-delete-current" onClick={() => { if (window.confirm(`Hapus layanan ${service.name}?`)) { const next = services.filter((item) => item.slug !== service.slug).map((item, index) => ({ ...item, number: String(index + 1).padStart(2, "0") })); update("services", { ...data.services, items: next }); setSelected(null); } }}>Hapus layanan</button>}
          {notice && <p>{notice}</p>}
        </div>
      </section>
    </main>
  );
}
