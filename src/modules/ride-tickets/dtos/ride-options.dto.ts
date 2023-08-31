export class RideOptionsDto {
  route: number;
  tripType: number;
  vehicleType: number;
  arrivalFlight: string;
  arrivalPickupLocation: string;
  arrivalPickupDate: Date;
  arrivalPickupTime: string;
  arrivalDropOffLocation: string;
  arrivalDropOffDate: Date;
  arrivalDropOffTime: string;
  departureFlight: string;
  departurePickupLocation: string;
  departurePickupDate: Date;
  departurePickupTime: string;
  departureDropOffLocation: string;
  departureDropOffDate: Date;
  departureDropOffTime: string;
}
