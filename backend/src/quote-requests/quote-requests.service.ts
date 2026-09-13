import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { HCaptchaService } from '../common/security/hcaptcha.service';
import { AuditLogService } from '../common/audit/audit-log.service';
import { EmailService } from '../email/email.service';
import { quoteRequestAckEmail } from '../email/templates/quote-request-ack';
import { internalNewQuoteRequestEmail } from '../email/templates/internal-notification';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import { CaptchaFailedError } from '../orders/orders.errors';

@Injectable()
export class QuoteRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hcaptcha: HCaptchaService,
    private readonly auditLog: AuditLogService,
    private readonly email: EmailService,
  ) {}

  async create(dto: CreateQuoteRequestDto) {
    if (dto.honeypot) {
      return { received: true };
    }
    const captchaOk = await this.hcaptcha.verify(dto.hcaptchaToken);
    if (!captchaOk) throw new CaptchaFailedError();

    const quoteRequest = await this.prisma.quoteRequest.create({
      data: {
        nom: dto.nom,
        telephone: dto.telephone,
        email: dto.email,
        codePostal: dto.codePostal,
        typeBesoin: dto.typeBesoin,
        details: dto.details,
      },
    });

    await this.auditLog.record({
      action: 'quote_request.created',
      entityType: 'QuoteRequest',
      entityId: quoteRequest.id,
    });

    const ack = quoteRequestAckEmail(quoteRequest);
    await this.email.send({ to: quoteRequest.email, subject: ack.subject, html: ack.html });

    const internal = internalNewQuoteRequestEmail(quoteRequest);
    await this.email.sendInternalNotification(internal.subject, internal.html);

    return { received: true, id: quoteRequest.id };
  }
}
