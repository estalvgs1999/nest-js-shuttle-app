import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationModel,
} from '../schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationDTO } from '../dtos';
import { Reservation } from '../entities';

@Injectable()
export class ReservationsMongoRepository implements ReservationsRepository {
  constructor(
    @InjectModel(Reservation.name)
    private readonly model: ReservationModel,
  ) {}

  async create(reservationDTO: CreateReservationDTO): Promise<Reservation> {
    const newReservation = await new this.model(reservationDTO).save();
    return this.mapToReservation(newReservation);
  }

  async findById(reservationId: string): Promise<Reservation> {
    const reservation = await this.model.findOne({
      reservationId: reservationId,
    });
    return reservation;
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
