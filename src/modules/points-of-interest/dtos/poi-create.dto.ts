import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { POIType } from '../enums';
import { POIInfo, POILocation } from '../interfaces';
import { POILocationDTO } from './poi-location.dto';
import { Type } from 'class-transformer';
import { POIInfoDTO } from './poi-info.dto';

export class CreatePOIDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsEnum(POIType)
  type: POIType;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => POILocationDTO)
  location: POILocation;

  @IsNotEmpty()
  @Type(() => POIInfoDTO)
  info?: POIInfo;
}
