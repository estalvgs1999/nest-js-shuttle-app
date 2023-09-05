import { BookingStatus } from '../enums';

export class UpdateBookingStatusEvent {
  constructor(
    public readonly bookingId: string,
    public readonly bookingStatus: BookingStatus,
  ) {}
}
