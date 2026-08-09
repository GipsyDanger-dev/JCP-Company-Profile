import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { PageMotion } from "@/components/page-motion";
import { Footer } from "@/components/footer";
import { PreFooter } from "@/components/pre-footer";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-bebas-neue" });
const dmMono = DM_Mono({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-dm-mono" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181714",
};

const defaultTitle = "Jogja Creative Production | Jasa Foto Video & Drone di Yogyakarta";
const defaultDescription =
  "JCP adalah perusahaan kreatif digital dari Yogyakarta: jasa foto video, branding, photobooth, virtual tour 360°, pelatihan drone, dan solusi berbasis AI untuk bisnis dan event.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/jcp-logo-icon.png",
    apple: "/jcp-logo-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${bebasNeue.variable} ${dmMono.variable} ${manrope.variable}`}>
        <PageMotion>{children}</PageMotion>
        <PreFooter />
        <Footer />
      </body>
    </html>
  );
}
