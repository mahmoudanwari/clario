#!/usr/bin/env node
/**
 * Astro copies the original source images into dist/_astro alongside the
 * optimised WebP variants, because the image registry imports every asset's
 * metadata through a glob. The originals are never referenced by the output
 * (the markup only uses the WebP srcset), so this prunes any file in
 * dist/_astro that nothing in the build actually links to.
 *
 * Runs automatically after `npm run build`.
 */
import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const ASTRO_DIR = 'dist/_astro';
const PRUNABLE = new Set(['.png', '.jpg', '.jpeg', '.avif', '.webp', '.gif', '.svg']);

async function walk(dir) {
  let out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(await walk(full));
    else out.push(full);
  }
  return out;
}

let candidates;
try {
  candidates = (await readdir(ASTRO_DIR)).filter((f) => PRUNABLE.has(extname(f).toLowerCase()));
} catch {
  process.exit(0); // nothing built
}

// Collect every reference that appears in the built HTML, CSS and JS.
const textFiles = (await walk('dist')).filter((f) => /\.(html|css|js|xml|txt|json)$/i.test(f));
let haystack = '';
for (const f of textFiles) haystack += await readFile(f, 'utf8');

let removed = 0;
let bytes = 0;
for (const file of candidates) {
  if (haystack.includes(basename(file))) continue;
  const full = join(ASTRO_DIR, file);
  bytes += (await stat(full)).size;
  await unlink(full);
  removed++;
}

if (removed) {
  console.log(`Pruned ${removed} unreferenced source image(s) from dist/_astro (${(bytes / 1048576).toFixed(1)} MB).`);
}
