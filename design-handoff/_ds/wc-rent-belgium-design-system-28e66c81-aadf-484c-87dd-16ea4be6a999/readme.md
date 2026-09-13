# WC Rent Belgium — Design System

Sanitary-rental company operating across Belgium: portable toilets, PMR units, luxury
sanitary trailers, hand-wash stations, urinals and event sanitation, rented to
construction sites, festivals, weddings, sports events, industry and public bodies.

The product surface is a **single French-language, mobile-first marketing website**
whose whole job is to funnel the visitor into three actions: **appeler, nous contacter,
demander un devis**. The permanent bottom action bar is the spine of the experience.

Art direction: **Clean & Reliable** — hygiene and professionalism without industrial
grit. Very white, very spacious, big type, big touch targets, realistic commercial
photography against an extremely clean UI.

## Sources given

- `uploads/ChatGPT Image 8 sept. 2026, 21_14_54.png` — two mobile homepage mockup
  screens (hero + solutions grid; trust row + testimonial + CTA + process + footer).
  This is an AI-generated visual mockup, not a production design file.
- A detailed written brief (in chat) specifying palette hex values, type sizes,
  button geometry, the fixed bottom bar, page architecture and section-by-section
  content.

No codebase, no Figma file, no logo file, no font files and no photography were
supplied. Everything here is derived from those two sources; anything that could not
be derived is flagged below rather than invented.

## Missing / substituted — please supply

| Item | Status |
| --- | --- |
| Logo / brand mark | **Absent.** The mockup shows a framed cabin pictogram; it has not been reconstructed. `BrandWordmark` renders the name in type instead. |
| Brand fonts | **Substituted.** Plus Jakarta Sans (UI) + Caveat (handwritten accent) from Google Fonts. |
| Icon set | **Substituted.** Lucide via CDN — closest match to the mockup's ~1.9px stroke line icons. |
| Photography | **Absent.** `PhotoFrame` renders labelled placeholders describing the shot. |
| Phone, email, legal entity | Placeholders (`+32 470 12 34 56`, `info@wcrentbelgium.be`) taken from the mockup. |

---

## CONTENT FUNDAMENTALS

**Language.** French (Belgium), always. `vous`, never `tu`. The company speaks as
**nous** and addresses the reader as **vous**: "Notre équipe vous accompagne", "Nous
livrons partout en Belgique". First person singular never appears.

**Register.** Plain, factual, service-oriented. Short declarative sentences. Benefits
stated as facts, not as promises: "Livrés nettoyés et prêts à l'emploi", not "La
propreté dont vous rêvez". No superlatives beyond a measured "haut de gamme".

**Casing.**
- Headings: sentence case — "Des sanitaires pour tous vos projets", "Comment ça marche ?"
- Eyebrows/kickers: UPPERCASE with 0.10em tracking — `PARTOUT EN BELGIQUE`, `NOS SOLUTIONS`
- Buttons: sentence case — "Demander un devis gratuit", "En savoir plus"
- Product names: sentence case — "Toilettes PMR", "Lave-mains autonomes"

**Typographic French.** Space before `?` `!` `:` (`Comment ça marche ?`), decimal comma
(`4,9/5`), `€` after the number, curly apostrophes (`l'emploi` → `l’emploi`).

**CTA verbs.** Always imperative and specific: *Demander*, *Appeler*, *Recevoir*,
*Découvrir*, *En savoir plus*. Never "Cliquez ici", never "Soumettre".

**Length.** Headline ≤ 7 words. Product description one line, ≤ 12 words. Section
intro ≤ 2 lines. Reassurance items are two or three words: "Rapide · Gratuit · Sans
engagement".

**Numbers as proof.** `+500 projets réalisés`, `4,9/5 clients satisfaits`,
`en moins de 24h`, `100% engagement vert`. Never a vague "nos clients sont satisfaits".

**Testimonials.** One or two sentences, first name + initial, then role or event type:
*"Service impeccable, livraison rapide et matériel très propre." — Thomas L.,
organisateur d'événements.*

