import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from '../reservation-service/reservation.service';
import { JwtAuthGuard } from '../../users/jwt-auth.guard';

describe('ReservationController', () => {
  let controller: ReservationController;
  let reservationService: ReservationService;

  beforeEach(async () => {
    const mockReservationService = {
      reserver_film: jest.fn(),
      get_reservation: jest.fn(),
      annuler_reservation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) 
      .compile();

    controller = module.get<ReservationController>(ReservationController);
    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('doit être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('reserver_film', () => {
    it('doit appeler ReservationService.reserver_film et retourner la réservation', async () => {
      const mockReservation = { id: 1, id_movie: 123, debut: new Date(), fin: new Date() };
      reservationService.reserver_film = jest.fn().mockResolvedValue(mockReservation);

      const req = { user: { id: 1 } };
      const body = { id_movie: 123, debut: '2025-02-05T14:00:00Z' };

      const result = await controller.reserver_film(req, body.id_movie, body.debut);

      expect(reservationService.reserver_film).toHaveBeenCalledWith(1, 123, new Date(body.debut));
      expect(result).toEqual({ message: 'réservation validée', data: mockReservation });
    });
  });

  describe('get_reservation', () => {
    it('doit retourner les réservations de l’utilisateur', async () => {
      const mockReservations = [{ id: 1, id_movie: 123, debut: new Date(), fin: new Date() }];
      reservationService.get_reservation = jest.fn().mockResolvedValue(mockReservations);

      const req = { user: { id: 1 } };

      const result = await controller.get_reservation(req);

      expect(reservationService.get_reservation).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockReservations);
    });
  });

  describe('annuler_reservation', () => {
    it('doit annuler une réservation', async () => {
      reservationService.annuler_reservation = jest.fn().mockResolvedValue({ message: 'la réservation est annulée' });

      const result = await controller.annuler_reservation(1);

      expect(reservationService.annuler_reservation).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'la réservation est annulée' });
    });
  });
});
