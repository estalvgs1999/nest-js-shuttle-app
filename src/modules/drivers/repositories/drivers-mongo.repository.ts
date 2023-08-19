import { Injectable } from '@nestjs/common';
import { DriversRepository } from './drivers.repository';
import { CreateDriverDTO, DriverFilterDTO } from '../dtos';
import { Driver } from '../entities';
import { InjectModel } from '@nestjs/mongoose';
import { DriverModel } from '../schemas';

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

    const result = drivers.filter(driver => this.matchesFilter(driver, filter));
    return result;
  }

  private matchesFilter(driver, filter: DriverFilterDTO): boolean {
    if (filter.plate && driver.plate !== filter.plate) return false;

    if (filter.name && driver.user.name !== filter.name) return false;

    if (filter.lastName && driver.user.lastName !== filter.lastName)
      return false;

    if (filter.status && driver.status !== filter.status) return false;

    return true;
  }
}
