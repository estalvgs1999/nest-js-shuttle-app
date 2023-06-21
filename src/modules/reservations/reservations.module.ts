import { Module } from '@nestjs/common';
import { ReservationPostController } from './infrastructure/controllers';
import { ReservationCreatorService } from './application';
import { InMemoryReservationRepository } from './infrastructure/repositories/in-memory/in-memory-reservation.repository';

@Module({
	imports: [InMemoryReservationRepository],
	controllers: [ReservationPostController],
	providers: [
		ReservationCreatorService,
		{
			provide: 'ReservationRepository',
			useClass: InMemoryReservationRepository,
		},
	],
})
export class ReservationsModule {}
