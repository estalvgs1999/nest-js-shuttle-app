import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { POIType } from '../enums';
import { POIInfo, POILocation } from '../interfaces';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class POI {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  type: POIType;

  @Prop({ type: MongooseSchema.Types.Mixed })
  info: POIInfo;

  @Prop({ type: MongooseSchema.Types.Mixed })
  location: POILocation;
}

export const POISchema = SchemaFactory.createForClass(POI);
export type POIDocument = POI & Document;
export type POIModel = Model<POIDocument>;
