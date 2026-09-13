import { Injectable } from '@nestjs/common';
import { Province, UnitState } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { FLEET_LOCKING_STATUSES as ACTIVE_ORDER_STATUSES } from '../orders/order-lifecycle.constants';
import { CLEANING_MARGIN_DAYS, AVAILABILITY_SEARCH_HORIZON_DAYS } from './availability.constants';
import { addDays, rangesOverlap, startOfDay } from './date.util';
import { deliveryDelayHours, provinceFromPostalCode } from './zones';

export interface AvailabilityResult {
  available: boolean;
  firstFreeDate: string | null;
  deliveryDelayHours: 24 | 48 | null;
  earliestDeliverableDate: string | null;
  province: Province | null;
  reason?: string;
}

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Premiere date de livraison possible compte tenu du delai de zone,
   * a partir de maintenant.
   */
  earliestDeliverableDate(province: Province, now = new Date()): Date {
    const hours = deliveryDelayHours(province);
    const days = Math.ceil(hours / 24);
    return startOfDay(addDays(now, days));
  }

  async fleetSize(): Promise<number> {
    return this.prisma.unit.count({
      where: { etat: { not: UnitState.hors_service } },
    });
  }

  /**
   * Nombre d'unites libres pour l'intervalle [start, end], marge de
   * nettoyage incluse avant/apres chaque location existante.
   */
  private async freeUnitsCount(start: Date, end: Date, excludeOrderId?: string): Promise<number> {
    const units = await this.prisma.unit.findMany({
      where: { etat: { not: UnitState.hors_service } },
      select: {
        id: true,
        orderUnits: {
          where: {
            order: {
              status: { in: ACTIVE_ORDER_STATUSES },
              ...(excludeOrderId ? { id: { not: excludeOrderId } } : {}),
            },
          },
          select: {
            order: { select: { dateDebut: true, dateFin: true } },
          },
        },
      },
    });

    let free = 0;
    for (const unit of units) {
      const conflict = unit.orderUnits.some(({ order }) => {
        const bookedStart = addDays(order.dateDebut, -CLEANING_MARGIN_DAYS);
        const bookedEnd = addDays(order.dateFin, CLEANING_MARGIN_DAYS);
        return rangesOverlap(start, end, bookedStart, bookedEnd);
      });
      if (!conflict) free += 1;
    }
    return free;
  }

  async checkAvailability(params: {
    zip: string;
    start: Date;
    weeks: number;
    units: number;
  }): Promise<AvailabilityResult> {
    const province = provinceFromPostalCode(params.zip);
    if (!province) {
      return {
        available: false,
        firstFreeDate: null,
        deliveryDelayHours: null,
        earliestDeliverableDate: null,
        province: null,
        reason: 'hors_belgique',
      };
    }

    const delay = deliveryDelayHours(province);
    const earliest = this.earliestDeliverableDate(province);
    const requestedStart = startOfDay(params.start);
    const start = requestedStart < earliest ? earliest : requestedStart;
    const end = addDays(start, params.weeks * 7 - 1);

    const free = await this.freeUnitsCount(start, end);
    if (free >= params.units) {
      return {
        available: true,
        firstFreeDate: start.toISOString().slice(0, 10),
        deliveryDelayHours: delay,
        earliestDeliverableDate: earliest.toISOString().slice(0, 10),
        province,
      };
    }

    // Recherche de la premiere date libre en avancant jour par jour.
    for (let offset = 1; offset <= AVAILABILITY_SEARCH_HORIZON_DAYS; offset += 1) {
      const candidateStart = addDays(start, offset);
      const candidateEnd = addDays(candidateStart, params.weeks * 7 - 1);
      const freeCandidate = await this.freeUnitsCount(candidateStart, candidateEnd);
      if (freeCandidate >= params.units) {
        return {
          available: false,
          firstFreeDate: candidateStart.toISOString().slice(0, 10),
          deliveryDelayHours: delay,
          earliestDeliverableDate: earliest.toISOString().slice(0, 10),
          province,
          reason: 'parc_insuffisant',
        };
      }
    }

    return {
      available: false,
      firstFreeDate: null,
      deliveryDelayHours: delay,
      earliestDeliverableDate: earliest.toISOString().slice(0, 10),
      province,
      reason: 'parc_insuffisant',
    };
  }

  /** Reserve reellement N unites pour une commande (appele a la creation). */
  async assignUnits(orderId: string, start: Date, end: Date, count: number): Promise<string[]> {
    const units = await this.prisma.unit.findMany({
      where: { etat: { not: UnitState.hors_service } },
      select: { id: true },
    });

    const assigned: string[] = [];
    for (const unit of units) {
      if (assigned.length >= count) break;
      const conflict = await this.prisma.orderUnit.findFirst({
        where: {
          unitId: unit.id,
          order: {
            status: { in: ACTIVE_ORDER_STATUSES },
            AND: [
              { dateDebut: { lte: addDays(end, CLEANING_MARGIN_DAYS) } },
              { dateFin: { gte: addDays(start, -CLEANING_MARGIN_DAYS) } },
            ],
          },
        },
      });
      if (!conflict) assigned.push(unit.id);
    }

    if (assigned.length < count) {
      throw new Error('Parc insuffisant pour affecter les unites demandees');
    }

    await this.prisma.orderUnit.createMany({
      data: assigned.map((unitId) => ({ orderId, unitId })),
    });

    return assigned;
  }
}
