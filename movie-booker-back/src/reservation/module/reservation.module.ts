import { Module } from '@nestjs/common';
import { ReservationService } from '../reservation-service/reservation.service';
import { ReservationController } from '../reservation-controller/reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Reservation, User]),
    JwtModule.register({}), 
  ],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
