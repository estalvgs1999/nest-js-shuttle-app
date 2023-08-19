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

  async findById(id: string) {
    const driver = await this.driversRepository.findById(id);
    return driver;
  }

  async findByFilter(filter: DriverFilterDTO) {
    const drivers = await this.driversRepository.findByFilter(filter);
    return drivers;
  }
}
