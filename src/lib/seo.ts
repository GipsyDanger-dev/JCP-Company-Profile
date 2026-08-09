import type { Metadata } from "next";

export const SITE_URL = "https://jogjacreativepro.com";
export const SITE_NAME = "Jogja Creative Production";
export const OG_IMAGE = "/og-image.jpg";

/** Shared Organization schema used by home, tentang, and hubungi (single source of truth). */
export function organizationLd(extra?: Record<string, unknown>) {
  return {
    "@type": "Organization",
    name: "PT Jogja Creative Production",
    alternateName: "JCP",
    url: SITE_URL,
    logo: `${SITE_URL}/jcp-logo-nobg.png`,
    sameAs: ["https://www.instagram.com/jogjacreativeproduction/", "https://wa.me/6285600604388"],
    contactPoint: { "@type": "ContactPoint", telephone: "+62-856-0060-4388", contactType: "customer service", areaServed: "ID", availableLanguage: "Indonesian" },
    address: { "@type": "PostalAddress", streetAddress: "Perum Griya Mlati Indah No. B4, Mulungan Kulon, Sendangadi, Mlati", addressLocality: "Sleman", addressRegion: "DI Yogyakarta", postalCode: "55285", addressCountry: "ID" },
    ...extra,
  };
}

/** Build consistent per-page metadata (title, description, canonical, Open Graph, Twitter). */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
