import { PaymentMethod } from '../enums';

export interface PaymentInfo {
  method: PaymentMethod;
  isPaid: boolean;
}
