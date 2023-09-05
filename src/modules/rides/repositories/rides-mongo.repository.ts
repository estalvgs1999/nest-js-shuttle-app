import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ride, RideModel } from '../schemas';
import { RidesRepository } from './rides.repository';

@Injectable()
export class RidesMongoRepository implements RidesRepository {
  private driverPopulateQuery = {
    path: 'driver',
    populate: [
      {
        path: 'user',
        select: 'name lastName email profilePicture phone gender languages',
      },
      {
        path: 'vehicle',
        select: 'plate model capacity status',
      },
    ],
  };

  constructor(
    @InjectModel(Ride.name)
    private readonly model: RideModel,
  ) {}

  async create(ride: Ride): Promise<Ride> {
    const newRide = await new this.model({ ...ride }).save();
    return newRide;
  }

  async addBooking(rideId: string, bookingId: string): Promise<Ride> {
    return (
      await this.model.findByIdAndUpdate(
        rideId,
        { $addToSet: { bookings: bookingId } },
        { new: true },
      )
    ).populate('bookings');
  }

  async cancelBooking(bookingId: string): Promise<Ride> {
    const ride = await this.model
      .findOneAndUpdate(
        { bookings: bookingId },
        { $pull: { bookings: bookingId } },
        { new: true },
      )
      .populate('bookings');
    return ride;
  }

  async assignDriver(rideId: string, driverId: string): Promise<Ride> {
    const ride = await this.model
      .findByIdAndUpdate(rideId, { driver: driverId }, { new: true })
      .populate(this.driverPopulateQuery);
    return ride;
  }

  async findById(rideId: string): Promise<Ride> {
    const ride = await this.model
      .findById(rideId)
      .populate(this.driverPopulateQuery)
      .populate('bookings');
    return ride;
  }

  async findAll(): Promise<Ride[]> {
    const rides = await this.model
      .find()
      .populate(this.driverPopulateQuery)
      .populate('bookings');
    return rides;
  }

  async update(rideId: string, ride: Ride): Promise<Ride> {
    const updatedRide = await this.model
      .findByIdAndUpdate(rideId, ride, { new: true })
      .populate(this.driverPopulateQuery)
      .populate('bookings');
    return updatedRide;
  }
}
