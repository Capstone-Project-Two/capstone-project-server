import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/constants/mongo-constant';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: false })
  body: string;

  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;
}

export const PostSchema = SchemaFactory.createForClass(Post);
