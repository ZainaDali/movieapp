import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../../users/entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;
  let repo_reservation: Repository<Reservation>;
  let repo_user: Repository<User>;

  beforeEach(async () => {
    const mockRepoReservation = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    };

    const mockRepoUser = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockRepoReservation,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepoUser,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repo_reservation = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    repo_user = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('doit être défini', () => {
    expect(service).toBeDefined();
  });

  describe('reserver_film', () => {
    it('doit créer une réservation si aucun conflit', async () => {
      const mockUser = { id: 1 } as User;
      const mockReservation = { id: 1, user: mockUser, id_movie: 100, debut: new Date(), fin: new Date() } as Reservation;

      jest.spyOn(repo_reservation, 'findOne').mockResolvedValue(null);
      jest.spyOn(repo_user, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(repo_reservation, 'create').mockReturnValue(mockReservation);
      jest.spyOn(repo_reservation, 'save').mockResolvedValue(mockReservation);

      await expect(service.reserver_film(1, 100, new Date())).resolves.toEqual(mockReservation);
    });

    it('doit lever une erreur si un film est déjà en cours', async () => {
      const mockUser = { id: 1 } as User;
      const mockReservation = { id: 1, user: mockUser, id_movie: 100, debut: new Date(), fin: new Date() } as Reservation;

      jest.spyOn(repo_reservation, 'findOne').mockResolvedValue(mockReservation);

      await expect(service.reserver_film(1, 100, new Date()))
        .rejects
        .toThrow(new ConflictException('une réservation existe deja à cet horaire'));
    });

    it("doit lever une erreur si l'utilisateur n'existe pas", async () => {
      jest.spyOn(repo_user, 'findOne').mockResolvedValue(null);

      await expect(service.reserver_film(1, 100, new Date()))
        .rejects
        .toThrow(new NotFoundException('veuillez vous connectez'));
    });
  });

  describe('get_reservation', () => {
    it('doit retourner les réservations d’un utilisateur', async () => {
      const mockReservations = [{ id: 1, user: { id: 1 }, id_movie: 100, debut: new Date(), fin: new Date() }] as Reservation[];

      jest.spyOn(repo_reservation, 'find').mockResolvedValue(mockReservations);

      await expect(service.get_reservation(1)).resolves.toEqual(mockReservations);
    });
  });

  describe('annuler_reservation', () => {
    it('doit supprimer une réservation existante', async () => {
      const mockReservation = { id: 1 } as Reservation;

      jest.spyOn(repo_reservation, 'findOne').mockResolvedValue(mockReservation);
      jest.spyOn(repo_reservation, 'remove').mockResolvedValue(mockReservation);

      await expect(service.annuler_reservation(1)).resolves.toEqual({ message: 'la réservation est annulée' });
    });

    it('doit lever une erreur si la réservation n’existe pas', async () => {
      jest.spyOn(repo_reservation, 'findOne').mockResolvedValue(null);

      await expect(service.annuler_reservation(1))
        .rejects
        .toThrow(new NotFoundException("la réservation n'existe pas"));
    });
  });
});
