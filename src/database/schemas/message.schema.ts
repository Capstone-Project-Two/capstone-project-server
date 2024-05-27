import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ChatRoom } from './chat-room.schema';
import { TObjectId } from 'src/utils/mongo-helper';
import { MODEL } from 'src/constants/model-constant';
import { Patient } from './patient.schema';
import { Therapist } from './therapist.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: false, maxlength: 1000, minlength: 1 })
  body: string;

  @Prop({ type: TObjectId, ref: MODEL.ChatRoom })
  chatRoom: ChatRoom;

  @Prop({ type: TObjectId, ref: MODEL.Therapist || MODEL.Patient })
  sender: Patient | Therapist;

  @Prop({ type: TObjectId, ref: MODEL.Therapist || MODEL.Patient })
  receiver: Patient | Therapist;

  @Prop({ type: Boolean, default: false })
  is_seen: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
