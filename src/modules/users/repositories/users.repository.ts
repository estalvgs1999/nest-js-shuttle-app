import { CreateUserDTO } from '../dtos';
import { UserFilterDTO } from '../dtos/user-filter.dto';
import { User } from '../entities';

export interface UsersRepository {
  create(userDTO: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByFilter(filter: UserFilterDTO): Promise<User[]>;
}

export const USERS_REPOSITORY = 'UsersRepository';
