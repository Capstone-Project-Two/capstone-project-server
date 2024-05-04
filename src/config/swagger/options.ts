import { DocumentBuilder } from "@nestjs/swagger";

export const documentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Capstone Project')
    .setDescription(`API documents`)
    .setVersion('0.0.1')
    .build();