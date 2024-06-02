import { Module } from '@nestjs/common';
import { PostPhotosService } from './post-photos.service';
import { PostPhotosController } from './post-photos.controller';

@Module({
  controllers: [PostPhotosController],
  providers: [PostPhotosService],
})
export class PostPhotosModule {}
