import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/validation/zod-validation.pipe';
import { CreateQuoteRequestSchema } from './dto/create-quote-request.dto';
import { QuoteRequestsService } from './quote-requests.service';

@ApiTags('public')
@Controller('api/quote-requests')
export class QuoteRequestsController {
  constructor(private readonly quoteRequests: QuoteRequestsService) {}

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post()
  async create(@Body(new ZodValidationPipe(CreateQuoteRequestSchema)) body: any) {
    return this.quoteRequests.create(body);
  }
}
