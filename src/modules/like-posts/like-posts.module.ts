import { Module } from '@nestjs/common';
import { LikePostsService } from './like-posts.service';
import { LikePostsController } from './like-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LikePost,
  LikePostSchema,
} from 'src/database/schemas/like-post.schema';
import { Post, PostSchema } from 'src/database/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LikePost.name, schema: LikePostSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [LikePostsController],
  providers: [LikePostsService],
})
export class LikePostsModule {}
