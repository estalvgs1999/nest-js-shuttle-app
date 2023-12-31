import { Driver } from '../schemas';
import { DriverFilterDto } from '../dtos';

/**
 * The function matchesFilter checks if a driver object matches the given filter criteria.
 * @param {Driver} driver - The "driver" parameter is an object that represents a driver. It contains
 * information about the driver's vehicle, user details (name and last name), and status.
 * @param {DriverFilterDto} filter - The `filter` parameter is an object of type `DriverFilterDto`
 * which contains the following properties:
 * @returns A boolean value is being returned.
 */
export const matchesFilter = (
  driver: Driver,
  filter: DriverFilterDto,
): boolean => {
  if (filter.plate && !driver.vehicle) return false;

  if (filter.plate && driver.vehicle.plate !== filter.plate) return false;

  if (filter.name && driver.user.name !== filter.name) return false;

  if (filter.lastName && driver.user.lastName !== filter.lastName) return false;

  if (filter.status && driver.status !== filter.status) return false;

  return true;
};
