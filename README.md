# cursor-design-loop

Template Cursor où l'agent ne peut pas s'auto-valider sur le design.

Le principe : un LLM qui critique le code qu'il vient d'écrire le défend. Donc
la critique ne porte jamais sur son souvenir du code. Elle porte sur des
**captures d'écran** qu'il doit ouvrir, et sur un **audit chiffré du DOM** qu'il
n'a pas produit lui-même.

## Installation

```bash
cp -r cursor-design-loop/. mon-projet/
cd mon-projet
npm i -D playwright sharp && npx playwright install chromium
cp .env.example .env          # puis colle ta clé OpenAI
cat .gitignore.add >> .gitignore
# fusionne package.scripts.json dans ton package.json
```

Les règles `.mdc` sont en anglais volontairement : Cursor les applique plus
fidèlement, et le template reste partageable. Tu continues à parler français
dans le chat, ça ne change rien.

## La boucle

```bash
npm run dev            # dans un terminal
npm run check          # types + lint + build          → verdict machine
npm run snap           # captures 390/768/1440 + audit → preuves
npm run gate           # check + les gates dures de la grille
npm run verify         # les trois d'affilée
```

Puis, **dans un nouveau chat Cursor** : `@20-design-review.mdc lance la revue
de design, round 1`.

Le nouveau chat est le point le plus important de tout le template. L'agent qui
a construit la page connaît ses intentions, et l'intention est exactement le
biais qu'on veut retirer. Un reviewer qui n'a que le brief, la grille, l'audit
et les PNG n'a rien à défendre.

## Ce que produit `npm run snap`

```
.design/
├── audit.json                  les nombres + le fingerprint des sources
└── shots/
    ├── home-mobile.png         pleine page
    ├── home-mobile-fold.png    au-dessus de la ligne de flottaison
    ├── home-mobile-grey.png    niveaux de gris
    └── … tablet, desktop
```

`audit.json` mesure : ratios de contraste réels par nœud de texte, zones
cliquables sous 44px, overflow horizontal, familles de polices rendues, nombre
de tailles / radius / ombres distincts, valeurs d'espacement hors échelle,
longueurs de ligne, focus invisible, animations qui survivent à
`prefers-reduced-motion`, alt manquants ou bidon, ordre des titres, erreurs
console.

Les captures en niveaux de gris servent à un test que peu de monde fait : si la
hiérarchie s'écroule sans couleur, c'est la couleur seule qui la portait.

## Le mécanisme anti-complaisance

Six choses le rendent contraignant :

1. **Chat neuf.** Le reviewer n'a pas accès à la conversation de build, et il
   lui est interdit de lire le code source avant d'avoir écrit ses constats.
2. **Preuve fraîche obligatoire.** `snap` écrit un fingerprint des sources dans
   `audit.json`. `npm run gate` le recalcule et échoue si le code a bougé
   depuis les captures. Une revue sur preuve périmée est refusée par la règle.
3. **Pas de nombre, pas de constat.** Sur tout ce que l'audit mesure, il doit
   citer la valeur mesurée. « Le contraste semble faible » n'est pas un
   constat.
4. **Exactement trois suppressions.** Pas deux, pas « rien à retirer ». Les
   modèles sont additifs par nature, et un design progresse presque toujours
   par soustraction.
5. **Zéro section compliments.** Le format de sortie n'a pas d'endroit pour
   dire ce qui marche. Ça supprime la moitié du bruit.
6. **Trois rounds maximum.** Au round 3 il écrit `ESCALATE` et te liste les
   vrais arbitrages à trancher. Pas de polissage infini qui converge vers de
   la bouillie et brûle des tokens.

Chaque constat de jugement doit aussi être ancré au brief : la forme imposée est
« le brief dit X pour le public Y, et cet élément fait Z ». Une critique
copiable-collable sur n'importe quel autre site est supprimée.

## Les assets

`assets/manifest.json` est rempli par l'agent, une fois. Le script génère
uniquement ce qui manque, cache par hash du prompt, convertit en webp, et
refuse de dépasser `MAX_IMAGES_PER_RUN`.

```bash
npm run assets:dry     # le plan, avant de payer
npm run assets
```

Règle non négociable : pas de visages générés présentés comme réels. Pas de
portraits de témoignages clients, pas de photo d'équipe. C'est une pratique
commerciale trompeuse, et ça se repère à dix mètres sur un site que tu factures.
L'IA sert aux textures, héros décoratifs, illustrations abstraites, pictos.

## Ce que ce template ne fait pas

Il n'y a pas de MASTER, pas de DESIGNER, pas de CRITIC en tant que
personnages. Un rôle dans un fichier `.md` n'a ni état, ni retry, ni contrat de
sortie. Ce qui remplace chacun :

| Le « rôle » | Ce qui fait vraiment le travail |
|---|---|
| MASTER | toi, plus `design/PLAN.md` versionné |
| DESIGNER | `10-design-direction.mdc`, des règles pas un personnage |
| DEVELOPER | l'agent Cursor, un seul |
| CRITIC | `snap` + `gate` + un chat neuf sur `20-design-review.mdc` |
| ASSET AGENT | `scripts/gen-assets.mjs`, déterministe et plafonné |

Ajoute un sous-agent seulement quand la tâche est étroite et vérifiable
(« corrige les erreurs tsc », « complète le manifest »). Deux maximum. Au-delà,
tu maintiens ton méta-système au lieu de livrer.
