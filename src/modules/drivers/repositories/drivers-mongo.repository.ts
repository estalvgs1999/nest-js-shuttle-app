import { Injectable } from '@nestjs/common';
import { DriversRepository } from './drivers.repository';
import {
  AssignDriversVehicleDTO,
  CreateDriverDTO,
  DriverFilterDTO,
} from '../dtos';
import { Driver } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { DriverModel } from '../schemas';
import { matchesFilter } from '../utils';

@Injectable()
export class DriversMongoRepository implements DriversRepository {
  constructor(
    @InjectModel(Driver.name)
    private readonly model: DriverModel,
  ) {}

  async create(createDriverDTO: CreateDriverDTO) {
    const newDriver = await new this.model({
      user: createDriverDTO.userId,
    }).save();
    return newDriver;
  }

  async findById(driverId: string): Promise<any> {
    return await this.model
      .findById(driverId)
      .populate('user')
      .populate('vehicle');
  }

  async findAll() {
    return await this.model.find().populate('user').populate('vehicle');
  }

  async findByFilter(filter: DriverFilterDTO) {
    const drivers = await this.findAll();

    const result = drivers.filter(driver => matchesFilter(driver, filter));
    return result;
  }

  async assignVehicle(assignationDTO: AssignDriversVehicleDTO) {
    const { driverId, vehicleId } = assignationDTO;
    const driver = await this.findById(driverId);
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
}
