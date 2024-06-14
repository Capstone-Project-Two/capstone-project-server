import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Actvities } from './activity.schema';
import { TObjectId } from 'src/utils/mongo-helper';
import { MODEL } from 'src/constants/model-constant';

export type ActvitiesImagesDocument = HydratedDocument<ActvitiesImages>;

@Schema({ timestamps: true })
export class ActvitiesImages {
  @Prop({ type: String })
  filename: string;

  @Prop({ type: TObjectId, ref: MODEL.Actvities })
  post: Actvities;
}

export const ActvitiesImagesSchema =
  SchemaFactory.createForClass(ActvitiesImages);
