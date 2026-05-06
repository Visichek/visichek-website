// One-off: regenerate every raster favicon variant from app/icon.svg.
// Run with: node scripts/generate-favicons.mjs
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const svgPath = resolve(root, "app/icon.svg");
const publicDir = resolve(root, "public");

const svg = await readFile(svgPath);

// SVG is on a transparent background — but the brand mark looks best with a
// little padding and a white safe-area background for legacy raster contexts
// (Apple home screen requires opaque). We composite the SVG centered on a
// solid backdrop sized for each output.
async function renderPadded(size, { background = "#ffffff", padding = 0.18 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const inset = Math.round((size - inner) / 2);

  const mark = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: mark, top: inset, left: inset }])
    .png()
    .toBuffer();
}

async function renderTransparent(size) {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

const targets = [
  { name: "favicon-16x16.png", size: 16, mode: "transparent" },
  { name: "favicon-32x32.png", size: 32, mode: "transparent" },
  { name: "apple-touch-icon.png", size: 180, mode: "padded", background: "#ffffff", padding: 0.14 },
  { name: "android-chrome-192x192.png", size: 192, mode: "padded", background: "#ffffff", padding: 0.14 },
  { name: "android-chrome-512x512.png", size: 512, mode: "padded", background: "#ffffff", padding: 0.14 },
];

for (const t of targets) {
  const buf =
    t.mode === "padded"
      ? await renderPadded(t.size, { background: t.background, padding: t.padding })
      : await renderTransparent(t.size);
  const out = resolve(publicDir, t.name);
  await writeFile(out, buf);
  console.log(`wrote ${t.name} (${t.size}x${t.size})`);
}

// Build favicon.ico containing 16x16 + 32x32 + 48x48 PNG-encoded entries.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => renderTransparent(s)));

function buildIco(sizes, pngBuffers) {
  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * sizes.length;
  let totalSize = dirSize;
  for (const p of pngBuffers) totalSize += p.length;

  const ico = Buffer.alloc(totalSize);
  // Header
  ico.writeUInt16LE(0, 0); // reserved
  ico.writeUInt16LE(1, 2); // type = icon
  ico.writeUInt16LE(sizes.length, 4); // count

  let dataOffset = dirSize;
  for (let i = 0; i < sizes.length; i++) {
    const entryOff = headerSize + i * entrySize;
    const size = sizes[i];
    const png = pngBuffers[i];
    ico.writeUInt8(size === 256 ? 0 : size, entryOff + 0); // width
    ico.writeUInt8(size === 256 ? 0 : size, entryOff + 1); // height
    ico.writeUInt8(0, entryOff + 2); // color count
    ico.writeUInt8(0, entryOff + 3); // reserved
    ico.writeUInt16LE(1, entryOff + 4); // planes
    ico.writeUInt16LE(32, entryOff + 6); // bit count
    ico.writeUInt32LE(png.length, entryOff + 8); // bytes in resource
    ico.writeUInt32LE(dataOffset, entryOff + 12); // image offset
    png.copy(ico, dataOffset);
    dataOffset += png.length;
  }
  return ico;
}

const icoBuf = buildIco(icoSizes, icoPngs);
await writeFile(resolve(publicDir, "favicon.ico"), icoBuf);
await writeFile(resolve(root, "app/favicon.ico"), icoBuf);
console.log(`wrote favicon.ico (${icoSizes.join(", ")}) — ${icoBuf.length} bytes`);
