# Review log

Append-only. Never rewrite a past round; the point is to see whether fixes
landed and whether anything regressed. A number that got worse is a BLOCKER,
even if the page subjectively looks nicer.

Also keep the "tried and rejected" list at the bottom. Without it, round 3
re-proposes what round 1 already discarded.

---

## Template

```
## Round n — <date> — fingerprint <from audit.json>

Numbers        contrast fails: _  | tap<44: _ | overflow: _px | fonts: _
               sizes: _ | radii: _ | shadows: _ | off-scale spacing: _
Defaults check 1:_ 2:_ 3:_ 4:_ 5:_
Blockers       <ids>
Fixed since    <ids closed, with the number that moved>
Regressed      <ids, with old → new>
Removed        <the 3 deletions, and what the page gained>
Verdict        PASS | FIX | ESCALATE
```

---

## Carte des provinces — source et méthode de conversion (2026-09-14)

Tracés dans `site/src/lib/provincePaths.ts`, dérivés des jeux de données
officiels de l'IGN/NGI publiés sur odwb.be : "Limites administratives -
Provinces Belges" (`provincesprovincies-belgium`, 10 entités) et "...
Régions Belges" (`regionsgeweste-belgium`, pour isoler Bruxelles-Capitale
en tant qu'entité séparée — ce n'est pas une province au sens administratif).
Licence CC BY 4.0, attribution en pied de page (`Footer.tsx`), pas sur la
carte elle-même — la licence n'impose pas le placement.

Les exports GeoJSON de ces jeux sont déjà en WGS84 (vérifié sur un
enregistrement réel) — aucune reprojection depuis le Lambert belge n'a été
nécessaire, donc aucune dépendance de projection cartographique (proj4,
d3-geo) n'a été ajoutée au projet. Conversion WGS84 → plan SVG faite une
fois, hors du projet : projection équirectangulaire à la main (`x = (lon -
min) × cos(latitude moyenne) × échelle`, `y = (max - lat) × échelle`, axe Y
inversé), puis décimation des points (environ 1 point conservé sur 25-55
selon la densité d'origine, ~70 points par forme) pour ramener ~24 000
points sources à 12,3 Ko de données de tracé au total. Seul le résultat
(`provincePaths.ts`) est commité ; le script de conversion et les GeoJSON
sources ne le sont pas.

## Known limitations

Le filtre M-02 (`scripts/check.mjs`) exempte les `<a>` dont `label` n'est pas vide et dont
la largeur est ≥ 40px. Or `snap.mjs` remplit `label` avec `aria-label` quand il n'y a pas de
texte visible. Un lien icône-seule avec un `aria-label` (ex. icônes sociales en pied de page)
aurait donc un `label` non vide et pourrait passer sous le radar si sa largeur atteint 40px,
alors qu'il s'agit bien d'un contrôle icône-seule au sens de la règle. Non actif aujourd'hui
(aucun lien de ce type dans le code au 2026-09-13), mais à surveiller si des icônes sociales
sont ajoutées.

---

## Tried and rejected

| Idea | Round | Why it was dropped |
|---|---|---|
| Mécanisme de scénarios Playwright dans `snap.mjs` (suite de clics scriptés avant capture, pour couvrir les états derrière une interaction : étapes 2-5 du wizard, formulaire de contact soumis, `/suivi` avec commande chargée) | 2026-09-13 | Écarté pour l'instant : les fixtures nécessaires (availability, quote, commande de suivi) deviendraient une seconde source de vérité à resynchroniser à chaque évolution du wizard, et un scénario branché sur le vrai backend rend les mesures non déterministes (prix, disponibilité variables d'une exécution à l'autre). À reconsidérer quand le tunnel de réservation sera stable. |