**Emoji.** None in the interface. The written brief uses them as shorthand; the product
uses Lucide icons in their place. The only flag-like element is the three-stripe
Belgian accent in the logo lockup.

---

## VISUAL FOUNDATIONS

**Colour.** Two colours carry the brand: **WC Navy `#082B52`** (headings, dark
sections, footer) and **Bleu action `#006EDC`** (every CTA, link, interactive icon,
active state). **Bleu clair `#EAF4FF`** is the card/badge/info ground. White dominates
— it is what produces the "clean" reading. Greys `#F5F7FA` / `#E5EAF0` / `#64748B` for
alternate grounds, borders and secondary text. Green `#1E8A56` appears only in the
environmental block and the eco stat. Amber `#F5A524` only for rating stars. Belgian
black/yellow/red appear only in the logo lockup, occasional badges and hairline
details — never as a section ground or a button colour.

**Type.** One family, Plus Jakarta Sans, plus Caveat for the single handwritten
accent. Headings are ExtraBold (800) with −0.02em tracking; body is 16–18px at 1.55;
lead paragraphs 20–22px desktop / 17–18px mobile; display 48px desktop / 34–38px
mobile. Weight 800 is reserved for headings — body text never goes above 600.

**Layout.** Mobile-first, single column, 20px gutter, 56px vertical rhythm between
sections (96px desktop), 1160px max content width. Products sit two per row on mobile;
premium products take full width. Two fixed elements only: the 64px sticky white
header and the 72px bottom action bar — page content carries `padding-bottom: 72px`
so nothing hides beneath it.

**Backgrounds.** Flat colour, never gradients as decoration. The only gradient in the
system is the hero's white protection scrim rising over the photograph so the headline
keeps full contrast. Section grounds alternate white → grey 050 → white, with one navy
rupture ("Pourquoi WC Rent ?") and one saturated blue CTA panel. No patterns, no
textures, no illustrations.

**Cards.** White, 16px radius, 1px `#E5EAF0` border, soft navy-tinted shadow
(`0 1px 2px / 0 6px 16px rgba(8,43,82,.05–.06)`). Photo cards clip the image at the
top with zero inner padding. Info cards drop the border and use the pale blue ground.

**Radii.** 8 small, 12 controls (buttons, inputs), 16 cards, 20 feature panels, pill
for badges. Nothing is fully square, nothing is a circle except step dots, avatars and
the icon wells.

**Shadows.** Three depths plus one coloured glow: `--shadow-xs` for resting chrome,
`--shadow-card`, `--shadow-card-hover`, and `--shadow-cta`
(`0 6px 16px rgba(0,110,220,.28)`) which is the only tinted shadow — it belongs to the
primary CTA and the bottom bar's contact button. The bar itself casts upward
(`0 -6px 24px`).

**Transparency and blur.** Used twice only: the menu overlay (`rgba(4,24,47,.35)` +
2px blur) and text-on-dark at 78–85% white. Never frosted panels, never glassmorphism.

**Motion.** One easing curve, `cubic-bezier(.22,.61,.36,1)`. 120ms for presses and
colour swaps, 200ms for hover/focus, 420ms for scroll reveals and image zoom. Sections
fade up gently on scroll; nothing bounces, nothing slides across the screen.
`prefers-reduced-motion` zeroes all of it.

**Hover.** Buttons darken one step (`#006EDC → #0057B0`) and the trailing arrow slides
3px right. Cards lift 2px and deepen their shadow. Images zoom to 1.03. Secondary and
ghost buttons fill with `#EAF4FF` rather than changing their text colour.

**Press.** `scale(.98)` plus the darkest blue `#00499A`. No ripple.

**Focus.** 3px `#7FB6F5` ring plus a blue border — visible on every control.

**Borders.** Hairline `#E5EAF0` throughout; 1.5px `#006EDC` for outlined CTAs, focused
inputs and selected choices. Dividers inside dark sections are `rgba(255,255,255,.16)`.

