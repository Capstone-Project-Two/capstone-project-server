import { Module } from '@nestjs/common';
import { MindCheckupService } from './mind-checkup.service';
import { MindCheckupController } from './mind-checkup.controller';

@Module({
  controllers: [MindCheckupController],
  providers: [MindCheckupService],
})
export class MindCheckupModule {}
