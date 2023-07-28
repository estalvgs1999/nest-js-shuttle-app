import { IsNotEmpty, IsNumber } from 'class-validator';
import { POILocation } from '../interfaces';

export class POILocationDTO implements POILocation {
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}
