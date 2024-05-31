import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APP_PORT, ENV_MODE } from './constants/env-constants';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilderOptions } from './config/swagger/options';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, documentBuilderOptions);
  if (configService.getOrThrow(ENV_MODE) === 'development') {
    app.enableCors({
      origin: '*',
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(configService.get(APP_PORT)));

  console.log(
    `(${configService.get(ENV_MODE)}) Api is running on: ${(await app.getUrl()).toString()}`,
  );
}
bootstrap();
