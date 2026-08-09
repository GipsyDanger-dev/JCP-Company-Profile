import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const logos = [
  "services/north-production-logo.jpg",
  "services/north-creative-logo.jpg",
  "services/north-booth-logo.jpg",
  "services/virtual-tour-360-logo.jpg",
  "services/drone-training-logo.jpg",
  "services/ai-kreasi-cerdas-logo.jpg",
];

for (const file of logos) {
  const meta = await sharp(`public/${file}`).metadata();
  console.log(`/${file} ${meta.width}x${meta.height}`);
}

console.log("---GALERI---");
async function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(p);
    } else if (/\d+\.(jpe?g|png)$/i.test(entry.name)) {
      const meta = await sharp(p).metadata();
      console.log(`/${p.replace(/\\/g, "/")} ${meta.width}x${meta.height}`);
    }
  }
}
await walk("public/services");
