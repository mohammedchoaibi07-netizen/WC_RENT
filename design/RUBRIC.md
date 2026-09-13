# Rubric

Every ID below is either machine-measured (from `.design/audit.json`) or a
judgement call anchored to `BRIEF.md`. BLOCKER means the round cannot pass.

## Measured — hard gates

| ID | Criterion | Target | Severity |
|---|---|---|---|
| M-01 | Text contrast ratio | ≥ 4.5:1 body, ≥ 3:1 for text ≥ 24px | BLOCKER |
| M-02 | Hit area des contrôles non-textuels — boutons, contrôles icône-seule, champs de formulaire | ≥ 44 × 44 px au viewport 390px. Les liens en texte inline dans la navigation ou le corps de texte sont exemptés. | BLOCKER |
| M-03 | Horizontal overflow at 390px | none | BLOCKER |
| M-04 | Distinct font families rendered | ≤ 2 | BLOCKER |
| M-05 | Distinct font sizes | ≤ 7, and all on the declared scale | MINOR |
| M-06 | Distinct border-radius values | ≤ 3, and tied to hierarchy not habit | MINOR |
| M-07 | Distinct box-shadow values | ≤ 2 | MINOR |
| M-08 | Body line length | ≤ 80ch (serif ≤ 90ch) | MINOR |
| M-09 | Spacing values off the declared scale | 0 | MINOR |
| M-10 | Visible focus ring on every focusable element | 100% | BLOCKER |
| M-11 | Entrance animations not triggered by the user | ≤ 1 orchestrated sequence | MINOR |
| M-12 | `prefers-reduced-motion` honoured | yes | BLOCKER |
| M-13 | Images with no alt / with filler alt | 0 | BLOCKER |
| M-14 | Heading order (no skipped levels) | valid | MINOR |

## Judgement — anchored to the brief

| ID | Criterion | Fails when |
|---|---|---|
| J-01 | Hero specificity | The hero would work unchanged for a different industry |
| J-02 | Type as design | The headline treatment is neutral delivery, not an active choice |
| J-03 | Structure encodes meaning | Borders, numbers, eyebrows, dividers decorate instead of inform |
| J-04 | One focal point | Two or more elements compete to be the memorable thing |
| J-05 | Greyscale hierarchy | Hierarchy collapses in the `-grey` shots |
| J-06 | Copy | Placeholder-flavoured, passive voice, CTA that doesn't name the action |
| J-07 | Density rhythm | Every section has the same vertical padding and the same shape |
| J-08 | Default clusters | Any of the 5 clusters in `10-design-direction.mdc` present unrequested |
| J-09 | Audience fit | A choice that suits the designer's taste, not the brief's audience |
| J-10 | Subtraction | Something on the page serves no job in the brief |

## Scoring

There is no score. A round is PASS or FIX. Numbers exist so the next round can
tell whether a fix landed, not so the page can be given a grade it did not earn.
