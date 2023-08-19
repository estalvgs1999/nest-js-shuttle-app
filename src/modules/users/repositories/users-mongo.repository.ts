import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities';
import { UserModel } from '../schemas';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from '../dtos';

@Injectable()
export class UsersMongoRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly model: UserModel,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.model(userDTO).save();
    return newUser;
  }

  async update(userId: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    return await this.model.findByIdAndUpdate(userId, updateUserDTO, {
      new: true,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.model
      .findOne({
        email: email,
      })
      .select('+password');
    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.model.findById(userId);
    return user;
  }

  async findByFilter(filter: UserFilterDTO): Promise<User[]> {
    const query = {
      ...filter,
    };

    const result = await this.model.find(query);
    return result;
  }
}
