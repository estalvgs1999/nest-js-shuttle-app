import { CreateUserDto } from './users-create.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