**Imagery.** Realistic commercial photography, natural daylight, cool-neutral grade,
no filters, no grain, no black-and-white. Real WC Rent cabins, Belgian sites, trucks,
technicians, festival crowds. The contrast the brand relies on is *very realistic
photography against very clean UI*. Photos are 4:3 in grids, 16:9 in features,
full-bleed in the hero.

**Iconography vibe.** Outline, uniform 1.9px stroke, navy on light grounds, blue when
the icon is interactive, white on dark. Icons are always paired with a label.

---

## ICONOGRAPHY

The mockup uses a consistent outline set with a medium-light uniform stroke and
rounded caps. No icon font, sprite or SVG files were supplied, so the system
**substitutes [Lucide](https://lucide.dev) at stroke-width 1.9**, loaded from CDN
(`https://unpkg.com/lucide@0.454.0/dist/umd/lucide.min.js`) and wrapped by the `Icon`
component. Swap the CDN link for the real set if one exists.

- **Sizes.** 15–16px inline in text and links, 18–20px in buttons and list rows,
  22–28px in feature rows and icon wells.
- **Colour.** `--navy-800` on light grounds, `--action-default` when interactive or
  selected, white on navy/blue, `--green-600` in the eco block, `--amber-500` for
  filled rating stars.
- **Wells.** Category icons sit in a 64px `--radius-lg` `--blue-050` square.
- **Vocabulary.** phone · message-circle · file-text (the three fixed-bar actions);
  truck · leaf · shield-check · clock (reassurance); users · star (proof);
  hard-hat · calendar-days · heart · medal · factory · landmark (needs);
  accessibility · droplets (products); chevron-right · arrow-right · plus/minus ·
  menu · x (navigation).
- **No emoji** anywhere in the interface. No unicode glyphs used as icons, with one
  exception: the typographic quote mark `“` set in Plus Jakarta Sans ExtraBold opens
  testimonial cards.
- **Brand marks.** Social icons (facebook, instagram, linkedin) come from the same
  Lucide set for consistency; replace with official marks before production.

---

## Index

| Path | What |
| --- | --- |
| `styles.css` | Global entry — imports every token file. Consumers link this. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css` |
| `guidelines/` | 16 specimen cards: colour, type, spacing, radii, elevation, motion, surfaces, iconography |
| `components/core/` | `Button`, `IconButton`, `Badge`, `Card`, `SectionHeading`, `ScriptNote`, `Icon` |
| `components/brand/` | `BrandWordmark` |
| `components/navigation/` | `AppHeader`, `MobileMenu`, `StickyActionBar`, `SiteFooter` |
| `components/marketing/` | `FeatureRow`, `ProductCard`, `NeedTile`, `StatStrip`, `TestimonialCard`, `CtaPanel`, `ReasonList`, `ProcessSteps`, `EcoNote`, `FaqAccordion` |
| `components/forms/` | `TextField`, `ChoiceOption`, `CounterField`, `StepProgress` |
| `components/media/` | `PhotoFrame` |
| `ui_kits/website/` | Click-through mobile site: home, solutions, 5-step quote, contact |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent-skill entry point |

Every component directory carries a `@dsCard`-tagged HTML sample, a `.d.ts` props
contract and a `.prompt.md` usage note.

### Intentional additions

The sources define screens, not a component library, so the inventory was derived from
the mockup and brief section by section. Three components have no direct counterpart
in the mockup and exist to keep consumers honest:

- **`Icon`** — wrapper over the substituted Lucide set, so icon usage stays uniform.
- **`PhotoFrame`** — labelled placeholder standing in for absent brand photography.
- **`BrandWordmark`** — type-only stand-in for the missing logo file.

No generic primitives (Toast, Avatar, Tabs, Tooltip…) were invented; the brief's
five-step quote form, fixed action bar, FAQ, process track and reason list are all
present because the brief specifies them.
