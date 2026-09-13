import { Order, ServiceVisit } from '@prisma/client';
import { emailLayout, formatDateFr } from './layout';

export function serviceVisitNoticeEmail(order: Order, visit: ServiceVisit) {
  const bodyHtml = `
    <p>Bonjour,</p>
    <p>Un passage d'entretien est prevu le <strong>${formatDateFr(visit.datePlanifiee)}</strong> pour votre commande <strong>${order.reference}</strong> (${order.adresseVille}).</p>
  `;
  return {
    subject: `Passage d'entretien prevu — commande ${order.reference}`,
    html: emailLayout({ title: "Passage d'entretien a venir", bodyHtml }),
  };
}
