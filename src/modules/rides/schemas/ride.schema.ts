import { Booking } from '@/modules/booking/schemas';
import { Document, Model, Types } from 'mongoose';
import { Driver } from '@/modules/drivers/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RideMode, RideStatus } from '../enums';
import { Route } from '@/modules/routes/enums';

@Schema({ timestamps: true })
export class Ride {
  @Prop({ type: Types.ObjectId, ref: Driver.name })
  driver: string;

  @Prop({
    type: String,
    enum: RideStatus,
    default: RideStatus.Pending,
  })
  status: RideStatus;

  @Prop({
    type: String,
    enum: RideMode,
  })
  mode: RideMode;

  @Prop({
    type: String,
    enum: Route,
  })
  route: Route;

  @Prop({ type: Number })
  availableSeats: number;

  @Prop({ type: Date })
  firstPickUp?: Date;

  @Prop({ type: [Types.ObjectId], ref: Booking.name })
  bookings: Booking[];

  @Prop({ type: String })
  mapRoom?: string;

  @Prop({ type: Date })
  start?: Date;

  @Prop({ type: Date })
  finish?: Date;

  @Prop({ type: String })
  duration?: string;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
export type RideDocument = Ride & Document;
export type RideModel = Model<RideDocument>;
