import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Patient } from './patient.schema';
import { MODEL } from 'src/constants/model-constant';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: false })
  body: string;

  @Prop({ type: Types.ObjectId, ref: MODEL.Patient })
  patient: Patient;
}

export const PostSchema = SchemaFactory.createForClass(Post);
