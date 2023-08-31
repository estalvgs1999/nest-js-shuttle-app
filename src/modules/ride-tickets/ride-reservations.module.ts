import { CreateRideTicketService } from './services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RIDE_TICKETS_REPOSITORY,
  RideTicketsMongoRepository,
} from './repositories';
import { RideTicket, RideTicketSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RideTicket.name,
        schema: RideTicketSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: RIDE_TICKETS_REPOSITORY,
      useClass: RideTicketsMongoRepository,
    },
    CreateRideTicketService,
  ],
  exports: [CreateRideTicketService],
})
export class RideTicketsModule {}
