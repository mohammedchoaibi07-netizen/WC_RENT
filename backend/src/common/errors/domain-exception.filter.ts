import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AmountMismatchError, InvalidVisitFrequencyError } from '../../pricing/pricing.errors';
import {
  CancellationNotAllowedError,
  CaptchaFailedError,
  InsufficientFleetError,
  InvalidTrackingTokenError,
  InvalidVatError,
  OrderNotFoundError,
  OutOfBelgiumError,
  PaymentInitializationError,
} from '../../orders/orders.errors';

interface HttpLikeResponse {
  status(code: number): HttpLikeResponse;
  send(body: unknown): unknown;
}

const STATUS_BY_ERROR = new Map<Function, number>([
  [OutOfBelgiumError, HttpStatus.UNPROCESSABLE_ENTITY],
  [InsufficientFleetError, HttpStatus.CONFLICT],
  [InvalidVatError, HttpStatus.BAD_REQUEST],
  [CaptchaFailedError, HttpStatus.BAD_REQUEST],
  [OrderNotFoundError, HttpStatus.NOT_FOUND],
  [InvalidTrackingTokenError, HttpStatus.FORBIDDEN],
  [CancellationNotAllowedError, HttpStatus.CONFLICT],
  [AmountMismatchError, HttpStatus.CONFLICT],
  [InvalidVisitFrequencyError, HttpStatus.BAD_REQUEST],
  [PaymentInitializationError, HttpStatus.BAD_GATEWAY],
]);

/** Traduit les erreurs metier (domaine) en reponses HTTP coherentes. */
@Catch(
  OutOfBelgiumError,
  InsufficientFleetError,
  InvalidVatError,
  CaptchaFailedError,
  OrderNotFoundError,
  InvalidTrackingTokenError,
  CancellationNotAllowedError,
  AmountMismatchError,
  InvalidVisitFrequencyError,
  PaymentInitializationError,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<HttpLikeResponse>();
    const status = STATUS_BY_ERROR.get(exception.constructor) ?? HttpStatus.BAD_REQUEST;

    const extra =
      exception instanceof InsufficientFleetError ? { firstFreeDate: exception.firstFreeDate } : {};

    response.status(status).send({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      ...extra,
    });
  }
}
