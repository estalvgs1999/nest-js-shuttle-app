import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { CreateUserDTO } from '../dtos';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDriverEvent } from '../../drivers/events';
import { UserRole } from '../enums';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(userDTO: CreateUserDTO): Promise<User> {
    const { email, role } = userDTO;
    this.logger.log(`Creating ${role}`);

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const hashedPassword = await this.hashPassword(userDTO.password);
    const newUser = await this.usersRepository.create({
      ...userDTO,
      password: hashedPassword,
    });

    if (newUser.role === UserRole.Driver) this.createDriver(newUser);

    this.logger.log('User created');
    return newUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  private createDriver(user: User) {
    this.logger.log('Emitting create driver event');
    this.eventEmitter.emit('driver.created', new CreateDriverEvent(user));
  }
}
