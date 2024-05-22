import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ROLES } from 'src/constants/roles-constant';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone_number: string;

  @Prop({ type: String, enum: ROLES, default: [ROLES.ADMIN] })
  roles: ROLES;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
