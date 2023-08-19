import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from '../dtos';
import { User } from '../entities';

export interface UsersRepository {
  create(userDTO: CreateUserDTO): Promise<User>;
  update(userId: string, updateUserDTO: UpdateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByFilter(filter: UserFilterDTO): Promise<User[]>;
  delete(id: string): Promise<User>;
}

export const USERS_REPOSITORY = 'UsersRepository';
