import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SettingsService } from './settings/settings.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // in real application set valid URLs only like https://my.webpage.ir
  });

  const settingService = app.get(SettingsService);

  // Swagger
  if (settingService.getConfig().isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('XRay Service')
      .setDescription('This application receives and processes XRay signals.')
      .setVersion('0.1.0')
      .addTag('XRay Tag')
      .build();
    // .addBearerAuth();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);

    // const document = SwaggerModule.createDocument(app, swaggerBuilder.build());
    // SwaggerModule.setup('swagger', app, document);
  }

  const port = settingService.getConfig().port;
  logger.log(`service is running at: http://localhost:${port}/swagger`);
  await app.listen(port);
}

bootstrap();
