import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './vehicle-create.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
