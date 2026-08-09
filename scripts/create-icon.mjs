import sharp from "sharp";

const size = 512;
const radius = 80;
const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`);

await sharp("JCP_logo.jpg")
  .resize(size, size, { fit: "contain", background: { r: 244, g: 240, b: 233 } })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile("scripts/assets/jcp-logo-icon.png");

console.log("rounded icon created");
