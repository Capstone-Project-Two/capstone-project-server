import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_BASE_URL, APP_PORT } from './constants/env-constants';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilder } from './config/swagger/options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('api', app, document);


  await app.listen(parseInt(configService.get(APP_PORT)));

  console.log(`Api is running on: ${configService.get(API_BASE_URL)}`);
}
bootstrap();
