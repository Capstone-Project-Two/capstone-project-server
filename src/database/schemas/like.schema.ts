import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Post } from './post.schema';
import { TObjectId } from 'src/utils/mongo-helper';
import { MODEL } from 'src/constants/model-constant';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;

  @Prop({ type: TObjectId, ref: MODEL.Post })
  post: Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
