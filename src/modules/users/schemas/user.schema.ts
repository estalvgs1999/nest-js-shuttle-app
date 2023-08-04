import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountProvider, Gender, Language, UserRole } from '../enums';
import { Model } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: String, index: true, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String })
  profilePicture?: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Prop({ type: String, enum: AccountProvider, required: true })
  accountProvider: AccountProvider;

  @Prop({ type: String, enum: UserRole, required: true })
  role: UserRole;

  @Prop({ type: [String], enum: Language, required: true })
  languages: Language[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
