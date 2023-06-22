import { Inject, Injectable } from '@nestjs/common';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';
import { CreateReservationDTO, RawReservationDTO } from '../dtos';
import { Reservation } from '../entities';
import { PaymentMethod } from '../enums';
import { mapEnumValueByIndex } from 'src/common/utils/map-enum.util';

@Injectable()
export class CreateReservationService {
  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async createReservation(
    rawReservationDTO: RawReservationDTO,
  ): Promise<Reservation> {
    const createReservationDTO: CreateReservationDTO = {
      reservationId: rawReservationDTO.reservationId,
      clientEmail: rawReservationDTO.email,
      passengersInfo: {
        adults: rawReservationDTO.adults,
        kids: rawReservationDTO.children,
        infants: rawReservationDTO.infants,
      },
      luggageInfo: {
        bags: rawReservationDTO.bags,
        boosterSeats: rawReservationDTO.boosterSeats,
        surfboards: rawReservationDTO.surfboards,
      },
      paymentInfo: {
        method: this.mapPaymentMethod(rawReservationDTO.paymentType),
        isPaid: Boolean(rawReservationDTO.isPaid),
      },
    };

    return await this.reservationsRepository.create(createReservationDTO);
  }

  private mapPaymentMethod(paymentType: number): PaymentMethod {
    return mapEnumValueByIndex(PaymentMethod, paymentType);
  }
}
