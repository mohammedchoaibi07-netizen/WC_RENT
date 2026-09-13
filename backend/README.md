# WC Rent Belgium — Backend

API et administration pour la reception des reservations en ligne, des
demandes de devis, et la gestion operationnelle (livraisons, entretiens,
enlevements) de WC Rent Belgium.

## Stack

- Node.js 20+, TypeScript strict
- NestJS (Fastify)
- PostgreSQL + Prisma
- Mollie (paiement), Resend (e-mails transactionnels)
- Vitest (tests)

## Demarrage local

```bash
cp .env.example .env          # puis renseigner les vraies valeurs
npm install
npm run prisma:migrate        # applique le schema
npm run prisma:seed           # jeu de donnees de demonstration (20 commandes)
npm run start:dev
```

L'API ecoute sur `http://localhost:3000`. Documentation OpenAPI (routes
publiques) sur `http://localhost:3000/api/docs`.

Comptes admin de demonstration (crees par le seed) :

| Email | Mot de passe | Role |
| --- | --- | --- |
| admin@wcrentbelgium.be | ChangeMoi123! | admin |
| operateur@wcrentbelgium.be | ChangeMoi123! | operateur |

## Tests

```bash
npm test
```

## Points a confirmer avant mise en production

Recherchez `TODO A CONFIRMER` dans le code : tarifs reels, taille du parc,
marge de nettoyage, politique d'annulation tardive, coordonnees legales de
l'entreprise, comptes Mollie et Resend reels.
