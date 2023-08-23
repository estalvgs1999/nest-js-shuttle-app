import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos';
import { VEHICLES_REPOSITORY, VehiclesRepository } from '../repositories';

@Injectable()
export class CreateVehicleService {
  private readonly logger = new Logger(CreateVehicleService.name);

  constructor(
    @Inject(VEHICLES_REPOSITORY)
    private readonly vehiclesRepository: VehiclesRepository,
  ) {}

  async run(createVehicleDto: CreateVehicleDto) {
    this.logger.log('Creating vehicle');

    const { plate } = createVehicleDto;
    const vehicleExists = await this.vehiclesRepository.findByPlate(plate);

    if (vehicleExists)
      throw new ConflictException(
        `Vehicle with plate ${plate} already exists.`,
      );

    const newVehicle = await this.vehiclesRepository.create(createVehicleDto);
    this.logger.log('Vehicle created');

    return newVehicle;
  }
}
