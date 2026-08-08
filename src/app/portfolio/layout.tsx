import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Portofolio JCP | 34 Proyek Foto, Video, Drone & Event",
  "Jelajahi 34 proyek pilihan Jogja Creative Production: pelatihan drone, foto video, photobooth, virtual tour 360°, hingga solusi AI — untuk bisnis dan event di Indonesia.",
  "/portfolio"
);

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
