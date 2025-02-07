import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req,  } from '@nestjs/common';
import { ReservationService } from '../reservation-service/reservation.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../users/jwt-auth.guard';

@ApiTags('reservations')
@Controller('reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'réserver un film' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_movie: { type: 'number', example: 123 },
        debut: { type: 'string', format: 'date-time', example: '2025-02-05T14:00:00Z' },
      },
    },
  })
  async reserver_film(
    @Req() req,
    @Body('id_movie') id_movie: number,
    @Body('debut') debut: string
  ) {
    const id_user = req.user.id;
    console.log(debut)
    const reservation = await this.reservationService.reserver_film(
      id_user,
      id_movie,
      new Date(debut),
    );
    return { message: 'réservation validée', data: reservation };
  }

  @Get()
  @ApiOperation({ summary: 'afficher les réservations' })
  async get_reservation(@Req() req) {
    const id_user = req.user.id;
    return this.reservationService.get_reservation(id_user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'supprimer une réservation' })
  async annuler_reservation(@Param('id') id_reservation: number) {
    return this.reservationService.annuler_reservation(id_reservation);
  }
}
