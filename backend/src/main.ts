import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/errors/domain-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );

  await app.register(helmet as any);
  await app.register(cookie as any, {
    secret: process.env.ADMIN_SESSION_SECRET ?? 'change-me-dev-only',
  });
  // NestJS/Fastify parse deja application/x-www-form-urlencoded nativement
  // (utilise par le webhook Mollie) : pas besoin de @fastify/formbody.

  app.enableCors({
    origin: process.env.PUBLIC_BASE_URL ?? true,
    credentials: true,
  });

  app.useGlobalFilters(new DomainExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('WC Rent Belgium API')
    .setDescription(
      "API publique et d'administration pour la reservation, le paiement et le suivi operationnel des locations de sanitaires mobiles.",
    )
    .setVersion('0.1.0')
    .addCookieAuth('wcr_admin_session')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`WC Rent Belgium API listening on :${port}`);
}

bootstrap();
