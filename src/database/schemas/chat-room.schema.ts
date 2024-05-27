import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';
import { Patient } from './patient.schema';
import { Therapist } from './therapist.schema';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({ timestamps: true })
export class ChatRoom {
  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;

  @Prop({ type: TObjectId, ref: MODEL.Therapist })
  therapist: Therapist;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
