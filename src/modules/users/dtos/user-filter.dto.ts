import { Gender, Language, UserRole } from '../enums';

export class UserFilterDTO {
  name?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  languages?: Language;
  gender?: Gender;
}
