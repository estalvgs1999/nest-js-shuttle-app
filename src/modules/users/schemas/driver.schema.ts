import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DriverStatus, Language } from '../enums';
import { UserSchema } from './user.schema';
import { Types } from 'mongoose';

@Schema()
export class Driver {
  @Prop({ type: String, enum: DriverStatus, default: DriverStatus.Available })
  status: DriverStatus;

  @Prop({ type: Types.ObjectId, ref: 'Vehicle' })
  assignedVehicle: string;

  @Prop({ type: [String], enum: Language, required: true })
  languages: Language[];
}

export const DriverSchema = UserSchema.discriminator(
  'Driver',
  SchemaFactory.createForClass(Driver),
);
