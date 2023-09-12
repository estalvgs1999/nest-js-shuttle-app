import { DriverTotalRidesDto } from '../dtos';
import { Inject, Injectable } from '@nestjs/common';
import {
  RIDES_REPOSITORY,
  RidesRepository,
} from '@/modules/rides/repositories';
import { FindRidesService } from '@/modules/rides/services';

@Injectable()
export class DriverRideStatsService {
  constructor(
    private readonly ridesService: FindRidesService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async getDriverTotalRides(driverId: string): Promise<DriverTotalRidesDto> {
    const rides = await this.ridesService.findByDriver(driverId);
    return { totalTrips: rides.length };
  }
}
