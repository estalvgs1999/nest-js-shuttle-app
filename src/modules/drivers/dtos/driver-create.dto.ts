import { DriverStatus } from '../enums';

export class CreateDriverDTO {
  userId: string;
  status: DriverStatus;
}
