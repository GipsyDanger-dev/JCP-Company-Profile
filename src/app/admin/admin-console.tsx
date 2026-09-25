"use client";

import { useEffect, useState } from "react";
import { cmsFallbacks } from "@/lib/cms";

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
    heroTitle: "Judul hero",
    heroIntro: "Keterangan hero",
    storyTitle: "Judul cerita",
    storyCopy: "Cerita paragraf 1",
    storyCopy2: "Cerita paragraf 2",
    profileTitle: "Judul profil",
    profileCopy1: "Profil paragraf 1",
    profileCopy2: "Profil paragraf 2",
    vision: "Visi",
    teamTitle: "Judul tim",
  },
  services: { heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
  portfolio: { heroTitle: "Judul utama", heroIntro: "Keterangan hero" },
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

export function AdminConsole() {
  const [data, setData] = useState<Record<string, Content>>(
    cmsFallbacks as Record<string, Content>,
  );
  const [page, setPage] = useState("home");
  const [servicesOpen, setServicesOpen] = useState(false);
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
        if (!response.ok) throw new Error();
      }
      setNotice("Tersimpan. Perubahan langsung tampil di website.");
    } catch {
      setNotice("Gagal menyimpan perubahan.");
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
            key !== "services" ? (
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
            ) : (
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
                      </button><button className="admin-service-delete" title="Hapus layanan" onClick={(event) => { event.stopPropagation(); if (window.confirm(`Hapus layanan ${item.name}?`)) { const next = services.filter((_, serviceIndex) => serviceIndex !== index).map((serviceItem, serviceIndex) => ({ ...serviceItem, number: String(serviceIndex + 1).padStart(2, "0") })); update("services", { ...data.services, items: next }); if (selected === index) setSelected(null); } }}>×</button></div>
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
        )}
        <div className="admin-actions">
          <button onClick={save} disabled={busy}>
            {busy ? "Menyimpan…" : "Simpan perubahan"}
          </button>
          {notice && <p>{notice}</p>}
        </div>
      </section>
    </main>
  );
}
