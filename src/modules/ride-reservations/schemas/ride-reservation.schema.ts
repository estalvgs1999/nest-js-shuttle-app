import { Document, Model, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reservation } from '../../reservations/schemas';
import { RideMode, RideType, Route } from '../enums';

@Schema()
export class RideReservation {
  @Prop({ type: Types.ObjectId, ref: Reservation.name, autopopulate: true })
  reservation: Reservation;

  @Prop({
    type: String,
    enum: Route,
  })
  route: Route;

  @Prop({
    type: String,
    enum: RideType,
  })
  type: RideType;

  @Prop({
    type: String,
    enum: RideMode,
  })
  mode: RideMode;

  @Prop({ type: String })
  flightNumber?: string;

  @Prop({ type: String })
  pickUpLocation: string;

  @Prop({ type: Date })
  pickUpDate: Date;

  @Prop({ type: String })
  pickUpTime: string;

  @Prop({ type: String })
  dropOffLocation: string;

  @Prop({ type: Date })
  dropOffDate: Date;

  @Prop({ type: String })
  dropOffTime: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RideReservationSchema =
  SchemaFactory.createForClass(RideReservation);
export type RideReservationDocument = RideReservation & Document;
export type RideReservationModel = Model<RideReservationDocument>;
