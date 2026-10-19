export type PortfolioService = { name: string; slug: string; number: string };

const legacyCategoryServices: Record<string, { slug: string; number: string }> = {
  "drone training": { slug: "drone-training", number: "05" },
  "indonesia drone training centre": { slug: "drone-training", number: "05" },
  "north production": { slug: "north-production", number: "01" },
  "north creative": { slug: "north-creative", number: "02" },
  "north way": { slug: "north-way", number: "02" },
  "north photobooth": { slug: "north-booth", number: "03" },
  "north booth": { slug: "north-booth", number: "03" },
  "virtual tour 360": { slug: "virtual-tour-360", number: "04" },
  "north virtual tour 360": { slug: "virtual-tour-360", number: "04" },
  "ai kreasi cerdas": { slug: "ai-kreasi-cerdas", number: "06" },
};

export function portfolioServiceForCategory(category: unknown, services: PortfolioService[]) {
  if (typeof category !== "string") return undefined;
  const normalized = category.trim().toLocaleLowerCase("id-ID");
  const byName = services.find((service) => service.name.trim().toLocaleLowerCase("id-ID") === normalized);
  if (byName) return byName;

  const identity = legacyCategoryServices[normalized];
  const slug = identity?.slug ?? normalized
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return services.find((service) => service.slug === slug)
    ?? (identity ? services.find((service) => service.number === identity.number) : undefined);
}

export function currentPortfolioCategory(category: unknown, services: PortfolioService[]) {
  return portfolioServiceForCategory(category, services)?.name
    ?? (typeof category === "string" ? category : "");
}
