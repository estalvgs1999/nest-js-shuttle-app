import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverRideStatsService, DriverTenureService } from '../services';
import { DriverRidesFilterDto } from '../dtos';

@Controller({ path: 'ride-stats' })
export class DriverStatsController {
  constructor(
    private readonly driverTenureService: DriverTenureService,
    private readonly driverRideStatsService: DriverRideStatsService,
  ) {}

  @Get('/driver-tenure/:id')
  getDriverTenure(@Param('id') driverId: string) {
    return this.driverTenureService.run(driverId);
  }

  @Get('/total-trips/:id')
  getTotalTrips(@Param('id') driverId: string) {
    return this.driverRideStatsService.getDriverTotalRides(driverId);
  }

  @Get('/trips-by-date/:id')
  getTripsByDate(
    @Param('id') driverId: string,
    @Query() filter: DriverRidesFilterDto,
  ) {
    return this.driverRideStatsService.getRidesByDate(
      driverId,
      filter.from,
      filter.to,
    );
  }

  @Get('/trips-detail-by-date/:id')
  getTripsDetailByDate(
    @Param('id') driverId: string,
    @Query('date') date: string,
  ) {
    return this.driverRideStatsService.getRideDetails(driverId, date);
  }
}
