import { OrderStatus } from '@prisma/client';

/**
 * Statuts qui immobilisent reellement des unites du parc, y compris pendant
 * le court delai de paiement : sans cela, deux clients pourraient reserver
 * les memes dernieres cabines pendant que l'un des deux est sur l'ecran de
 * paiement Mollie.
 */
export const FLEET_LOCKING_STATUSES: OrderStatus[] = [
  OrderStatus.en_attente_paiement,
  OrderStatus.payee,
  OrderStatus.planifiee,
  OrderStatus.livree,
  OrderStatus.en_cours,
  OrderStatus.a_enlever,
];

/** Delai gratuit d'annulation avant la livraison. */
export const FREE_CANCELLATION_HOURS_BEFORE_DELIVERY = 48;

/**
 * Retenue appliquee en cas d'annulation tardive (< 48h avant livraison).
 * TODO A CONFIRMER (backend-prompt.md > "Cycle de vie d'une commande").
 */
export const LATE_CANCELLATION_RETENTION_PCT = 0.5;

/** Duree maximale avant liberation automatique d'une commande non payee. */
export const UNPAID_ORDER_EXPIRY_HOURS = 2;
