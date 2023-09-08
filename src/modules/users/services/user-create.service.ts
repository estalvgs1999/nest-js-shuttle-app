import * as bcrypt from 'bcrypt';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateDriverEvent } from '../../drivers/events';
import { CreateUserDto } from '../dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateBookingClientEvent } from '@/modules/booking/events';
import { User } from '../entities';
import { UserRole } from '../enums';
import { USERS_REPOSITORY, UsersRepository } from '../repositories';
import { UpdateUserService } from './user-update.service';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly updateUserService: UpdateUserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(userDto: CreateUserDto): Promise<User> {
    const { email, role } = userDto;
    this.logger.log(`Creating ${role}`);

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    const newUser = await this.usersRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    if (newUser.role === UserRole.Driver) this.createDriver(newUser);
    else if (newUser.role === UserRole.Tourist)
      this.updateUserService.updateBookings(newUser);

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
