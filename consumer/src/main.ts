import * as helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorrelationIdMiddleware } from './middleware';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { SettingsService } from './settings/settings.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const settingService = app.get(SettingsService);

  app.enableCors(settingService.getCors());
  app.use(new CorrelationIdMiddleware().use.bind(app));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      // disableErrorMessages: settingService.isProduction(),
    }),
  );

  // security
  app.use(helmet.hidePoweredBy());
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.noSniff());
  const adapter = app
    .get(HttpAdapterHost)
    .httpAdapter.getInstance<ExpressAdapter>();
  adapter.disable('etag');
  adapter.disable('Server');

  // Swagger
  if (settingService.getConfig().isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('XRay Service')
      .setDescription('This application receives and processes XRay signals.')
      .setVersion('0.1.0')
      .addTag('XRay Tag')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);
  }

  const port = settingService.getConfig().port;
  logger.log(`service is running at: http://localhost:${port}/swagger`);
  await app.listen(port);
}

bootstrap();
