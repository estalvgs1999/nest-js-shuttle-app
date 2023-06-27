import { AccountProvider, Gender, UserRole } from '../enums';

export interface User {
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  gender: Gender;
  accountProvider: AccountProvider;
  role: UserRole;
}
