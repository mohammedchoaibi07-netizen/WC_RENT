---
description: Inventory the page's image needs, fill the manifest, show the cost plan
---

Plan the image assets this project actually needs. Do not generate anything
until I approve the plan.

## 1. Inventory

Read `design/BRIEF.md` and `design/PLAN.md`, then walk the actual markup. For
every image slot, list:

- the id you would use
- where it appears (file and section)
- what it must communicate
- **verdict: GENERATE or CLIENT-SUPPLIED**

`CLIENT-SUPPLIED` is mandatory, not a suggestion, for anything that depicts:
the client's real products, units, vehicles, premises, staff, customers, or
completed jobs. Generated versions of those are subtly wrong in exactly the
way a visitor notices, and they misrepresent what is being sold. Say so and
move on; do not negotiate with yourself about it.

`GENERATE` is for textures, abstract backgrounds, ambience, patterns and
pictograms.

## 2. Shared direction

Write `defaults.style` in `assets/manifest.json` first: medium, lighting,
palette, grain, level of abstraction. This is what makes the set look like one
family. If two finished assets do not look related, the fix goes here, not in
the individual prompts.

## 3. Prompts

For each GENERATE entry, write a prompt that names subject, medium, lighting,
composition, and an explicit exclusion list. Set `size` to the aspect ratio the
slot actually needs, not a default square.

## 4. Plan, then stop

Run `npm run assets:dry` and show me its output verbatim: the count and the
sizes. Then stop and wait.

State plainly that you do not know the current per-image price, and that I
should check it on OpenAI's pricing page before approving. Do not estimate a
cost from memory.

Never raise `MAX_IMAGES_PER_RUN` yourself. If the plan exceeds the cap, say
the manifest should be split instead.

## 5. After I approve

Run `npm run assets`, then reference `/assets/<id>.webp` in the markup with
real alt text describing what the image shows, or `alt=""` plus `aria-hidden`
if it is purely decorative. Filler alt ("image", "hero", "photo") fails the
M-13 gate and blocks the design round.

Then list the `CLIENT-SUPPLIED` slots again as a single request I can forward
to the client, with the framing and orientation needed for each.
