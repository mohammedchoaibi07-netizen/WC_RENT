import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { calculatePricing } from './pricing.calculator';
import { AmountMismatchError } from './pricing.errors';
import { ActivePriceList, PricingBreakdown, PricingInput } from './pricing.types';

const AMOUNT_TOLERANCE_EUR = 0.01;

@Injectable()
export class PricingService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivePriceList(at: Date = new Date()): Promise<ActivePriceList> {
    const priceList = await this.prisma.priceList.findFirst({
      where: {
        validFrom: { lte: at },
        OR: [{ validUntil: null }, { validUntil: { gte: at } }],
      },
      orderBy: { validFrom: 'desc' },
    });

    if (!priceList) {
      throw new NotFoundException("Aucune grille tarifaire en vigueur n'a ete trouvee.");
    }

    return {
      id: priceList.id,
      prixSemaineCabine: Number(priceList.prixSemaineCabine),
      prixPassageEntretien: Number(priceList.prixPassageEntretien),
      prixLivraisonForfait: Number(priceList.prixLivraisonForfait),
      remiseSocietePct: Number(priceList.remiseSocietePct),
      tvaPct: Number(priceList.tvaPct),
    };
  }

  async quote(input: PricingInput): Promise<PricingBreakdown> {
    const priceList = await this.getActivePriceList();
    return calculatePricing(input, priceList);
  }

  /**
   * Recalcule le prix cote serveur et rejette si le montant transmis par le
   * client s'ecarte de plus d'un centime.
   */
  async verifyClientAmount(input: PricingInput, montantTotalRecu: number): Promise<PricingBreakdown> {
    const breakdown = await this.quote(input);
    if (Math.abs(breakdown.montantTotal - montantTotalRecu) > AMOUNT_TOLERANCE_EUR) {
      throw new AmountMismatchError(breakdown.montantTotal, montantTotalRecu);
    }
    return breakdown;
  }
}
