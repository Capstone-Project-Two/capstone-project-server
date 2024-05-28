import { Module } from '@nestjs/common';
import { LikePostsService } from './like-posts.service';
import { LikePostsController } from './like-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LikePost,
  LikePostSchema,
} from 'src/database/schemas/like-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LikePost.name, schema: LikePostSchema },
    ]),
  ],
  controllers: [LikePostsController],
  providers: [LikePostsService],
})
export class LikePostsModule {}
