import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto, RawReservationDto } from '../dtos';
import { CreateRideTicketService } from '@/modules/ride-tickets/services';
import { mapEnumValueByIndex } from '@Common/utils';
import { PaymentMethod } from '../enums';
import { Reservation } from '../entities';
import {
  RESERVATIONS_REPOSITORY,
  ReservationsRepository,
} from '../repositories';
import { Tickets } from '@/modules/ride-tickets/types';

@Injectable()
export class CreateReservationService {
  private readonly logger = new Logger(CreateReservationService.name);

  constructor(
    @Inject(RESERVATIONS_REPOSITORY)
    private readonly reservationsRepository: ReservationsRepository,
    private readonly rideTicketService: CreateRideTicketService,
  ) {}

  async run(rawReservationDto: RawReservationDto): Promise<Reservation> {
    this.logger.log('Creating reservation');
    const { reservationId } = rawReservationDto;

    // Check if the reservation already exists
    const reservationExists = await this.reservationsRepository.findById(
      reservationId,
    );

    if (reservationExists) {
      throw new ConflictException(
        `Reservation with number ${reservationId} already exists.`,
      );
    }

    // Create ride tickets
    const rideTickets: Tickets = await this.rideTicketService.run(
      rawReservationDto,
    );

    // Map the raw reservation data to our domain reservation DTO
    const createReservationDto: CreateReservationDto =
      this.mapRawReservationToCreateReservation(rawReservationDto);

    // Create a new reservation
    const newReservation = await this.reservationsRepository.create({
      ...createReservationDto,
      rideTickets: [rideTickets.arrival_ticket, rideTickets.departure_ticket],
    });
    this.logger.log('Reservation created');

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
      rideTickets: [],
    };
  }

  private mapPaymentMethod(paymentType: number): PaymentMethod {
    return mapEnumValueByIndex(PaymentMethod, paymentType);
  }
}
