import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APP_PORT, ENV_MODE } from './constants/env-constants';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilderOptions } from './config/swagger/options';
import { ValidationPipe } from '@nestjs/common';
import { renderLogs } from './utils/render-logs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, documentBuilderOptions);
  const swaggerRoutePrefix = 'api';
  if (configService.getOrThrow(ENV_MODE) === 'development') {
    app.enableCors({
      origin: '*',
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );
  SwaggerModule.setup(swaggerRoutePrefix, app, document);

  await app.listen(parseInt(configService.get(APP_PORT)));
  await renderLogs(app, swaggerRoutePrefix);
}
bootstrap();
