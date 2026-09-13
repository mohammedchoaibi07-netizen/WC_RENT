#!/usr/bin/env node
/**
 * gen-assets.mjs — deterministic image generation. No agent, no loop, no surprises.
 *
 * Reads assets/manifest.json, generates only what is missing, caches by
 * hash(prompt + size + model), converts to webp, and refuses to exceed
 * MAX_IMAGES_PER_RUN.
 *
 *   node scripts/gen-assets.mjs            generate missing
 *   node scripts/gen-assets.mjs --dry      list what it would do, cost estimate
 *   node scripts/gen-assets.mjs --force id1,id2   regenerate specific ids
 *
 * The agent's job is to fill the manifest. Not to call this API in a loop.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const MANIFEST = 'assets/manifest.json';
const OUT_DIR = 'public/assets';
const CACHE = '.assets-cache';
const MAX = Number(process.env.MAX_IMAGES_PER_RUN ?? 10);
const MODEL = process.env.IMAGE_MODEL ?? 'gpt-image-2';

const DRY = process.argv.includes('--dry');
const forceArg = process.argv.indexOf('--force');
const FORCE = forceArg > -1 ? (process.argv[forceArg + 1] ?? '').split(',') : [];

const key = process.env.OPENAI_API_KEY;
if (!key && !DRY) {
  console.error('OPENAI_API_KEY missing. Put it in .env, never in source.');
  process.exit(1);
}

const { defaults = {}, images = [] } = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

const hash = (spec) =>
  crypto.createHash('sha1').update(JSON.stringify(spec)).digest('hex').slice(0, 16);

const todo = [];
for (const img of images) {
  const spec = {
    prompt: `${img.prompt}\n\nStyle: ${img.style ?? defaults.style ?? ''}`.trim(),
    size: img.size ?? defaults.size ?? '1536x1024',
    model: MODEL,
  };
  const h = hash(spec);
  const cached = path.join(CACHE, `${h}.png`);
  const out = path.join(OUT_DIR, `${img.id}.webp`);
  const forced = FORCE.includes(img.id);

  if (!forced && fs.existsSync(out) && fs.existsSync(cached)) continue;
  if (!forced && fs.existsSync(cached)) {
    await sharp(cached).webp({ quality: img.quality ?? 82 }).toFile(out);
    console.log(`↺ ${img.id}  (from cache, no API call)`);
    continue;
  }
  todo.push({ img, spec, h, cached, out });
}

if (!todo.length) {
  console.log('Nothing to generate. Every manifest entry is present.');
  process.exit(0);
}

if (todo.length > MAX) {
  console.error(
    `✗ ${todo.length} images to generate, cap is ${MAX}.\n` +
      `  Either raise MAX_IMAGES_PER_RUN deliberately, or split the manifest.\n` +
      `  This cap exists so a bad loop cannot quietly spend your month.`
  );
  process.exit(1);
}

console.log(`${todo.length} image(s) to generate with ${MODEL}:`);
todo.forEach(({ img, spec }) => console.log(`  · ${img.id}  ${spec.size}`));
if (DRY) {
  console.log('\n--dry: no API call made. Check pricing for your size/quality before a real run.');
  process.exit(0);
}

for (const { img, spec, cached, out } of todo) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: spec.model,
      prompt: spec.prompt,
      size: spec.size,
      n: 1,
      ...(img.quality_tier ? { quality: img.quality_tier } : {}),
    }),
  });

  if (!res.ok) {
    console.error(`✗ ${img.id}: ${res.status} ${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }

  const json = await res.json();
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`✗ ${img.id}: response had no image payload`);
    process.exit(1);
  }

  fs.writeFileSync(cached, Buffer.from(b64, 'base64'));
  await sharp(cached).webp({ quality: img.quality ?? 82 }).toFile(out);
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`✓ ${img.id} → ${out} (${kb} KB)`);
}
