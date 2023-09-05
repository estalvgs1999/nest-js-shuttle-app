import { mapEnumValueByIndex } from '@/common/utils';
import { PaymentMethod } from '../enums';
import { RideMode, RideType } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';

export const mapPaymentMethod = (paymentType: number): PaymentMethod => {
  return mapEnumValueByIndex(PaymentMethod, paymentType);
};

export const mapRideMode = (rideMode: number): RideMode => {
  return mapEnumValueByIndex(RideMode, rideMode);
};

export const mapRideType = (rideType: number): RideType => {
  return mapEnumValueByIndex(RideType, rideType);
};

export const mapRoute = (route: number): Route => {
  return mapEnumValueByIndex(Route, route);
};
