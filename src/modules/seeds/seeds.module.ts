import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/database/schemas/patient.schema';
import { Post, PostSchema } from 'src/database/schemas/post.schema';
import {
  LikePost,
  LikePostSchema,
} from 'src/database/schemas/like-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Post.name, schema: PostSchema },
      { name: LikePost.name, schema: LikePostSchema },
    ]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
