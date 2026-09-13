import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';

@ApiExcludeController()
@Controller('api/webhooks')
export class WebhooksController {
  constructor(private readonly webhooks: WebhooksService) {}

  @Post('mollie')
  @HttpCode(200)
  async mollie(@Body('id') id: string) {
    if (id) {
      await this.webhooks.handleMolliePaymentNotification(id);
    }
    // Mollie exige un 200 rapide, meme si le traitement est ignore/inconnu.
    return { received: true };
  }
}
