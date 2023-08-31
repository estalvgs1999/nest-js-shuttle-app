import { Inject, Injectable, Logger } from '@nestjs/common';
import { mapEnumValueByIndex } from '@Common/utils';
import { oppositeRoutesMap, RideMode, RideType, Route } from '../enums';
import {
  RIDE_TICKETS_REPOSITORY,
  RideTicketsRepository,
} from '../repositories';
import { RideOptionsDto, RideTicketDto } from '../dtos';
import { RideTicket } from '../schemas';
import { Tickets } from '../types';

@Injectable()
export class CreateRideTicketService {
  private readonly logger = new Logger(CreateRideTicketService.name);

  constructor(
    @Inject(RIDE_TICKETS_REPOSITORY)
    private readonly rideTicketsRepository: RideTicketsRepository,
  ) {}

  async run(rawReservation: any): Promise<Tickets> {
    const rideRoute = this.mapRoute(rawReservation.route);
    const rideType = this.mapRideType(rawReservation.tripType);
    const rideMode = this.mapRideMode(rawReservation.vehicleType);
    this.logger.log(
      `Creating ride reservations associated with new reservation`,
    );

    const arrivalRideReservation: RideTicketDto = this.mapReservationToRide(
      rideRoute,
      rideType,
      rideMode,
      {
        ...rawReservation,
      },
    );

    const tickets: Tickets = {
      arrival_ticket: '',
    };

    const arrivalTicket: RideTicket = await this.rideTicketsRepository.create(
      arrivalRideReservation,
    );
    tickets.arrival_ticket = arrivalTicket['_id'];
    this.logger.log(`Arrival ride ticket created`);

    if (rideType === RideType.RoundTrip) {
      const departureRideReservation: RideTicketDto = this.mapReservationToRide(
        rideRoute,
        rideType,
        rideMode,
        { ...rawReservation },
        false,
      );

      const departureTicket: RideTicket =
        await this.rideTicketsRepository.create(departureRideReservation);
      tickets.departure_ticket = departureTicket['_id'];
      this.logger.log('Departure ride reservation created');
    }

    return tickets;
  }

  private mapReservationToRide(
    route: Route,
    type: RideType,
    mode: RideMode,
    rideOptions: RideOptionsDto,
    isArrival = true,
  ): RideTicketDto {
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
