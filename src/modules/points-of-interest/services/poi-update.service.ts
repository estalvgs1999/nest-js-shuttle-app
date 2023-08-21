import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdatePoiDTO } from '../dtos';
import { POI } from '../entities';
import { POI_REPOSITORY, POIRepository } from '../repositories';

@Injectable()
export class UpdatePOIService {
  private readonly logger = new Logger(UpdatePOIService.name);

  constructor(
    @Inject(POI_REPOSITORY)
    private readonly poiRepository: POIRepository,
  ) {}

  async run(id: string, updatePoiDTO: UpdatePoiDTO): Promise<POI> {
    this.logger.log(`Updating POI with id ${id}`);

    const poi = await this.poiRepository.findById(id);

    if (!poi) throw new NotFoundException(`POI with id ${id} not found`);

    return await this.poiRepository.update(id, updatePoiDTO);
  }
}
