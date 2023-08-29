import { DriverStatus } from '../enums';
import { Model, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas';
import { Vehicle } from '../../vehicles/entities';

@Schema({ timestamps: true })
export class Driver {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    autopopulate: true,
    unique: true,
  })
  user: User;

  @Prop({
    type: String,
    enum: DriverStatus,
    default: DriverStatus.Free,
  })
  status: DriverStatus;

  @Prop({ type: Types.ObjectId, ref: Vehicle.name, autopopulate: true })
  vehicle: Vehicle;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
export type DriverDocument = Driver & Document;
export type DriverModel = Model<DriverDocument>;
