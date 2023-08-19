import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { DriverFilterDTO } from '../dtos';

@Injectable()
export class FindDriverService {
  private readonly logger = new Logger(FindDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async run(filter: DriverFilterDTO) {
    const drivers = await this.driversRepository.findByFilter(filter);
    return drivers;
  }
}
