import { User } from '@/modules/users/entities';

export interface ClientInfo {
  client?: User;
  name: string;
  phone: string;
  email: string;
}
