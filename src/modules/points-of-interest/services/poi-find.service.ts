import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { POI } from '../entities';
import { POI_REPOSITORY, POIRepository } from '../repositories';

@Injectable()
export class FindPOIService {
  private readonly logger = new Logger(FindPOIService.name);

  constructor(
    @Inject(POI_REPOSITORY)
    private readonly poiRepository: POIRepository,
  ) {}

  async findById(id: string): Promise<POI> {
    this.logger.log(`Finding POI with id: ${id}`);
    const poi = await this.poiRepository.findById(id);
    if (!poi) throw new NotFoundException(`POI with id ${id} not found.`);
    return poi;
  }

  async findAll(): Promise<POI[]> {
    this.logger.log('Finding All POI');
    return await this.poiRepository.findAll();
  }
}
