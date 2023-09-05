import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas';
import { RoutesModule } from '../routes/routes.module';
import { UsersModule } from '../users/users.module';
import { BOOKING_REPOSITORY, BookingMongoRepository } from './repositories';
import {
  BookingTransformService,
  CreateBookingService,
  FindBookingsService,
} from './services';
import { CreateBookingController, FindBookingController } from './controllers';

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
  ],
  controllers: [CreateBookingController, FindBookingController],
})
export class BookingModule {}
