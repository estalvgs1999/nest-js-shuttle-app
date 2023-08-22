import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  RIDE_RESERVATIONS_REPOSITORY,
  RideReservationsRepository,
} from '../repositories';
import { OnEvent } from '@nestjs/event-emitter';
import { RideMode, RideType, Route, oppositeRoutesMap } from '../enums';
import { mapEnumValueByIndex } from '../../../common/utils';
import { RideReservationDTO } from '../dtos';
import { RideOptionsDTO } from '../dtos/ride-options.dto';
import { Reservation } from '../../reservations/schemas';

@Injectable()
export class CreateRideReservationsService {
  private readonly logger = new Logger(CreateRideReservationsService.name);

  constructor(
    @Inject(RIDE_RESERVATIONS_REPOSITORY)
    private readonly rideReservationsRepository: RideReservationsRepository,
  ) {}

  @OnEvent('reservation.created')
  async run(payload) {
    const { rawReservation: reservation, newReservation } = payload;
    const reservationId = newReservation.reservationId;

    const rideRoute = this.mapRoute(reservation.route);
    const rideType = this.mapRideType(reservation.tripType);
    const rideMode = this.mapRideMode(reservation.vehicleType);
    this.logger.log(
      `Creating ride reservations associated with new reservation: ${reservationId}`,
    );

    const arrivalRideReservation: RideReservationDTO =
      this.mapReservationToRide(newReservation, rideRoute, rideType, rideMode, {
        ...reservation,
      });

    await this.rideReservationsRepository.create(arrivalRideReservation);
    this.logger.log('Arrival ride reservation created');

    if (rideType === RideType.RoundTrip) {
      const departureRideReservation: RideReservationDTO =
        this.mapReservationToRide(
          newReservation,
          rideRoute,
          rideType,
          rideMode,
          { ...reservation },
          false,
        );

      await this.rideReservationsRepository.create(departureRideReservation);
      this.logger.log('Departure ride reservation created');
    }
  }

  private mapReservationToRide(
    reservation: Reservation,
    route: Route,
    type: RideType,
    mode: RideMode,
    rideOptions: RideOptionsDTO,
    isArrival = true,
  ): RideReservationDTO {
    return {
      route: isArrival ? route : this.getDepartureRoute(route),
      type: type,
      mode: mode,
      pickUpLocation: isArrival
        ? rideOptions.arrivalPickupLocation
        : rideOptions.departurePickupLocation,
      pickUpDate: isArrival
        ? rideOptions.arrivalPickupDate
        : rideOptions.departurePickupDate,
      pickUpTime: isArrival
        ? rideOptions.arrivalPickupTime
        : rideOptions.departurePickupTime,
      dropOffLocation: isArrival
        ? rideOptions.arrivalDropOffLocation
        : rideOptions.departureDropOffLocation,
      dropOffDate: isArrival
        ? rideOptions.arrivalDropOffDate
        : rideOptions.departureDropOffDate,
      dropOffTime: isArrival
        ? rideOptions.arrivalDropOffTime
        : rideOptions.departureDropOffTime,
      reservation: reservation,
    };
  }

  private mapRideMode(rideMode: number): RideMode {
    return mapEnumValueByIndex(RideMode, rideMode);
  }

  private mapRideType(rideType: number): RideType {
    return mapEnumValueByIndex(RideType, rideType);
  }

  private mapRoute(route: number): Route {
    return mapEnumValueByIndex(Route, route);
  }

  private getDepartureRoute(route: Route): Route {
    return oppositeRoutesMap.get(route);
  }
}
