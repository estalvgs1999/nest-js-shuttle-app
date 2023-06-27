import { Gender, AccountProvider, Language, UserRole } from '../enums';
import { User } from '../interfaces';

export class Tourist implements User {
  role = UserRole.Tourist;
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  gender: Gender;
  accountProvider: AccountProvider;
  phone: string;
  website?: string;
  languages: Language[];
}
