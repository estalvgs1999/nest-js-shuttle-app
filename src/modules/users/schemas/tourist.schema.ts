import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Language } from '../enums';
import { UserSchema } from './user.schema';

@Schema()
export class Tourist {
  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String })
  website?: string;

  @Prop({ type: [String], enum: Language, required: true })
  languages: Language[];
}

export const TouristSchema = UserSchema.discriminator(
  'Tourist',
  SchemaFactory.createForClass(Tourist),
);
