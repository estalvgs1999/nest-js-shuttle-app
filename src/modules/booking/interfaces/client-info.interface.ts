import { User } from '@/modules/users/entities';

export interface ClientInfo {
  client?: User | string;
  name: string;
  phone: string;
  email: string;
}
