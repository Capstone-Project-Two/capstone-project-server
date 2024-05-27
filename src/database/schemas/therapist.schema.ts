import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GENDER } from 'src/constants/gender-constant';
import { ROLES } from 'src/constants/roles-constant';

export type TherapistDocument = HydratedDocument<Therapist>;

@Schema({ timestamps: true })
export class Therapist {
  @Prop({ type: String, minlength: 2, maxlength: 64 })
  first_name: string;

  @Prop({ type: String, minlength: 2, maxlength: 64 })
  last_name: string;

  @Prop({ type: String, maxlength: 128 })
  bio: string;

  @Prop({
    type: String,
    minlength: 2,
    maxlength: 64,
    unique: true,
  })
  username: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, unique: true, trim: true })
  phone_number: string;

  @Prop({ type: String, enum: GENDER, isRequired: false })
  gender: GENDER;

  @Prop({ type: Array, enum: ROLES, default: [ROLES.THERAPIST] })
  roles: ROLES;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const TherapistSchema = SchemaFactory.createForClass(Therapist);
