import { Gender, Language, UserRole } from '../enums';

export class UserFilterDTO {
  email?: string;
  role?: UserRole;
  languages?: Language;
  gender?: Gender;
}
