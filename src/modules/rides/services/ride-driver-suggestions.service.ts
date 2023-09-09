import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { Driver } from '@/modules/drivers/entities';
import { DriverRides, DriverSuggestion } from '../types';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import { DriverStatus } from '@/modules/drivers/enums';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RideMode, RideStatus } from '../enums';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { Route } from '@/modules/routes/enums';

@Injectable()
export class RideDriverSuggestionsService {
  private logger = new Logger(RideDriverSuggestionsService.name);

  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async run(bookingId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    const { route, mode, pickUpDate } = booking.ticket;

    const drivers = await this.getAllAvailableDrivers();
    const driverRides = await this.getDriverRides(drivers);
    const filteredDriverRides = this.filterDriverRides(
      driverRides,
      mode,
      route,
      pickUpDate,
    );
    const suggestions = this.getBestSuggestions(filteredDriverRides);

    return suggestions;
  }

  /**
   * The function getAllAvailableDrivers retrieves all drivers with the status "Available" from the
   * drivers repository.
   * @returns an array of Driver objects.
   */
  private async getAllAvailableDrivers(): Promise<Driver[]> {
    const drivers: Driver[] = await this.driversRepository.findByFilter({
      status: DriverStatus.Available,
    });
    return drivers;
  }

  /**
   * The function `getDriverRides` takes an array of drivers and returns an array of objects containing
   * each driver and their corresponding rides.
   * @param {Driver[]} drivers - An array of objects representing drivers. Each driver object should
   * have a property called '_id' which is a unique identifier for the driver.
   * @returns an array of objects of type `DriverRides`.
   */
  private async getDriverRides(drivers: Driver[]): Promise<DriverRides[]> {
    const driverRides: DriverRides[] = [];

    for (const driver of drivers) {
      const rides = await this.ridesRepository.findAll();
      const filteredRides = rides.filter(
        ride => ride.driver['_id'].toString() === driver['_id'].toString(),
      );
      driverRides.push({ driver: driver, rides: filteredRides });
    }

    return driverRides;
  }

  /**
   * The function filters an array of driver rides based on the provided mode, route, date, and other
   * conditions.
   * @param {DriverRides[]} driverRides - An array of objects representing the rides of a driver. Each
   * object has a property called "rides" which is an array of ride objects.
   * @param {RideMode} mode - The `mode` parameter is the desired ride mode. It is used to filter the
   * driver rides based on the ride mode.
   * @param {Route} route - The `route` parameter represents the specific route for which you want to
   * filter the driver rides. It could be a string or an object that contains information about the
   * route, such as the starting point and destination.
   * @param {Date} date - The `date` parameter is a `Date` object representing the desired date for
   * filtering the driver rides.
   * @returns an array of DriverRides objects.
   */
  private filterDriverRides(
    driverRides: DriverRides[],
    mode: RideMode,
    route: Route,
    date: Date,
  ): DriverRides[] {
    for (const driverRide of driverRides) {
      driverRide.rides = driverRide.rides.filter(ride => {
        if (ride.status !== RideStatus.Pending) return false;
        if (ride.mode !== mode || ride.mode === RideMode.Private) return false;
        if (ride.route !== route) return false;
        if (
          new Date(`${ride.date}`).getTime() !== new Date(`${date}`).getTime()
        )
          return false;
        if (ride.availableSeats <= 0) return false;
        return true;
      });
    }
    return driverRides;
  }

  /**
   * The function takes an array of driver rides and returns an array of driver suggestions, where each
   * suggestion contains the driver and the ride with the most available seats.
   * @param {DriverRides[]} driverRides - An array of objects representing the rides of different
   * drivers. Each object in the array has the following properties:
   * @returns an array of DriverSuggestion objects.
   */
  private getBestSuggestions(driverRides: DriverRides[]): DriverSuggestion[] {
    const driverSuggestions = [];
    for (const driverRide of driverRides) {
      const rideWithMoreRoom = driverRide.rides.reduce(
        (prevRide, currentRide) => {
          if (
            !prevRide ||
            currentRide.availableSeats > prevRide.availableSeats
          ) {
            return currentRide;
          }
          return prevRide;
        },
        null,
      );

      const suggestion: DriverSuggestion = {
        driver: driverRide.driver,
        rideId:
          driverRide.rides.length > 0 ? rideWithMoreRoom['_id'] : undefined,
      };

      driverSuggestions.push(suggestion);
    }
    return driverSuggestions;
  }
}
