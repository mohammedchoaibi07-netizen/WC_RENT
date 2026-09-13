import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SequenceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Incremente et retourne un compteur nomme de facon atomique (upsert SQL),
   * sans jamais produire de trou ni de doublon meme sous concurrence —
   * requis pour la numerotation legale des factures.
   */
  async next(key: string): Promise<number> {
    const rows = await this.prisma.$queryRaw<Array<{ dernier: number }>>(
      Prisma.sql`
        INSERT INTO "SequenceCounter" (id, dernier)
        VALUES (${key}, 1)
        ON CONFLICT (id) DO UPDATE SET dernier = "SequenceCounter".dernier + 1
        RETURNING dernier
      `,
    );
    return rows[0].dernier;
  }
}
