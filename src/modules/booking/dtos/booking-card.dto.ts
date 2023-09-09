import { BookingStatus } from '../enums';
import { RideType } from '@/modules/rides/enums';
import { Route } from '@/modules/routes/enums';

export class BookingCardDto {
  bookingNumber: string;
  status: BookingStatus;
  client?: string;
  profilePicture?: string;
  name: string;
  route: Route;
  type: RideType;
  pickUpDate: Date;
}
