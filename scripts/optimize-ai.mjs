import sharp from "sharp";
import { copyFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const srcDir = "D:\\1\\Foto untuk Adam\\06 AI Kreasi Cerdas";
const outDir = "public/services/ai-kreasi-cerdas-gallery";

const files = (await readdir(srcDir)).sort();
console.log("source files:", files);

let imgIdx = 1;
let videoIdx = 1;
for (const f of files) {
  const src = join(srcDir, f);
  if (f.toLowerCase().endsWith(".mp4")) {
    const out = join(outDir, `ai-kreasi-cerdas-${String(videoIdx).padStart(2, "0")}.mp4`);
    await copyFile(src, out);
    console.log(`VIDEO ${f} -> ${out}`);
    videoIdx++;
  } else if (f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".jpeg")) {
    const out = join(outDir, `ai-kreasi-cerdas-${String(imgIdx).padStart(2, "0")}.jpg`);
    await sharp(src)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(out);
    console.log(`JPG   ${f} -> ${out}`);
    imgIdx++;
  }
}
