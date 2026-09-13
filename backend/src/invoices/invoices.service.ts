import { Injectable, Logger } from '@nestjs/common';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import PDFDocument from 'pdfkit';
import { Order } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { SequenceService } from '../common/sequence/sequence.service';
import { formatInvoiceNumber } from './invoice-number.util';

const STORAGE_DIR = process.env.INVOICE_STORAGE_DIR ?? join(process.cwd(), 'storage', 'invoices');

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sequence: SequenceService,
  ) {}

  /**
   * Genere et enregistre la facture legale d'une commande payee.
   * Numerotation sequentielle sans trou (obligation belge) via SequenceService.
   */
  async generateForOrder(order: Order): Promise<{ numero: string; pdfBuffer: Buffer; pdfPath: string }> {
    const year = new Date().getUTCFullYear();
    const seq = await this.sequence.next(`invoice:${year}`);
    const numero = formatInvoiceNumber(year, seq);

    const pdfBuffer = await this.renderPdf(order, numero);

    await mkdir(STORAGE_DIR, { recursive: true });
    const pdfPath = join(STORAGE_DIR, `${numero}.pdf`);
    await writeFile(pdfPath, pdfBuffer);

    await this.prisma.invoice.create({
      data: {
        orderId: order.id,
        numero,
        pdfPath,
        montantTotal: order.montantTotal,
      },
    });

    this.logger.log(`Facture ${numero} generee pour la commande ${order.reference}`);

    return { numero, pdfBuffer, pdfPath };
  }

  private renderPdf(order: Order, numero: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const companyName = process.env.COMPANY_NAME ?? 'WC Rent Belgium SRL';
      const companyVat = process.env.COMPANY_VAT ?? 'BE 0000.000.000 (TODO A CONFIRMER)';
      const companyAddress = process.env.COMPANY_ADDRESS ?? 'Adresse a confirmer, Belgique';

      doc.fontSize(20).fillColor('#082B52').text(companyName, { continued: false });
      doc.fontSize(10).fillColor('#444').text(companyAddress);
      doc.text(`TVA : ${companyVat}`);
      doc.moveDown(2);

      doc.fontSize(16).fillColor('#082B52').text(`Facture ${numero}`);
      doc.fontSize(10).fillColor('#444').text(`Reference commande : ${order.reference}`);
      doc.text(`Date d'emission : ${new Date().toLocaleDateString('fr-BE')}`);
      doc.moveDown(1);

      doc.fontSize(11).fillColor('#000');
      const rows: Array<[string, string]> = [
        ['Location', `${Number(order.montantLocation).toFixed(2)} EUR`],
        ['Remise societe', `-${Number(order.montantRemise).toFixed(2)} EUR`],
        ['Entretien', `${Number(order.montantEntretien).toFixed(2)} EUR`],
        ['Livraison + enlevement', `${Number(order.montantLivraison).toFixed(2)} EUR`],
        ['Total HTVA', `${Number(order.montantHtva).toFixed(2)} EUR`],
        ['TVA (21%)', `${Number(order.montantTva).toFixed(2)} EUR`],
        ['Total TTC', `${Number(order.montantTotal).toFixed(2)} EUR`],
      ];
      for (const [label, value] of rows) {
        doc.text(`${label}: ${value}`);
      }

      if (order.societeRemiseAppliquee) {
        doc.moveDown(1);
        doc.fontSize(9).fillColor('#666').text('TVA recuperable — client assujetti (societe).');
      }

      doc.moveDown(2);
      doc.fontSize(8).fillColor('#999').text('Facture conservee 7 ans conformement a la reglementation belge.');

      doc.end();
    });
  }
}
