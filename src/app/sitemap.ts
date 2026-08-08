import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const serviceSlugs = ["north-production", "north-creative", "north-booth", "virtual-tour-360", "drone-training", "ai-kreasi-cerdas"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const mainRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/layanan`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/hubungi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/tentang`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/layanan/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));
  return [...mainRoutes, ...serviceRoutes];
}
