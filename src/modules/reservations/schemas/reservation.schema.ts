import { Document, Model, Schema as MongooseSchema, Types } from 'mongoose';
import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationStatus } from '../enums';
import { RideTicket } from '@/modules/ride-tickets/schemas';

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ index: true, type: String, unique: true })
  reservationId: string;

  @Prop({ type: String })
  clientEmail: string;

  @Prop({
    type: String,
    enum: ReservationStatus,
    default: ReservationStatus.Pending,
  })
  status: ReservationStatus;

  @Prop({ type: MongooseSchema.Types.Mixed })
  passengersInfo: PassengersInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  luggageInfo: LuggageInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  paymentInfo: PaymentInfo;

  @Prop({ type: [Types.ObjectId], ref: RideTicket.name })
  rideTickets: RideTicket[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
export type ReservationDocument = Reservation & Document;
export type ReservationModel = Model<ReservationDocument>;
