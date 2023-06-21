import { getEnumValueByIndex } from 'src/common/utils';

export enum PaymentType {
	Cash,
	CreditCard,
}

export const mapPaymentType = (index: number): PaymentType => {
	return getEnumValueByIndex(PaymentType, index);
};
