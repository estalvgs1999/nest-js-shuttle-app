import { User } from '../../users/entities';

export class CreateDriverEvent {
  constructor(public readonly user: User) {}
}
