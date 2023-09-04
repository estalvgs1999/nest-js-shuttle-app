import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import {
  ClientInfo,
  LuggageInfo,
  PassengersInfo,
  PaymentInfo,
  Ticket,
} from '../interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookingStatus } from '../enums';

@Schema({ timestamps: true })
export class Booking {
  @Prop({ index: true, type: String })
  bookingNumber: string;

  @Prop({
    type: String,
    enum: BookingStatus,
    default: BookingStatus.Pending,
  })
  status: BookingStatus;

  @Prop({ type: MongooseSchema.Types.Mixed })
  clientInfo: ClientInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  passengersInfo: PassengersInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  luggageInfo: LuggageInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  paymentInfo: PaymentInfo;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  ticket: Ticket;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
export type BookingDocument = Booking & Document;
export type BookingModel = Model<BookingDocument>;
