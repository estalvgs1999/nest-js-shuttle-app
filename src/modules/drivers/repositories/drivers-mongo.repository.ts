import { Injectable } from '@nestjs/common';
import { DriversRepository } from './drivers.repository';
import {
  AssignDriversVehicleDto,
  CreateDriverDto,
  DriverFilterDto,
} from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Driver, DriverModel } from '../schemas';
import { matchesFilter } from '../utils';
import { DriverStatus } from '../enums';

@Injectable()
export class DriversMongoRepository implements DriversRepository {
  constructor(
    @InjectModel(Driver.name)
    private readonly model: DriverModel,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const newDriver = await new this.model({
      user: createDriverDto.userId,
    }).save();
    return newDriver;
  }

  async findById(driverId: string): Promise<any> {
    return await this.model
      .findById(driverId)
      .populate('user')
      .populate('vehicle');
  }

  async findByUserId(userId: string): Promise<Driver> {
    const drivers = await this.findAll();
    const driver = drivers.find(driver => driver.user['id'] === userId);
    return driver;
  }

  async findAll() {
    return await this.model.find().populate('user').populate('vehicle');
  }

  async findByFilter(filter: DriverFilterDto) {
    const drivers = await this.findAll();

    const result = drivers.filter(driver => matchesFilter(driver, filter));
    return result;
  }

  async assignVehicle(assignationDto: AssignDriversVehicleDto) {
    const { driverId, vehicleId } = assignationDto;
    const driver = await this.findById(driverId);
    driver.status = DriverStatus.Available;
    driver.vehicle = vehicleId;
    await driver.save();
    return driver;
  }

  async releaseVehicle(driverId: string) {
    const driver = await this.findById(driverId);
    driver.vehicle = undefined;
    await driver.save();
    return driver;
  }

  async delete(driverId: string) {
    const driver = await this.model.findByIdAndDelete(driverId);
    return driver;
  }
}
