import { Module } from '@nestjs/common';
import { ReservationsModule } from './modules/reservations/reservations.module';

@Module({
	imports: [ReservationsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
