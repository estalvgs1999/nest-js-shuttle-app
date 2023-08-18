import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';

@Injectable()
export class FindDriverService {
  private readonly logger = new Logger(FindDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async run() {
    const drivers = await this.driversRepository.findAll();
    return drivers;
  }
}
