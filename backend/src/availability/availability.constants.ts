/**
 * Marge de nettoyage (en jours) appliquee apres chaque location avant de
 * remettre une cabine en disponibilite.
 *
 * TODO A CONFIRMER (backend-prompt.md > "Disponibilite") — valeur par defaut
 * posee a 1 jour en attendant confirmation du client.
 */
export const CLEANING_MARGIN_DAYS = 1;

/**
 * Nombre de jours sur lesquels on cherche une premiere date libre avant
 * d'abandonner la recherche.
 */
export const AVAILABILITY_SEARCH_HORIZON_DAYS = 120;
