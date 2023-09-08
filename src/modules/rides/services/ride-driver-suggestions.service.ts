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
    const { route, mode, pickUpDate: date } = booking.ticket;

    const drivers = await this.getAllAvailableDrivers();
    const driverRides = await this.getDriverRides(drivers);
    const filteredDriverRides = this.filterDriverRides(
      driverRides,
      mode,
      route,
      date,
    );
    const suggestions = this.getBestSuggestions(filteredDriverRides);

    return suggestions;
  }

  /**
   * The function `getAllAvailableDrivers` retrieves all available drivers from the drivers repository
   * and returns their IDs as an array.
   * @returns an array of strings, which are the IDs of all available drivers.
   */
  private async getAllAvailableDrivers(): Promise<string[]> {
    const drivers: Driver[] = await this.driversRepository.findByFilter({
      status: DriverStatus.Available,
    });
    return drivers.map(driver => driver['_id'].toString());
  }

  /**
   * The function `getDriverRides` retrieves pending rides for a list of driver IDs.
   * @param {string[]} driverIdList - An array of driver IDs (strings)
   * @returns an array of objects of type `DriverRides`.
   */
  private async getDriverRides(driverIdList: string[]): Promise<DriverRides[]> {
    const driverRides: DriverRides[] = [];

    for (const driverId of driverIdList) {
      const rides = await this.ridesRepository.findAll();
      const filteredRides = rides.filter(ride => {
        ride.driver['_id'].toString() === driverId &&
          ride.status === RideStatus.Pending;
      });
      driverRides.push({ driverId: driverId, rides: filteredRides });
    }

    return driverRides;
  }

  /**
   * The function filters an array of driver rides based on the specified mode, route, date, and
   * available seats.
   * @param {DriverRides[]} driverRides - An array of objects representing the rides of a driver. Each
   * object has a property called "rides" which is an array of ride objects.
   * @param {RideMode} mode - The `mode` parameter is the desired ride mode. It is used to filter the
   * driver rides based on the ride mode.
   * @param {Route} route - The `route` parameter represents the specific route that the rides should
   * match. It could be a string or an object that contains information about the starting point and
   * destination of the ride.
   * @param {Date} date - The `date` parameter represents the specific date for which we want to filter
   * the driver rides.
   * @returns a Promise that resolves to an array of DriverRides.
   */
  private filterDriverRides(
    driverRides: DriverRides[],
    mode: RideMode,
    route: Route,
    date: Date,
  ): DriverRides[] {
    for (const driverRide of driverRides) {
      driverRide.rides = driverRide.rides.filter(ride => {
        if (ride.mode !== mode || ride.mode === RideMode.Private) return false;
        if (ride.route !== route) return false;
        if (ride.date !== date) return false;
        if (ride.availableSeats <= 0) return false;
        return true;
      });
    }
    return driverRides;
  }

  /**
   * The function takes an array of driver rides and returns an array of driver suggestions, where each
   * suggestion contains the driver ID and the ID of the ride with the most available seats.
   * @param {DriverRides[]} driverRides - An array of objects representing the rides of each driver.
   * Each object in the array has the following properties:
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
        driverId: driverRide.driverId,
        rideId:
          driverRide.rides.length > 0 ? rideWithMoreRoom['_id'] : undefined,
      };

      driverSuggestions.push(suggestion);
    }
    return driverSuggestions;
  }
}
