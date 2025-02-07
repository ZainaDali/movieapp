import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { User } from '../users/entities/user.entity';

describe('ReservationController (e2e)', () => {
  let app: INestApplication;
  let reservationRepo: Repository<Reservation>;
  let userRepo: Repository<User>;
  let jwtToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    reservationRepo = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));

    const userResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword',
      });

    jwtToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await reservationRepo.delete({});
    await userRepo.delete({});
    await app.close();
  });

  describe('/reservations (POST)', () => {
    it('doit créer une réservation avec succès', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservations')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          id_movie: 12345,
          debut: "2025-02-05T15:00:00",
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'réservation validée');
      expect(response.body.data).toHaveProperty('id_movie', 12345);
    });

    it('doit refuser une réservation si elle chevauche une autre', async () => {
      const response = await request(app.getHttpServer())
        .post('/reservations')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({
          id_movie: 67890,
          debut: "2025-02-05T15:30:00",
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('message', 'une réservation existe deja à cet horaire');
    });
  });

  describe('/reservations (GET)', () => {
    it('doit récupérer les réservations de l’utilisateur', async () => {
      const response = await request(app.getHttpServer())
        .get('/reservations')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('/reservations/:id (DELETE)', () => {
    it('doit supprimer une réservation existante', async () => {
      const reservations = await request(app.getHttpServer())
        .get('/reservations')
        .set('Authorization', `Bearer ${jwtToken}`);

      const reservationId = reservations.body[0].id;

      const response = await request(app.getHttpServer())
        .delete(`/reservations/${reservationId}`)
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'la réservation est annulée');
    });

    it("doit retourner une erreur si la réservation n'existe pas", async () => {
      const response = await request(app.getHttpServer())
        .delete('/reservations/999999')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', "la réservation n'existe pas");
    });
  });
});
