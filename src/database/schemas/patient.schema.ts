import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GENDER } from 'src/constants/gender-constant';
import { MODEL } from 'src/constants/model-constant';
import { ROLES } from 'src/constants/roles-constant';
import { Post } from './post.schema';
import { TObjectId } from 'src/utils/mongo-helper';
import { Credential } from './credential.schema';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
  // @Prop({ type: String, unique: true })
  // email: string;

  @Prop({ isRequired: false })
  refresh_token: string

  @Prop({ type: TObjectId, ref: MODEL.Credential })
  credential: Credential;

  @Prop({ type: String, unique: true, minlength: 3, maxlength: 64 })
  username: string;

  @Prop({ type: String, unique: true, trim: true })
  phone_number: string;

  @Prop({ type: String, enum: GENDER, isRequired: false })
  gender?: GENDER;

  @Prop({ type: Array, enum: ROLES, default: [ROLES.PATIENT] })
  roles: Array<ROLES>;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;

  @Prop({ type: Boolean, default: false })
  is_banned: boolean;

  @Prop({type: Number, default: 0})
  credits: number;

  @Prop({ type: [{ type: TObjectId, ref: MODEL.Post }], isRequired: false })
  posts: Post[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
