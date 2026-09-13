import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
}

/**
 * Envoi d'e-mails transactionnels via Resend.
 *
 * TODO A CONFIRMER: compte Resend reel + domaine d'envoi verifie
 * (backend-prompt.md > "A confirmer avant developpement"). Sans
 * RESEND_API_KEY valide, les envois sont journalises mais non transmis.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend | null;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    this.resend = apiKey && apiKey !== 're_placeholder' ? new Resend(apiKey) : null;
  }

  async send(payload: EmailPayload): Promise<void> {
    if (!this.resend) {
      this.logger.warn(`RESEND_API_KEY non configure — e-mail simule vers ${payload.to}: "${payload.subject}"`);
      return;
    }

    try {
      await this.resend.emails.send({
        from: process.env.EMAIL_FROM ?? 'WC Rent Belgium <commandes@wcrentbelgium.be>',
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        attachments: payload.attachments,
      });
    } catch (error) {
      this.logger.error(`Envoi e-mail echoue vers ${payload.to}: ${error}`);
    }
  }

  async sendInternalNotification(subject: string, html: string): Promise<void> {
    const to = process.env.EMAIL_INTERNAL_NOTIFY ?? 'operations@wcrentbelgium.be';
    await this.send({ to, subject, html });
  }
}
