import { Inject, Injectable, Logger } from '@nestjs/common';
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
    return await this.poiRepository.findById(id);
  }

  async findAll(): Promise<POI[]> {
    this.logger.log('Finding All POI');
    return await this.poiRepository.findAll();
  }
}
