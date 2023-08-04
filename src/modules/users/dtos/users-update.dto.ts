import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './users-create.dto';

export class UpdateUserDTO extends OmitType(CreateUserDTO, [
  'password',
] as const) {}
