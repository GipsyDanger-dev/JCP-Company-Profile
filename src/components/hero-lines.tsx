"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

// Wrapper client: next/dynamic dengan ssr:false hanya boleh dipakai di Client
// Component. Three.js (83KB) dimuat terpisah dari bundle awal sehingga tidak
// menghambat LCP hero; hero tetap tampil dengan background gelap + teks saat
// chunk sedang dimuat.
const FloatingLines = dynamic(
  () => import("./floating-lines").then((m) => m.FloatingLines),
  { ssr: false }
);

export function HeroLines(props: ComponentProps<typeof FloatingLines>) {
  return <FloatingLines {...props} />;
}
