import { AccountProvider, Gender, Language, UserRole } from '../enums';

export class User {
  email: string;
  password: string;
  name: string;
  lastName: string;
  profilePicture?: string;
  phone?: string;
  gender: Gender;
  accountProvider: AccountProvider;
  role: UserRole;
  languages: Language[];
}
