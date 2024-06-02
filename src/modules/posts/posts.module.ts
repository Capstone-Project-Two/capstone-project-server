import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/database/schemas/post.schema';
import { Patient, PatientSchema } from 'src/database/schemas/patient.schema';
import {
  PostPhoto,
  PostPhotoSchema,
} from 'src/database/schemas/post-photo-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: PostPhoto.name, schema: PostPhotoSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
