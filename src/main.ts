import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_BASE_URL, APP_PORT } from './constants/env-constants';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilder } from './config/swagger/options';
import { get } from 'http';
import { createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('/api', app, document);


  await app.listen(parseInt(configService.get(APP_PORT)));

  console.log(`Api is running on: ${configService.get(API_BASE_URL)}`);
   // get the swagger json file (if app is running in development mode)
   if (process.env.NODE_ENV === 'development') {

    // write swagger ui files
    get(
      `${API_BASE_URL}/swagger/swagger-ui-bundle.js`, function 
      (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
        console.log(
    `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
  );
    });

    get(`${API_BASE_URL}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
    `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
  );
    });

    get(
  `${API_BASE_URL}/swagger/swagger-ui-standalone-preset.js`,
  function (response) {
      response.pipe(
      createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
    );
      console.log(
      `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
    );
    });

    get(`${API_BASE_URL}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
    `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
  );
    });

  }
}
bootstrap();
