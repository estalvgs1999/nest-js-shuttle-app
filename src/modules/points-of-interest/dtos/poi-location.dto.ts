import { IsNotEmpty, IsNumber } from 'class-validator';
import { POILocation } from '../interfaces';

export class POILocationDto implements POILocation {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
