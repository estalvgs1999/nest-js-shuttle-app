import { Inject, Injectable, Logger } from '@nestjs/common';
import { DRIVERS_REPOSITORY, DriversRepository } from '../repositories';
import { CreateDriverDTO } from '../dtos';

@Injectable()
export class CreateDriverService {
  private readonly logger = new Logger(CreateDriverService.name);

  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async run(createDriverDTO: CreateDriverDTO) {
    this.logger.log('Creating driver');
    const newDriver = this.driversRepository.create(createDriverDTO);
    return newDriver;
  }
}
