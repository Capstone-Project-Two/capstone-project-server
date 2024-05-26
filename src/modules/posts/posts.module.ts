import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/database/schemas/post.schema';
import { Patient, PatientSchema } from 'src/database/schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Patient.name, schema: PatientSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
