import { DocumentBuilder } from "@nestjs/swagger";

export const documentBuilder = new DocumentBuilder()
    .addServer(process.env.API_BASE_URL)
    .addBearerAuth()
    .setTitle('Capstone Project')
    .setDescription(`API documents`)
    .setVersion('0.0.1')
    .build();