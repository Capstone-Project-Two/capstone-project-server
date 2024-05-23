import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GENDER } from 'src/constants/gender-constant';
import { ROLES } from 'src/constants/roles-constant';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, unique: true, minlength: 3, maxlength: 64 })
  username: string;

  @Prop({ type: String, unique: true, trim: true })
  phone_number: string;

  @Prop({ type: String, enum: GENDER, isRequired: false })
  gender: GENDER;

  @Prop({ type: Array, enum: ROLES, default: [ROLES.PATIENT] })
  roles: Array<ROLES>;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
