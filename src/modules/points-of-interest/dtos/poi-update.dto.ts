import { PartialType } from '@nestjs/mapped-types';
import { CreatePOIDto } from './poi-create.dto';

export class UpdatePoiDto extends PartialType(CreatePOIDto) {}
