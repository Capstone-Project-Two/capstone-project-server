import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Post } from './post.schema';
import { MODEL } from 'src/constants/model-constant';

export type SavedPostsDocument = HydratedDocument<SavedPosts>;

@Schema({ timestamps: true })
export class SavedPosts {
  @Prop({ type: Patient, ref: MODEL.Patient, isRequired: true })
  patient: Patient;

  @Prop({ type: Post, ref: MODEL.Post, isRequired: true })
  post: Post;
}

export const SavedPostsSchema = SchemaFactory.createForClass(SavedPosts);
