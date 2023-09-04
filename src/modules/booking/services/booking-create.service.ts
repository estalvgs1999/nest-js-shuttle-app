import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BOOKING_REPOSITORY, BookingRepository } from '../repositories';
import { BookingTransformService } from './booking-transform.service';
import { CreateBookingDto, RawBookingDto } from '../dtos';

@Injectable()
export class CreateBookingService {
  private readonly logger = new Logger(CreateBookingService.name);

  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    private readonly bookingTransformService: BookingTransformService,
  ) {}

  /**
   * Process a raw booking and create individual booking records in the database.
   *
   * @param rawBooking - The raw booking data to be processed.
   */
  public async run(rawBooking: RawBookingDto) {
    const bookings: CreateBookingDto[] =
      this.bookingTransformService.processRawBooking(rawBooking);

    // Iterate through each booking in the array and create a booking record in the database.
    for (const booking of bookings) {
      try {
        await this.bookingRepository.create(booking);
        this.logger.log('Booking created');
      } catch (error) {
        throw new InternalServerErrorException(`Booking failed: ${error}`);
      }
    }

    return {
      message: 'Booking created successfully',
      status: HttpStatus.OK,
    };
  }
}
