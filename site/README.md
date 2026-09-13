# WC Rent Belgium — Site public

Site vitrine mobile-first (Next.js 16 / App Router / Tailwind v4) reconstruit
à partir de la maquette Claude Design (`../site WC-RENT/project/`). Branché
sur le backend réel (`../backend`) pour la disponibilité, les tarifs, les
réservations et les demandes de devis.

## Pages

- `/` — Accueil
- `/solutions` — Nos solutions
- `/realisations` — Réalisations
- `/a-propos` — À propos
- `/zone-intervention` — Zone d'intervention
- `/faq` — FAQ
- `/contact` — Devis gratuit (formulaire réel → `POST /api/quote-requests`)
- `/reserver` — Réservation en ligne en 5 étapes (→ `POST /api/orders` → Mollie)
- `/reservation/confirmation` — Retour Mollie après paiement
- `/suivi` — Suivi de commande (lien envoyé par e-mail après paiement)

## Démarrage

```bash
npm install
npm run dev -- --port 3001
```

Le backend doit tourner sur `http://localhost:3000` (voir `../backend/README.md`).
`/api/*` est automatiquement proxifié vers le backend (voir `next.config.ts`,
variable `API_URL`).

## Notes

- **Logo et photos** : récupérés de la maquette originale (`assets/logo-trim.png`,
  `hero.png`, `service.png`), copiés dans `public/images/`.
- **hCaptcha** : le backend n'a pas encore de compte réel configuré (voir
  `TODO A CONFIRMER` côté backend) ; le site envoie un jeton placeholder
  (`DEV_HCAPTCHA_TOKEN` dans `src/lib/api.ts`) tant que ce n'est pas branché.
- **Paiement Mollie** : en sandbox sans compte réel, l'étape 5 de la
  réservation ira jusqu'à la création de la commande côté serveur puis
  affichera un message clair au lieu de rediriger vers Mollie.
- **Réalisations / équipe** : pas de vraies photos fournies pour ces sections
  → `PhotoFrame` affiche un placeholder libellé, à remplacer.
