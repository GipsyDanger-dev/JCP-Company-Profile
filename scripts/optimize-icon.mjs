import sharp from "sharp";

// Sumber: master icon 512x512 hasil create-icon.mjs (rounded + background krem),
// disimpan di luar public/ agar tidak terpublikasikan sebagai URL.
// Favicon & apple-touch-icon cukup beresolusi kecil; resize + palette PNG
// menekan bobot dari ~102KB menjadi beberapa KB tanpa perubahan visual berarti.
const source = "scripts/assets/jcp-logo-icon.png";

await sharp(source)
  .resize(32, 32, { fit: "contain" })
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile("public/favicon-32x32.png");

await sharp(source)
  .resize(180, 180, { fit: "contain" })
  .png({ palette: true, quality: 95, compressionLevel: 9 })
  .toFile("public/apple-touch-icon.png");

console.log("optimized icons created: favicon-32x32.png, apple-touch-icon.png");
