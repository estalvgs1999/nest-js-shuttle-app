import { Inject, Injectable, Logger } from '@nestjs/common';
import { POIRepository, POI_REPOSITORY } from '../repositories';
import { CreatePOIDTO } from '../dtos';
import { POI } from '../entities';

@Injectable()
export class CreatePOIService {
  private readonly logger = new Logger(CreatePOIService.name);

  constructor(
    @Inject(POI_REPOSITORY)
    private readonly poiRepository: POIRepository,
  ) {}

  async run(createPOIDTO: CreatePOIDTO): Promise<POI> {
    this.logger.log('Creating POI');
    const newPOI = await this.poiRepository.create(createPOIDTO);
    this.logger.log('POI created');

    return newPOI;
  }
}
