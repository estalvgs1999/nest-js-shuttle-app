import { BookingOptions } from '../types';
import { CreateBookingDto, RawBookingDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { mapPaymentMethod, mapRideMode, mapRideType, mapRoute } from '../utils';
import { RideType } from '@/modules/rides/enums';
import { RoutesService } from '@/modules/routes/services';
import { Ticket } from '../interfaces';
import { FindUsersService } from '@/modules/users/services';

@Injectable()
export class BookingTransformService {
  constructor(
    private readonly routesService: RoutesService,
    private readonly usersService: FindUsersService,
  ) {}

  /**
   * Processes a raw booking and generates an array of CreateBookingDto objects.
   *
   * @param rawBooking - The raw booking data to be processed.
   * @returns An array of CreateBookingDto objects representing bookings.
   */
  public async processRawBooking(
    rawBooking: RawBookingDto,
  ): Promise<CreateBookingDto[]> {
    // Retrieve booking options based on raw booking data.
    const bookingOptions = this.getBookingOptions(rawBooking);

    // Initialize an empty array to store booking objects.
    const bookings: CreateBookingDto[] = [];

    // Map raw booking data to CreateBookingDto object.
    const createBookingDto = await this.mapRawBookingToCreateBooking(
      rawBooking,
    );

    // Create an arrival ticket using the provided raw booking and booking options.
    const arrivalTicket = this.createTicket(rawBooking, bookingOptions);

    // Add the arrival ticket to the bookings array.
    bookings.push({ ...createBookingDto, ticket: arrivalTicket });

    // Check if the booking type is a round trip, and if so, create a departure ticket.
    if (bookingOptions.type === RideType.RoundTrip) {
      const departureTicket = this.createTicket(
        rawBooking,
        bookingOptions,
        false,
      );

      // Add the departure ticket to the bookings array.
      bookings.push({ ...createBookingDto, ticket: departureTicket });
    }

    // Return the array of booking objects.
    return bookings;
  }

  private getBookingOptions(rawBooking: RawBookingDto): BookingOptions {
    const { route, tripType, vehicleType } = rawBooking;
    return {
      route: mapRoute(route),
      mode: mapRideMode(vehicleType),
      type: mapRideType(tripType),
    };
  }

  private async mapRawBookingToCreateBooking(
    rawBooking: RawBookingDto,
  ): Promise<CreateBookingDto> {
    return {
      bookingNumber: rawBooking.reservationId,
      clientInfo: {
        client: await this.getUserId(rawBooking.email),
        name: rawBooking.name,
        email: rawBooking.email,
        phone: rawBooking.phone,
      },
      passengersInfo: {
        adults: rawBooking.adults,
        kids: rawBooking.children,
      },
      luggageInfo: {
        bags: rawBooking.bags,
        babySeats: rawBooking.babySeats,
        boosterSeats: rawBooking.boosterSeats,
        surfboards: rawBooking.surfboards,
      },
      paymentInfo: {
        priceInDollars: rawBooking.price,
        method: mapPaymentMethod(rawBooking.paymentType),
        isPaid: Boolean(rawBooking.isPaid),
      },
      ticket: null,
    };
  }

  private createTicket(
    rawBooking: RawBookingDto,
    options: BookingOptions,
    isArrival = true,
  ): Ticket {
    const { route, mode, type } = options;
    return {
      route: isArrival ? route : this.routesService.getOppositeRoute(route),
      type: type,
      mode: mode,
      pickUpLocation: isArrival
        ? rawBooking.arrivalPickupLocation
        : rawBooking.departurePickupLocation,
      pickUpDate: isArrival
        ? rawBooking.arrivalPickupDate
        : rawBooking.departurePickupDate,
      pickUpTime: isArrival
        ? rawBooking.arrivalPickupTime
        : rawBooking.departurePickupTime,
      dropOffLocation: isArrival
        ? rawBooking.arrivalDropOffLocation
        : rawBooking.departureDropOffLocation,
      dropOffDate: isArrival
        ? rawBooking.arrivalDropOffDate
        : rawBooking.departureDropOffDate,
      dropOffTime: isArrival
        ? rawBooking.arrivalDropOffTime
        : rawBooking.departureDropOffTime,
      flightNumber: isArrival
        ? rawBooking.arrivalFlight
        : rawBooking.departureFlight,
    };
  }

  async getUserId(email: string): Promise<string> {
    try {
      const user = await this.usersService.findByEmail(email);
      return user['_id'];
    } catch (error) {
      return null;
    }
  }
}
