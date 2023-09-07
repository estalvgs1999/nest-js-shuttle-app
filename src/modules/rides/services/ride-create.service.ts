import { Inject, Injectable } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';
import { CreateRideDto } from '../dtos';
import { Ride } from '../entities';

@Injectable()
export class CreateRideService {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  public async run(rideDto: CreateRideDto) {
    const { driverId, mode, route, availableSeats } = rideDto;
    const ride: Ride = new Ride(driverId, mode, route, availableSeats);
    const savedRide = await this.ridesRepository.create({ ...ride });
    return savedRide;
  }
}
