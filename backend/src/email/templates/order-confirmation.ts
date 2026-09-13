import { Order } from '@prisma/client';
import { emailLayout, formatDateFr, formatEur } from './layout';

export function orderConfirmationEmail(order: Order, trackingUrl: string) {
  const bodyHtml = `
    <p>Bonjour,</p>
    <p>Votre reservation <strong>${order.reference}</strong> est confirmee. Voici le recapitulatif :</p>
    <table style="width:100%; border-collapse:collapse; margin:16px 0;">
      <tr><td style="padding:4px 0;">Livraison</td><td style="text-align:right;">${formatDateFr(order.dateDebut)}</td></tr>
      <tr><td style="padding:4px 0;">Enlevement</td><td style="text-align:right;">${formatDateFr(order.dateFin)}</td></tr>
      <tr><td style="padding:4px 0;">Adresse</td><td style="text-align:right;">${order.adresseVille}</td></tr>
      <tr><td style="padding:4px 0;">Cabine(s)</td><td style="text-align:right;">${order.nbCabines}</td></tr>
      <tr><td style="padding:8px 0; font-weight:bold; border-top:1px solid #eee;">Total TTC</td><td style="text-align:right; font-weight:bold; border-top:1px solid #eee;">${formatEur(Number(order.montantTotal))}</td></tr>
    </table>
    <p>La facture est jointe a cet e-mail. Vous pouvez suivre votre commande a tout moment via le lien ci-dessous.</p>
  `;
  return {
    subject: `Confirmation de votre reservation ${order.reference}`,
    html: emailLayout({ title: 'Reservation confirmee', bodyHtml, ctaLabel: 'Suivre ma commande', ctaUrl: trackingUrl }),
  };
}
