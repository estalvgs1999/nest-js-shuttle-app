import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';
import { CreateReservationDTO, RawReservationDTO } from '../dtos';
import { Reservation } from '../entities';
import { PaymentMethod } from '../enums';
import { mapEnumValueByIndex } from 'src/common/utils';

@Injectable()
export class CreateReservationService {
  private readonly logger = new Logger(CreateReservationService.name);

  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async createReservation(
    rawReservationDTO: RawReservationDTO,
  ): Promise<Reservation> {
    this.logger.log('Creating reservation');
    const { reservationId } = rawReservationDTO;

    const reservationExists = await this.reservationsRepository.findById(
      reservationId,
    );

    if (reservationExists) {
      throw new ConflictException(
        `Reservation with number ${reservationId} already exists.`,
      );
    }
    const createReservationDTO: CreateReservationDTO =
      this.mapRawReservationToCreateReservation(rawReservationDTO);

    const newReservation = await this.reservationsRepository.create(
      createReservationDTO,
    );
    this.logger.log('Reservation created');

    return newReservation;
  }

  private mapRawReservationToCreateReservation(
    rawReservationDTO: RawReservationDTO,
  ): CreateReservationDTO {
    return {
      reservationId: rawReservationDTO.reservationId,
      clientEmail: rawReservationDTO.email,
      passengersInfo: {
        adults: rawReservationDTO.adults,
        kids: rawReservationDTO.children,
      },
      luggageInfo: {
        bags: rawReservationDTO.bags,
        babySeats: rawReservationDTO.babySeats,
        boosterSeats: rawReservationDTO.boosterSeats,
        surfboards: rawReservationDTO.surfboards,
      },
      paymentInfo: {
        priceInDollars: rawReservationDTO.price,
        method: this.mapPaymentMethod(rawReservationDTO.paymentType),
        isPaid: Boolean(rawReservationDTO.isPaid),
      },
    };
  }

  private mapPaymentMethod(paymentType: number): PaymentMethod {
    return mapEnumValueByIndex(PaymentMethod, paymentType);
  }
}
