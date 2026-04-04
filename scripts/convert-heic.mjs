import fg from "fast-glob";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve("src/assets/past-events");
const patterns = ["**/*.heic", "**/*.heif", "**/*.HEIC", "**/*.HEIF"];
const files = await fg(patterns, { cwd: ROOT, absolute: true });

if (files.length === 0) {
  console.log("No HEIC/HEIF files found.");
  process.exit(0);
}

for (const input of files) {
  const dir = path.dirname(input);
  const base = path.basename(input).replace(/\.(heic|heif)$/i, "");
  const output = path.join(dir, `${base}.jpg`);

  try {
    await fs.access(output);
    console.log(`Skip (already exists): ${output}`);
    continue;
  } catch {
    // output doesn't exist
  }

  console.log(
    `Convert: ${path.relative(process.cwd(), input)} -> ${path.relative(process.cwd(), output)}`,
  );

  await sharp(input, { failOn: "none" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);

  // Delete originals
  await fs.unlink(input);
}

console.log("Done converting HEIC/HEIF files.");
