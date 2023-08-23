import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos';
import { Vehicle } from '../entities';
import { VehicleModel } from '../schemas';
import { VehiclesRepository } from './vehicles.repository';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';

@Injectable()
export class VehiclesMongoRepository implements VehiclesRepository {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly model: VehicleModel,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = new this.model(createVehicleDto);
    await newVehicle.save();
    return newVehicle;
  }

  async findById(id: string): Promise<Vehicle> {
    return await this.model.findById(id);
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    return await this.model.findOne({ plate: plate });
  }

  async findByFilter(filter: VehicleFilterDto): Promise<Vehicle[]> {
    return await this.model.find({ ...filter });
  }

  async update(id: string, vehicle: Vehicle): Promise<Vehicle> {
    const updatedVehicle = await this.model.findByIdAndUpdate(id, vehicle, {
      new: true,
    });
    return updatedVehicle;
  }
}
