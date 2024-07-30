import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MODEL } from 'src/constants/model-constant';
import { TObjectId } from 'src/utils/mongo-helper';
import { Patient } from './patient.schema';
import { Therapist } from './therapist.schema';
import { APNT_STATUS } from 'src/constants/apnt-status-constant';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: String, default: '' })
  note: string;

  @Prop({ type: String, default: '' })
  symptoms: string;

  @Prop({ type: Date, isRequired: true })
  scheduleDate: Date;

  @Prop({ type: String, enum: APNT_STATUS, default: APNT_STATUS.REQUESTED })
  status: APNT_STATUS;

  @Prop({ type: TObjectId, ref: MODEL.Patient })
  patient: Patient;

  @Prop({ type: TObjectId, ref: MODEL.Therapist })
  therapist: Therapist;

  @Prop({ type: Date, isRequired: true })
  start_time: Date;

  @Prop({ type: Date, isRequired: true })
  end_time: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
