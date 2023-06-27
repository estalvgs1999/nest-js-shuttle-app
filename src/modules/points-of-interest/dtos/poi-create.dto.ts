import { POIType } from '../enums';
import { POIInfo, POILocation } from '../interfaces';

export class CreatePOIDTO {
  name: string;
  description: string;
  image: string;
  type: POIType;
  info?: POIInfo;
  location: POILocation;
}
