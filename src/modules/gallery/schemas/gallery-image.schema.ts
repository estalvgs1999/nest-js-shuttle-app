import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema()
export class GalleryImage {
  @Prop({ type: String })
  url: string;

  @Prop({ type: String })
  caption: string;

  @Prop({ type: String })
  position: number;
}

export const GalleryImageSchema = SchemaFactory.createForClass(GalleryImage);
export type GalleryImageDocument = GalleryImage & Document;
export type GalleryImageModel = Model<GalleryImageDocument>;
