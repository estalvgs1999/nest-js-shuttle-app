import { CreatePOIDto, UpdatePoiDto } from '../dtos';
import { POI } from '../entities';

export interface POIRepository {
  create(poi: CreatePOIDto): Promise<POI>;
  findAll(): Promise<POI[]>;
  findById(id: string): Promise<POI>;
  update(id: string, updatePoiDto: UpdatePoiDto): Promise<POI>;
  updateImage(id: string, imageUrl: string): Promise<POI>;
  delete(id: string): Promise<POI>;
}

export const POI_REPOSITORY = 'POIRepository';
