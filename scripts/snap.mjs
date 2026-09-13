#!/usr/bin/env node
/**
 * snap.mjs — turns "how does it look" into evidence.
 *
 * Produces, for each route x viewport:
 *   .design/shots/<route>-<vp>.png        full page
 *   .design/shots/<route>-<vp>-fold.png   above the fold only
 *   .design/shots/<route>-<vp>-grey.png   greyscale, to test hierarchy
 * Plus .design/audit.json with the numbers the rubric gates on.
 *
 * Usage:  node scripts/snap.mjs
 * Env:    SNAP_BASE_URL (default http://localhost:3000)
 *         SNAP_ROUTES   (comma separated, default "/")
 *         SNAP_SRC      (comma separated dirs to fingerprint, default "src,app,components")
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BASE = process.env.SNAP_BASE_URL ?? 'http://localhost:3000';
const ROUTES = (process.env.SNAP_ROUTES ?? '/').split(',').map((r) => r.trim());
const SRC_DIRS = (process.env.SNAP_SRC ?? 'src,app,components,styles').split(',');
const OUT = '.design';
const SHOTS = path.join(OUT, 'shots');

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

/* ---------- source fingerprint: lets the reviewer detect stale evidence ---------- */

function fingerprint() {
  const h = crypto.createHash('sha1');
  const walk = (dir) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else h.update(`${p}:${fs.statSync(p).mtimeMs}`);
    }
  };
  SRC_DIRS.forEach((d) => walk(d));
  return h.digest('hex').slice(0, 12);
}

/* ---------- in-page audit ---------- */

const auditFn = () => {
  const round = (n) => Math.round(n * 100) / 100;

  const parseRgb = (s) => {
    const m = s && s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  };
  const lum = ({ r, g, b }) => {
    const f = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return round((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
  };
  const effectiveBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parseRgb(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.5) return c;
      n = n.parentElement;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };

  const all = Array.from(document.querySelectorAll('body *'));
  const visible = all.filter((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0';
  });

  const fonts = new Set();
  const sizes = new Set();
  const radii = new Set();
  const shadows = new Set();
  const spacing = new Set();
  const contrastFails = [];
  const longLines = [];
  let animatedOnLoad = 0;

  for (const el of visible) {
    const s = getComputedStyle(el);
    fonts.add(s.fontFamily.split(',')[0].replace(/["']/g, '').trim());
    const hasOwnText = Array.from(el.childNodes).some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 2
    );
    if (hasOwnText) {
      sizes.add(parseFloat(s.fontSize));
      const fg = parseRgb(s.color);
      if (fg) {
        const cr = ratio(fg, effectiveBg(el));
        const px = parseFloat(s.fontSize);
        const bold = parseInt(s.fontWeight, 10) >= 700;
        const large = px >= 24 || (px >= 18.66 && bold);
        const need = large ? 3 : 4.5;
        if (cr < need) {
          contrastFails.push({
            tag: el.tagName.toLowerCase(),
            text: el.textContent.trim().slice(0, 40),
            ratio: cr,
            need,
            fontSize: px,
          });
        }
      }
      // line length in characters, approximated from the ch unit
      const chWidth = parseFloat(s.fontSize) * 0.5;
      const ch = Math.round(el.getBoundingClientRect().width / chWidth);
      const serif = /serif/i.test(s.fontFamily) && !/sans/i.test(s.fontFamily);
      if (el.textContent.trim().length > 120 && ch > (serif ? 90 : 80)) {
        longLines.push({ tag: el.tagName.toLowerCase(), ch, serif });
      }
    }
    if (s.borderRadius !== '0px') radii.add(s.borderRadius);
    if (s.boxShadow !== 'none') shadows.add(s.boxShadow);
    ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'gap'].forEach((k) => {
      const v = parseFloat(s[k]);
      if (v > 0) spacing.add(v);
    });
    if (s.animationName !== 'none' && s.animationIterationCount === '1') animatedOnLoad++;
  }

  // tap targets and focus visibility
  const interactive = Array.from(
    document.querySelectorAll('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')
  ).filter((el) => el.getBoundingClientRect().width > 0);

  const smallTargets = interactive
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: round(r.width), h: round(r.height) };
    })
    .filter((t) => t.w < 44 || t.h < 44);

  const noFocusStyle = interactive.filter((el) => {
    const s = getComputedStyle(el, ':focus-visible');
    const noOutline = s.outlineStyle === 'none' || parseFloat(s.outlineWidth) === 0;
    const noRing = s.boxShadow === 'none';
    return noOutline && noRing;
  }).length;

  // images
  const imgs = Array.from(document.images);
  const badAlt = imgs.filter((i) => {
    const a = (i.getAttribute('alt') ?? '').trim().toLowerCase();
    if (!i.hasAttribute('alt')) return true;
    return ['image', 'img', 'photo', 'picture', 'placeholder', 'hero'].includes(a);
  }).map((i) => i.currentSrc.split('/').pop());

  // heading order
  const levels = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) =>
    Number(h.tagName[1])
  );
  let skipped = false;
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skipped = true;

  return {
    overflowX: round(document.documentElement.scrollWidth - window.innerWidth),
    fontFamilies: [...fonts],
    fontSizes: [...sizes].sort((a, b) => a - b),
    borderRadii: [...radii],
    boxShadows: [...shadows].map((s) => s.slice(0, 60)),
    spacingValues: [...spacing].sort((a, b) => a - b),
    contrastFails,
    longLines,
    smallTargets,
    focusableWithoutVisibleFocus: noFocusStyle,
    focusableTotal: interactive.length,
    entranceAnimations: animatedOnLoad,
    h1Count: document.querySelectorAll('h1').length,
    headingOrderSkipped: skipped,
    imagesBadAlt: badAlt,
    imagesTotal: imgs.length,
  };
};

/* ---------- run ---------- */

const slug = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-'));

fs.mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
const audit = { generatedAt: new Date().toISOString(), base: BASE, sourceFingerprint: fingerprint(), stale: false, routes: {} };

for (const route of ROUTES) {
  audit.routes[route] = {};
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 200)));

    const url = new URL(route, BASE).toString();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(700); // let entrance animations settle

    const name = `${slug(route)}-${vp.name}`;
    await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
    await page.screenshot({ path: path.join(SHOTS, `${name}-fold.png`) });

    await page.addStyleTag({ content: 'html{filter:grayscale(1) !important}' });
    await page.screenshot({ path: path.join(SHOTS, `${name}-grey.png`), fullPage: true });

    const data = await page.evaluate(auditFn);

    // reduced-motion check: re-open with the preference set and compare
    const rmCtx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
    const rmPage = await rmCtx.newPage();
    await rmPage.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    const rmAnims = await rmPage.evaluate(
      () =>
        Array.from(document.querySelectorAll('body *')).filter(
          (el) => getComputedStyle(el).animationName !== 'none'
        ).length
    );
    await rmCtx.close();

    audit.routes[route][vp.name] = {
      ...data,
      reducedMotionAnimationsRemaining: rmAnims,
      consoleErrors,
      shots: [`${name}.png`, `${name}-fold.png`, `${name}-grey.png`],
    };
    await ctx.close();
    console.log(`  ${name}  contrast:${data.contrastFails.length}  tap:${data.smallTargets.length}  overflow:${data.overflowX}px`);
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(audit, null, 2));
console.log(`\n.design/audit.json written  (fingerprint ${audit.sourceFingerprint})`);
