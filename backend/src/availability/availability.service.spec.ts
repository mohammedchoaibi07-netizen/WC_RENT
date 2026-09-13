import { describe, expect, it, vi } from 'vitest';
import { OrderStatus, Province } from '@prisma/client';
import { AvailabilityService } from './availability.service';

type FakeUnit = {
  id: string;
  orders: Array<{ dateDebut: Date; dateFin: Date; status: OrderStatus }>;
};

/** Fabrique un PrismaService minimal suffisant pour AvailabilityService. */
function fakePrisma(units: FakeUnit[]) {
  return {
    unit: {
      count: vi.fn().mockResolvedValue(units.length),
      findMany: vi.fn().mockImplementation(({ select }: any) => {
        return Promise.resolve(
          units.map((u) => {
            if (select?.orderUnits) {
              return {
                id: u.id,
                orderUnits: u.orders.map((o) => ({ order: { dateDebut: o.dateDebut, dateFin: o.dateFin } })),
              };
            }
            return { id: u.id };
          }),
        );
      }),
    },
    orderUnit: {
      findFirst: vi.fn().mockResolvedValue(null),
      createMany: vi.fn().mockResolvedValue({ count: 0 }),
    },
  } as any;
}

describe('AvailabilityService.checkAvailability', () => {
  it('est disponible quand le parc est libre sur la periode', async () => {
    const service = new AvailabilityService(fakePrisma([{ id: 'u1', orders: [] }, { id: 'u2', orders: [] }]));

    const result = await service.checkAvailability({
      zip: '1050',
      start: new Date('2026-11-01T00:00:00.000Z'),
      weeks: 2,
      units: 1,
    });

    expect(result.available).toBe(true);
    expect(result.province).toBe(Province.BRUXELLES);
    expect(result.deliveryDelayHours).toBe(24);
  });

  it('refuse une adresse hors Belgique', async () => {
    const service = new AvailabilityService(fakePrisma([]));
    const result = await service.checkAvailability({
      zip: '75000',
      start: new Date('2026-11-01T00:00:00.000Z'),
      weeks: 1,
      units: 1,
    });
    expect(result.available).toBe(false);
    expect(result.reason).toBe('hors_belgique');
  });

  it('propose la premiere date libre quand le parc est insuffisant a la date demandee', async () => {
    // Une seule cabine, deja reservee du 1er au 14 novembre 2026.
    const service = new AvailabilityService(
      fakePrisma([
        {
          id: 'u1',
          orders: [
            { dateDebut: new Date('2026-11-01T00:00:00.000Z'), dateFin: new Date('2026-11-14T00:00:00.000Z'), status: OrderStatus.payee },
          ],
        },
      ]),
    );

    const result = await service.checkAvailability({
      zip: '1050',
      start: new Date('2026-11-05T00:00:00.000Z'),
      weeks: 1,
      units: 1,
    });

    expect(result.available).toBe(false);
    expect(result.reason).toBe('parc_insuffisant');
    expect(result.firstFreeDate).not.toBeNull();
    // La date libre doit etre strictement apres la fin de reservation + marge de nettoyage.
    expect(new Date(result.firstFreeDate as string).getTime()).toBeGreaterThan(
      new Date('2026-11-14T00:00:00.000Z').getTime(),
    );
  });
});
