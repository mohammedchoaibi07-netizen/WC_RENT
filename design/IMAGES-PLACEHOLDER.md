# Images placeholder — accueil

Ce fichier n'existait pas ; créé pour ce round (le round précédent y
faisait référence en anticipant qu'il serait déjà là — il ne l'était pas).
Sert de source unique pour les textes alternatifs des images placeholder
utilisées dans `site/`, pour que le texte alt ne soit pas réinventé à
chaque usage du même fichier.

## Convention

Chemin `site/public/images/placeholder-<usage>.png`, référencé dans le
code sous `/images/placeholder-<usage>.png` (pas `/assets/` — ce dossier
n'est pas servi par Next.js ; la convention du projet pour les images
publiques est `site/public/images/`, déjà utilisée partout ailleurs).

Format réel des trois fichiers arrivés : PNG, pas WebP, malgré le nom
initial en `.webp.png` — renommés en `.png` pour ne pas mentir sur le
format dans l'URL.

## Fichiers

| Fichier | Usage actuel | Alt |
|---|---|---|
| `placeholder-hero.png` | Fond du hero accueil (chantier, deux cabines) | "Deux cabines sanitaires WC Rent Belgium installées sur un chantier de construction, technicien au travail à l'arrière-plan" |
| `placeholder-cabine.png` | Vignette produit dans le hero accueil | "Cabine sanitaire WC Rent Belgium, vue de face sur fond neutre" |
| `placeholder-evenement.png` | Non utilisé ce round | "Cabines sanitaires WC Rent Belgium installées lors d'un événement" (alt provisoire — à confirmer avec la photo réelle et son usage, cf. `ATTENTE-CLIENT.md`) |

Les deux premiers sont référencés dans `site/src/app/page.tsx`. Le
troisième existe sur disque (arrivé avec les deux autres) mais n'a pas de
point d'usage dans ce round — gardé documenté pour ne pas le perdre de vue,
pas branché tant qu'aucune section ne le demande.
