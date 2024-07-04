import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';
import { ActivityImages } from './activity-image.schema';

export type ActivityDocument = HydratedDocument<Activity>;

@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  task: string;

  // @Prop()
  // time: Date;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: TObjectId, ref: MODEL.ActivityImages }] })
  postImages: ActivityImages[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
