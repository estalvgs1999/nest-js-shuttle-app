import { POIInfo, POILocation } from '../interfaces';
import { POIType } from '../enums';

export class POI {
  name: string;
  description: string;
  image?: string;
  type: POIType;
  info?: POIInfo;
  location: POILocation;
}
