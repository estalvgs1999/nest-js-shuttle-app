import { Document, Model, Types } from 'mongoose';
import { Driver } from '../../drivers/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VehicleStatus } from '../enums';

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ index: true, type: String, unique: true })
  plate: string;

  @Prop({ type: String })
  model: string;

  @Prop({ type: Number })
  capacity: number;

  @Prop({
    type: String,
    enum: VehicleStatus,
    default: VehicleStatus.Available,
  })
  status: VehicleStatus;

  @Prop({ type: Types.ObjectId, ref: Driver.name, autopopulate: true })
  driver: Driver | string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
export type VehicleDocument = Vehicle & Document;
export type VehicleModel = Model<VehicleDocument>;
