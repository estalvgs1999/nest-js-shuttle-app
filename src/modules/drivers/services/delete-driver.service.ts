import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';

@Injectable()
export class DeleteDriverService {
  private readonly logger = new Logger(DeleteDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  @OnEvent('driver.deleted')
  async run(payload: { user: any }) {
    const { user } = payload;
    this.logger.log(`Creating driver from user ${user.id}`);
    const newDriver = this.driversRepository.create({
      userId: user.id,
    });
    return newDriver;
  }
}
