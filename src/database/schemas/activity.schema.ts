import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';
import { ActvitiesImages } from './activities-image.schema';

export type ActvitiesDocument = HydratedDocument<Actvities>;

@Schema({ timestamps: true })
export class Actvities {
  @Prop({ required: true })
  task: string;

  @Prop()
  time: Date;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: TObjectId, ref: MODEL.ActvitiesImages }] })
  postPhotos: ActvitiesImages;
}

export const ActvitiesSchema = SchemaFactory.createForClass(Actvities);
