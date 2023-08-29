import { CreateUserDto, UpdateUserDto, UserFilterDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities';
import { UserModel } from '../schemas';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersMongoRepository implements UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly model: UserModel,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = await new this.model(userDto).save();
    return newUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
  }

  async updateProfilePicture(
    userId: string,
    pictureUrl: string,
  ): Promise<User> {
    return await this.model.findByIdAndUpdate(
      userId,
      { profilePicture: pictureUrl },
      {
        new: true,
      },
    );
  }

  async updateRefreshToken(userId: string, hashedToken: string): Promise<User> {
    const user = await this.model.findById(userId);
    user.hashedRt = hashedToken;
    await user.save();
    return user;
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

  async findByFilter(filter: UserFilterDto): Promise<User[]> {
    const query = {
      ...filter,
    };

    const result = await this.model.find(query);
    return result;
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id);
  }
}
