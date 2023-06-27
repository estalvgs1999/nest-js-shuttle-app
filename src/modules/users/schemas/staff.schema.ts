import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StaffRole } from '../enums';
import { UserSchema } from './user.schema';

@Schema()
export class Staff {
  @Prop({ type: String, enum: StaffRole, default: StaffRole.Admin })
  staffRole: string;
}

export const StaffSchema = UserSchema.discriminator(
  'Staff',
  SchemaFactory.createForClass(Staff),
);
