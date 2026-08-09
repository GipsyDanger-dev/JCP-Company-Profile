import fs from "node:fs";

const mode = process.argv[2] ?? "mobile";
const file = process.argv[3] ?? `lcp-${mode}.json`;
const r = JSON.parse(fs.readFileSync(file, "utf8"));
const a = r.audits;
const fmt = (id) => a[id]?.displayValue ?? "-";

console.log(`=== ${mode.toUpperCase()} ===`);
console.log("Perf score:", Math.round(r.categories.performance.score * 100));
console.log(
  `LCP: ${fmt("largest-contentful-paint")} | FCP: ${fmt("first-contentful-paint")} | TBT: ${fmt("total-blocking-time")} | CLS: ${fmt("cumulative-layout-shift")}`
);

function dumpInsight(id, label) {
  const audit = a[id];
  if (!audit) return;
  console.log(`\n=== ${label} (${audit.displayValue ?? "no value"}) ===`);
  const items = audit.details?.items ?? [];
  for (const item of items.slice(0, 12)) {
    console.log(" ", JSON.stringify(item).slice(0, 260));
  }
}

dumpInsight("lcp-breakdown-insight", "LCP BREAKDOWN");
dumpInsight("lcp-discovery-insight", "LCP DISCOVERY");
dumpInsight("render-blocking-insight", "RENDER-BLOCKING");
dumpInsight("legacy-javascript-insight", "LEGACY JS");
dumpInsight("network-dependency-tree-insight", "NETWORK DEPENDENCY TREE");
dumpInsight("image-delivery-insight", "IMAGE DELIVERY");
dumpInsight("unused-javascript", "UNUSED JS");
dumpInsight("total-byte-weight", "TOTAL BYTE WEIGHT");
dumpInsight("third-parties-insight", "THIRD PARTIES");
dumpInsight("duplicated-javascript-insight", "DUPLICATED JS");
