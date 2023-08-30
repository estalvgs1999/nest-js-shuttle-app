import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RideReservation } from '../entities';
import { RideReservationDto } from '../dtos';
import { RideReservationModel } from '../schemas';
import { RideReservationsRepository } from './ride-reservations.repository';

@Injectable()
export class RideReservationsMongoRepository
  implements RideReservationsRepository
{
  constructor(
    @InjectModel(RideReservation.name)
    private readonly model: RideReservationModel,
  ) {}

  async create(
    rideReservationDto: RideReservationDto,
  ): Promise<RideReservationDto> {
    const newReservation = new this.model(rideReservationDto);

    await newReservation.save();
    return rideReservationDto;
  }
}
