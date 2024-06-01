import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';
import { Patient } from './patient.schema';
import { Therapist } from './therapist.schema';
import { STATUS } from 'src/constants/status-constant';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;

  @Prop({ type: TObjectId, ref: MODEL.Therapist })
  therapist: Therapist;

  @Prop({ type: String, enum: STATUS, default: STATUS.REQUESTED })
  status: STATUS;

  @Prop({ type: Date, isRequired: true })
  datetime: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
