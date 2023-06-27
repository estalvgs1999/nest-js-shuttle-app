import { Gender, AccountProvider, UserRole, StaffRole } from '../enums';
import { User } from '../interfaces';

export class Staff implements User {
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  gender: Gender;
  accountProvider: AccountProvider;
  role = UserRole.Staff;
  staffRole = StaffRole;
}
