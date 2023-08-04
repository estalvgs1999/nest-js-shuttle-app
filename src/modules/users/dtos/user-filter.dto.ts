import { Gender, Language, UserRole } from '../enums';

export class UserFilterDTO {
  email?: string;
  role?: UserRole;
  language?: Language;
  gender?: Gender;
}
