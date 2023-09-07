import { Booking } from '@/modules/booking/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { Ride } from '../schemas';
import { RIDES_REPOSITORY, RidesRepository } from '../repositories';

@Injectable()
export class FindRidesService {
  constructor(
    @Inject(RIDES_REPOSITORY)
    private readonly ridesRepository: RidesRepository,
  ) {}

  async findAll(): Promise<Ride[]> {
    return await this.ridesRepository.findAll();
  }

  async findByDriver(driverId: string): Promise<Ride[]> {
    const rides = await this.ridesRepository.findAll();
    return rides.filter(ride => ride.driver['_id'].toString() === driverId);
  }

  async findByUser(userId: string): Promise<Ride[]> {
    const rides = await this.ridesRepository.findAll();
    const userRides = rides.filter(ride => this.hasUserBooking(ride, userId));
    return this.cleanUserRides(userRides, userId);
  }

  /**
   * The function checks if a user has a booking for a specific ride.
   * @param {Ride} ride - The `ride` parameter is of type `Ride`, which represents a ride object. It
   * likely contains information about a specific ride, such as the ride details, driver information,
   * and a list of bookings for that ride.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user.
   * @returns a boolean value. It returns true if there is a booking in the ride's bookings array that
   * matches the given userId, and false otherwise.
   */
  private hasUserBooking(ride: Ride, userId: string) {
    const bookings: Booking[] = ride.bookings;
    for (const booking of bookings)
      if (booking.clientInfo.client.toString() === userId) return true;
    return false;
  }

  /**
   * The function `cleanUserRides` filters out rides from an array based on a specific user ID.
   * @param {Ride[]} rides - An array of Ride objects.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user.
   * @returns The cleanUserRides function returns an array of Ride objects.
   */
  private cleanUserRides(rides: Ride[], userId: string): Ride[] {
    return rides.map(ride => ({
      ...ride,
      bookings: ride.bookings.filter(
        booking => booking.clientInfo.client.toString() === userId,
      ),
    }));
  }
}
