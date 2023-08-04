import { Controller, Get, Query } from '@nestjs/common';
import { FindUsersService } from '../services';
import { UserFilterDTO } from '../dtos/user-filter.dto';

@Controller({ path: 'user' })
export class FindUserController {
  constructor(private readonly service: FindUsersService) {}

  @Get()
  findAll(@Query() filterDTO: UserFilterDTO) {
    return this.service.run(filterDTO);
  }
}
