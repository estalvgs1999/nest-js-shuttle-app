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

  private async getAllAvailableDrivers(): Promise<Driver[]> {
    const drivers: Driver[] = await this.driversRepository.findByFilter({
      status: DriverStatus.Available,
    });
    return drivers;
  }

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
