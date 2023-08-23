import { CreateUserDto, UpdateUserDto, UserFilterDto } from '../dtos';
import { User } from '../entities';

export interface UsersRepository {
  create(userDto: CreateUserDto): Promise<User>;
  update(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
  updateProfilePicture(userId: string, pictureUrl: string): Promise<User>;
  updateRefreshToken(email: string, hashedToken: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByFilter(filter: UserFilterDto): Promise<User[]>;
  delete(id: string): Promise<User>;
}

export const USERS_REPOSITORY = 'UsersRepository';
