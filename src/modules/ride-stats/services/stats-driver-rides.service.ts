import { RideStatus } from '@/modules/rides/enums';
import {
  DriverRideDetailDto,
  DriverRidesByDateDto,
  DriverTotalRidesDto,
} from '../dtos';
import { FindRidesService } from '@/modules/rides/services';
import { Injectable } from '@nestjs/common';
import { Ride } from '@/modules/rides/schemas';

@Injectable()
export class DriverRideStatsService {
  constructor(private readonly ridesService: FindRidesService) {}

  async getDriverTotalRides(driverId: string): Promise<DriverTotalRidesDto> {
    const rides = await this.getDriverCompletedRides(driverId);
    return { totalTrips: rides.length };
  }

  async getRidesByDate(
    driverId: string,
    from: Date,
    to: Date,
  ): Promise<DriverRidesByDateDto[]> {
    const rides = await this.getDriverCompletedRides(driverId);

    // Filter rides by dates
    const filteredRides = rides.filter(ride => {
      return new Date(from) <= ride.date && ride.date <= new Date(to);
    });

    // Group rides by date and count them
    const groupedRides = filteredRides.reduce(
      (group: { [key: string]: number }, ride) => {
        const dateString = ride.date.toISOString();
        if (!group[dateString]) {
          group[dateString] = 0;
        }
        group[dateString]++;
        return group;
      },
      {},
    );

    // Process the grouped rides and transform them to object Dto
    const driverRidesReport: DriverRidesByDateDto[] = [];
    Object.keys(groupedRides).forEach(k => {
      driverRidesReport.push({
        date: k,
        quantity: groupedRides[k],
      });
    });

    return driverRidesReport;
  }

  async getRideDetails(
    driverId: string,
    date: string,
  ): Promise<DriverRideDetailDto[]> {
    const rides = await this.getDriverCompletedRides(driverId);

    // Filter rides by date
    const filteredRides = rides.filter(ride => {
      return new Date(date).getTime() === ride.date.getTime();
    });

    // Process rides
    console.log(filteredRides);
    const ridesReport: DriverRideDetailDto[] = [];

    // Run over each ride and for each ride, look over each booking to create a report of ride clients
    for (const ride of filteredRides) {
      for (const booking of ride.bookings) {
        const [name, lastName] = booking.clientInfo.name.split(' ');
        const rideDetail = {
          date: ride.date,
          route: ride.route,
          tripType: ride.mode,
          user: {
            _id: booking.clientInfo.client || undefined,
            name: name,
            lastName: lastName || undefined,
            profilePicture: booking.clientInfo.profilePicture || undefined,
          },
        };
        ridesReport.push(rideDetail);
      }
    }

    return ridesReport;
  }

  private async getDriverCompletedRides(driverId: string): Promise<Ride[]> {
    const rides = await this.ridesService.findByDriver(driverId);
    const completedRides = rides.filter(
      ride => ride.status === RideStatus.Completed,
    );
    return completedRides;
  }
}
