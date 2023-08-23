import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { POIType } from '../enums';
import { POIInfo, POILocation } from '../interfaces';
import { POILocationDto } from './poi-location.dto';
import { Type } from 'class-transformer';
import { POIInfoDto } from './poi-info.dto';

export class CreatePOIDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
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
