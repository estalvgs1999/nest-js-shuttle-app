import { Driver } from '@/modules/drivers/schemas';
import {
  DRIVERS_REPOSITORY,
  DriversRepository,
} from '@/modules/drivers/repositories';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DriverTenureDto } from '../dtos';

@Injectable()
export class DriverTenureService {
  constructor(
    @Inject(DRIVERS_REPOSITORY)
    private readonly driversRepository: DriversRepository,
  ) {}

  async run(driverId: string): Promise<DriverTenureDto> {
    const driver: Driver = await this.driversRepository.findById(driverId);

    if (!driver) throw new NotFoundException('Driver not found');

    const createdAt: Date = new Date(driver['createdAt']);
    const currentDate: Date = new Date();

    const timeDifference = currentDate.getTime() - createdAt.getTime();

    // Calculate the difference in time between the current date and the driver's creation date
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsInMonth = 30.44 * millisecondsInDay;
    const millisecondsInYear = 365.25 * millisecondsInDay;

    // Calculate the difference in time between the current date and the driver's creation date and converting it into years, months, and days
    const years = Math.floor(timeDifference / millisecondsInYear);
    const remainingTimeAfterYears = timeDifference % millisecondsInYear;

    const months = Math.floor(remainingTimeAfterYears / millisecondsInMonth);
    const remainingTimeAfterMonths =
      remainingTimeAfterYears % millisecondsInMonth;

    const days = Math.floor(remainingTimeAfterMonths / millisecondsInDay);

    // Calculate the tenure of a driver and creating a DriverTenureDto object to represent the tenure
    const driverTenure: DriverTenureDto = {
      tenure: 0,
      unit: '',
    };

    if (years >= 1) {
      driverTenure.tenure = years;
      driverTenure.unit = years > 1 ? 'Años' : 'Año';
    } else if (months >= 1) {
      driverTenure.tenure = months;
      driverTenure.unit = months > 1 ? 'Meses' : 'Mes';
    } else {
      driverTenure.tenure = days;
      driverTenure.unit = days > 1 ? 'Días' : 'Día';
    }

    return driverTenure;
  }
}
