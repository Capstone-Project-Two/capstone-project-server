import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Post } from './post.schema';
import { TObjectId } from 'src/utils/mongo-helper';
import { MODEL } from 'src/constants/model-constant';

export type LikePostDocument = HydratedDocument<LikePost>;

@Schema({ timestamps: true })
export class LikePost {
  @Prop({ type: TObjectId, ref: MODEL.Patient, unique: true })
  patient: Patient;

  @Prop({ type: TObjectId, ref: MODEL.Post })
  post: Post;

  @Prop({ type: Number, default: 0 })
  like_count: number;
}

export const LikePostSchema = SchemaFactory.createForClass(LikePost);
