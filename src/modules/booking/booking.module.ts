import { Booking, BookingSchema } from './schemas';
import { BOOKING_REPOSITORY, BookingMongoRepository } from './repositories';
import {
  BookingTransformService,
  CreateBookingService,
  FindBookingsService,
  UpdateBookingClientInfoService,
  UpdateBookingStatusService,
} from './services';
import {
  CreateBookingController,
  FindBookingController,
  UpdateBookingStatusController,
} from './controllers';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutesModule } from '../routes/routes.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
    RoutesModule,
    UsersModule,
  ],
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: BookingMongoRepository,
    },
    BookingTransformService,
    CreateBookingService,
    FindBookingsService,
    UpdateBookingStatusService,
    UpdateBookingClientInfoService,
  ],
  controllers: [
    CreateBookingController,
    FindBookingController,
    UpdateBookingStatusController,
  ],
})
export class BookingModule {}
