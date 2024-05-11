import { DocumentBuilder } from '@nestjs/swagger';
import * as project from 'package.json';

export const documentBuilderOptions = new DocumentBuilder()
  .addServer(process.env.API_BASE_URL)
  .addBearerAuth()
  .setTitle(project.name)
  .setDescription(`Capstone Api Documents`)
  .setVersion(project.version)
  .build();
