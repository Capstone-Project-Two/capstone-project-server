import { Module } from '@nestjs/common';
import { SavedPostsService as SavePostsService } from './save-posts.service';
import { SavedPostsController as SavePostsController } from './save-posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SavePost,
  SavedPostSchema,
} from 'src/database/schemas/saved-post.schema';
import { Post, PostSchema } from 'src/database/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavePost.name, schema: SavedPostSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [SavePostsController],
  providers: [SavePostsService],
})
export class SavePostsModule {}
