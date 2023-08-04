import { Injectable } from '@nestjs/common';
import { RideReservationsRepository } from './ride-reservations.repository';
import { InjectModel } from '@nestjs/mongoose';
import { RideReservationModel } from '../schemas';
import { RideReservation } from '../entities';
import { RideReservationDTO } from '../dtos';

@Injectable()
export class RideReservationsMongoRepository
  implements RideReservationsRepository
{
  constructor(
    @InjectModel(RideReservation.name)
    private readonly model: RideReservationModel,
  ) {}

  async create(
    rideReservationDTO: RideReservationDTO,
  ): Promise<RideReservationDTO> {
    const newReservation = new this.model(rideReservationDTO);

    await newReservation.save();
    return rideReservationDTO;
  }
}
