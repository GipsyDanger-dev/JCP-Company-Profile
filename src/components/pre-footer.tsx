"use client";

import { usePathname } from "next/navigation";

export function PreFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/portfolio" || pathname === "/tentang" || pathname.startsWith("/admin")) return null;
  return <section className="contact-cta is-transition-only shell" aria-hidden="true" />;
}
