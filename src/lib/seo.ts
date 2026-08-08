import type { Metadata } from "next";

export const SITE_URL = "https://jogjacreativepro.com";
export const SITE_NAME = "Jogja Creative Production";
export const OG_IMAGE = "/og-image.jpg";

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
