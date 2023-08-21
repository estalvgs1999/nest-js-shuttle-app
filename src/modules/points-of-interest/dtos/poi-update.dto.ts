import { PartialType } from '@nestjs/mapped-types';
import { CreatePOIDTO } from './poi-create.dto';

export class UpdatePoiDTO extends PartialType(CreatePOIDTO) {}
