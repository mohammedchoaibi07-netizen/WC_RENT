import { QuoteRequest } from '@prisma/client';
import { emailLayout } from './layout';

export function quoteRequestAckEmail(quoteRequest: QuoteRequest) {
  const bodyHtml = `
    <p>Bonjour ${quoteRequest.nom},</p>
    <p>Nous avons bien recu votre demande de devis pour : <strong>${quoteRequest.typeBesoin}</strong>.</p>
    <p>Notre equipe revient vers vous rapidement avec une proposition adaptee.</p>
  `;
  return {
    subject: 'Votre demande de devis WC Rent Belgium',
    html: emailLayout({ title: 'Demande de devis recue', bodyHtml }),
  };
}
