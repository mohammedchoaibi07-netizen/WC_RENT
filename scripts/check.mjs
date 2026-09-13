#!/usr/bin/env node
/**
 * check.mjs — the single machine verdict. One exit code, no opinions.
 *
 * node scripts/check.mjs          types + lint + build
 * node scripts/check.mjs --gate   the above, plus the hard rubric gates
 *                                 against .design/audit.json, and a refusal
 *                                 if the audit is stale.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const GATE = process.argv.includes('--gate');
const fails = [];

const SITE_DIR = 'site';

const run = (label, cmd, args) => {
  process.stdout.write(`\n── ${label}\n`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32', cwd: SITE_DIR });
  if (r.status !== 0) fails.push(label);
};

const has = (bin) =>
  spawnSync(process.platform === 'win32' ? 'where' : 'which', [bin], { shell: true }).status === 0;

if (fs.existsSync(path.join(SITE_DIR, 'tsconfig.json'))) run('types', 'npx', ['tsc', '--noEmit']);
if (
  fs.existsSync(path.join(SITE_DIR, 'eslint.config.js')) ||
  fs.existsSync(path.join(SITE_DIR, 'eslint.config.mjs')) ||
  fs.existsSync(path.join(SITE_DIR, '.eslintrc.json')) ||
  fs.existsSync(path.join(SITE_DIR, '.eslintrc.cjs'))
)
  run('lint', 'npx', ['eslint', '.', '--max-warnings=0']);
run('build', 'npm', ['run', 'build']);

/* ---------- rubric gates ---------- */

if (GATE) {
  process.stdout.write('\n── design gates\n');
  const p = '.design/audit.json';
  if (!fs.existsSync(p)) {
    fails.push('gate: no .design/audit.json — run npm run snap');
  } else {
    const audit = JSON.parse(fs.readFileSync(p, 'utf8'));

    // staleness: recompute the source fingerprint the same way snap.mjs does
    const SRC_DIRS = (process.env.SNAP_SRC ?? 'src,app,components,styles').split(',');
    const h = crypto.createHash('sha1');
    const walk = (dir) => {
      let entries;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
        if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
        const fp = path.join(dir, e.name);
        if (e.isDirectory()) walk(fp);
        else h.update(`${fp}:${fs.statSync(fp).mtimeMs}`);
      }
    };
    SRC_DIRS.forEach(walk);
    const now = h.digest('hex').slice(0, 12);

    if (now !== audit.sourceFingerprint) {
      audit.stale = true;
      fs.writeFileSync(p, JSON.stringify(audit, null, 2));
      fails.push(`gate: audit is STALE (source ${now} vs audit ${audit.sourceFingerprint}) — run npm run snap`);
    }

    const M02_TAGS = new Set(['button', 'input', 'select', 'textarea']);
    const EXPECT_404 = (process.env.SNAP_EXPECT_404 ?? '').split(',').map((r) => r.trim()).filter(Boolean);
    for (const [route, vps] of Object.entries(audit.routes)) {
      for (const [vp, a] of Object.entries(vps)) {
        const at = `${route}@${vp}`;
        if (a.contrastFails.length) fails.push(`M-01 ${at}: ${a.contrastFails.length} text nodes below contrast target`);
        const m02Targets = a.smallTargets.filter(
          (t) => M02_TAGS.has(t.tag) || (t.tag === 'a' && (t.svg || t.label === '' || t.w < 40))
        );
        if (vp === 'mobile' && m02Targets.length) fails.push(`M-02 ${at}: ${m02Targets.length} tap targets under 44px`);
        if (a.overflowX > 1) fails.push(`M-03 ${at}: horizontal overflow ${a.overflowX}px`);
        if (a.fontFamilies.length > 2) fails.push(`M-04 ${at}: ${a.fontFamilies.length} font families (${a.fontFamilies.join(', ')})`);
        if (a.focusableWithoutVisibleFocus > 0) fails.push(`M-10 ${at}: ${a.focusableWithoutVisibleFocus}/${a.focusableTotal} focusables with no visible focus`);
        if (a.reducedMotionAnimationsRemaining > 0) fails.push(`M-12 ${at}: ${a.reducedMotionAnimationsRemaining} animations still running under prefers-reduced-motion`);
        if (a.imagesBadAlt.length) fails.push(`M-13 ${at}: missing or filler alt on ${a.imagesBadAlt.join(', ')}`);
        if (a.h1Count !== 1) fails.push(`M-14 ${at}: ${a.h1Count} h1 elements`);
        const consoleErrors = EXPECT_404.includes(route)
          ? a.consoleErrors.filter((e) => !/status of 404/.test(e))
          : a.consoleErrors;
        if (consoleErrors.length) fails.push(`console ${at}: ${consoleErrors[0]}`);
      }
    }
  }
}

if (fails.length) {
  console.error(`\n✗ FAIL (${fails.length})`);
  fails.forEach((f) => console.error(`  · ${f}`));
  process.exit(1);
}
console.log('\n✓ PASS');
