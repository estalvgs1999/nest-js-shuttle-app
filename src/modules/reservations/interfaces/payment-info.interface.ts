import { PaymentMethod } from '../enums';

export interface PaymentInfo {
  priceInDollars: number;
  method: PaymentMethod;
  isPaid: boolean;
}
