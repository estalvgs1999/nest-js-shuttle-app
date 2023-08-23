import { IsOptional, IsString } from 'class-validator';
import { POIInfo } from '../interfaces';

export class POIInfoDto implements POIInfo {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  price?: string;
}
