import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';
import { ReservationStatus } from '../enums';

@Injectable()
export class UpdateReservationStatusService {
  private readonly logger = new Logger(UpdateReservationStatusService.name);

  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async run(reservationId: string, status: ReservationStatus) {
    this.logger.log('Updating reservation status.');
    const reservation = await this.reservationsRepository.findById(
      reservationId,
    );

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with number ${reservationId} not found.`,
      );
    }
    reservation.status = status;

    return await this.reservationsRepository.update(reservationId, reservation);
  }
}
