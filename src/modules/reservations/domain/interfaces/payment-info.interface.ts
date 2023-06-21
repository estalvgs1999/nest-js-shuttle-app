import { PaymentType } from '../types';

export interface PaymentInfo {
	paymentType: PaymentType;
	isPaid: boolean;
}
