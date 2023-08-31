import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { POIInfo, POILocation } from '../interfaces';
import { POIInfoDto } from './poi-info.dto';
import { POILocationDto } from './poi-location.dto';
import { POIType } from '../enums';
import { Type } from 'class-transformer';

export class CreatePOIDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(POIType)
  type: POIType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => POILocationDto)
  location: POILocation;

  @IsNotEmpty()
  @Type(() => POIInfoDto)
  info?: POIInfo;
}
