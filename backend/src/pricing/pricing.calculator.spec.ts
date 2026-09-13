import { describe, expect, it } from 'vitest';
import { CustomerType } from '@prisma/client';
import { calculatePricing } from './pricing.calculator';
import { InvalidVisitFrequencyError } from './pricing.errors';
import { ActivePriceList } from './pricing.types';

const PRICE_LIST: ActivePriceList = {
  id: 'pl-test',
  prixSemaineCabine: 35,
  prixPassageEntretien: 25,
  prixLivraisonForfait: 75,
  remiseSocietePct: 0.1,
  tvaPct: 0.21,
};

describe('calculatePricing', () => {
  it('calcule une location particulier simple sans entretien', () => {
    const result = calculatePricing(
      { nbCabines: 1, nbSemaines: 2, passagesParSemaine: 0, clientType: CustomerType.particulier },
      PRICE_LIST,
    );

    expect(result.montantLocation).toBe(70); // 1 * 35 * 2
    expect(result.montantRemise).toBe(0);
    expect(result.montantEntretien).toBe(0);
    expect(result.montantLivraison).toBe(75);
    expect(result.montantHtva).toBe(145);
    expect(result.montantTva).toBe(30.45);
    expect(result.montantTotal).toBe(175.45);
    expect(result.remiseSocieteAppliquee).toBe(false);
  });

  it('applique la remise societe de 10% sur la location uniquement', () => {
    const result = calculatePricing(
      { nbCabines: 2, nbSemaines: 3, passagesParSemaine: 1, clientType: CustomerType.societe },
      PRICE_LIST,
    );

    const location = 2 * 35 * 3; // 210
    const remise = location * 0.1; // 21
    const entretien = 2 * 1 * 3 * 25; // 150
    const htva = location - remise + entretien + 75;
    const total = htva * 1.21;

    expect(result.montantLocation).toBe(location);
    expect(result.montantRemise).toBe(21);
    expect(result.montantEntretien).toBe(entretien);
    expect(result.montantHtva).toBeCloseTo(htva, 2);
    expect(result.montantTotal).toBeCloseTo(total, 2);
    expect(result.remiseSocieteAppliquee).toBe(true);
  });

  it("rejette plus d'un passage hebdomadaire pour une location d'une semaine", () => {
    expect(() =>
      calculatePricing(
        { nbCabines: 1, nbSemaines: 1, passagesParSemaine: 2, clientType: CustomerType.particulier },
        PRICE_LIST,
      ),
    ).toThrow(InvalidVisitFrequencyError);
  });

  it('autorise 0 ou 1 passage pour une location d\'une semaine', () => {
    expect(() =>
      calculatePricing(
        { nbCabines: 1, nbSemaines: 1, passagesParSemaine: 1, clientType: CustomerType.particulier },
        PRICE_LIST,
      ),
    ).not.toThrow();
    expect(() =>
      calculatePricing(
        { nbCabines: 1, nbSemaines: 1, passagesParSemaine: 0, clientType: CustomerType.particulier },
        PRICE_LIST,
      ),
    ).not.toThrow();
  });

  it('autorise un passage hebdomadaire pour une location de plusieurs semaines', () => {
    const result = calculatePricing(
      { nbCabines: 1, nbSemaines: 4, passagesParSemaine: 1, clientType: CustomerType.particulier },
      PRICE_LIST,
    );
    expect(result.montantEntretien).toBe(1 * 4 * 25);
  });
});
