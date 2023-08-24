export class VehicleAssignedEvent {
  constructor(
    public readonly vehicleId: string,
    public readonly driverId: string,
  ) {}
}
