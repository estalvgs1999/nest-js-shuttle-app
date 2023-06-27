import {
  Gender,
  AccountProvider,
  Language,
  UserRole,
  DriverStatus,
} from '../enums';
import { User } from '../interfaces';

export class Driver implements User {
  role = UserRole.Driver;
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  gender: Gender;
  accountProvider: AccountProvider;
  languages: Language[];
  status: DriverStatus;
  assignedVehicle: string;
}
