"use client";

import { usePathname } from "next/navigation";

export function PreFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (pathname === "/portfolio" || pathname === "/tentang") {
    return <section className="pre-footer-dark" aria-hidden="true" />;
  }
  return <section className="contact-cta is-transition-only shell" aria-hidden="true" />;
}
