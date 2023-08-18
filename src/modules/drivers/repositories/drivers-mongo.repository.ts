import { Injectable } from '@nestjs/common';
import { DriversRepository } from './drivers.repository';
import { CreateDriverDTO } from '../dtos';
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

  async findAll() {
    const drivers = await this.model
      .find()
      .populate('user')
      .populate('vehicle');
    return drivers;
  }
}
