import fg from "fast-glob";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = path.resolve("src/assets/past-events");

// Usage:
//   node scripts/rename-photos.mjs
//   node scripts/rename-photos.mjs tempe-marketplace
const slug = process.argv[2]; // optional

const targetDir = slug ? path.join(ROOT, slug) : ROOT;

// Extensions you consider "photos" (add/remove as you like)
const exts = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "JPG",
  "JPEG",
  "PNG",
  "WEBP",
  "AVIF",
];

const patterns = slug
  ? exts.map((e) => `${slug}/**/*.${e}`)
  : exts.map((e) => `**/*.${e}`);

// Collect files (absolute paths) under src/assets/past-events
const files = await fg(patterns, {
  cwd: ROOT,
  absolute: true,
  onlyFiles: true,
});

// Group by the immediate event folder under ROOT (the slug folder)
const byFolder = new Map();

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const parts = rel.split(path.sep);
  const folder = parts[0]; // "<slug>/..."
  if (!folder) continue;
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder).push(file);
}

if (byFolder.size === 0) {
  console.log(`No images found in ${targetDir}`);
  process.exit(0);
}

for (const [folder, folderFiles] of byFolder.entries()) {
  // Sort for deterministic output (doesn't matter which photo gets which number,
  // but stable sorting avoids surprising reshuffles)
  folderFiles.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );

  const digits = Math.max(3, String(folderFiles.length).length);

  console.log(`\nRenaming ${folderFiles.length} file(s) in: ${folder}`);

  // First pass: rename everything to a temporary filename to avoid collisions.
  const tempPaths = [];
  for (const [i, oldAbs] of folderFiles.entries()) {
    const oldDir = path.dirname(oldAbs);
    const oldExt = path.extname(oldAbs).toLowerCase();
    const tmpAbs = path.join(
      oldDir,
      `.__tmp__${String(i + 1).padStart(digits, "0")}${oldExt}`,
    );

    await fs.rename(oldAbs, tmpAbs);
    tempPaths.push(tmpAbs);
  }

  // Second pass: rename temp files to final 001.jpg, 002.jpg, ...
  for (const [i, tmpAbs] of tempPaths.entries()) {
    const dir = path.dirname(tmpAbs);
    const ext = path.extname(tmpAbs).toLowerCase();
    const finalAbs = path.join(
      dir,
      `${String(i + 1).padStart(digits, "0")}${ext}`,
    );

    await fs.rename(tmpAbs, finalAbs);
    console.log(`  -> ${path.relative(ROOT, finalAbs)}`);
  }
}

console.log("\nDone renaming photos.");
