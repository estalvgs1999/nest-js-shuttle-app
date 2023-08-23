import { DriverStatus } from '../enums';

export class DriverFilterDto {
  name?: string;
  lastName?: string;
  plate?: string;
  status?: DriverStatus;
}
