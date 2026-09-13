# Prompt — Backend WC Rent Belgium

> À coller tel quel dans Claude Code (ou à donner à un développeur) à la racine d'un dépôt vide.
> Le front existe déjà : page mobile unique en français, parcours de réservation en 5 étapes.
> Adapter les valeurs marquées « À CONFIRMER » avant de lancer.

---

## Contexte

WC Rent Belgium loue un seul type de sanitaire mobile — une cabine autonome à fosse —
partout en Belgique, et assure le nettoyage, la vidange et le débouchage. Les clients
sont des particuliers et des sociétés : chantiers, événements, mariages, industrie,
communes.

Le site public (mobile-first, français) est déjà réalisé. Il faut maintenant le
backend qui reçoit les commandes payées en ligne, les demandes de devis, et permet à
l'équipe de piloter les livraisons, les entretiens et les enlèvements.

## Objectif

Construire une API et une interface d'administration qui couvrent :

1. la réception et le paiement des réservations en ligne ;
2. la réception des demandes de devis (formulaire de contact) ;
3. la gestion opérationnelle : planning de livraison, passages d'entretien, enlèvement ;
4. la facturation et les documents envoyés au client ;
5. le stock de cabines disponibles par période.

## Stack demandée

- **Runtime** : Node.js 20, TypeScript strict.
- **Framework** : Fastify (ou NestJS si tu préfères une structure modulaire).
- **Base de données** : PostgreSQL avec Prisma. Migrations versionnées.
- **Paiement** : Mollie (Bancontact, carte, virement — les trois moyens proposés côté site).
- **E-mails transactionnels** : Resend ou Postmark, gabarits en français.
- **Admin** : application web protégée par authentification (email + mot de passe, sessions httpOnly, rôles `admin` et `operateur`).
- **Hébergement visé** : conteneur Docker, base managée. Variables d'environnement, aucun secret en dur.
- **Tests** : Vitest sur la logique de tarification, la disponibilité et les webhooks.

## Règles métier

### Catalogue

Un seul article louable : `cabine_autonome`. Deux prestations associées :
`entretien` (passage programmé) et `debouchage` (intervention ponctuelle, hors
réservation en ligne, passe par le devis).

### Tarification (À CONFIRMER — valeurs actuellement affichées sur le site)

| Poste | Montant HTVA |
| --- | --- |
| Location cabine | 35 € par cabine et par semaine |
| Passage d'entretien | 25 € par cabine et par passage |
| Livraison + enlèvement | 75 € forfaitaire par commande |
| Remise société | −10 % sur la location uniquement |
| TVA | 21 % sur le total HTVA |

Calcul :

```
location   = nb_cabines × prix_semaine × nb_semaines
remise     = client_type === 'societe' ? location × 0,10 : 0
entretien  = nb_cabines × passages_par_semaine × nb_semaines × prix_passage
htva       = location − remise + entretien + livraison
total_ttc  = htva × 1,21
```

Contrainte : pour une location d'**une seule semaine**, l'entretien est limité à
0 ou 1 passage (pas de fréquence hebdomadaire). Cette règle est déjà appliquée côté
front, elle doit être revalidée côté serveur.

La tarification doit être **calculée côté serveur** à partir d'une table de prix
en base ; les montants envoyés par le client ne sont jamais retenus, seulement
comparés (rejet si l'écart dépasse 0,01 €).

### Client particulier / société

- Particulier : nom, e-mail, téléphone. TVA incluse dans le total affiché.
- Société : en plus, raison sociale et numéro de TVA belge (`BE 0xxx.xxx.xxx`),
  validé au format et, si possible, via l'API VIES. Remise société appliquée,
  mention « TVA récupérable » sur la facture.

### Disponibilité

Chaque cabine du parc est une ligne `unit`. Une réservation bloque N unités du
premier au dernier jour de location, plus une marge de nettoyage de 1 jour
(À CONFIRMER) avant remise en location. Le calcul de disponibilité rejette une
commande si le parc est insuffisant sur la période demandée, avec un message
proposant la première date libre.

### Zones et délais

Livraison sous 24 h pour Anvers, Brabant flamand, Brabant wallon, Bruxelles,
Flandre-Orientale, Liège et Namur ; sous 48 h pour Flandre-Occidentale, Hainaut,
Limbourg et Luxembourg. Le code postal saisi détermine la province et donc la
première date de livraison sélectionnable. Hors Belgique : refus avec renvoi vers
le formulaire de devis.

### Cycle de vie d'une commande

```
brouillon → en_attente_paiement → payee → planifiee → livree
          → en_cours → a_enlever → cloturee
                                 ↘ annulee   ↘ remboursee
```

- Annulation gratuite jusqu'à 48 h avant la livraison, remboursement intégral via Mollie.
- Annulation à moins de 48 h : retenue (À CONFIRMER, proposer 50 %).
- Toute transition est journalisée avec auteur et horodatage.

### Entretiens

À la création d'une commande payée, générer automatiquement les passages
d'entretien sur toute la durée : date planifiée, statut (`prevu`, `effectue`,
`reporte`), technicien assigné, note libre. Un passage effectué peut porter une
photo et un commentaire.

