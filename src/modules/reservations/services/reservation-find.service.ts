import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';

@Injectable()
export class FindReservationsService {
  private readonly logger = new Logger(FindReservationsService.name);

  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async run() {
    return await this.reservationsRepository.findAll();
  }
}
