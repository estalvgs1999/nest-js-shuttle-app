import { Injectable } from '@nestjs/common';
import { CreateVehicleDTO } from '../dtos';
import { Vehicle, VehicleModel } from '../schemas';
import { VehiclesRepository } from './vehicles.repository';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleFilterDTO } from '../dtos/vehicle-filter.dto';

@Injectable()
export class VehiclesMongoRepository implements VehiclesRepository {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly model: VehicleModel,
  ) {}

  async create(createVehicleDTO: CreateVehicleDTO): Promise<Vehicle> {
    const newVehicle = new this.model(createVehicleDTO);
    await newVehicle.save();
    return newVehicle;
  }

  async findById(id: string): Promise<Vehicle> {
    // lean() is to get just the __doc
    return await this.model.findById(id).lean();
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    return await this.model.findOne({ plate: plate });
  }

  async findByFilter(filter: VehicleFilterDTO): Promise<Vehicle[]> {
    return await this.model.find({ ...filter });
  }

  async update(id: string, vehicle: Vehicle): Promise<Vehicle> {
    const updatedVehicle = await this.model.findByIdAndUpdate(id, vehicle, {
      new: true,
    });
    return updatedVehicle;
  }
}
