import { DriverStatus } from '../enums';

export class DriverFilterDTO {
  name?: string;
  lastName?: string;
  plate?: string;
  status?: DriverStatus;
}
