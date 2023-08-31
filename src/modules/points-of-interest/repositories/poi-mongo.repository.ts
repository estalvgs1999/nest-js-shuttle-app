import { CreatePOIDto, UpdatePoiDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { POI } from '../entities';
import { POIModel } from '../schemas';
import { POIRepository } from './poi.repository';

@Injectable()
export class POIMongoRepository implements POIRepository {
  constructor(
    @InjectModel(POI.name)
    private readonly model: POIModel,
  ) {}

  async create(poiDto: CreatePOIDto): Promise<POI> {
    const newPOI = await new this.model(poiDto).save();
    return newPOI;
  }

  async findAll(): Promise<POI[]> {
    return await this.model.find();
  }

  async findById(id: string): Promise<POI> {
    return await this.model.findById(id);
  }

  async update(id: string, updatePoiDto: UpdatePoiDto): Promise<POI> {
    return await this.model.findByIdAndUpdate(id, updatePoiDto, { new: true });
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
