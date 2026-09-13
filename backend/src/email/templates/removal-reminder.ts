import { Order } from '@prisma/client';
import { emailLayout, formatDateFr } from './layout';

export function removalReminderEmail(order: Order) {
  const bodyHtml = `
    <p>Bonjour,</p>
    <p>Votre location <strong>${order.reference}</strong> se termine le <strong>${formatDateFr(order.dateFin)}</strong>. Notre equipe passera enlever la ou les cabines a cette date.</p>
    <p>Si vous souhaitez prolonger la location, contactez-nous des que possible.</p>
  `;
  return {
    subject: `Enlevement prevu — commande ${order.reference}`,
    html: emailLayout({ title: "Fin de location : enlevement prevu", bodyHtml }),
  };
}
