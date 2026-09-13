import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { toCsv } from './csv.util';

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  async ordersCsv(): Promise<string> {
    const orders = await this.prisma.order.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
    return toCsv(
      orders.map((o) => ({
        reference: o.reference,
        statut: o.status,
        client: o.customer.nom,
        email: o.customer.email,
        type_client: o.clientType,
        date_debut: o.dateDebut.toISOString().slice(0, 10),
        date_fin: o.dateFin.toISOString().slice(0, 10),
        cabines: o.nbCabines,
        province: o.province,
        montant_total: Number(o.montantTotal).toFixed(2),
        moyen_paiement: o.moyenPaiement ?? '',
      })),
    );
  }

  async invoicesCsv(): Promise<string> {
    const invoices = await this.prisma.invoice.findMany({
      include: { order: { include: { customer: true } } },
      orderBy: { dateEmission: 'desc' },
    });
    return toCsv(
      invoices.map((i) => ({
        numero: i.numero,
        date_emission: i.dateEmission.toISOString().slice(0, 10),
        reference_commande: i.order.reference,
        client: i.order.customer.nom,
        montant_total: Number(i.montantTotal).toFixed(2),
      })),
    );
  }
}
