# WC Rent Belgium — Administration

Interface d'administration (React + Vite) pour le backend `../backend`.
Couvre le tableau de bord, les commandes, le planning, le parc de cabines,
les demandes de devis, les tarifs et l'export comptable.

## Demarrage

```bash
npm install
npm run dev
```

Le serveur de developpement (`http://localhost:5173`) proxifie `/api` vers
le backend (`http://localhost:3000` par defaut). Le backend doit tourner en
parallele (voir `../backend/README.md`).

Comptes de demonstration : voir `../backend/README.md`.

## Build production

```bash
npm run build
```
