import { Language } from '@/modules/users/enums';

export interface ClientInfo {
  client?: string;
  languages?: Language[];
  profilePicture?: string;
  name: string;
  phone: string;
  email: string;
}
