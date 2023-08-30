import { DriversModule } from '../drivers/drivers.module';
import { Module } from '@nestjs/common';
import { VehicleAssignmentController } from './controllers';
import { VehicleAssignmentService } from './services/vehicle-assignment.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [DriversModule, VehiclesModule],
  controllers: [VehicleAssignmentController],
  providers: [VehicleAssignmentService],
  exports: [VehicleAssignmentService],
})
export class VehicleAssignmentModule {}
