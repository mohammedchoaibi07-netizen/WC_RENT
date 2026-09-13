# Brief — WC Rent Belgium

Le reviewer juge le design contre ce fichier et rien d'autre.

## Sujet

Location de sanitaires mobiles en Belgique. Entreprise en lancement : aucun
client servi à ce jour. Le site est le canal commercial principal, pas une
vitrine d'appoint.

## Audience

**Prioritaire — le conducteur de travaux.** Il a besoin de sanitaires sur un
chantier, souvent avec une échéance courte. Il arrive probablement depuis une
recherche, sur mobile, entre deux tâches. Il ne lira pas la page : il la
balaiera pour trouver le prix, le délai de livraison et la zone couverte. Il
compare à un concurrent qu'il a déjà appelé.

**Secondaire — l'organisateur d'événement.** Mariage, fête de village, chantier
privé. Volume ponctuel, décision plus lente, sensibilité différente à la
propreté et à l'aspect des cabines.

Quand les deux publics s'opposent sur un choix, le pro du chantier tranche.

## Job principal de la page

Le visiteur paie sa commande en ligne par carte.

Chemin secondaire assumé : il appelle, et un arrangement est possible
(virement, facturation). Ce chemin doit rester visible en permanence, pas
relégué en pied de page. Un professionnel du bâtiment commande souvent sur
facture à 30 jours et n'a pas de carte d'entreprise en main ; lui imposer le
paiement carte comme seule issue perd la commande au lieu de la sécuriser.

## Contrainte dominante — zéro antériorité

Le visiteur doit sortir sa carte sur le site d'une entreprise dont il n'a
jamais entendu parler, qui n'a aucun avis en ligne et aucune référence
client. C'est le problème central du projet. Tout le design en découle.

La confiance ne peut donc pas venir de la preuve sociale. Elle doit venir de
signaux vérifiables et de l'absence de zone d'ombre :

- numéro de TVA et adresse physique visibles, pas cachés dans les mentions
- assurance RC professionnelle, agréments, conformité chantier si applicable
- prix complet affiché : livraison, entretien, reprise, TVA, sans supplément
  découvert à l'étape 5
- zones desservies et délais réels, énoncés précisément
- conditions d'annulation et de remboursement lisibles avant le paiement
- un vrai numéro de téléphone, joignable, avec les horaires

**Interdit :** témoignages, avis ou notes inventés, y compris anonymisés
(« un conducteur de travaux »). L'entreprise n'a pas encore de clients. Ces
blocs doivent être retirés tant qu'il n'existe pas de client réel acceptant
d'être cité nommément. Ils se repèrent, et sur une page dont l'enjeu est la
confiance, ils produisent l'effet inverse de celui recherché.

Même règle pour les visuels : pas d'images générées présentant les cabines, le
personnel ou des chantiers réalisés. Les photos produit doivent être celles du
matériel réellement loué.

## Voix

Professionnel, assuré, rassurant.

Ces trois adjectifs pointent dans la même direction : la page doit avoir l'air
tenue par des gens sérieux qui livrent quand ils le disent. Concrètement, cela
veut dire des phrases courtes, des chiffres précis, aucune promesse
invérifiable, et des libellés d'action qui nomment ce qui se passe
(« Payer la commande », pas « Continuer »).

**Ne doit jamais évoquer :** un fond sombre. Le client l'a explicitement
refusé. Par extension, l'esthétique nocturne à accent fluo est hors-jeu.

## Direction visuelle

Référence de départ : la maquette et le design system exportés dans
`design-handoff/`. Palette claire imposée par le refus du sombre.

Typographie actuelle : Plus Jakarta Sans, famille unique.

Le reste des axes est libre, et cette liberté ne doit pas être dépensée en
réflexes génériques. Voir `.cursor/rules/10-design-direction.mdc`.

## Contraintes

- **Bilingue français / néerlandais.** La cible est toute la Belgique, donc la
  Flandre. Le NL n'est pas une option : une page uniquement francophone
  disqualifie l'entreprise sur la moitié du territoire. Le sélecteur de langue
  doit être trouvable sans chercher, et le néerlandais doit être traduit, pas
  passé à la machine — le vocabulaire technique du chantier ne se devine pas.
- Stack : Next.js (`site/`), admin React, backend NestJS.
- Le paiement carte doit fonctionner de bout en bout avant mise en ligne.
- Accessibilité : les gates de `design/RUBRIC.md` sont bloquants.

## Déjà refusé par le client

- Un rendu trop sombre.
- Un simple champ code postal seul sur la page zone d'intervention : le
  client veut une carte des provinces belges à cet endroit ; un champ sans
  carte a été écarté comme solution unique (un champ code postal reste
  possible en complément d'une carte, pas à sa place).

À compléter dès qu'un retour supplémentaire arrive. Chaque refus noté ici
économise un round de revue.

## Done means

Un conducteur de travaux qui ne connaît pas l'entreprise arrive sur mobile,
trouve en moins de trente secondes le prix, le délai et la zone, comprend qui
il paie et ce qui se passe s'il annule, et va au bout du paiement — ou appelle,
sans avoir eu à chercher le numéro.
