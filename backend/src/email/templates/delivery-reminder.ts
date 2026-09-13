import { Order } from '@prisma/client';
import { emailLayout, formatDateFr } from './layout';

export function deliveryReminderEmail(order: Order) {
  const bodyHtml = `
    <p>Bonjour,</p>
    <p>Petit rappel : votre commande <strong>${order.reference}</strong> sera livree demain, le <strong>${formatDateFr(order.dateDebut)}</strong>, a l'adresse indiquee (${order.adresseVille}).</p>
    <p>Merci de veiller a ce que l'acces soit degage pour notre equipe.</p>
  `;
  return {
    subject: `Livraison demain — commande ${order.reference}`,
    html: emailLayout({ title: 'Livraison prevue demain', bodyHtml }),
  };
}
