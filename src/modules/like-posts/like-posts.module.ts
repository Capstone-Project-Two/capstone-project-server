import { Module } from '@nestjs/common';
import { LikePostsService } from './like-posts.service';
import { LikePostsController } from './like-posts.controller';

@Module({
  controllers: [LikePostsController],
  providers: [LikePostsService],
})
export class LikePostsModule {}
