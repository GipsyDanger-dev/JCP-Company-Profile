"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

export function PageMotion({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = container.current?.querySelectorAll("main > section, main > footer") ?? [];
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline.fromTo(container.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42 });
    if (sections.length) timeline.fromTo(sections, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.055 }, 0.08);
  }, { scope: container, dependencies: [pathname], revertOnUpdate: true });

  return <div className="page-motion" ref={container}>{children}</div>;
}
