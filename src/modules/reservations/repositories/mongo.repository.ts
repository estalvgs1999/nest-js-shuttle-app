import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './repository.interface';
import { Reservation, ReservationModel } from '../schemas/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationDTO, ReservationFilterDTO } from '../dtos';

@Injectable()
export class MongoReservationsRepository implements ReservationsRepository {
  constructor(
    @InjectModel(Reservation.name)
    private readonly model: ReservationModel,
  ) {}

  async create(reservationDTO: CreateReservationDTO): Promise<Reservation> {
    const newReservation = new this.model(reservationDTO);
    return await newReservation.save();
  }

  update(
    id: string,
    reservationDTO: CreateReservationDTO,
  ): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }

  findByFilter(filter: ReservationFilterDTO): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
}
