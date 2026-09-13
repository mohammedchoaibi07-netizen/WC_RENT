# Project instructions

The design loop's rules live in `.cursor/rules/`. Those files are the source of
truth for how work is done here. They are imported below so they apply in
Claude Code exactly as they do in Cursor. Do not duplicate their content into
this file; edit the rule files themselves.

## Always in effect

@.cursor/rules/00-core.mdc

## Read before touching any UI code, CSS or layout

@.cursor/rules/10-design-direction.mdc

## Read before any design critique, review, or "is this good" question

@.cursor/rules/20-design-review.mdc

## Read before adding, generating or referencing any image

@.cursor/rules/30-assets.mdc

## Project context

@design/BRIEF.md

---

## Claude Code specifics

The review protocol requires a reviewer with no memory of the build. In Claude
Code, that means: run `/clear` first, then ask for the review. A review
requested in the same session that produced the code does not satisfy the
protocol, and you must say so rather than produce one anyway.

Commands:

```
npm run check      types + lint + build
npm run snap       screenshots + DOM audit into .design/
npm run gate       check + hard rubric gates, fails on stale evidence
npm run verify     all three in sequence
npm run assets:dry plan image generation without paying
```

Screenshots land in `.design/shots/`. Read the PNG files with the Read tool
before any design judgement. If you have not opened them, you have not
reviewed anything.
