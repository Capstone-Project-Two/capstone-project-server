import { Module } from '@nestjs/common';
import { ActivitiesImagesService } from './activities-images.service';
import { ActivitiesImagesController } from './activities-images.controller';

@Module({
  controllers: [ActivitiesImagesController],
  providers: [ActivitiesImagesService],
})
export class ActivitiesImagesModule {}
