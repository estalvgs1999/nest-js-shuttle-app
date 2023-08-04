import { CreateUserDTO } from '../dtos';
import { User } from '../entities';

export interface UsersRepository {
  create(userDTO: CreateUserDTO): Promise<User>;
}

export const USERS_REPOSITORY = 'UsersRepository';
