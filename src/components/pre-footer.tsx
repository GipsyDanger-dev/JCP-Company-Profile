"use client";

import { usePathname } from "next/navigation";

export function PreFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null; // landing sudah punya CTA sendiri
  return <section className="contact-cta is-transition-only shell" aria-hidden="true" />;
}
