import { BookingOptions } from '../types';
import { CreateBookingDto, RawBookingDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { mapPaymentMethod, mapRideMode, mapRideType, mapRoute } from '../utils';
import { RideType } from '@/modules/rides/enums';
import { RoutesService } from '@/modules/routes/services';
import { Ticket } from '../interfaces';
import { FindUsersService } from '@/modules/users/services';
import { User } from '@/modules/users/entities';
import { Route } from '@/modules/routes/enums';

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
    const user = await this.getUserByEmail(rawBooking.email);
    return {
      bookingNumber: rawBooking.reservationId,
      clientInfo: {
        client: user ? user['_id'] : undefined,
        languages: user ? user['languages'] : undefined,
        profilePicture: user ? user['profilePicture'] : undefined,
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
      pickUpLocation: this.transformBookingLocation(
        isArrival
          ? rawBooking.arrivalPickupLocation
          : rawBooking.departurePickupLocation,
        route,
      ),
      pickUpDate: isArrival
        ? rawBooking.arrivalPickupDate
        : rawBooking.departurePickupDate,
      pickUpTime: isArrival
        ? rawBooking.arrivalPickupTime
        : rawBooking.departurePickupTime,
      dropOffLocation: this.transformBookingLocation(
        isArrival
          ? rawBooking.arrivalDropOffLocation
          : rawBooking.departureDropOffLocation,
        route,
      ),
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

  private async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      return user;
    } catch (error) {
      return null;
    }
  }

  public async getUserById(userId: string): Promise<User> {
    try {
      const user = await this.usersService.findById(userId);
      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * The function `transformBookingLocation` takes a raw location string and a route, and returns a
   * transformed location string based on the route and specific airport regex patterns.
   * @param {string} rawLocation - A string representing the raw location input.
   * @param {Route} route - The `route` parameter is of type `Route`, which is an enum representing
   * different routes.
   * @returns a string representing the transformed booking location.
   */
  private transformBookingLocation(rawLocation: string, route: Route): string {
    // Airport Regex
    const regexSJOAirport = /Juan Santa María \(SJO\) Airport/;
    const regexLIRAirport = /Liberia \(LIR\) Airport/;

    // Airport hardcoded locations
    const LIRAirportLocation =
      'Aeropuerto Internacional Daniel Oduber Quirós (LIR), Liberia';
    const SJOAirportLocation =
      'Aeropuerto Internacional Juan Santamaría, San José';

    let location = '';

    switch (route) {
      case Route.SanJoseToNosara:
        location = regexSJOAirport.test(rawLocation)
          ? SJOAirportLocation
          : this.transformLocationString(rawLocation);
        break;
      case Route.NosaraToSanJose:
        location = regexSJOAirport.test(rawLocation)
          ? SJOAirportLocation
          : this.transformLocationString(rawLocation);
        break;
      case Route.LiberiaToNosara:
        location = regexLIRAirport.test(rawLocation)
          ? LIRAirportLocation
          : this.transformLocationString(rawLocation);
        break;
      case Route.NosaraToLiberia:
        location = regexLIRAirport.test(rawLocation)
          ? LIRAirportLocation
          : this.transformLocationString(rawLocation);
        break;
      case Route.LiberiaDowntownToNosara:
        location = regexLIRAirport.test(rawLocation)
          ? LIRAirportLocation
          : this.transformLocationString(rawLocation);
        break;
      default:
        break;
    }
    return location;
  }

  /**
   * The function `transformLocationString` takes a string representing a location and transforms it by
   * separating the place and destiny parts and returning them in a specific format.
   * @param {string} location - The `location` parameter is a string that represents a location.
   * @returns a transformed location string in the format "place, destiny".
   */
  private transformLocationString(location: string): string {
    let destiny = '';
    let place = '';
    let openedParenthesis = 0;

    for (const c of location) {
      if (c === '(') {
        openedParenthesis += 1;
        if (openedParenthesis <= 1) continue;
      } else if (c === ')') {
        openedParenthesis -= 1;
        if (openedParenthesis === 0) continue;
      }

      if (openedParenthesis === 0) {
        destiny += c;
      } else {
        place += c;
      }
    }

    destiny = destiny.trim();
    place = place.trim();

    return `${place}, ${destiny}`;
  }
}
