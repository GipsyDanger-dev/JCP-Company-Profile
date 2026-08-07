import type { Metadata } from "next";
import "./globals.css";
import { PageMotion } from "@/components/page-motion";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Jogja Creative Production | Digital Creative Best Solution",
  description: "One-stop creative solution for visual production, branding, and digital experiences.",
  icons: {
    icon: "/jcp-logo-icon.png",
    apple: "/jcp-logo-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body><PageMotion>{children}</PageMotion><Footer /></body>
    </html>
  );
}
