import { CustomerType } from '@prisma/client';
import { InvalidVisitFrequencyError } from './pricing.errors';
import { ActivePriceList, PricingBreakdown, PricingInput } from './pricing.types';

/** Arrondi bancaire a 2 decimales pour eviter les erreurs de virgule flottante. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Calcule le detail chiffre d'une location, selon les regles de
 * backend-prompt.md > "Tarification".
 *
 * Pure function: aucun acces base de donnees, entierement testable.
 */
export function calculatePricing(
  input: PricingInput,
  priceList: ActivePriceList,
): PricingBreakdown {
  if (input.nbSemaines === 1 && input.passagesParSemaine > 1) {
    throw new InvalidVisitFrequencyError();
  }

  const location = input.nbCabines * priceList.prixSemaineCabine * input.nbSemaines;
  const remiseSocieteAppliquee = input.clientType === CustomerType.societe;
  const remise = remiseSocieteAppliquee ? location * priceList.remiseSocietePct : 0;

  const totalPassages = input.passagesParSemaine * input.nbSemaines;
  const entretien = input.nbCabines * totalPassages * priceList.prixPassageEntretien;

  const livraison = priceList.prixLivraisonForfait;

  const htva = location - remise + entretien + livraison;
  const tva = htva * priceList.tvaPct;
  const total = htva + tva;

  return {
    priceListId: priceList.id,
    montantLocation: round2(location),
    montantRemise: round2(remise),
    montantEntretien: round2(entretien),
    montantLivraison: round2(livraison),
    montantHtva: round2(htva),
    montantTva: round2(tva),
    montantTotal: round2(total),
    remiseSocieteAppliquee,
  };
}

/** Nombre maximal de passages d'entretien/semaine autorise selon la duree. */
export function maxVisitsPerWeek(nbSemaines: number): number {
  return nbSemaines === 1 ? 1 : Number.POSITIVE_INFINITY;
}
