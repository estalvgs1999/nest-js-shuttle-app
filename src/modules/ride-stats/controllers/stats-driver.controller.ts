import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverTenureService } from '../services';

@Controller({ path: 'ride-stats' })
export class DriverStatsController {
  constructor(private readonly driverTenureService: DriverTenureService) {}
  @Get('/driver-tenure/:id')
  getDriverTenure(@Param('id') driverId: string) {
    return this.driverTenureService.run(driverId);
  }

  @Get('/total-trips/:id')
  getTotalTrips(@Param('id') driverId: string) {
    // Replace with actual logic to fetch total trips for the driver
    const totalTrips = 100; // Fictitious data
    return { totalTrips };
  }

  @Get('/trips-by-date/:id')
  getTripsByDate(
    @Param('id') driverId: string,
    @Query('from') fromDate: string,
    @Query('to') toDate: string,
  ) {
    // Replace with actual logic to fetch trips by date range for the driver
    const trips = [
      { quantity: 5, date: '2023-08-01' },
      { quantity: 7, date: '2023-08-02' },
    ]; // Fictitious data
    return { trips };
  }

  @Get('/trips-detail-by-date/:id')
  getTripsDetailByDate(
    @Param('id') driverId: string,
    @Query('date') date: string,
  ) {
    // Replace with actual logic to fetch trip details by date for the driver
    const tripDetails = [
      {
        date: '2023-08-01',
        route: 'Liberia-Nosara',
        tripType: 'Private',
        user: {
          _id: '64e7cff07fa4fd93bc514011',
          name: 'John',
          lastName: 'Doe',
          profilePicture: 'john.jpg',
        },
      },
      {
        date: '2023-08-01',
        route: 'Liberia-Nosara',
        tripType: 'Shared',
        user: {
          _id: '64e7cff07fa4fd93bc514011',
          name: 'Jane',
          lastName: 'Smith',
          profilePicture: 'jane.jpg',
        },
      },
    ]; // Fictitious data
    return { tripDetails };
  }
}
