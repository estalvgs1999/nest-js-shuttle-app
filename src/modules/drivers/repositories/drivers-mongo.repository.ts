import { CreateDriverDto, DriverFilterDto } from '../dtos';
import { Driver, DriverModel } from '../schemas';
import { DriversRepository } from './drivers.repository';
import { DriverStatus } from '../enums';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { matchesFilter } from '../utils';

@Injectable()
export class DriversMongoRepository implements DriversRepository {
  private userSelectQuery =
    'name lastName email profilePicture phone gender languages';
  private vehicleSelectQuery = 'plate model capacity status';

  constructor(
    @InjectModel(Driver.name)
    private readonly model: DriverModel,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const newDriver = await new this.model({
      user: createDriverDto.userId,
    }).save();
    return newDriver;
  }

  async findById(driverId: string): Promise<Driver> {
    return await this.model
      .findById(driverId)
      .lean()
      .populate({ path: 'user', select: this.userSelectQuery })
      .populate({ path: 'vehicle', select: this.vehicleSelectQuery });
  }

  async findByUserId(userId: string): Promise<Driver> {
    const driver = await this.model
      .findOne({ user: userId })
      .populate({ path: 'user', select: this.userSelectQuery })
      .populate({ path: 'vehicle', select: this.vehicleSelectQuery });
    return driver;
  }

  async findAll(): Promise<Driver[]> {
    return await this.model
      .find()
      .populate({ path: 'user', select: this.userSelectQuery })
      .populate({ path: 'vehicle', select: this.vehicleSelectQuery });
  }

  async findByFilter(filter: DriverFilterDto): Promise<Driver[]> {
    const drivers = await this.findAll();

    const result = drivers.filter(driver => matchesFilter(driver, filter));
    return result;
  }

  async assignVehicle(driverId: string, vehicleId: string): Promise<Driver> {
    const driver = await this.model.findByIdAndUpdate(
      driverId,
      {
        status: DriverStatus.Available,
        vehicle: vehicleId,
      },
      { new: true },
    );

    return driver;
  }

  async releaseVehicle(driverId: string): Promise<Driver> {
    const driver = await this.model.findByIdAndUpdate(
      driverId,
      {
        status: DriverStatus.Free,
        $unset: { vehicle: 1 },
      },
      { new: true },
    );

    return driver;
  }

  async delete(driverId: string): Promise<Driver> {
    return await this.model.findByIdAndDelete(driverId);
  }
}
