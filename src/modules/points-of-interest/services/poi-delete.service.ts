import { FilesAzureService } from 'src/modules/files/services';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { POI } from '../entities';
import { POI_REPOSITORY, POIRepository } from '../repositories';

@Injectable()
export class DeletePOIService {
  private readonly logger = new Logger(DeletePOIService.name);

  constructor(
    @Inject(POI_REPOSITORY)
    private readonly poiRepository: POIRepository,
    private readonly fileService: FilesAzureService,
  ) {}

  async run(id: string): Promise<POI> {
    this.logger.log(`Removing POI with id ${id}`);

    const poi = await this.poiRepository.findById(id);

    if (!poi) throw new NotFoundException(`POI with id ${id} not found`);

    await this.removeImage(poi);
    return await this.poiRepository.delete(id);
  }

  private async removeImage(poi: POI) {
    const containerName = 'pois';
    const fileUrl = poi?.image;
    let oldUrl = '';

    if (fileUrl) oldUrl = fileUrl.split('/').pop();

    await this.fileService.deleteFile(oldUrl, containerName);
  }
}
