import { User } from '../../../modules/users/entities';

export class CreateDriverEvent {
  constructor(public readonly user: User) {}
}
