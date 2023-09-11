import { FindRidesService } from './ride-find.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { RideStatus } from '../enums';

@Injectable()
export class RideStartService {
  private logger = new Logger(RideStartService.name);

  constructor(
    private readonly ridesService: FindRidesService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async run(rideId: string) {
    this.logger.log(`Ride ${rideId} start request`);
    const ride = await this.ridesService.findById(rideId);

    ride.status = RideStatus.OnGoing;

    const updatedRide = await this.ridesRepository.update(rideId, ride);
    this.logger.log(`Ride started`);

    return updatedRide;
  }
}
