import { CreateVehicleDto } from '../dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle, VehicleModel } from '../schemas';
import { VehicleFilterDto } from '../dtos/vehicle-filter.dto';
import { VehiclesRepository } from './vehicles.repository';
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

  async findById(vehicleId: string): Promise<Vehicle> {
    // lean() is to get just the __doc
    return await this.model
      .findById(vehicleId)
      .lean()
      .populate(this.driverPopulateQuery);
  }

  async findByLicensePlate(plate: string): Promise<Vehicle> {
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

  async update(vehicleId: string, vehicle: Vehicle): Promise<Vehicle> {
    const updatedVehicle = await this.model.findByIdAndUpdate(
      vehicleId,
      vehicle,
      {
        new: true,
      },
    );
    return updatedVehicle;
  }

  async releaseVehicle(
    vehicleId: string,
    status: VehicleStatus,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.model.findByIdAndUpdate(
      vehicleId,
      {
        status: status,
        $unset: { driver: 1 },
      },
      {
        new: true,
      },
    );
    return updatedVehicle;
  }

  async delete(vehicleId: string): Promise<Vehicle> {
    return await this.model.findByIdAndDelete(vehicleId);
  }
}
