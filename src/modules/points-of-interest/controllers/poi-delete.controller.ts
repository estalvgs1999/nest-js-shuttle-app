import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePOIService } from '../services';
import { Roles } from '@Common/decorators';

@Controller({ path: 'points-of-interest' })
export class DeletePOIController {
  constructor(private readonly service: DeletePOIService) {}

  @Delete('/:id/delete')
  @Roles('Super')
  delete(@Param('id') id: string) {
    return this.service.run(id);
  }
}
