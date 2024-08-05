import { Module } from '@nestjs/common';
import { MindCheckupService } from './mind-checkup.service';
import { MindCheckupController } from './mind-checkup.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MindCheckupController],
  providers: [MindCheckupService],
})
export class MindCheckupModule {}
