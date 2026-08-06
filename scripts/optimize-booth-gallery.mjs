// One-off: rotate mis-oriented photobooth shots upright and shrink them for web.
// Usage: node scripts/optimize-booth-gallery.mjs
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const dir = "public/services/north-booth-gallery";
const targets = [
  { file: "north-booth-1.jpg", rotate: 0 },
  { file: "north-booth-2.jpg", rotate: 0 },
  { file: "north-booth-3.jpg", rotate: 90 },
  { file: "north-booth-4.jpg", rotate: 90 },
  { file: "north-booth-5.jpg", rotate: 90 },
];

for (const { file, rotate } of targets) {
  const path = `${dir}/${file}`;
  const input = await readFile(path);
  const before = await sharp(input).metadata();
  const output = await sharp(input)
    .rotate(rotate)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(path, output);
  const after = await sharp(output).metadata();
  const mb = (n) => (n / 1024 / 1024).toFixed(2);
  console.log(`${file}: ${before.width}x${before.height} ${mb(input.length)}MB -> ${after.width}x${after.height} ${mb(output.length)}MB (rotate ${rotate})`);
}
