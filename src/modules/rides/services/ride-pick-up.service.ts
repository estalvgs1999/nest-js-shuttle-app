import { FindRidesService } from './ride-find.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { RideStatus } from '../enums';

@Injectable()
export class RidePickUpService {
  private logger = new Logger(RidePickUpService.name);

  constructor(
    private readonly ridesService: FindRidesService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async run(rideId: string) {
    this.logger.log(`Ride ${rideId} pick up request`);
    const ride = await this.ridesService.findById(rideId);

    ride.status = RideStatus.PickUp;

    const updatedRide = await this.ridesRepository.update(rideId, ride);
    this.logger.log(`Ride status changed to Pick Up`);

    return updatedRide;
  }
}
