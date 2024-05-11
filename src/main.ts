import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APP_PORT, ENV_MODE } from './constants/env-constants';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilder } from './config/swagger/options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(configService.get(APP_PORT)));

  console.log(
    `(${configService.get(ENV_MODE)}) Api is running on: http://localhost:${configService.get(`${APP_PORT}`)}`,
  );
}
bootstrap();
