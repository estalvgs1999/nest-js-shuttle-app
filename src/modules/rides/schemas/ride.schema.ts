import { Booking } from '@/modules/booking/schemas';
import { Document, Model, Schema as MongooseSchema, Types } from 'mongoose';
import { Driver } from '@/modules/drivers/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RideInfo } from '../interfaces';
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

  @Prop({ type: Date })
  firstPickUpDate: Date;

  @Prop({ type: [Types.ObjectId], ref: Booking.name })
  bookings: Booking[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  rideInfo: RideInfo;
}

export const RideSchema = SchemaFactory.createForClass(Ride);
export type RideDocument = Ride & Document;
export type RideModel = Model<RideDocument>;
