import { VehicleStatus } from '../enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class Vehicle {
  @Prop({ type: String })
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

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
export type VehicleDocument = Vehicle & Document;
export type VehicleModel = Model<VehicleDocument>;
