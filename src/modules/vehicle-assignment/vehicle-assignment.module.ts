import { Module } from '@nestjs/common';
import { VehicleAssignmentService } from './services/vehicle-assignment.service';
import { VehicleAssignmentController } from './controllers';
import { DriversModule } from '../drivers/drivers.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [DriversModule, VehiclesModule],
  controllers: [VehicleAssignmentController],
  providers: [VehicleAssignmentService],
  exports: [VehicleAssignmentService],
})
export class VehicleAssignmentModule {}
