import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    required: false,
    maxlength: 1000,
  })
  body: string;

  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;

  @Prop({ type: [{ type: TObjectId, ref: MODEL.Patient }] })
  liked_by: Array<string>;

  @Prop({ type: Number, default: 0 })
  like_count: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
