import { CreatePOIDto } from './poi-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePoiDto extends PartialType(CreatePOIDto) {}
