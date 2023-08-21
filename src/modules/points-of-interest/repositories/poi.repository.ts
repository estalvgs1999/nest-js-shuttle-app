import { CreatePOIDTO, UpdatePoiDTO } from '../dtos';
import { POI } from '../entities';

export interface POIRepository {
  create(poi: CreatePOIDTO): Promise<POI>;
  findAll(): Promise<POI[]>;
  findById(id: string): Promise<POI>;
  update(id: string, updatePoiDTO: UpdatePoiDTO): Promise<POI>;
  updateImage(id: string, imageUrl: string): Promise<POI>;
  delete(id: string): Promise<POI>;
}

export const POI_REPOSITORY = 'POIRepository';
