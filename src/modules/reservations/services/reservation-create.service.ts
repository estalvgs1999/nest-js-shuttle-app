import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto, RawReservationDto } from '../dtos';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { mapEnumValueByIndex } from 'src/common/utils';
import { PaymentMethod } from '../enums';
import { Reservation } from '../entities';
import { ReservationCreatedEvent } from '../events';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';

@Injectable()
export class CreateReservationService {
  private readonly logger = new Logger(CreateReservationService.name);

  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async run(rawReservationDto: RawReservationDto): Promise<Reservation> {
    this.logger.log('Creating reservation');
    const { reservationId } = rawReservationDto;

    const reservationExists = await this.reservationsRepository.findById(
      reservationId,
    );

    if (reservationExists) {
      throw new ConflictException(
        `Reservation with number ${reservationId} already exists.`,
      );
    }
    const createReservationDto: CreateReservationDto =
      this.mapRawReservationToCreateReservation(rawReservationDto);

    const newReservation = await this.reservationsRepository.create(
      createReservationDto,
    );
    this.logger.log('Reservation created');

    this.eventEmitter.emit(
      'reservation.created',
      new ReservationCreatedEvent(rawReservationDto, newReservation),
    );

    return newReservation;
  }

  private mapRawReservationToCreateReservation(
    rawReservationDto: RawReservationDto,
  ): CreateReservationDto {
    return {
      reservationId: rawReservationDto.reservationId,
      clientEmail: rawReservationDto.email,
      passengersInfo: {
        adults: rawReservationDto.adults,
        kids: rawReservationDto.children,
      },
      luggageInfo: {
        bags: rawReservationDto.bags,
        babySeats: rawReservationDto.babySeats,
        boosterSeats: rawReservationDto.boosterSeats,
        surfboards: rawReservationDto.surfboards,
      },
      paymentInfo: {
        priceInDollars: rawReservationDto.price,
        method: this.mapPaymentMethod(rawReservationDto.paymentType),
        isPaid: Boolean(rawReservationDto.isPaid),
      },
    };
  }

  private mapPaymentMethod(paymentType: number): PaymentMethod {
    return mapEnumValueByIndex(PaymentMethod, paymentType);
  }
}
