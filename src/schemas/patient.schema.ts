import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { GENDER } from 'src/constants/gender-constant';
import { ROLES } from 'src/constants/roles-constant';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ unique: true })
  @IsEmail()
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  phone_number: string;

  @Prop({ type: String, enum: GENDER, isRequired: false })
  gender: GENDER;

  @Prop({ type: String, enum: ROLES, default: [ROLES.PATIENT] })
  roles: Array<ROLES>;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
