import { Inject, Injectable, Logger } from '@nestjs/common';
import { POIRepository, POI_REPOSITORY } from '../repositories';
import { CreatePOIDto } from '../dtos';
import { POI } from '../entities';

@Injectable()
export class CreatePOIService {
  private readonly logger = new Logger(CreatePOIService.name);

  constructor(
    @Inject(POI_REPOSITORY)
    private readonly poiRepository: POIRepository,
  ) {}

  async run(createPOIDto: CreatePOIDto): Promise<POI> {
    this.logger.log('Creating POI');
    const newPOI = await this.poiRepository.create(createPOIDto);
    this.logger.log('POI created');

    return newPOI;
  }
}
