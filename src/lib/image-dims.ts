/**
 * Dimensi asli gambar galeri layanan (diukur dari source di /public).
 * Dipakai oleh next/image untuk menghindari layout shift (CLS) dan
 * menghasilkan srcset yang akurat. Update jika ada gambar galeri baru
 * (ukur dengan: node scripts/measure-images.mjs).
 */
export const imageDims: Record<string, { width: number; height: number }> = {
  "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-01.jpg": { width: 736, height: 1104 },
  "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-02.jpg": { width: 1200, height: 2200 },
  "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-03.jpg": { width: 832, height: 1472 },
  "/services/ai-kreasi-cerdas-gallery/ai-kreasi-cerdas-04.jpg": { width: 564, height: 564 },
  "/services/drone-training-gallery/drone-training-1.jpg": { width: 1000, height: 1500 },
  "/services/drone-training-gallery/drone-training-2.jpg": { width: 1200, height: 800 },
  "/services/drone-training-gallery/drone-training-3.jpg": { width: 1200, height: 800 },
  "/services/drone-training-gallery/drone-training-4.jpg": { width: 1200, height: 676 },
  "/services/drone-training-gallery/drone-training-5.jpg": { width: 1200, height: 900 },
  "/services/drone-training-gallery/drone-training-6.jpg": { width: 1200, height: 1800 },
  "/services/north-booth-gallery/north-booth-1.jpg": { width: 1600, height: 1067 },
  "/services/north-booth-gallery/north-booth-2.jpg": { width: 1600, height: 1067 },
  "/services/north-booth-gallery/north-booth-3.jpg": { width: 1600, height: 2127 },
  "/services/north-booth-gallery/north-booth-4.jpg": { width: 1600, height: 2400 },
  "/services/north-booth-gallery/north-booth-5.jpg": { width: 1600, height: 2400 },
  "/services/north-creative-gallery/north-creative-1.jpg": { width: 563, height: 308 },
  "/services/north-creative-gallery/north-creative-2.jpg": { width: 736, height: 1104 },
  "/services/north-creative-gallery/north-creative-3.jpg": { width: 736, height: 701 },
  "/services/north-creative-gallery/north-creative-4.jpg": { width: 564, height: 564 },
  "/services/north-creative-gallery/north-creative-5.jpg": { width: 735, height: 1103 },
  "/services/north-production-gallery/north-production-1.jpg": { width: 1680, height: 1120 },
  "/services/north-production-gallery/north-production-2.jpg": { width: 736, height: 1104 },
  "/services/north-production-gallery/north-production-3.jpg": { width: 2731, height: 4096 },
  "/services/north-production-gallery/north-production-4.jpg": { width: 1200, height: 1600 },
  "/services/north-production-gallery/north-production-5.jpg": { width: 564, height: 845 },
  "/services/virtual-tour-360-gallery/virtual-tour-360-1.jpg": { width: 736, height: 414 },
  "/services/virtual-tour-360-gallery/virtual-tour-360-2.jpg": { width: 564, height: 368 },
  "/services/virtual-tour-360-gallery/virtual-tour-360-3.jpg": { width: 563, height: 427 },
  "/services/virtual-tour-360-gallery/virtual-tour-360-4.jpg": { width: 564, height: 282 },
};

const missingWarned = new Set<string>();

/** Ambil dimensi gambar galeri; default 4:3 + peringatan (dev) jika belum ada di peta. */
export function getImageDims(src: string): { width: number; height: number } {
  const dims = imageDims[src];
  if (!dims && process.env.NODE_ENV !== "production" && !missingWarned.has(src)) {
    missingWarned.add(src);
    console.warn(`[image-dims] Dimensi belum terdaftar untuk ${src} — tambahkan ke src/lib/image-dims.ts`);
  }
  return dims ?? { width: 1600, height: 1200 };
}
