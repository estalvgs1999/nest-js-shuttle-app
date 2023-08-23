import { Gender, Language, UserRole } from '../enums';

export class UserFilterDto {
  name?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  languages?: Language;
  gender?: Gender;
}
