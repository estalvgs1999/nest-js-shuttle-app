import { Controller, Delete, Param } from '@nestjs/common';
import { DeletePOIService } from '../services';

@Controller({ path: 'points-of-interest' })
export class DeletePOIController {
  constructor(private readonly service: DeletePOIService) {}

  @Delete('/:id/delete')
  create(@Param('id') id: string) {
    return this.service.run(id);
  }
}
