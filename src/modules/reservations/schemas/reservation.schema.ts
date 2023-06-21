import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PassengersInfo, LuggageInfo, PaymentInfo } from '../interfaces';
import { ReservationStatus } from '../enums';
import { Model } from 'mongoose';

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ index: true })
  reservationId: string;

  @Prop()
  clientEmail: string;

  @Prop({ type: ReservationStatus, default: ReservationStatus.Pending })
  status: ReservationStatus;

  @Prop()
  passengersInfo: PassengersInfo;

  @Prop()
  luggageInfo: LuggageInfo;

  @Prop()
  paymentInfo: PaymentInfo;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
export type ReservationDocument = Reservation & Document;
export type ReservationModel = Model<Reservation>;
