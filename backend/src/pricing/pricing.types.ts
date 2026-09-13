import { CustomerType } from '@prisma/client';

export interface ActivePriceList {
  id: string;
  prixSemaineCabine: number;
  prixPassageEntretien: number;
  prixLivraisonForfait: number;
  remiseSocietePct: number;
  tvaPct: number;
}

export interface PricingInput {
  nbCabines: number;
  nbSemaines: number;
  passagesParSemaine: number;
  clientType: CustomerType;
}

export interface PricingBreakdown {
  priceListId: string;
  montantLocation: number;
  montantRemise: number;
  montantEntretien: number;
  montantLivraison: number;
  montantHtva: number;
  montantTva: number;
  montantTotal: number;
  remiseSocieteAppliquee: boolean;
}
