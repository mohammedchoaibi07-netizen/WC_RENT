# PLAN — refonte hero + confiance + zone d'intervention (accueil)

Continuation d'un système déjà en place (11 rounds de revue derrière), pas un
brief vierge — les choix ci-dessous réutilisent la palette et l'échelle
existantes plutôt que d'en inventer une nouvelle sans raison.

## Couleur

Palette déjà committée (`globals.css`), rôles pour ce round :

- `--blue-500 #006edc` — CTA principal (Réserver), le seul bleu plein de l'écran.
- `--navy-900 #04182f` — titre, texte à forte lisibilité sur la photo.
- `--white #ffffff` — carte prix : seule surface blanche pleine sur la photo,
  c'est elle qui doit accrocher l'œil avant le titre.
- `--grey-050 #f5f7fa` — fond du bloc confiance, pour le détacher de la photo
  du hero sans introduire une nouvelle teinte.
- `--green-600 #117d49` — coches des trois bénéfices prix (déjà le vert
  "engagement" du site, pas une nouvelle couleur pour un nouveau sens).
- `--grey-500 #5d6d84` — texte secondaire (sous-titre, phrase d'inclusion).

Aucune couleur nouvelle. Zéro dégradé décoratif ajouté.

## Type

Une seule famille, Plus Jakarta Sans (M-04 plafonne à deux ; il n'y a aucune
raison éditoriale d'en ajouter une pour un bloc prix). Échelle du round
précédent réutilisée, un seul ajout :

- Titre hero : `clamp(32px,6vw,60px)` / 800 (inchangé, déjà en place)
- **Prix vedette : `clamp(48px,9vw,84px)` / 800** — nouveau palier, seule
  exception à l'échelle existante, justifiée : c'est le point focal, il doit
  mesurer visuellement plus que le titre, pas juste être gras.
- Sous-titre / phrase d'inclusion : 18px / 500 (`--text-lead` déjà en place)
- Bénéfices, réassurances, bloc confiance : 16px / 500-700 selon le rôle

## Layout

Concept en une phrase : la photo reste le fond plein écran, mais la carte prix
blanche — pas le titre — est l'ancre visuelle, posée en avant-plan sur la
photo ; tout le reste (confiance, zone) descend en pleine largeur sous la
ligne de flottaison, aligné à gauche comme le reste du site.

```
┌─────────────────────────────────────────────┐
│ [nav existante, inchangée]                   │
├─────────────────────────────────────────────┤
│  Titre (2 lignes courtes)      ░░░░░░░░░░░░  │
│  Sous-titre (1 ligne)          ░░ photo  ░░  │
│ ┌───────────────────────┐      ░░ chantier ░ │
│ │ XX € / mois            │      ░░░░░░░░░░░░  │
│ │ incl. livr+entr+reprise│      ┌──────────┐ │
│ │ ✓ 24h ✓ tout compris   │      │ cabine   │ │
│ │ ✓ partout en Belgique  │      │ (photo)  │ │
│ └───────────────────────┘      └──────────┘ │
│ [Réserver] [Appeler 04 70 ...]               │
│ 💳 carte   📄 facture 30j   📅 annulation 48h │
├─────────────────────────────────────────────┤
│  Une entreprise belge, transparente          │
│  🏛 siège BE   📄 TVA   🛡 RC   ☎ horaires     │
├─────────────────────────────────────────────┤
│  Zone d'intervention                         │
│  [code postal____] → délai         voir tout →│
└─────────────────────────────────────────────┘
```

Alignement : gauche, comme le reste du site (aucune section du site n'est
centrée aujourd'hui — centrer juste le hero créerait une incohérence, pas un
choix).

## Principes

1. Le prix est la chose qu'on retient — tout le reste de l'écran existe pour
   lui donner un contexte de confiance, pas pour rivaliser avec lui.
2. Une seule carte blanche pleine dans le hero (le prix). Le bloc confiance
   et la zone d'intervention restent en aplat `grey-050`/`white` sans jouer
   la même carte flottante, pour que la carte prix reste unique dans son
   traitement, pas un gabarit répété.
3. Chaque rangée de trois éléments porte trois icônes différentes et
   sémantiquement justifiées (jamais la même forme répétée trois fois).

## Self-check anti-générique (`.cursor/rules/10-design-direction.mdc`)

Question posée : si je recevais un brief vaguement similaire demain,
produirais-je à peu près ce plan ? Réponses en écrivant, avant le code :

- **Cluster 5 (chrome de template)** — le hero actuel a déjà un eyebrow
  ALL-CAPS tracké ("PARTOUT EN BELGIQUE") et des liens `{label} →` collés.
  Les deux sont sur la liste noire du brief client ET du fichier de règles.
  **Changé** : eyebrow supprimé du hero (l'info "partout en Belgique" vit
  déjà dans les trois bénéfices du bloc prix, la répéter en étiquette
  au-dessus du titre est un tic, pas une information). Le lien vers
  `/zone-intervention` utilise une icône `arrow-right` avec un vrai `gap`,
  jamais un caractère `→` concaténé au texte.
- **Cluster 4 (kit de cartes SaaS)** — réflexe par défaut : trois blocs
  (prix / confiance / zone) tous en carte blanche `rounded-2xl` + même
  ombre. **Changé** : seul le bloc prix est une carte surélevée (c'est le
  point focal, il doit se détacher de la photo) ; confiance et zone
  restent en aplat de couleur, sans ombre, pour ne pas dupliquer le
  traitement carte trois fois de suite.
- **Rangées de trois icônes identiques** — réflexe par défaut : un
  check-mark générique répété pour les 3 bénéfices prix et les 3
  réassurances. **Changé** : `truck` / `shield-check` / `map-pin` pour les
  bénéfices prix, `credit-card` / `file-text` / `calendar-days` pour les
  réassurances — chaque icône nomme réellement son bénéfice.
- **Prix comme point focal devant le titre** — n'est *pas* le défaut
  générique ici (le défaut serait titre XXL + sous-titre + CTA, prix
  discret ou absent du hero) : c'est une demande explicite du client,
  gardée telle quelle, pas un réflexe à corriger.
- **Motion** — aucune animation d'entrée ajoutée sur ces nouveaux blocs. Le
  machine-à-écrire existe déjà ailleurs sur la page ; en ajouter un second
  ici ouvrirait deux animations concurrentes sur le même écran, contraire à
  la règle "un seul moment orchestré par page". Le prix s'affiche
  immédiatement, entier, ce qui sert justement son rôle de repère stable et
  scannable en une seconde.
