import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos';
import { Vehicle, VehicleModel } from '../schemas';
import { VehiclesRepository } from './vehicles.repository';
import { InjectModel } from '@nestjs/mongoose';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { VehicleStatus } from '../enums';

@Injectable()
export class VehiclesMongoRepository implements VehiclesRepository {
  private driverPopulateQuery = {
    path: 'driver',
    populate: {
      path: 'user',
      select: 'name lastName',
    },
    select: 'user.name user.lastName',
  };

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
    // lean() is to get just the __doc
    return await this.model
      .findById(id)
      .lean()
      .populate(this.driverPopulateQuery);
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    return await this.model
      .findOne({ plate: plate })
      .lean()
      .populate(this.driverPopulateQuery);
  }

  async findByFilter(filter: VehicleFilterDto): Promise<Vehicle[]> {
    return await this.model
      .find({ ...filter })
      .lean()
      .populate(this.driverPopulateQuery);
  }

  async update(id: string, vehicle: Vehicle): Promise<Vehicle> {
    const updatedVehicle = await this.model.findByIdAndUpdate(id, vehicle, {
      new: true,
    });
    return updatedVehicle;
  }

  async releaseVehicle(id: string, status: VehicleStatus): Promise<Vehicle> {
    const vehicle = await this.model.findById(id);

    if (!vehicle) throw new NotFoundException('Driver not found');

    vehicle.status = status;
    vehicle.driver = undefined;

    return await vehicle.save();
  }

  async delete(id: string): Promise<Vehicle> {
    return await this.model.findByIdAndDelete(id);
  }
}
