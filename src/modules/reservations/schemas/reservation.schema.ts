import { Document, Model, Schema as MongooseSchema } from 'mongoose';
import { LuggageInfo, PassengersInfo, PaymentInfo } from '../interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReservationStatus } from '../enums';

@Schema()
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

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
export type ReservationDocument = Reservation & Document;
export type ReservationModel = Model<ReservationDocument>;
