import { POIType } from '../enums';
import { POIInfo, POILocation } from '../interfaces';

export class POI {
  name: string;
  description: string;
  image?: string;
  type: POIType;
  info?: POIInfo;
  location: POILocation;
}
