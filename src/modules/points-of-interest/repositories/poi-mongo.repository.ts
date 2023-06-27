import { InjectModel } from '@nestjs/mongoose';
import { POI } from '../entities';
import { POIModel } from '../schemas';
import { POIRepository } from './poi.repository';
import { Injectable } from '@nestjs/common';
import { CreatePOIDTO } from '../dtos';

@Injectable()
export class POIMongoRepository implements POIRepository {
  constructor(
    @InjectModel(POI.name)
    private readonly model: POIModel,
  ) {}

  async create(poiDTO: CreatePOIDTO): Promise<POI> {
    const newPOI = await new this.model(poiDTO).save();
    return newPOI;
  }
}
