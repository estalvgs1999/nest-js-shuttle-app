import { PaymentMethod } from '../enums';

export interface PaymentInfo extends Document {
  paymentType: PaymentMethod;
  isPaid: boolean;
}
