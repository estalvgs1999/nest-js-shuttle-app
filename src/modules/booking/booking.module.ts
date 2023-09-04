import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas';
import { RoutesModule } from '../routes/routes.module';
import { UsersModule } from '../users/users.module';
import { BOOKING_REPOSITORY, BookingMongoRepository } from './repositories';
import { BookingTransformService, CreateBookingService } from './services';
import { CreateBookingController } from './controllers';

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
  ],
  controllers: [CreateBookingController],
})
export class BookingModule {}
