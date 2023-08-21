import { InjectModel } from '@nestjs/mongoose';
import { POI } from '../entities';
import { POIModel } from '../schemas';
import { POIRepository } from './poi.repository';
import { Injectable } from '@nestjs/common';
import { CreatePOIDTO, UpdatePoiDTO } from '../dtos';

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

  async findAll(): Promise<POI[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<POI> {
    return await this.model.findById(id);
  }

  async update(id: string, updatePoiDTO: UpdatePoiDTO): Promise<POI> {
    return await this.model.findByIdAndUpdate(id, updatePoiDTO, { new: true });
  }

  async updateImage(id: string, imageUrl: string): Promise<POI> {
    return await this.model.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true },
    );
  }

  async delete(id: string): Promise<POI> {
    return await this.model.findByIdAndDelete(id);
  }
}
