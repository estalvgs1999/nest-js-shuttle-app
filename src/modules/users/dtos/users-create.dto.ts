import { Gender, AccountProvider, UserRole, Language } from '../enums';

export class CreateUserDTO {
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
