import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDTO } from './vehicle-create.dto';

export class UpdateVehicleDTO extends PartialType(CreateVehicleDTO) {}
