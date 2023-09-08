import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '@/modules/booking/repositories';
import { CreateRideService } from './ride-create.service';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class RideDriverSuggestionsService {
  private logger = new Logger(RideDriverSuggestionsService.name);

  constructor(
    private readonly ridesService: CreateRideService,
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}
}
