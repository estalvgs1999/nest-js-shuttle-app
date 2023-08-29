import { CreateDriverEvent } from '../events';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateDriverService {
  private readonly logger = new Logger(CreateDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  @OnEvent('driver.created')
  async run(payload: CreateDriverEvent) {
    const { user } = payload;
    this.logger.log(`Creating driver from user ${user['_id']}`);
    const newDriver = this.driversRepository.create({
      userId: user['_id'],
    });
    return newDriver;
  }
}
