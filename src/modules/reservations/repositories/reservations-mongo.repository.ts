import { CreateReservationDto } from '../dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from '../entities';
import {
  ReservationDocument,
  ReservationModel,
} from '../schemas/reservation.schema';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsMongoRepository implements ReservationsRepository {
  constructor(
    @InjectModel(Reservation.name)
    private readonly model: ReservationModel,
  ) {}

  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
    const newReservation = await new this.model(reservationDto).save();
    return newReservation;
  }

  async findById(reservationId: string): Promise<Reservation> {
    const reservation = await this.model.findOne({
      reservationId: reservationId,
    });
    return reservation;
  }

  async update(
    reservationId: string,
    reservation: Reservation,
  ): Promise<Reservation> {
    const updatedReservation = await this.model.findOneAndUpdate(
      { reservationId: reservationId },
      reservation,
      { new: true },
    );
    return this.mapToReservation(updatedReservation);
  }

  private mapToReservation(rawReservation: ReservationDocument): Reservation {
    const reservation = new Reservation();

    reservation.reservationId = rawReservation.reservationId;
    reservation.clientEmail = rawReservation.clientEmail;
    reservation.status = rawReservation.status;
    reservation.passengersInfo = rawReservation.passengersInfo;
    reservation.luggageInfo = rawReservation.luggageInfo;
    reservation.paymentInfo = rawReservation.paymentInfo;
    reservation.createdAt = rawReservation.createdAt;

    return reservation;
  }
}