## Modèle de données (Prisma, minimum)

- `Customer` — type (`particulier` | `societe`), nom, email, téléphone, société, numéro de TVA, adresses.
- `Order` — référence lisible `WCR-2026-0001`, client, statut, dates de début et de fin, nombre de cabines, passages par semaine, adresse de livraison, code postal, province, montants figés (location, remise, entretien, livraison, htva, tva, total), moyen de paiement, `mollie_payment_id`.
- `OrderUnit` — affectation d'une cabine physique à une commande.
- `Unit` — cabine du parc : code, état (`disponible`, `en_location`, `maintenance`, `hors_service`), dernier contrôle.
- `ServiceVisit` — passage d'entretien lié à une commande.
- `QuoteRequest` — demande de devis issue du formulaire de contact : nom, téléphone, e-mail, code postal, type de besoin (chantier, événement, industrie, particulier), détails libres, statut (`nouveau`, `en_cours`, `devis_envoye`, `gagne`, `perdu`).
- `Invoice` — facture PDF liée à une commande, numérotation séquentielle légale, jamais de trou.
- `PriceList` — prix en vigueur avec dates de validité, pour ne pas casser l'historique quand les tarifs changent.
- `AdminUser`, `AuditLog`.

## Endpoints publics

```
POST /api/availability      { zip, start, weeks, units } → { available, firstFreeDate, deliveryDelay }
POST /api/quote/preview     { units, weeks, visits, zip, clientType } → détail chiffré serveur
POST /api/orders            crée la commande en brouillon + session de paiement Mollie
GET  /api/orders/:ref       suivi lecture seule via token signé envoyé par e-mail
POST /api/orders/:ref/cancel
POST /api/quote-requests    formulaire de devis
POST /api/webhooks/mollie   confirmation de paiement (idempotent, signature vérifiée)
```

Toutes les entrées validées par Zod. Rate limiting sur les endpoints publics.
Protection anti-spam sur les formulaires (honeypot + hCaptcha).

## Administration

Interface en français, utilisable sur mobile par les chauffeurs :

- **Tableau de bord** : commandes du jour à livrer, à enlever, passages d'entretien prévus, demandes de devis non traitées.
- **Commandes** : liste filtrable (statut, province, période), fiche détaillée, changement de statut, ajout de note, renvoi de la confirmation, remboursement.
- **Planning** : vue semaine des livraisons, entretiens et enlèvements, assignation d'un technicien.
- **Parc** : état des cabines, mise en maintenance, historique.
- **Devis** : suivi des demandes, passage en commande.
- **Tarifs** : édition de la grille de prix avec date d'effet.
- **Export** : CSV des commandes et des factures pour la comptabilité.

## E-mails

Tous en français, ton factuel, même identité visuelle que le site (bleu marine
`#082B52`, bleu action `#006EDC`) :

1. Confirmation de réservation avec récapitulatif et facture en pièce jointe.
2. Rappel la veille de la livraison.
3. Avis de passage d'entretien.
4. Rappel d'enlèvement en fin de location.
5. Accusé de réception d'une demande de devis.
6. Notification interne à chaque nouvelle commande et demande de devis.

## Conformité

- RGPD : durée de conservation des données client, export et suppression sur demande, registre des traitements.
- Facturation belge : mentions légales obligatoires, numéro de TVA du vendeur, numérotation séquentielle, conservation 7 ans.
- Conditions générales acceptées explicitement à l'étape de paiement, version archivée avec la commande.

## Livrables attendus

1. Dépôt structuré, `README` d'installation, `docker-compose` pour Postgres.
2. Schéma Prisma et migrations.
3. API documentée (OpenAPI).
4. Interface d'administration fonctionnelle.
5. Jeu de données de démonstration : 20 commandes réparties sur les statuts.
6. Tests de la tarification, de la disponibilité et du webhook de paiement.

## À confirmer avant développement

- Grille tarifaire réelle et écart de tarif société.
- Taille du parc et marge de nettoyage entre deux locations.
- Politique d'annulation tardive.
- Coordonnées, numéro de TVA et mentions légales de l'entreprise.
- Compte Mollie et compte e-mail transactionnel.
