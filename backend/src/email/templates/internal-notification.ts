import { Order, QuoteRequest } from '@prisma/client';
import { emailLayout, formatEur } from './layout';

export function internalNewOrderEmail(order: Order) {
  const bodyHtml = `
    <p>Nouvelle commande <strong>${order.reference}</strong> — ${formatEur(Number(order.montantTotal))} TTC.</p>
    <p>Client : ${order.clientType}. Adresse : ${order.adresseVille} (${order.adresseCp}).</p>
  `;
  return {
    subject: `Nouvelle commande ${order.reference}`,
    html: emailLayout({ title: 'Nouvelle commande recue', bodyHtml }),
  };
}

export function internalNewQuoteRequestEmail(quoteRequest: QuoteRequest) {
  const bodyHtml = `
    <p>Nouvelle demande de devis de <strong>${quoteRequest.nom}</strong> (${quoteRequest.typeBesoin}).</p>
    <p>Contact : ${quoteRequest.telephone} — ${quoteRequest.email}. Code postal : ${quoteRequest.codePostal}.</p>
  `;
  return {
    subject: `Nouvelle demande de devis — ${quoteRequest.nom}`,
    html: emailLayout({ title: 'Nouvelle demande de devis', bodyHtml }),
  };
}
