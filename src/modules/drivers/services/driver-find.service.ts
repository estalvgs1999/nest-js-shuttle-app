import { DriverFilterDto } from '../dtos';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindDriverService {
  private readonly logger = new Logger(FindDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async findById(driverId: string) {
    this.logger.log(`Searching driver with ID: ${driverId}`);

    const driver = await this.driversRepository.findById(driverId);

    if (!driver) throw new NotFoundException(`Driver not found.`);

    this.logger.log('Driver found');

    return driver;
  }

  async findByFilter(filterDto: DriverFilterDto) {
    this.logger.log('Searching for drivers');
    const drivers = await this.driversRepository.findByFilter(filterDto);
    return drivers;
  }
}
