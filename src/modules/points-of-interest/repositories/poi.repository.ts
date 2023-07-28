import { CreatePOIDTO } from '../dtos';
import { POI } from '../entities';

export interface POIRepository {
  create(poi: CreatePOIDTO): Promise<POI>;
}

export const POI_REPOSITORY = 'POIRepository';
