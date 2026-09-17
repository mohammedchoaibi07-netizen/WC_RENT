#!/usr/bin/env node
/**
 * preflight.mjs — repere les images placeholder encore referencees dans
 * site/. Avertissement par defaut (n'echoue pas npm run verify) ; bloquant
 * si NODE_ENV=production, pour ne jamais mettre ces images en ligne sans
 * s'en rendre compte.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE_SRC = path.join('site', 'src');
const PLACEHOLDER_RE = /placeholder-[\w.-]+/g;

function walk(dir, files = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) files.push(p);
  }
  return files;
}

const hits = [];
for (const file of walk(SITE_SRC)) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(PLACEHOLDER_RE);
  if (matches) hits.push({ file, matches: [...new Set(matches)] });
}

if (hits.length === 0) {
  console.log('✓ preflight: aucun placeholder-* référencé dans site/');
  process.exit(0);
}

console.log(`\n⚠ preflight: ${hits.length} fichier(s) référencent encore une image placeholder :`);
for (const h of hits) {
  console.log(`  · ${h.file} — ${h.matches.join(', ')}`);
}
console.log('  Voir design/ATTENTE-CLIENT.md pour ce qu\'il faut obtenir du client.');

if (process.env.NODE_ENV === 'production') {
  console.error('\n✗ NODE_ENV=production : bloquant — remplace ces images avant la mise en ligne.');
  process.exit(1);
}

console.log('\n(avertissement seulement — NODE_ENV différent de "production")');
process.exit(0);
