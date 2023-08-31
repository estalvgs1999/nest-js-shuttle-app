import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RideTicketDto } from '../dtos';
import { RideTicket, RideTicketModel } from '../schemas';
import { RideTicketsRepository } from './ride-tickets.repository';

@Injectable()
export class RideTicketsMongoRepository implements RideTicketsRepository {
  constructor(
    @InjectModel(RideTicket.name)
    private readonly model: RideTicketModel,
  ) {}

  async create(rideReservationDto: RideTicketDto): Promise<RideTicket> {
    const newReservation = new this.model(rideReservationDto);

    await newReservation.save();
    return newReservation;
  }
}
