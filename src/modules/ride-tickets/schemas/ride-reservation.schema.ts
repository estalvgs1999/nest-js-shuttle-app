import { Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RideMode, RideType, Route } from '../enums';

@Schema({ timestamps: true })
export class RideTicket {
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
}

export const RideTicketSchema = SchemaFactory.createForClass(RideTicket);
export type RideTicketDocument = RideTicket & Document;
export type RideTicketModel = Model<RideTicketDocument>;
