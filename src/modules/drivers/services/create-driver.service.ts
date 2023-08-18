import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { OnEvent } from '@nestjs/event-emitter';
import { DriverStatus } from '../enums';

@Injectable()
export class CreateDriverService {
  private readonly logger = new Logger(CreateDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  @OnEvent('driver.created')
  async run(payload) {
    const { user } = payload;
    this.logger.log(`Creating driver from user ${user.id}`);
    const newDriver = this.driversRepository.create({
      userId: user.id,
      status: DriverStatus.Available,
    });
    return newDriver;
  }
}
