import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './users-create.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
