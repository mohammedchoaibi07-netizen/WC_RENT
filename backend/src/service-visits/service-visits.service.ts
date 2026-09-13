import { Injectable } from '@nestjs/common';
import { Order, ServiceVisit } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { addDays } from '../availability/date.util';

@Injectable()
export class ServiceVisitsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Genere les passages d'entretien programmes sur toute la duree de la
   * commande, repartis regulierement entre la livraison et l'enlevement
   * (jamais le jour meme de l'une ou de l'autre).
   */
  async generateForOrder(order: Order): Promise<ServiceVisit[]> {
    const totalDays = Math.round((order.dateFin.getTime() - order.dateDebut.getTime()) / 86_400_000) + 1;
    const weeks = Math.max(1, Math.round(totalDays / 7));
    const totalVisits = order.passagesParSemaine * weeks;
    if (totalVisits <= 0) return [];

    const intervalDays = totalDays / (totalVisits + 1);
    const visits: ServiceVisit[] = [];
    for (let i = 1; i <= totalVisits; i += 1) {
      const datePlanifiee = addDays(order.dateDebut, Math.round(intervalDays * i));
      visits.push(
        await this.prisma.serviceVisit.create({
          data: { orderId: order.id, datePlanifiee },
        }),
      );
    }
    return visits;
  }
}
